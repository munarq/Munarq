import React, { useEffect } from "react";
import { X, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

interface ProjectBlueprintModalProps {
  projectSlug: string | null;
  onClose: () => void;
}

export const ProjectBlueprintModal: React.FC<ProjectBlueprintModalProps> = ({
  projectSlug,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!projectSlug) return null;

  const project: Project | undefined = projects.find(
    (p) => p.slug === projectSlug || `project-${p.slug}` === projectSlug
  );

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-onyx/85 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-pure dark:bg-dark-surface border border-onyx/20 dark:border-concrete/20 my-auto flex flex-col max-h-[92vh] overflow-hidden text-onyx dark:text-concrete"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold px-2 py-1 bg-onyx text-concrete dark:bg-moss dark:text-concrete uppercase tracking-wider">
              PLIEGO TÉCNICO // {project.index}
            </span>
            <div>
              <h3 id="modal-title" className="font-serif text-2xl md:text-3xl font-light">
                {project.title}
              </h3>
              <p className="font-mono text-[10px] text-carbon dark:text-concrete/60 uppercase tracking-wider">
                {project.location} · {project.year} · {project.type}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-onyx/20 dark:border-concrete/20 hover:bg-onyx hover:text-concrete dark:hover:bg-moss transition-colors cursor-pointer"
            aria-label="Cerrar pliego"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 bg-pure dark:bg-dark-surface">
          {/* Main Visual */}
          <div className="w-full aspect-[21/9] border border-onyx/20 dark:border-concrete/20 overflow-hidden bg-onyx">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Blueprint SVG Vector Plan */}
          <div className="border border-onyx/20 dark:border-concrete/20 p-6 bg-concrete dark:bg-dark-canvas space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-carbon dark:text-concrete/60 uppercase pb-2 border-b border-onyx/20 dark:border-concrete/20">
              <span className="flex items-center gap-2 font-bold text-onyx dark:text-concrete">
                <Layers className="w-4 h-4 text-moss dark:text-moss-bright" />
                <span>PLANTA ESTRUCTURAL VECTORIAL // {project.span}</span>
              </span>
              <span>{project.datum}</span>
            </div>

            <div className="py-4 flex justify-center">
              <svg viewBox="0 0 600 220" className="w-full max-w-2xl h-auto font-mono text-[9px]">
                {/* Structural Grid */}
                <line x1="20" y1="20" x2="580" y2="20" stroke="currentColor" strokeDasharray="3 3" opacity="0.25" />
                <line x1="20" y1="200" x2="580" y2="200" stroke="currentColor" strokeDasharray="3 3" opacity="0.25" />
                <line x1="20" y1="20" x2="20" y2="200" stroke="currentColor" strokeDasharray="3 3" opacity="0.25" />
                <line x1="580" y1="20" x2="580" y2="200" stroke="currentColor" strokeDasharray="3 3" opacity="0.25" />

                {/* Primary Hall */}
                <rect x="50" y="45" width="230" height="130" fill="none" stroke="currentColor" strokeWidth="1.75" />
                <text x="70" y="105" fill="currentColor" fontWeight="bold">01 — CRUJÍA PRIMARIA</text>
                <text x="70" y="120" fill="currentColor" opacity="0.6">{project.area} // ENCOFRADO TECTÓNICO</text>

                {/* Vegetal Envelopes & Buffer */}
                <rect x="295" y="45" width="130" height="130" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="4 2" />
                <text x="310" y="105" fill="currentColor" fontWeight="bold">02 — BUFFER VEGETAL</text>
                <text x="310" y="120" fill="currentColor" opacity="0.6">CÁMARA DE FILTRACIÓN</text>

                {/* Cantilever / Wing */}
                <polygon points="440,45 545,75 545,145 440,175" fill="none" stroke="#61752D" strokeWidth="1.75" />
                <text x="450" y="115" fill="#61752D" fontWeight="bold">VOLADIZO TÉCNICO</text>

                {/* Dimension Line */}
                <line x1="50" y1="32" x2="545" y2="32" stroke="currentColor" strokeWidth="1" />
                <text x="297" y="27" fill="currentColor" textAnchor="middle">{project.span}</text>
              </svg>
            </div>
          </div>

          {/* Description & Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-editorial text-carbon dark:text-concrete/60 mb-3">
                Memoria Constructiva
              </h4>
              <p className="font-sans text-carbon dark:text-concrete/80 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 pt-4 border-t border-onyx/10 dark:border-concrete/10">
                <p className="font-mono text-[10px] text-carbon dark:text-concrete/60 uppercase">
                  Sistema portante:
                </p>
                <p className="font-sans text-xs font-semibold text-onyx dark:text-concrete mt-0.5">
                  {project.system}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-editorial text-carbon dark:text-concrete/60 mb-3">
                Matriz de Materiales Bioculturales
              </h4>
              <div className="space-y-3">
                {project.materials.map((m, idx) => (
                  <div key={idx} className="pb-2.5 border-b border-onyx/10 dark:border-concrete/10">
                    <div className="flex justify-between items-baseline">
                      <span className="font-display text-xs font-bold text-onyx dark:text-concrete uppercase">
                        {m.name}
                      </span>
                      <span className="font-mono text-[9px] text-moss dark:text-moss-bright uppercase">
                        {m.role}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-carbon dark:text-concrete/70 mt-0.5">
                      Procedencia: {m.origin}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 flex justify-between font-mono text-[10px] uppercase">
                <span className="text-carbon dark:text-concrete/60">Indicador carbono:</span>
                <span className="text-moss dark:text-moss-bright font-bold">{project.carbonMetric}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-onyx/20 dark:border-concrete/20 bg-concrete dark:bg-dark-canvas">
          <div className="flex items-center gap-2 text-xs font-mono text-carbon dark:text-concrete/60">
            <CheckCircle2 className="w-4 h-4 text-moss dark:text-moss-bright" />
            <span>Documento técnico normalizado MUNΛRQ · {project.coords}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-onyx text-concrete dark:bg-moss dark:text-concrete font-display text-[10px] tracking-editorial uppercase hover:bg-moss dark:hover:bg-moss-bright transition-colors text-center"
            >
              <span>Comisionar Proyecto Similar</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2.5 border border-onyx/20 dark:border-concrete/20 font-display text-[10px] tracking-editorial uppercase hover:bg-concrete dark:hover:bg-dark-surface transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
