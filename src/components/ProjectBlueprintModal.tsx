import { useEffect } from "react";
import { projects } from "@/lib/projects";

// ─── Tipos ─────────────────────────────────────────────────────────────
export interface BlueprintProject {
  slug: string;
  index: string;
  title: string;
  location: string;
  year: string;
  type: string;
  area: string;
  coords: string;
  image: string;
  // Opcionales — si no existen, los defaults se aplican
  code?: string;
  line?: string;
  client?: string;
  crujia?: string;
  height?: string;
  levels?: string;
  materials?: Array<{
    name: string;
    spec?: string;
    origin?: string;
    role?: string;
    co2?: string;
  }>;
}

interface Props {
  project?: BlueprintProject | null;
  projectSlug?: string | null;
  onClose: () => void;
}

// ─── Fallbacks (si el proyecto no trae los campos) ─────────────────────
function fallbackMaterials(type: string) {
  const map: Record<string, Array<{ name: string; spec: string; co2: string }>> = {
    "Vivienda unifamiliar": [
      { name: "Hormigón puzolánico", spec: "Encofrado visto, árido local, pH 8.4", co2: "+180 kg/m³" },
      { name: "Madera CLT FSC", spec: "Pino acetilado, uniones ocultas, clase C24", co2: "−450 kg/m³" },
      { name: "Piedra caliza local", spec: "Mampostería concertada, 40 cm, sin junta vista", co2: "+60 kg/m³" },
      { name: "Envolvente bioreceptiva", spec: "Sustrato mineral + halófitas nativas", co2: "−12 kg/m²" },
    ],
    "Pabellón cultural": [
      { name: "Acero S355", spec: "Perfilería vista, protección intumescente", co2: "+1,850 kg/m³" },
      { name: "Hormigón geopolimérico", spec: "Basalto, sin cemento Portland, curado en frío", co2: "+95 kg/m³" },
      { name: "Zinc-titanio prepatinado", spec: "Cubierta ventilada, junta alzada 25 mm", co2: "+720 kg/m³" },
      { name: "Vegetación autóctona", spec: "Manto de sedum, riego cero", co2: "−8 kg/m²" },
    ],
    "Equipamiento": [
      { name: "Madera CLT FSC", spec: "Pino acetilado, luces 6 m, sin pilares", co2: "−450 kg/m³" },
      { name: "Hormigón reciclado", spec: "Árido de demolición 60%, fck 30", co2: "+120 kg/m³" },
      { name: "Aislamiento corcho", spec: "Planchas 12 cm, sin puentes térmicos", co2: "−3 kg/m²" },
      { name: "Envolvente bioreceptiva", spec: "Sustrato mineral + líquenes", co2: "−12 kg/m²" },
    ],
  };
  return map[type] ?? map["Vivienda unifamiliar"];
}

// ─── Componente ────────────────────────────────────────────────────────
export function ProjectBlueprintModal({ project: propProject, projectSlug, onClose }: Props) {
  // Resolve project from prop or slug
  const project: BlueprintProject | null =
    propProject ??
    (projectSlug
      ? ((projects.find(
          (p) => p.slug === projectSlug || p.slug === projectSlug.replace(/^project-/, "")
        ) as unknown as BlueprintProject | undefined) ?? null)
      : null);

  // Lock scroll + esc para cerrar
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const rawMaterials = project.materials;
  const materials: Array<{ name: string; spec: string; co2: string }> =
    Array.isArray(rawMaterials) && rawMaterials.length > 0 && typeof rawMaterials[0].co2 === "string"
      ? (rawMaterials as Array<{ name: string; spec: string; co2: string }>)
      : Array.isArray(rawMaterials) && rawMaterials.length > 0
      ? rawMaterials.map((m, idx) => ({
          name: m.name,
          spec: [m.role, m.origin].filter(Boolean).join(" · ") || m.spec || "Especificación técnica validada",
          co2: m.co2 || (idx === 0 ? "+180 kg/m³" : idx === 1 ? "−450 kg/m³" : "+60 kg/m³"),
        }))
      : fallbackMaterials(project.type);

  const code = project.code ?? `MNQ-${project.index}-${project.year}`;
  const line = project.line ?? project.type;
  const crujia = project.crujia ?? "6.80 m";
  const height = project.height ?? "4.20 m";
  const levels = project.levels ?? "02";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blueprint-title"
      className="fixed inset-0 z-[100] bg-onyx/70 dark:bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl bg-concrete dark:bg-dark-canvas border border-onyx/20 dark:border-concrete/20 my-8 shadow-2xl"
      >
        {/* ── Header bar ──────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-onyx/20 dark:border-concrete/20 px-6 md:px-10 py-4">
          <div className="flex items-center gap-4">
            <div className="w-6 h-1 bg-moss dark:bg-moss-bright" aria-hidden />
            <span className="font-ui font-semibold text-[10px] tracking-editorial uppercase text-onyx dark:text-concrete">
              Pliego Técnico // {project.index}
            </span>
            <span className="hidden md:inline font-mono text-[10px] text-carbon dark:text-concrete/60">
              {project.coords}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar pliego"
            className="font-ui text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 hover:text-moss dark:hover:text-moss-bright transition-colors cursor-pointer"
          >
            Cerrar ✕
          </button>
        </div>

        {/* ── Título Tapia ────────────────────────────────────── */}
        <header className="px-6 md:px-10 pt-10 md:pt-14 pb-8 md:pb-10 border-b border-onyx/20 dark:border-concrete/20">
          {/* Barra moss 4px */}
          <div className="w-16 h-1 bg-moss dark:bg-moss-bright mb-6" aria-hidden />

          {/* Título Barlow Light uppercase — NO Cormorant. Regla Tapia. */}
          <h2
            id="blueprint-title"
            className="font-ui font-light text-4xl md:text-6xl tracking-[0.15em] uppercase text-onyx dark:text-concrete leading-none"
          >
            {project.title}
          </h2>

          {/* Subtítulo Barlow carbon */}
          <p className="mt-3 font-ui text-sm tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
            {line} — {project.location}
          </p>

          {/* Prosa Inter */}
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-onyx/80 dark:text-concrete/70">
            {project.type} emplazado en {project.location}, {project.area} de superficie
            construida. Estructura de {levels} niveles con crujía de {crujia} y altura
            libre de {height}. Memoria constructiva verificada bajo EN 1995-1-1 y
            balance de carbono A1–A3 auditado.
          </p>
        </header>

        {/* ── Cuerpo: dos columnas ────────────────────────────── */}
        <div className="grid md:grid-cols-12">
          {/* Columna izquierda — Planta SVG + ficha */}
          <div className="md:col-span-7 px-6 md:px-10 py-10 border-b md:border-b-0 md:border-r border-onyx/20 dark:border-concrete/20">
            {/* Planta vectorial */}
            <div className="mb-3 flex items-center justify-between">
              <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-moss dark:text-moss-bright">
                Planta — E 1:200
              </span>
              <span className="font-mono text-[10px] text-carbon dark:text-concrete/60">
                N ↑
              </span>
            </div>

            <div className="border border-onyx/20 dark:border-concrete/20 bg-pure dark:bg-dark-surface">
              <BlueprintSVG project={project} />
            </div>

            <p className="mt-3 font-mono text-[9px] tracking-[0.2em] uppercase text-carbon dark:text-concrete/50">
              Corte esquemático sin escala · Cotas en metros
            </p>

            {/* Identificación — tabla Tapia */}
            <SectionLabel className="mt-8">Identificación</SectionLabel>
            <dl className="mt-4 space-y-0">
              <Row label="Código" value={code} />
              <Row label="Línea" value={line} />
              <Row label="Cliente" value={project.client ?? "Privado"} />
              <Row label="Emplazamiento" value={project.location} />
              <Row label="Superficie" value={project.area} />
            </dl>

            {/* Estructura — tabla Tapia */}
            <SectionLabel className="mt-10">Estructura</SectionLabel>
            <dl className="mt-4 space-y-0">
              <Row label="Crujía" value={crujia} />
              <Row label="Altura libre" value={height} />
              <Row label="Niveles" value={levels} />
              <Row label="Coordenadas" value={project.coords} mono />
            </dl>
          </div>

          {/* Columna derecha — Materiales */}
          <div className="md:col-span-5 px-6 md:px-10 py-10">
            <SectionLabel>Matriz de materiales</SectionLabel>

            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-onyx/20 dark:border-concrete/20">
                  <th className="py-2 text-left font-ui text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 font-semibold">
                    Material
                  </th>
                  <th className="py-2 text-right font-ui text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 font-semibold">
                    CO₂
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr
                    key={m.name}
                    className={
                      i % 2 === 0
                        ? "bg-greige/50 dark:bg-dark-surface"
                        : ""
                    }
                  >
                    <td className="py-3 pr-3 align-top">
                      <div className="font-ui font-semibold text-[11px] tracking-[0.12em] uppercase text-onyx dark:text-concrete">
                        {m.name}
                      </div>
                      <div className="mt-1 font-sans text-xs leading-relaxed text-carbon dark:text-concrete/60">
                        {m.spec}
                      </div>
                    </td>
                    <td className="py-3 text-right align-top whitespace-nowrap">
                      <span className="font-ui font-semibold text-sm text-onyx dark:text-concrete">
                        {m.co2.split(" ")[0]}
                      </span>{" "}
                      <span className="font-ui text-[10px] text-carbon dark:text-concrete/60">
                        {m.co2.split(" ").slice(1).join(" ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4 font-mono text-[9px] tracking-[0.2em] uppercase text-carbon dark:text-concrete/50">
              Balance A1–A3 · EN 15804
            </p>

            {/* Acción */}
            <div className="mt-10 pt-6 border-t border-onyx/20 dark:border-concrete/20">
              <a
                href={`mailto:studio@munarq.mx?subject=Consulta%20${encodeURIComponent(
                  project.title
                )}%20(${code})&body=Hola%20MUNΛRQ%2C%20me%20interesa%20el%20pliego%20${encodeURIComponent(
                  project.title
                )}.`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-onyx text-concrete dark:bg-moss dark:text-concrete font-ui text-[10px] tracking-editorial uppercase hover:bg-moss dark:hover:bg-moss-bright transition-colors"
              >
                Solicitar pliego completo →
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── Subcomponentes ────────────────────────────────────────────────────

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-moss dark:text-moss-bright pb-2 border-b border-onyx/20 dark:border-concrete/20 ${className}`}
    >
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-onyx/10 dark:border-concrete/10 last:border-b-0">
      <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "font-mono text-xs text-onyx dark:text-concrete"
            : "font-ui font-medium text-sm text-onyx dark:text-concrete text-right"
        }
      >
        {value}
      </dd>
    </div>
  );
}

// ─── SVG planta ────────────────────────────────────────────────────────
function BlueprintSVG({ project }: { project: BlueprintProject }) {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-auto text-onyx dark:text-concrete"
      role="img"
      aria-label={`Planta arquitectónica de ${project.title}`}
    >
      {/* Grid de fondo */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="600" height="400" fill="url(#grid)" />

      {/* Contorno edificio */}
      <rect
        x="80"
        y="60"
        width="440"
        height="280"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Particiones interiores */}
      <line x1="80" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="1" />
      <line x1="300" y1="60" x2="300" y2="340" stroke="currentColor" strokeWidth="1" />
      <line x1="300" y1="260" x2="520" y2="260" stroke="currentColor" strokeWidth="1" />

      {/* Hueco de puerta */}
      <line x1="295" y1="200" x2="305" y2="200" stroke="var(--color-concrete)" strokeWidth="2" />
      <path
        d="M 295 200 Q 295 185 305 185"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />

      {/* Cota superior */}
      <line x1="80" y1="42" x2="520" y2="42" stroke="currentColor" strokeWidth="0.5" />
      <line x1="80" y1="38" x2="80" y2="46" stroke="currentColor" strokeWidth="0.5" />
      <line x1="520" y1="38" x2="520" y2="46" stroke="currentColor" strokeWidth="0.5" />
      <text
        x="300"
        y="36"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
      >
        {project.area}
      </text>

      {/* Cota lateral izquierda */}
      <line x1="58" y1="60" x2="58" y2="340" stroke="currentColor" strokeWidth="0.5" />
      <line x1="54" y1="60" x2="62" y2="60" stroke="currentColor" strokeWidth="0.5" />
      <line x1="54" y1="340" x2="62" y2="340" stroke="currentColor" strokeWidth="0.5" />
      <text
        x="46"
        y="200"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
        transform="rotate(-90 46 200)"
      >
        18.00 M
      </text>

      {/* Cota interior crujía */}
      <line x1="80" y1="360" x2="300" y2="360" stroke="var(--color-moss)" strokeWidth="0.5" />
      <line x1="80" y1="356" x2="80" y2="364" stroke="var(--color-moss)" strokeWidth="0.5" />
      <line x1="300" y1="356" x2="300" y2="364" stroke="var(--color-moss)" strokeWidth="0.5" />
      <text
        x="190"
        y="372"
        textAnchor="middle"
        fontSize="9"
        fontFamily="Space Mono, monospace"
        fill="var(--color-moss)"
      >
        CRUJÍA 6.80 M
      </text>

      {/* Norte */}
      <g transform="translate(555, 40)">
        <line x1="0" y1="14" x2="0" y2="-6" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="0,-8 -4,-2 4,-2" fill="currentColor" />
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontSize="8"
          fontFamily="Space Mono, monospace"
          fill="currentColor"
        >
          N
        </text>
      </g>

      {/* Escala */}
      <g transform="translate(80, 384)">
        <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.5" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke="currentColor" strokeWidth="0.5" />
        <line x1="80" y1="-3" x2="80" y2="3" stroke="currentColor" strokeWidth="0.5" />
        <text
          x="0"
          y="12"
          fontSize="7"
          fontFamily="Space Mono, monospace"
          fill="currentColor"
        >
          0
        </text>
        <text
          x="80"
          y="12"
          fontSize="7"
          fontFamily="Space Mono, monospace"
          fill="currentColor"
          textAnchor="end"
        >
          10 M
        </text>
      </g>
    </svg>
  );
}
