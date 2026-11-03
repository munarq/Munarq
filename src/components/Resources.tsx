import { resources, type Resource } from "@/lib/resources";
import { Reveal } from "./Reveal";

export function Resources() {
  return (
    <section
      id="resources"
      className="border-t border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40">
        {/* ── Encabezado ─────────────────────────────── */}
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-1 bg-moss dark:bg-moss-bright" aria-hidden />
            <p className="font-ui font-semibold text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
              06 — Resources
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h2 className="font-serif font-light text-5xl md:text-7xl text-onyx dark:text-concrete leading-[0.95] text-balance">
                Herramientas técnicas para el{" "}
                <span className="italic text-moss dark:text-moss-bright">
                  despacho contemporáneo
                </span>
                .
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="font-sans text-sm leading-relaxed text-carbon dark:text-concrete/70">
                Recursos desarrollados internamente por MUNΛRQ para la
                práctica propia. Plantillas, automatizaciones BIM, motores de
                cálculo y matrices normativas — auditados y documentados.
              </p>
            </div>
          </div>
        </header>

        {/* ── Lista editorial ────────────────────────── */}
        <div className="border-t border-onyx/20 dark:border-concrete/20">
          {resources.map((resource, i) => (
            <ResourceRow
              key={resource.slug}
              resource={resource}
              reversed={i % 2 === 1}
              isLast={i === resources.length - 1}
            />
          ))}
        </div>

        {/* ── Nota inferior ──────────────────────────── */}
        <footer className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-onyx/20 dark:border-concrete/20">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-carbon dark:text-concrete/50">
            Todos los recursos incluyen licencia de uso único · Soporte vía studio@munarq.mx
          </p>
          <a
            href="mailto:studio@munarq.mx?subject=Consulta%20recursos%20MUNΛRQ"
            className="font-ui font-semibold text-[10px] tracking-editorial uppercase text-moss dark:text-moss-bright hover:underline underline-offset-4"
          >
            Consultar licencias extendidas →
          </a>
        </footer>
      </div>
    </section>
  );
}

// ─── Fila de recurso ──────────────────────────────────────────────────

function ResourceRow({
  resource,
  reversed,
  isLast,
}: {
  resource: Resource;
  reversed: boolean;
  isLast: boolean;
}) {
  return (
    <Reveal>
      <article
        className={`grid md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16 ${
          isLast ? "" : "border-b border-onyx/15 dark:border-concrete/15"
        }`}
      >
        {/* Preview — col 1-6 (o 7-12 si reversed) */}
        <div
          className={`md:col-span-6 ${reversed ? "md:order-2 md:col-start-7" : ""}`}
        >
          <ResourcePreview resource={resource} />
        </div>

        {/* Ficha — col 7-12 (o 1-6 si reversed) */}
        <div
          className={`md:col-span-5 flex flex-col ${
            reversed ? "md:order-1 md:col-start-1" : "md:col-start-7"
          }`}
        >
          {/* Header: index + format chip + versión */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-carbon dark:text-concrete/60">
              {resource.index}
            </span>
            <span
              className={`font-ui font-semibold text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border ${
                resource.status === "available"
                  ? "border-moss dark:border-moss-bright text-moss dark:text-moss-bright"
                  : "border-carbon/40 dark:border-concrete/30 text-carbon dark:text-concrete/60"
              }`}
            >
              {resource.format}
            </span>
            <span className="font-mono text-[10px] text-carbon dark:text-concrete/50">
              {resource.version}
            </span>
          </div>

          {/* Título serif */}
          <h3 className="font-serif italic font-light text-3xl md:text-4xl leading-tight text-onyx dark:text-concrete">
            {resource.title}
          </h3>

          {/* Subtítulo Barlow */}
          <p className="mt-2 font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
            {resource.subtitle}
          </p>

          {/* Descripción Inter */}
          <p className="mt-5 font-sans text-sm leading-relaxed text-onyx/80 dark:text-concrete/70">
            {resource.description}
          </p>

          {/* Specs — filas Tapia */}
          <dl className="mt-6 space-y-0 border-t border-onyx/15 dark:border-concrete/15">
            {resource.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between py-2 border-b border-onyx/10 dark:border-concrete/10"
              >
                <dt className="font-ui text-[10px] tracking-[0.14em] uppercase text-carbon dark:text-concrete/60">
                  {spec.label}
                </dt>
                <dd className="font-ui font-medium text-xs text-onyx dark:text-concrete text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Precio + CTA */}
          <div className="mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-ui font-semibold text-[9px] tracking-[0.18em] uppercase text-moss dark:text-moss-bright mb-1">
                {resource.status === "available" ? "Adquisición" : "Tarifa de lanzamiento"}
              </p>
              <p className="font-mono text-2xl text-onyx dark:text-concrete whitespace-nowrap">
                ${resource.priceMXN.toLocaleString("es-MX")}
                <span className="text-xs text-carbon dark:text-concrete/60 ml-1">
                  MXN
                </span>
              </p>
            </div>

            {resource.status === "available" ? (
              <a
                href={resource.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-onyx text-concrete dark:bg-moss dark:text-concrete font-ui font-semibold text-[10px] tracking-editorial uppercase hover:bg-moss dark:hover:bg-moss-bright transition-colors whitespace-nowrap"
              >
                Adquirir →
              </a>
            ) : (
              <a
                href={`mailto:${resource.waitlistEmail ?? "studio@munarq.mx"}?subject=Lista%20de%20espera%20·%20${encodeURIComponent(resource.title)}`}
                className="inline-flex items-center gap-2 px-5 py-3 border border-onyx/40 dark:border-concrete/40 text-onyx dark:text-concrete font-ui font-semibold text-[10px] tracking-editorial uppercase hover:border-moss hover:text-moss dark:hover:border-moss-bright dark:hover:text-moss-bright transition-colors whitespace-nowrap"
              >
                Lista de espera →
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// ─── Preview por formato ──────────────────────────────────────────────

function ResourcePreview({ resource }: { resource: Resource }) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden border border-onyx/20 dark:border-concrete/20 bg-pure dark:bg-dark-surface group">
      {resource.image ? (
        <img
          src={resource.image}
          alt={resource.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <FormatSpecimen format={resource.format} version={resource.version} />
      )}
    </div>
  );
}

function FormatSpecimen({
  format,
  version,
}: {
  format: Resource["format"];
  version: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full text-onyx dark:text-concrete"
        aria-hidden
      >
        {format === "EXCEL" && <ExcelSpecimen />}
        {format === "BIM" && <BimSpecimen />}
        {format === "WEB TOOL" && <WebToolSpecimen />}
        {format === "DOCUMENTO" && <DocumentSpecimen />}
      </svg>
      <span className="absolute bottom-3 right-3 font-mono text-[9px] text-carbon dark:text-concrete/40">
        {version}
      </span>
    </div>
  );
}

// BOH — hoja de cálculo
function ExcelSpecimen() {
  const cols = ["A", "B", "C", "D", "E"];
  const rows = 8;
  return (
    <g>
      {/* Header de columnas */}
      {cols.map((c, i) => (
        <text
          key={c}
          x={60 + i * 60}
          y={30}
          fontSize="9"
          fontFamily="Space Mono, monospace"
          fill="currentColor"
          opacity="0.5"
          textAnchor="middle"
        >
          {c}
        </text>
      ))}
      {/* Grid */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="40"
          y1={40 + i * 24}
          x2="340"
          y2={40 + i * 24}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="0.5"
        />
      ))}
      {cols.map((_, i) => (
        <line
          key={`v${i}`}
          x1={40 + i * 60}
          y1="40"
          x2={40 + i * 60}
          y2={40 + rows * 24}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="0.5"
        />
      ))}
      {/* Celdas con datos */}
      {[
        [1, 0], [2, 0], [3, 0],
        [1, 1], [3, 1],
        [1, 2], [2, 2], [3, 2],
        [1, 4], [3, 4],
        [1, 5], [2, 5], [3, 5],
      ].map(([cx, cy], i) => (
        <rect
          key={i}
          x={40 + cx * 60 + 2}
          y={40 + cy * 24 + 2}
          width="56"
          height="20"
          fill="currentColor"
          fillOpacity="0.08"
        />
      ))}
      {/* Celda moss destacada */}
      <rect
        x={40 + 3 * 60 + 2}
        y={40 + 6 * 24 + 2}
        width="56"
        height="20"
        fill="#61752D"
        fillOpacity="0.85"
      />
      {/* Anotación */}
      <text
        x="40"
        y="270"
        fontSize="8"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
        opacity="0.6"
      >
        NEC 220.56 · NOM-093-SSA1
      </text>
    </g>
  );
}

// QTO — isométrico BIM
function BimSpecimen() {
  return (
    <g>
      {/* Isometric box */}
      <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9">
        <path d="M 100 140 L 180 100 L 260 140 L 180 180 Z" />
        <path d="M 100 140 L 100 220 L 180 260 L 180 180" />
        <path d="M 180 180 L 260 220 L 260 140" />
        {/* Columnas */}
        <line x1="130" y1="120" x2="130" y2="200" opacity="0.4" strokeDasharray="2,3" />
        <line x1="210" y1="120" x2="210" y2="200" opacity="0.4" strokeDasharray="2,3" />
        {/* Nivel */}
        <path d="M 100 180 L 180 220 L 260 180" opacity="0.3" strokeDasharray="2,3" />
      </g>
      {/* Arrows + tabla de extracción */}
      <g stroke="#61752D" strokeWidth="1" fill="none">
        <path d="M 270 140 L 320 140" markerEnd="url(#bim-arrow)" />
      </g>
      <defs>
        <marker
          id="bim-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#61752D" />
        </marker>
      </defs>
      {/* Mini tabla */}
      <g fontFamily="Space Mono, monospace" fontSize="7" fill="currentColor" opacity="0.6">
        <text x="315" y="125">QTO</text>
        <text x="315" y="145">m³  12.4</text>
        <text x="315" y="158">m²  86.2</text>
        <text x="315" y="171">kg  428</text>
      </g>
      {/* Anotación */}
      <text
        x="40"
        y="285"
        fontSize="8"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
        opacity="0.6"
      >
        Revit → Dynamo → CSV
      </text>
    </g>
  );
}

// Web tool — browser frame con sliders
function WebToolSpecimen() {
  return (
    <g>
      {/* Browser frame */}
      <rect
        x="40"
        y="60"
        width="320"
        height="180"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      {/* Top bar */}
      <line x1="40" y1="80" x2="360" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      {[52, 62, 72].map((x, i) => (
        <circle key={i} cx={x} cy={70} r="2" fill="currentColor" opacity="0.4" />
      ))}
      {/* Sliders */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line
            x1="60"
            y1={105 + i * 40}
            x2="340"
            y2={105 + i * 40}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <circle
            cx={60 + [160, 200, 120][i]}
            cy={105 + i * 40}
            r="4"
            fill={i === 1 ? "#61752D" : "currentColor"}
            opacity={i === 1 ? "1" : "0.7"}
          />
          <text
            x="60"
            y={100 + i * 40}
            fontSize="7"
            fontFamily="Space Mono, monospace"
            fill="currentColor"
            opacity="0.6"
          >
            {["AFORO", "ESCALERA", "CARGAS"][i]}
          </text>
        </g>
      ))}
      {/* Output */}
      <text
        x="40"
        y="265"
        fontSize="9"
        fontFamily="Space Mono, monospace"
        fill="#61752D"
        fontWeight="700"
      >
        128 pax · OK
      </text>
      <text
        x="40"
        y="282"
        fontSize="8"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
        opacity="0.5"
      >
        No server · No DB · Offline
      </text>
    </g>
  );
}

// Matriz — documento tabulado
function DocumentSpecimen() {
  const rows = 6;
  const cols = 4;
  const cellW = 60;
  const cellH = 22;
  const x0 = 100;
  const y0 = 70;
  return (
    <g>
      {/* Documento */}
      <rect
        x={x0 - 10}
        y={y0 - 10}
        width={cols * cellW + 20}
        height={rows * cellH + 20}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      {/* Grid */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={x0}
          y1={y0 + i * cellH}
          x2={x0 + cols * cellW}
          y2={y0 + i * cellH}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={x0 + i * cellW}
          y1={y0}
          x2={x0 + i * cellW}
          y2={y0 + rows * cellH}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="0.5"
        />
      ))}
      {/* Celdas coloreadas — verde/neutral */}
      {[
        [1, 1], [2, 1],
        [1, 2],
        [2, 3], [3, 3],
        [1, 4], [3, 4],
      ].map(([cx, cy], i) => (
        <rect
          key={i}
          x={x0 + cx * cellW + 1}
          y={y0 + cy * cellH + 1}
          width={cellW - 2}
          height={cellH - 2}
          fill={i % 3 === 0 ? "#61752D" : "currentColor"}
          fillOpacity={i % 3 === 0 ? "0.8" : "0.1"}
        />
      ))}
      {/* Anotación */}
      <text
        x="40"
        y="270"
        fontSize="8"
        fontFamily="Space Mono, monospace"
        fill="currentColor"
        opacity="0.6"
      >
        NOM-020-ENER-2011 · LEED v5
      </text>
    </g>
  );
}
