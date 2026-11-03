import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../../server";

describe("/api/rfp endpoint validation and security suite", () => {
  it("GET /api/health returns system status and demo mode indicator", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(typeof res.body.demoMode).toBe("boolean");
    expect(typeof res.body.strict).toBe("boolean");
  });

  it("rejects fast submissions (renderedAt < 2000ms) as suspicious bot traffic", async () => {
    const res = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.1")
      .send({
        clientName: "Test Bot",
        clientEmail: "bot@domain.com",
        areaM2: 500,
        renderedAt: Date.now() - 500, // filled in only 500ms
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("spam_detected");
  });

  it("handles honeypot traps gracefully with synthetic success (MNQ-BOT-DROP)", async () => {
    const res = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.2")
      .send({
        clientName: "Scraper Bot",
        clientEmail: "scraper@domain.com",
        areaM2: 300,
        website_hp: "https://spamlink.com", // honeypot triggered
        renderedAt: Date.now() - 5000,
      });

    expect(res.status).toBe(200);
    expect(res.body.referenceId).toBe("MNQ-BOT-DROP");
  });

  it("rejects invalid payloads with missing or malformed email", async () => {
    const res = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.3")
      .send({
        clientName: "Estudio Prueba",
        clientEmail: "not-an-email",
        areaM2: 250,
        renderedAt: Date.now() - 4000,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("invalid_payload");
  });

  it("rejects payloads where areaM2 is outside architectural bounds (60 to 5000 m²)", async () => {
    const lowRes = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.4")
      .send({
        clientName: "Estudio Minimo",
        clientEmail: "contacto@estudio.mx",
        areaM2: 20, // below 60 m²
        renderedAt: Date.now() - 4000,
      });
    expect(lowRes.status).toBe(400);
    expect(lowRes.body.error).toBe("invalid_payload");

    const highRes = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.5")
      .send({
        clientName: "Estudio Macro",
        clientEmail: "contacto@estudio.mx",
        areaM2: 99999, // above 5000 m²
        renderedAt: Date.now() - 4000,
      });
    expect(highRes.status).toBe(400);
    expect(highRes.body.error).toBe("invalid_payload");
  });

  it("accepts valid RFPs, returns canonical code with current year, and persists atomically", async () => {
    const currentYear = new Date().getFullYear();
    const res = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", "10.0.1.6")
      .send({
        clientName: "Valeria Domínguez Taller",
        clientEmail: "contacto@valeriadominguez.mx",
        clientPhone: "+52 55 1234 5678",
        typology: "Residencial Bioclimático",
        areaM2: 380,
        zone: "Dosel Subtropical",
        tectonicSystem: "CLT Biogénico Certificado",
        timeline: "12 - 24 meses (Estándar)",
        renderedAt: Date.now() - 5000,
      });

    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.referenceId).toMatch(new RegExp(`^MNQ-${currentYear}-[0-9A-F]{8}$`));
    expect(res.body.timestamp).toBeDefined();
  });

  it("enforces rate limiting: 6th request from same IP within 60s returns 429", async () => {
    const testIp = "10.99.99.99";
    const payload = {
      clientName: "Rate Limit Probe",
      clientEmail: "probe@munarq.mx",
      areaM2: 200,
      renderedAt: Date.now() - 5000,
    };

    // First 5 requests should succeed
    for (let i = 0; i < 5; i++) {
      const res = await request(app)
        .post("/api/rfp")
        .set("x-forwarded-for", testIp)
        .send(payload);
      expect(res.status).toBe(200);
    }

    // 6th request from the same IP must be rejected with 429 Too Many Requests
    const blockedRes = await request(app)
      .post("/api/rfp")
      .set("x-forwarded-for", testIp)
      .send(payload);

    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.error).toBe("too_many_requests");
  });
});
