export function Footer({
  onOpenCommission,
}: {
  onOpenCommission?: () => void;
}) {
  return (
    <footer
      id="contact"
      className="border-t border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="font-display font-bold text-sm tracking-editorial uppercase text-onyx dark:text-concrete">
            MUNΛRQ
          </p>
          <p className="mt-6 font-serif italic font-light text-3xl md:text-4xl leading-tight text-onyx dark:text-concrete max-w-sm">
            Architecture that negotiates with the climate.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            {onOpenCommission && (
              <button
                onClick={onOpenCommission}
                className="px-6 py-3 bg-onyx text-concrete dark:bg-moss dark:text-concrete font-mono text-xs uppercase tracking-wider hover:bg-moss hover:text-white dark:hover:bg-moss/80 transition-colors cursor-pointer text-center"
              >
                Iniciar Encargo // RFP →
              </button>
            )}
            <a
              href="mailto:studio@munarq.mx"
              className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-moss dark:text-moss-bright hover:underline underline-offset-4"
            >
              studio@munarq.mx →
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 mb-4">
            Values
          </p>
          <ul className="space-y-2 font-sans text-sm text-onyx dark:text-concrete/80">
            <li>Eco-Brutalism</li>
            <li>Biophilic Design</li>
            <li>Embodied Carbon</li>
            <li>Computational Tectonics</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60 mb-4">
            Aesthetic
          </p>
          <p className="font-sans text-sm leading-relaxed text-carbon dark:text-concrete/70 max-w-xs">
            Concrete White · Onyx Black · Moss Green. Cormorant, Barlow,
            Inter, Space Mono. Square corners. No shadows. One-pixel lines.
          </p>
          <p className="mt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-carbon dark:text-concrete/40">
            © {new Date().getFullYear()} MUNΛRQ · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
