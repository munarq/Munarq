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
