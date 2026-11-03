import { Reveal } from "./Reveal";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="bg-greige dark:bg-dark-surface border-y border-onyx/10 dark:border-concrete/10"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
            04 — Manifesto
          </p>
        </div>
        <Reveal className="md:col-span-8 md:col-start-5">
          <p className="font-serif font-light text-3xl md:text-5xl leading-[1.15] text-onyx dark:text-concrete text-balance">
            Construimos <span className="italic text-moss dark:text-moss-bright">con</span> la
            materia, no <span className="italic">contra</span> ella. El hormigón
            es nuestro sustrato; la vegetación, su sintaxis. Cada proyecto se
            negocia con el clima, con el carbono embebido y con la vida que ha
            de habitarlo.
          </p>
          <p className="mt-10 font-sans text-base leading-relaxed text-carbon dark:text-concrete/70 max-w-prose">
            No perseguimos la forma por la forma. Perseguimos el comportamiento:
            cómo se asienta un muro sobre el terreno, cómo respira una fachada,
            cómo envejece un material. La belleza —cuando aparece— es el
            subproducto de una decisión técnica bien tomada.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
