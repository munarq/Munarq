export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden bg-dark-canvas text-concrete select-none"
    >
      {/* ── Imagen de fondo con overlay calibrado ───────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2400&q=80&auto=format&fit=crop"
          alt="MUNΛRQ Arquitectura Tectónica"
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover filter grayscale brightness-[0.55] contrast-[1.1] pointer-events-none"
        />
        {/* Gradiente vertical de 3 paradas para contraste impecable */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark-canvas via-dark-canvas/75 to-dark-canvas/40 pointer-events-none"
          aria-hidden
        />
      </div>

      {/* ── Retícula Arquitectónica Sutil Tapia (SVG) ───────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-25"
        aria-hidden
      >
        <svg
          className="w-full h-full text-concrete/40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Retícula ortogonal fina */}
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.12"
              />
              <line
                x1="18"
                y1="20"
                x2="22"
                y2="20"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              <line
                x1="20"
                y1="18"
                x2="20"
                y2="22"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            </pattern>

            {/* Módulo estructural mayor */}
            <pattern
              id="hero-major-grid"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <rect width="200" height="200" fill="url(#hero-grid)" />
              <path
                d="M 200 0 L 0 0 0 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.18"
              />
              <path
                d="M 194 200 L 206 200 M 200 194 L 200 206"
                stroke="#61752D"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hero-major-grid)" />

          {/* Ejes arquitectónicos sutiles */}
          <g
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            fill="currentColor"
            opacity="0.35"
          >
            <text x="48" y="90">EJE 01 // CRUJÍA REPLANTEO</text>
            <text x="48" y="105">COTA DE ARRANQUE ±0.00 M</text>
            <line
              x1="40"
              y1="115"
              x2="280"
              y2="115"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />

            {/* Orientación al norte técnico */}
            <g transform="translate(68, 160)">
              <line
                x1="0"
                y1="18"
                x2="0"
                y2="-12"
                stroke="currentColor"
                strokeWidth="1"
              />
              <polygon points="0,-16 -4,-8 4,-8" fill="currentColor" />
              <text x="0" y="32" textAnchor="middle" fontSize="9" fill="#8ba83b">
                N ↑
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* ── Contenido Tipográfico Monumental ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-14 md:pb-20 pt-32">
        {/* Kicker con barra de acento moss */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-1 bg-moss dark:bg-moss-bright" aria-hidden />
          <p className="font-mono text-[10px] tracking-editorial uppercase text-concrete/80 font-semibold">
            01 — MUNΛRQ · Biocultural & Computational Architecture
          </p>
        </div>

        {/* Gran Titular Editorial Cormorant Garamond */}
        <h1 className="font-serif font-light text-concrete leading-[0.88] text-[clamp(2.75rem,9.5vw,10.5rem)] text-balance tracking-tight">
          Mineral <span className="italic font-light text-moss-bright">tectonics</span>,
          <br />
          vegetal envelopes.
        </h1>

        {/* ── Tira de Metadatos y Manifiesto de Entrada ───────────────── */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-concrete/20 pt-8 items-start">
          <div className="md:col-span-5 font-sans text-concrete/85 text-sm leading-relaxed max-w-prose">
            <p>
              Estudio de arquitectura que fusiona hormigón visto, tapial compactado y diseño computacional.
              Operamos en la intersección rigurosa entre la inercia de la materia mineral y el algoritmo biológico.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 md:pt-0 font-ui text-xs border-t md:border-t-0 border-concrete/10">
            <div>
              <span className="font-ui text-[10px] tracking-[0.14em] uppercase text-concrete/50 block mb-1">
                Sede & Emplazamiento
              </span>
              <p className="font-mono text-[11px] text-concrete font-medium uppercase">
                CDMX · Oaxaca
              </p>
              <p className="text-[10px] text-concrete/70 font-sans mt-0.5">
                Valles Centrales & Meseta
              </p>
            </div>

            <div>
              <span className="font-ui text-[10px] tracking-[0.14em] uppercase text-concrete/50 block mb-1">
                Estructura & Carbono
              </span>
              <p className="font-mono text-[11px] text-concrete font-medium uppercase">
                EN 1995-1-1 · LCA
              </p>
              <p className="text-[10px] text-moss-bright font-sans mt-0.5">
                Ciclo de Vida A1–A3
              </p>
            </div>

            <div>
              <span className="font-ui text-[10px] tracking-[0.14em] uppercase text-concrete/50 block mb-1">
                Protocolo de Encargos
              </span>
              <a
                href="#rfp"
                className="font-ui text-[11px] text-concrete hover:text-moss-bright transition-colors uppercase font-medium flex items-center gap-1"
              >
                Pliego RFP 2026 →
              </a>
              <p className="text-[10px] text-concrete/70 font-sans mt-0.5">
                Recepción técnica activa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
