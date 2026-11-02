import { useMemo, useState } from "react";
import { analyzeStructure } from "@/lib/api";
import { Reveal } from "./Reveal";
import { Compass, Sparkles, MapPin } from "lucide-react";

const MATERIALS = {
  concrete: { label: "Hormigón visto", co2: 410, E: 30e9 },
  steel:    { label: "Acero S355",     co2: 1850, E: 210e9 },
  timber:   { label: "Madera CLT",     co2: 120, E: 12e9 },
  stone:    { label: "Piedra local",   co2: 90,  E: 25e9 },
} as const;

type MaterialKey = keyof typeof MATERIALS;

interface SiteZone {
  id: string;
  index: string;
  name: string;
  biome: string;
  coords: string;
  recommendedMaterial: MaterialKey;
  span: number;
  load: number;
  paletteDesc: string;
}

const SITE_ZONES: SiteZone[] = [
  {
    id: "coastal",
    index: "01",
    name: "Litoral Béntico",
    biome: "Costa rocosa de alta salinidad",
    coords: "42.88° N · 9.26° W",
    recommendedMaterial: "concrete",
    span: 12,
    load: 7,
    paletteDesc: "Hormigón puzolánico marino pH 8.4 + Árido de concha biogénica",
  },
  {
    id: "estuary",
    index: "02",
    name: "Humedal Estuárico",
    biome: "Marisma salobre y limos litorales",
    coords: "37.25° N · 6.97° W",
    recommendedMaterial: "stone",
    span: 8,
    load: 4.5,
    paletteDesc: "Caliza bioclástica porosa + Cal hidráulica natural NHL 3.5",
  },
  {
    id: "canopy",
    index: "03",
    name: "Dosel Subtropical",
    biome: "Cuenca fluvial y bosque húmedo",
    coords: "16.87° N · 96.72° W",
    recommendedMaterial: "timber",
    span: 14,
    load: 3.5,
    paletteDesc: "Madera CLT acetilada + Ensambles robóticos de espiga",
  },
  {
    id: "alpine",
    index: "04",
    name: "Macizo Alpino",
    biome: "Batolito granítico de alta insolación",
    coords: "19.20° N · 100.13° W",
    recommendedMaterial: "stone",
    span: 6,
    load: 12,
    paletteDesc: "Granito ciclópeo de cantera + Aislamiento de arcilla expandida",
  },
];

export function ResearchLab() {
  const [span, setSpan] = useState(8);
  const [load, setLoad] = useState(5);
  const [material, setMaterial] = useState<MaterialKey>("concrete");
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<"gemini" | "fallback" | "">("");
  const [activeSite, setActiveSite] = useState<SiteZone>(SITE_ZONES[0]);

  const calc = useMemo(() => {
    const { E, co2: co2PerM3 } = MATERIALS[material];
    const b = 0.3;
    const h = span / 18;
    const A = b * h;
    const I = (b * h ** 3) / 12;
    const q = load * 1000; // N/m (1m strip)
    const L = span;
    const delta = (5 * q * L ** 4) / (384 * E * I);
    const deltaMm = delta * 1000;
    const volume = A * L;
    const co2 = volume * co2PerM3;
    return { h, deltaMm, co2 };
  }, [span, load, material]);

  const norm = Math.min(calc.deltaMm / 30, 1);
  const sag = 6 + norm * 70;
  const W = 400, H = 120;
  const path = `M 0 20 Q ${W / 2} ${20 + sag * 2}, ${W} 20`;

  const handleSelectSite = (zone: SiteZone) => {
    setActiveSite(zone);
    setMaterial(zone.recommendedMaterial);
    setSpan(zone.span);
    setLoad(zone.load);
  };

  async function handleAnalyze() {
    setLoading(true);
    setAnalysis("");
    try {
      const res = await analyzeStructure({
        span,
        load,
        material: MATERIALS[material].label,
        co2: calc.co2,
        deltaMm: calc.deltaMm,
      });
      setAnalysis(res.text);
      setSource(res.source);
    } catch {
      setAnalysis("No se pudo contactar con el motor de análisis.");
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="lab"
      className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40"
    >
      <header className="flex items-end justify-between border-b border-onyx/20 dark:border-concrete/20 pb-6 mb-12">
        <h2 className="font-serif italic font-light text-5xl md:text-7xl text-onyx dark:text-concrete">
          Research Lab
        </h2>
        <span className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
          Structural calculator & site mapping v0.2
        </span>
      </header>

      {/* Lightweight SVG Biocultural Site Mapping Tool */}
      <div className="mb-14 border border-onyx/20 dark:border-concrete/20 p-6 md:p-8 bg-pure dark:bg-dark-surface">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-onyx/10 dark:border-concrete/10 mb-6">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-moss dark:text-moss-bright" />
            <h3 className="font-display text-xs tracking-editorial uppercase text-onyx dark:text-concrete font-bold">
              Biocultural Site Mapping // Perfil de Transecto
            </h3>
          </div>
          <span className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
            {activeSite.coords} · {activeSite.name}
          </span>
        </div>

        {/* Lightweight SVG Map Profile */}
        <div className="py-2">
          <svg viewBox="0 0 600 130" className="w-full h-auto text-onyx dark:text-concrete select-none">
            {/* Base line */}
            <line x1="20" y1="110" x2="580" y2="110" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
            
            {/* Topographical terrain silhouette */}
            <polygon
              points="20,110 30,90 120,80 200,65 300,55 420,40 520,25 580,20 580,110"
              fill="currentColor"
              fillOpacity="0.05"
            />
            <polyline
              points="20,110 30,90 120,80 200,65 300,55 420,40 520,25 580,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* Interactive zone pins on terrain */}
            {SITE_ZONES.map((z, idx) => {
              const xPos = 60 + idx * 150;
              const yPos = 85 - idx * 20;
              const isSelected = activeSite.id === z.id;
              return (
                <g
                  key={z.id}
                  onClick={() => handleSelectSite(z)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r={isSelected ? "6" : "4"}
                    className={isSelected ? "text-moss dark:text-moss-bright" : "text-onyx dark:text-concrete"}
                    fill="currentColor"
                  />
                  {isSelected && (
                    <circle
                      cx={xPos}
                      cy={yPos}
                      r="10"
                      fill="none"
                      stroke="#61752D"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}
                  <text
                    x={xPos}
                    y={yPos - 12}
                    textAnchor="middle"
                    className="font-mono text-[8px] tracking-wider fill-current"
                  >
                    [{z.index}] {z.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Site Zone Selection Bar */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-onyx/10 dark:border-concrete/10">
          {SITE_ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => handleSelectSite(z)}
              className={`p-3 text-left border transition-colors cursor-pointer ${
                activeSite.id === z.id
                  ? "border-onyx bg-concrete dark:border-moss dark:bg-dark-canvas"
                  : "border-onyx/10 dark:border-concrete/10 hover:border-onyx/40 dark:hover:border-concrete/40"
              }`}
            >
              <p className="font-mono text-[9px] text-carbon dark:text-concrete/50 uppercase">
                ZONA [{z.index}]
              </p>
              <p className="font-display text-xs font-bold uppercase text-onyx dark:text-concrete mt-0.5 truncate">
                {z.name}
              </p>
              <p className="font-sans text-[10px] text-moss dark:text-moss-bright mt-1 truncate">
                {z.paletteDesc}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        {/* Controls */}
        <Reveal className="md:col-span-5">
          <div className="space-y-10">
            <Slider
              label="Luz · span"
              value={span}
              min={4}
              max={16}
              step={0.5}
              unit="m"
              onChange={setSpan}
            />
            <Slider
              label="Carga · live load"
              value={load}
              min={2}
              max={20}
              step={0.5}
              unit="kN/m²"
              onChange={setLoad}
            />

            <div>
              <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 mb-3">
                Material Substrate
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(MATERIALS) as MaterialKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setMaterial(k)}
                    className={`px-3 py-3 font-display text-[10px] tracking-editorial uppercase border transition-colors text-left cursor-pointer ${
                      material === k
                        ? "bg-onyx text-concrete border-onyx dark:bg-moss dark:border-moss"
                        : "border-onyx/20 dark:border-concrete/20 text-onyx dark:text-concrete hover:border-moss dark:hover:border-moss-bright"
                    }`}
                  >
                    {MATERIALS[k].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Visualization + outputs */}
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <div className="border border-onyx/20 dark:border-concrete/20 p-6 md:p-8 bg-pure dark:bg-dark-surface">
            <div className="flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-carbon dark:text-concrete/60 mb-4">
              <span>Deflection curve</span>
              <span className="text-moss dark:text-moss-bright">
                L = {span.toFixed(1)} m
              </span>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              aria-hidden
            >
              <line
                x1={0} y1={20} x2={W} y2={20}
                stroke="currentColor" strokeOpacity={0.15}
                className="text-onyx dark:text-concrete"
              />
              <path
                d={path}
                fill="none"
                strokeWidth={2}
                className="text-moss dark:text-moss-bright"
                stroke="currentColor"
              />
              <circle cx={0} cy={20} r={3} fill="currentColor" className="text-onyx dark:text-concrete" />
              <circle cx={W} cy={20} r={3} fill="currentColor" className="text-onyx dark:text-concrete" />
            </svg>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-onyx/20 dark:border-concrete/20 pt-5">
              <Stat label="Deflection" value={`${calc.deltaMm.toFixed(1)} mm`} />
              <Stat label="Section h" value={`${(calc.h * 100).toFixed(0)} cm`} />
              <Stat label="CO₂ emb." value={`${calc.co2.toFixed(0)} kg`} />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 w-full py-4 font-display text-[10px] tracking-editorial uppercase bg-onyx text-concrete dark:bg-moss dark:text-concrete hover:bg-moss dark:hover:bg-moss-bright transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Analizando…" : "Analizar con Gemini"}
            </button>

            {analysis && (
              <div className="mt-6 border-t border-onyx/20 dark:border-concrete/20 pt-5">
                <p className="font-mono text-[9px] tracking-editorial uppercase text-carbon dark:text-concrete/50 mb-2">
                  {source === "gemini" ? "Gemini · análisis" : "Fallback · análisis local"}
                </p>
                <p className="font-sans text-sm leading-relaxed text-onyx dark:text-concrete/80">
                  {analysis}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: {
  label: string; value: number; min: number; max: number;
  step: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
          {label}
        </p>
        <p className="font-mono text-sm text-onyx dark:text-concrete">
          {value.toFixed(1)} <span className="text-[10px] text-carbon dark:text-concrete/50">{unit}</span>
        </p>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-moss dark:accent-moss-bright"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] tracking-editorial uppercase text-carbon dark:text-concrete/50">
        {label}
      </p>
      <p className="font-serif text-2xl mt-1 text-onyx dark:text-concrete">
        {value}
      </p>
    </div>
  );
}
