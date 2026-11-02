export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden bg-onyx"
    >
      <img
        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=2400&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        style={{ filter: "grayscale(1)" }}
      />
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <p className="font-mono text-[10px] tracking-editorial uppercase text-concrete/60 mb-8">
          01 — MUNΛRQ · Biocultural & Computational Architecture
        </p>
        <h1 className="font-serif font-light text-concrete leading-[0.88] text-[clamp(2.75rem,9.5vw,10rem)] text-balance">
          Mineral <span className="italic text-moss-bright">tectonics</span>,
          <br />
          vegetal envelopes.
        </h1>
        <div className="mt-14 grid md:grid-cols-12 gap-8 border-t border-concrete/20 pt-8">
          <p className="md:col-span-6 md:col-start-7 font-sans text-concrete/80 text-sm leading-relaxed max-w-prose">
            Estudio de arquitectura que fusiona hormigón visto, estratos
            vegetales y diseño computacional. Operamos entre la materia y el
            algoritmo, entre el plano y el clima.
          </p>
        </div>
      </div>
    </section>
  );
}
