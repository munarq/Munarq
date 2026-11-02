import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/projectsData';
import { Layers, MapPin, Sliders, ArrowUpRight } from 'lucide-react';

interface ProjectPortfolioProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectPortfolio: React.FC<ProjectPortfolioProps> = ({ onSelectProject }) => {
  const [selectedTypology, setSelectedTypology] = useState<string>('all');

  const typologies = [
    { id: 'all', label: 'Todos los Proyectos (04)' },
    { id: 'Benthic Observatory', label: 'Observatorios Bénticos' },
    { id: 'Saline Habitat', label: 'Hábitats Salinos' },
    { id: 'Coastal Monolith', label: 'Monolitos Costeros' },
    { id: 'Parametric Infrastructure', label: 'Infraestructura Paramétrica' }
  ];

  const filteredProjects = selectedTypology === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.typology === selectedTypology);

  return (
    <section id="proyectos" className="py-16 sm:py-20 border-b-2 border-[var(--theme-border)] bg-[var(--theme-bg)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[var(--theme-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-dimensioning tracking-widest text-[var(--theme-secondary)] uppercase mb-2">
              <span>SECCIÓN 01</span>
              <span>/</span>
              <span>DOSSIER TECTÓNICO DE OBRAS SELECCIONADAS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--theme-primary)] tracking-tight">
              Obras y Prototipos Litorales
            </h2>
          </div>

          <p className="font-body text-sm text-[var(--theme-muted)] max-w-md leading-relaxed">
            Cada intervención es un estudio monográfico de resistencia a fluidos marinos, fijación de carbono y simbiosis con la biodiversidad intermareal.
          </p>
        </div>

        {/* Filter Bar using Inter UI */}
        <div className="py-6 flex flex-wrap items-center gap-2 border-b border-[var(--theme-border)]">
          <span className="font-dimensioning text-xs text-[var(--theme-muted)] uppercase tracking-wider mr-2 hidden sm:inline">
            Filtrar Tipología:
          </span>
          {typologies.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTypology(t.id)}
              className={`px-4 py-2 text-xs font-ui font-medium uppercase tracking-wider border-2 border-[var(--theme-border)] transition-all ${
                selectedTypology === t.id
                  ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-[var(--theme-card)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 12-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 pt-10">
          {filteredProjects.map((project) => (
            <article 
              key={project.id}
              className="border-2 border-[var(--theme-border)] bg-[var(--theme-card)] shadow-brutalist flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Visual Viewport with crosshairs */}
                <div className="relative aspect-[4/3] border-b-2 border-[var(--theme-border)] overflow-hidden bg-[var(--theme-primary)]">
                  <div className="absolute top-2 left-2 z-10 font-dimensioning text-[11px] text-white/90 select-none">+</div>
                  <div className="absolute top-2 right-2 z-10 font-dimensioning text-[11px] text-white/90 select-none">+</div>
                  <div className="absolute bottom-2 left-2 z-10 font-dimensioning text-[11px] text-white/90 select-none">+</div>
                  <div className="absolute bottom-2 right-2 z-10 font-dimensioning text-[11px] text-white/90 select-none">+</div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top-Right Technical Tag with Inter */}
                  <div className="absolute top-0 right-0 bg-[var(--theme-primary)] text-white px-3 py-1 font-ui text-[10px] font-semibold tracking-widest uppercase border-l-2 border-b-2 border-[var(--theme-border)]">
                    {project.code}
                  </div>

                  {/* Bottom Strip Overlay with Swiss 721 BT */}
                  <div className="absolute bottom-0 inset-x-0 bg-[var(--theme-primary)]/85 backdrop-blur-xs p-2.5 text-white flex items-center justify-between text-[11px] font-dimensioning tracking-wider uppercase border-t border-[var(--theme-border)]">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-[var(--theme-mist)] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </span>
                    <span className="text-[var(--theme-mist)] shrink-0">{project.year}</span>
                  </div>
                </div>

                {/* Content Dossier Section */}
                <div className="p-6 space-y-4">
                  {/* Clean unboxed metadata with Inter */}
                  <div className="flex items-center gap-2 text-xs font-ui text-[var(--theme-secondary)] tracking-wider">
                    <span>{project.typology}</span>
                    <span aria-hidden="true">/</span>
                    <span className="font-dimensioning">{project.area}</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-[var(--theme-primary)] font-bold">{project.status}</span>
                  </div>

                  {/* Title in Cormorant Medium */}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--theme-primary)] tracking-tight group-hover:text-[var(--theme-secondary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs font-medium text-[var(--theme-secondary)] mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Manifesto Excerpt in Cormorant italic */}
                  <p className="font-display text-base text-[var(--theme-secondary)] italic leading-relaxed border-l-2 border-[var(--theme-mist)] pl-3 py-0.5">
                    "{project.manifestoExcerpt}"
                  </p>

                  {/* Operational description in Lato */}
                  <p className="font-body text-sm text-[var(--theme-muted)] line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technical Telemetry Table using Swiss 721 BT */}
                  <div className="pt-2 border-t border-[var(--theme-border)]/20">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-dimensioning">
                      <div className="p-2 border border-[var(--theme-border)]/30 bg-[var(--theme-bg)]">
                        <span className="text-[var(--theme-muted)] block text-[9px] uppercase font-ui">Balance Carbono</span>
                        <span className="font-bold text-[var(--theme-primary)]">{project.metrics.carbonBalance}</span>
                      </div>
                      <div className="p-2 border border-[var(--theme-border)]/30 bg-[var(--theme-bg)]">
                        <span className="text-[var(--theme-muted)] block text-[9px] uppercase font-ui">Empuje Mareal</span>
                        <span className="font-bold text-[var(--theme-primary)]">{project.metrics.tidalResistance}</span>
                      </div>
                      <div className="p-2 border border-[var(--theme-border)]/30 bg-[var(--theme-bg)]">
                        <span className="text-[var(--theme-muted)] block text-[9px] uppercase font-ui">Masa Específica</span>
                        <span className="font-bold text-[var(--theme-primary)]">{project.metrics.concreteDensity}</span>
                      </div>
                      <div className="p-2 border border-[var(--theme-border)]/30 bg-[var(--theme-bg)]">
                        <span className="text-[var(--theme-muted)] block text-[9px] uppercase font-ui">Bioreceptividad</span>
                        <span className="font-bold text-[var(--theme-primary)]">{project.metrics.porosityIndex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action with Inter UI */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full py-3 bg-[var(--theme-bg)] hover:bg-[var(--theme-primary)] text-[var(--theme-primary)] hover:text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] transition-all flex items-center justify-center gap-2 group-hover:shadow-brutalist-sm"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspeccionar Planimetría y Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blueprint Notation Footnote */}
        <div className="mt-12 p-4 border-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-dimensioning text-[var(--theme-secondary)]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--theme-primary)]" />
            <span>ESTÁNDAR MUNΛRQ: Planos vectoriales normalizados a cota de pleamar equinoccial.</span>
          </div>
          <span className="text-[var(--theme-muted)] uppercase tracking-wider font-ui text-[11px]">
            SISTEMA DE COORDENADAS ETRS89 / UTM 29N
          </span>
        </div>

      </div>
    </section>
  );
};
