import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import crypto from "node:crypto";

dotenv.config();

const isStrict = process.env.STRICT_MODE === "true";
const PORT = process.env.NODE_ENV === "production"
  ? Number(process.env.PORT ?? 8080)
  : Number(process.env.API_PORT ?? 3001);
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "rfp_leads.json");

// Fail-fast or warning on ephemeral filesystems without webhook in production
if (!process.env.RFP_WEBHOOK_URL && process.env.NODE_ENV === "production") {
  if (isStrict) {
    throw new Error("[MUNΛRQ FATAL] RFP_WEBHOOK_URL requerida en producción cuando STRICT_MODE=true.");
  }
  console.warn("⚠️  [MUNΛRQ] MODO DEMO: los leads NO se persistirán tras restart. Configura RFP_WEBHOOK_URL.");
}

// Ensure data directory exists
async function ensureDataStorage() {
  try {
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    if (!existsSync(LEADS_FILE)) {
      await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("[server] Failed to initialize leads storage:", err);
  }
}
ensureDataStorage();

// Serialized atomic file writes: avoids race conditions and partial write corruption
let writeQueue = Promise.resolve();

function queueWriteLead(newLead: Record<string, unknown>): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    let existingLeads: unknown[] = [];
    try {
      const raw = await fs.readFile(LEADS_FILE, "utf8");
      existingLeads = JSON.parse(raw);
      if (!Array.isArray(existingLeads)) existingLeads = [];
    } catch {
      existingLeads = [];
    }
    existingLeads.unshift(newLead);
    const tempFile = `${LEADS_FILE}.${Date.now()}.${crypto.randomUUID().slice(0, 6)}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(existingLeads, null, 2), "utf8");
    await fs.rename(tempFile, LEADS_FILE);
  });
  return writeQueue;
}

const app = express();
app.use(express.json({ limit: "64kb" }));

// In-memory IP rate limiters
const rfpRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const analyzeRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_RFP_REQUESTS_PER_WINDOW = 5; // 5 submissions/min per IP
const MAX_ANALYZE_REQUESTS_PER_WINDOW = 20; // 20 analyses/min per IP

function checkRateLimit(
  ip: string,
  map: Map<string, { count: number; resetTime: number }>,
  maxRequests: number
): boolean {
  const now = Date.now();
  const entry = map.get(ip);

  if (!entry || now > entry.resetTime) {
    map.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Clean up expired rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rfpRateLimitMap.entries()) {
    if (now > data.resetTime) rfpRateLimitMap.delete(ip);
  }
  for (const [ip, data] of analyzeRateLimitMap.entries()) {
    if (now > data.resetTime) analyzeRateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    gemini: Boolean(process.env.GEMINI_API_KEY),
    demoMode: !process.env.RFP_WEBHOOK_URL,
    strict: isStrict,
    ts: new Date().toISOString(),
  });
});

app.post("/api/rfp", async (req, res) => {
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";

  if (!checkRateLimit(clientIp, rfpRateLimitMap, MAX_RFP_REQUESTS_PER_WINDOW)) {
    res.status(429).json({
      error: "too_many_requests",
      message: "Límite de solicitudes alcanzado. Por favor, espere 1 minuto antes de reintentar.",
    });
    return;
  }

  const {
    typology,
    areaM2,
    timeline,
    zone,
    tectonicSystem,
    environmentalObjective,
    clientName,
    clientEmail,
    clientPhone,
    siteLocationNotes,
    website_hp, // Honeypot field
    renderedAt, // Anti-bot timestamp
  } = req.body ?? {};

  // 1. Anti-spam honeypot detection
  if (website_hp && typeof website_hp === "string" && website_hp.trim().length > 0) {
    console.warn(`[MUNΛRQ RFP] Bot detectado vía honeypot desde ${clientIp}`);
    // Respond with synthetic success to deceive the scraper without saving
    res.json({
      ok: true,
      referenceId: "MNQ-BOT-DROP",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 2. Anti-spam fast-submission detection (human takes > 2.0 seconds to fill 3 steps)
  if (renderedAt && typeof renderedAt === "number") {
    const elapsedMs = Date.now() - renderedAt;
    if (elapsedMs < 2000) {
      console.warn(`[MUNΛRQ RFP] Bot detectado por tiempo de llenado inhumano (${elapsedMs}ms) desde ${clientIp}`);
      res.status(400).json({ error: "spam_detected", message: "Envío sospechoso rechazado." });
      return;
    }
  }

  // 3. Payload validation
  if (
    !clientName ||
    typeof clientName !== "string" ||
    clientName.trim().length === 0 ||
    clientName.length > 120 ||
    !clientEmail ||
    typeof clientEmail !== "string" ||
    !clientEmail.includes("@") ||
    clientEmail.length > 120
  ) {
    res.status(400).json({ error: "invalid_payload", message: "Nombre y correo electrónico válidos son obligatorios." });
    return;
  }

  // 4. Strict bounding for project area (60 to 5000 m²)
  if (
    typeof areaM2 !== "number" ||
    Number.isNaN(areaM2) ||
    areaM2 < 60 ||
    areaM2 > 5000
  ) {
    res.status(400).json({
      error: "invalid_payload",
      message: "Superficie requerida fuera de rango admisible (60 - 5000 m²).",
    });
    return;
  }

  // 5. Categorize email (corporate vs public provider)
  const isCorporateEmail = !/@(gmail|hotmail|yahoo|outlook|live|icloud)\./i.test(clientEmail);

  // 6. Generate collision-proof canonical reference code with dynamic year
  const currentYear = new Date().getFullYear();
  const entropy = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  const cleanRef = `MNQ-${currentYear}-${entropy}`;
  const timestamp = new Date().toISOString();

  const newLead = {
    referenceId: cleanRef,
    timestamp,
    clientIp,
    isCorporateEmail,
    clientName: clientName.trim(),
    clientEmail: clientEmail.trim().toLowerCase(),
    clientPhone: typeof clientPhone === "string" ? clientPhone.trim() : null,
    typology: typeof typology === "string" ? typology.trim() : "No especificado",
    areaM2,
    timeline: typeof timeline === "string" ? timeline.trim() : null,
    zone: typeof zone === "string" ? zone.trim() : null,
    tectonicSystem: typeof tectonicSystem === "string" ? tectonicSystem.trim() : null,
    environmentalObjective: typeof environmentalObjective === "string" ? environmentalObjective.trim() : null,
    siteLocationNotes: typeof siteLocationNotes === "string" ? siteLocationNotes.trim() : null,
    status: "new",
  };

  // 7. Persistent disk storage via serialized atomic queue (no race conditions)
  try {
    await queueWriteLead(newLead);
    // Log without exposing customer PII (no name, email, or telephone)
    console.log(`[MUNΛRQ RFP] Pliego persistido: ${cleanRef} [${isCorporateEmail ? "CORP" : "PART"}] desde ${clientIp}`);
  } catch (err) {
    console.error(`[MUNΛRQ RFP] FALLO CRÍTICO de persistencia para ${cleanRef}:`, err);
    if (isStrict) {
      res.status(500).json({
        error: "persistence_failed",
        message: "Fallo crítico al registrar el pliego en el servidor.",
      });
      return;
    }
  }

  // 8. Optional Webhook forwarder (Formspree / Zapier / Slack / Make) if configured
  const webhookUrl = process.env.RFP_WEBHOOK_URL;
  let webhookFailed = false;

  if (webhookUrl) {
    try {
      const whRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...newLead,
          destinationEmail: "studio@munarq.mx",
        }),
        signal: AbortSignal.timeout(5000), // 5s timeout prevents hanging requests
      });

      if (!whRes.ok) {
        webhookFailed = true;
        const errBody = await whRes.text().catch(() => "");
        console.error(`[MUNΛRQ RFP] Webhook rechazó envío (HTTP ${whRes.status}) para ${cleanRef}: ${errBody.slice(0, 150)}`);
      } else {
        console.log(`[MUNΛRQ RFP] Notificación enviada al webhook para ${cleanRef}.`);
      }
    } catch (whErr) {
      webhookFailed = true;
      console.error(`[MUNΛRQ RFP] Fallo en webhook forwarder para ${cleanRef}:`, whErr);
    }
  }

  // En strict mode, sin webhook confirmado y en filesystem efímero, no fingimos persistencia
  if (isStrict && webhookUrl && webhookFailed) {
    res.status(503).json({
      error: "persistence_failed",
      message: "No se pudo garantizar la persistencia del pliego en el canal externo. Use el despacho directo por correo.",
      referenceId: cleanRef,
    });
    return;
  }

  res.json({
    ok: true,
    referenceId: cleanRef,
    timestamp,
    message: "Pliego de encargo registrado y persistido en el sistema oficial del despacho.",
  });
});

app.post("/api/analyze", async (req, res) => {
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";

  if (!checkRateLimit(clientIp, analyzeRateLimitMap, MAX_ANALYZE_REQUESTS_PER_WINDOW)) {
    res.status(429).json({
      error: "too_many_requests",
      message: "Límite de solicitudes alcanzado. Por favor, espere 1 minuto antes de reintentar.",
    });
    return;
  }

  const { span, load, material, co2, deltaMm } = req.body ?? {};

  // Strict payload validation and bounding
  if (
    typeof span !== "number" ||
    Number.isNaN(span) ||
    span < 1 ||
    span > 50 ||
    typeof load !== "number" ||
    Number.isNaN(load) ||
    load < 0.5 ||
    load > 100 ||
    typeof material !== "string" ||
    material.length > 60
  ) {
    res.status(400).json({ error: "invalid_payload", message: "Parámetros fuera de rango permitido." });
    return;
  }

  const cleanMaterial = material.replace(/[^\w\s\u00C0-\u017F-]/gi, "").trim();

  const fallback = [
    `Análisis determinista — Luz ${Number(span).toFixed(1)} m,`,
    `carga ${Number(load).toFixed(1)} kN/m², material ${cleanMaterial}.`,
    `Deflexión ${Number(deltaMm ?? 0).toFixed(1)} mm,`,
    `CO₂ embebido ${Number(co2 ?? 0).toFixed(0)} kg por metro de ancho.`,
    `Recomendación: optimizar canto útil de sección y verificar anclajes en sustrato.`,
  ].join(" ");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.json({ text: fallback, source: "fallback" });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = [
      "Eres el motor de análisis del Research Lab de MUNΛRQ,",
      "un despacho de arquitectura eco-brutalista y biophilic.",
      "Devuelve UN párrafo editorial en español, 60–80 palabras,",
      "tono seco y preciso, sin emojis, sin listas, sin Markdown.",
      "Analiza esta viga simplemente apoyada desde lo estructural,",
      "lo bioclimático y el carbono embebido.",
      `Datos: luz ${span} m, carga ${load} kN/m², material ${cleanMaterial},`,
      `deflexión ${deltaMm} mm, CO₂ embebido ${co2} kg por metro de ancho.`,
      "Cierra con UNA recomendación material o de sección.",
    ].join(" ");

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = result.text ?? fallback;
    res.json({ text, source: "gemini" });
  } catch (err) {
    console.error("[analyze] gemini error", err);
    res.json({ text: fallback, source: "fallback" });
  }
});

if (process.env.NODE_ENV === "production") {
  const dist = path.join(process.cwd(), "dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
  app.listen(PORT, () => {
    console.log(`[MUNΛRQ] api on :${PORT} (gemini=${Boolean(process.env.GEMINI_API_KEY)}, strict=${isStrict})`);
  });
}

export { app };


