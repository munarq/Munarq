export const MATERIALS = {
  concrete: { label: "Hormigón visto", co2: 410, E: 30e9 },
  steel:    { label: "Acero S355",     co2: 1850, E: 210e9 },
  timber:   { label: "Madera CLT",     co2: 120, E: 12e9 },
  stone:    { label: "Piedra local",   co2: 90,  E: 25e9 },
} as const;

export type MaterialKey = keyof typeof MATERIALS;

export interface StructuralResult {
  h: number;
  deltaMm: number;
  co2: number;
  volume: number;
}

export function calculateStructuralDeflection(
  span: number,
  load: number,
  material: MaterialKey
): StructuralResult {
  const { E, co2: co2PerM3 } = MATERIALS[material];
  const b = 0.3; // 30cm ancho de viga
  const h = span / 18; // Regla de canto l/18
  const A = b * h;
  const I = (b * Math.pow(h, 3)) / 12;
  const q = load * 1000; // N/m lineal por metro de ancho
  const L = span;
  // Flecha simplemente apoyada con carga uniforme: δ = 5qL^4 / (384 E I)
  const delta = (5 * q * Math.pow(L, 4)) / (384 * E * I);
  const deltaMm = delta * 1000;
  const volume = A * L;
  const co2 = volume * co2PerM3;

  return { h, deltaMm, co2, volume };
}
