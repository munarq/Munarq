import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3001);
const app = express();
app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    gemini: Boolean(process.env.GEMINI_API_KEY),
    ts: new Date().toISOString(),
  });
});

app.post("/api/analyze", async (req, res) => {
  const { span, load, material, co2, deltaMm } = req.body ?? {};
  if (
    typeof span !== "number" ||
    typeof load !== "number" ||
    typeof material !== "string"
  ) {
    res.status(400).json({ error: "invalid_payload" });
    return;
  }

  const fallback = [
    `Análisis determinista — Luz ${Number(span).toFixed(1)} m,`,
    `carga ${Number(load).toFixed(1)} kN/m², material ${material}.`,
    `Deflexión ${Number(deltaMm ?? 0).toFixed(1)} mm,`,
    `CO₂ embebido ${Number(co2 ?? 0).toFixed(0)} kg por metro de ancho.`,
    `Recomendación: ajustar sección antes de fijar el material.`,
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
      `Datos: luz ${span} m, carga ${load} kN/m², material ${material},`,
      `deflexión ${deltaMm} mm, CO₂ embebido ${co2} kg por metro de ancho.`,
      "Cierra con UNA recomendación material o de sección.",
    ].join(" ");

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
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

app.listen(PORT, () => {
  console.log(`[MUNΛRQ] api on :${PORT} (gemini=${Boolean(process.env.GEMINI_API_KEY)})`);
});
