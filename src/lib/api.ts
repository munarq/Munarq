export type AnalyzePayload = {
  span: number;
  load: number;
  material: string;
  co2: number;
  deltaMm: number;
};

export type AnalyzeResponse = {
  text: string;
  source: "gemini" | "fallback";
};

export async function analyzeStructure(
  payload: AnalyzePayload
): Promise<AnalyzeResponse> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return (await res.json()) as AnalyzeResponse;
}

export type CommissionPayload = {
  typology: string;
  areaM2: number;
  timeline: string;
  zone: string;
  tectonicSystem: string;
  environmentalObjective: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  siteLocationNotes?: string;
  website_hp?: string;
  renderedAt?: number;
};

export type CommissionResponse = {
  ok: boolean;
  referenceId: string;
  timestamp: string;
  message?: string;
  requiresEmailDispatch?: boolean;
};

export async function submitCommissionRfp(
  payload: CommissionPayload
): Promise<CommissionResponse> {
  try {
    const res = await fetch("/api/rfp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 503) {
      const data = await res.json().catch(() => null);
      return {
        ok: false,
        referenceId:
          data?.referenceId ||
          `MNQ-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        message: data?.message || "No se pudo garantizar la persistencia del pliego en servidor.",
        requiresEmailDispatch: true,
      };
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `RFP API error ${res.status}`);
    }

    return (await res.json()) as CommissionResponse;
  } catch (err) {
    console.warn("Falling back to direct email dispatch protocol:", err);
    // Deterministic fallback reference
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    return {
      ok: false,
      referenceId: `MNQ-${new Date().getFullYear()}-${randomHex}`,
      timestamp: new Date().toISOString(),
      message: "No se pudo contactar el servidor. Despache su pliego directamente por correo.",
      requiresEmailDispatch: true,
    };
  }
}

