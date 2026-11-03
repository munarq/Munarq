import { Reveal } from "./Reveal";

interface PracticeProps {
  onOpenCommission?: () => void;
}

export function Practice({ onOpenCommission }: PracticeProps) {
  return (
    <section
      id="practice"
      className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-36 border-t border-onyx/15 dark:border-concrete/15"
    >
      {/* ── Section Header ─────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-onyx/20 dark:border-concrete/20 pb-8 mb-16 gap-6">
        <div>
          <div className="w-12 h-1 bg-moss dark:bg-moss-bright mb-4" aria-hidden />
          <span className="font-ui font-semibold text-[10px] tracking-editorial uppercase text-moss dark:text-moss-bright block mb-2">
            03 — Practice
          </span>
          <h2 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl text-onyx dark:text-concrete leading-[0.98] text-balance">
            Un despacho entre <br className="hidden sm:inline" />
            la materia mineral <span className="italic font-light text-moss dark:text-moss-bright">y el algoritmo.</span>
          </h2>
        </div>
        <div className="text-left md:text-right font-mono text-[9px] sm:text-[10px] tracking-wider sm:tracking-editorial uppercase text-carbon dark:text-concrete/60 space-y-1">
          <p>Taller Tectónico · CDMX / Oaxaca</p>
          <p className="text-moss dark:text-moss-bright">Bioclimática · EN 1995-1-1 · LCA A1–A3</p>
        </div>
      </header>

      {/* ── Two-Column Architecture ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* Columna Izquierda — Memoria de Estudio */}
        <div className="md:col-span-7 space-y-6">
          <span className="font-ui font-semibold text-[11px] tracking-[0.16em] uppercase text-carbon dark:text-concrete/70 block">
            Práctica Tectónica & Paisaje Computacional
          </span>

          <Reveal>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-onyx/90 dark:text-concrete/85">
              MUNΛRQ es un estudio de arquitectura y ecología computacional fundado en 2021, con base operativa en la
              Ciudad de México y los valles centrales de Oaxaca. Concebimos la edificación no como un volumen cerrado
              aislado del entorno, sino como un estrato geológico activo: una corteza mineral que responde a la radiación,
              respira con los vientos dominantes y favorece la colonización vegetal espontánea.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-carbon dark:text-concrete/70">
              Operamos en la intersección estricta de tres campos técnicos: la inercia higrotérmica de la materia mineral
              (tapial compactado, piedra caliza concertada, hormigones puzolánicos de bajo clinker), las envolventes
              bioclimáticas autoreguladas y el modelado computacional de deflexión y carbono embebido.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-carbon dark:text-concrete/70">
              Entendemos la arquitectura como un compromiso de descarbonización activa. Cada decisión formal responde a
              requerimientos estructurales y biológicos: inercia de masa térmica, ventilación cruzada espontánea y
              minimización del transporte de áridos hacia obra.
            </p>
          </Reveal>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            {onOpenCommission && (
              <button
                type="button"
                onClick={onOpenCommission}
                className="inline-flex items-center gap-2 px-6 py-3 bg-onyx text-concrete dark:bg-moss dark:text-concrete font-ui text-[10px] tracking-editorial uppercase hover:bg-moss dark:hover:bg-moss-bright transition-colors cursor-pointer"
              >
                Iniciar Encargo // RFP →
              </button>
            )}
            <a
              href="#works"
              className="inline-flex items-center gap-2 px-6 py-3 border border-onyx/20 dark:border-concrete/20 font-ui text-[10px] tracking-editorial uppercase text-onyx dark:text-concrete hover:bg-onyx hover:text-concrete dark:hover:bg-moss transition-colors"
            >
              Consultar Obras Construidas
            </a>
          </div>
        </div>

        {/* Columna Derecha — Ficha Técnica del Despacho (Patrón Tapia) */}
        <div className="md:col-span-5 bg-pure dark:bg-dark-surface border border-onyx/20 dark:border-concrete/20 p-6 sm:p-8">
          <div className="w-12 h-1 bg-moss dark:bg-moss-bright mb-4" aria-hidden />
          <div className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-moss dark:text-moss-bright pb-3 border-b border-onyx/20 dark:border-concrete/20">
            Ficha de Estudio // Canon MUNΛRQ
          </div>

          <dl className="mt-4 space-y-0 text-sm">
            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Fundación
              </dt>
              <dd className="font-ui font-medium text-sm text-onyx dark:text-concrete text-right">
                2021
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Sede principal
              </dt>
              <dd className="font-ui font-medium text-sm text-onyx dark:text-concrete text-right">
                Ciudad de México / Oaxaca
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Equipo técnico
              </dt>
              <dd className="font-ui font-medium text-sm text-onyx dark:text-concrete text-right">
                Arquitectos, ingenieros & botánicos
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Superficie proyectada
              </dt>
              <dd className="font-ui font-medium text-sm text-onyx dark:text-concrete text-right">
                18,400 m² en cartera
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Balance CO₂e objetivo
              </dt>
              <dd className="font-ui font-bold text-sm text-moss dark:text-moss-bright text-right">
                −450 t por proyecto
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b border-onyx/10 dark:border-concrete/10">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Sistemas constructivos
              </dt>
              <dd className="font-ui font-medium text-xs text-onyx dark:text-concrete text-right max-w-[200px]">
                CLT biogénico · Hormigón puzolánico · Tapial
              </dd>
            </div>

            <div className="flex items-baseline justify-between py-2.5 border-b-0">
              <dt className="font-ui text-[11px] tracking-[0.12em] uppercase text-carbon dark:text-concrete/60">
                Laboratorio activo
              </dt>
              <dd className="font-mono text-xs text-onyx dark:text-concrete text-right">
                Research Lab // Transecto
              </dd>
            </div>
          </dl>

          <div className="mt-6 pt-4 border-t border-onyx/15 dark:border-concrete/15 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.18em] text-carbon dark:text-concrete/50">
            <span>LCA SEGÚN EN 15804</span>
            <span>MÓDULOS A1–A3</span>
          </div>
        </div>
      </div>

      {/* ── Detalle Fotográfico Tectónico ─────────────────────────── */}
      <Reveal className="mt-16 border border-onyx/20 dark:border-concrete/20 bg-onyx overflow-hidden">
        <div className="group relative w-full aspect-[21/9] sm:aspect-[24/8] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80&auto=format&fit=crop"
            alt="Materia tectónica de encofrado y corteza mineral - MUNΛRQ Studio"
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
        <div className="px-6 py-3 bg-concrete dark:bg-dark-canvas border-t border-onyx/15 dark:border-concrete/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono uppercase text-carbon dark:text-concrete/60">
          <span>DOCUMENTO MATERIAL // ENCOFRADO DE HORMIGÓN CICLÓPEO CON ÁRIDO BASÁLTICO</span>
          <span>VALLE DE BRAVO · COTA 1,840 MSNM</span>
        </div>
      </Reveal>
    </section>
  );
}
