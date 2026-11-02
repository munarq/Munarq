import { projects } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function SelectedWorks() {
  return (
    <section
      id="works"
      className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-40"
    >
      <header className="flex items-end justify-between border-b border-onyx/20 dark:border-concrete/20 pb-6 mb-16">
        <h2 className="font-serif italic font-light text-5xl md:text-7xl text-onyx dark:text-concrete">
          Selected works
        </h2>
        <span className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
          2022 — 2025
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {projects.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 80}
            className={p.size === "wide" ? "md:col-span-12" : "md:col-span-6"}
          >
            <a href={`#project-${p.slug}`} className="group block">
              <div
                className={`relative overflow-hidden bg-onyx ${
                  p.size === "wide" ? "aspect-[21/9]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 border-t border-onyx/20 dark:border-concrete/20 pt-4">
                <div>
                  <p className="font-mono text-[10px] tracking-editorial uppercase text-carbon dark:text-concrete/60">
                    {p.index} — {p.type}
                  </p>
                  <h3 className="font-serif text-3xl md:text-4xl font-light mt-2 text-onyx dark:text-concrete group-hover:text-moss dark:group-hover:text-moss-bright transition-colors">
                    {p.title}
                  </h3>
                </div>
                <div className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-carbon dark:text-concrete/60 space-y-1 whitespace-nowrap">
                  <p>{p.location}</p>
                  <p>{p.year}</p>
                  <p>{p.area}</p>
                  <p className="text-moss dark:text-moss-bright">{p.coords}</p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
