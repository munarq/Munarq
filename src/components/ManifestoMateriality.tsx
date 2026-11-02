import React, { useState } from 'react';
import { MATERIAL_SAMPLES } from '../data/projectsData';
import { BookOpen, Check } from 'lucide-react';

export const ManifestoMateriality: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_SAMPLES[0]);

  return (
    <section id="manifiesto" className="py-16 sm:py-20 border-b-2 border-[var(--theme-border)] bg-[var(--theme-bg)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[var(--theme-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-dimensioning tracking-widest text-[var(--theme-secondary)] uppercase mb-2">
              <span>SECCIÓN 03</span>
              <span>/</span>
              <span>FILOSOFÍA TECTÓNICA Y CATÁLOGO DE MATERIA MINERAL</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--theme-primary)] tracking-tight">
              Manifiesto & Tectónica Oceánica
            </h2>
          </div>

          <div className="font-dimensioning text-xs text-[var(--theme-secondary)] uppercase tracking-wider">
            [MUNΛRQ // CUADERNO MINERAL]
          </div>
        </div>

        {/* 12-Column Split: Editorial Manifesto (6 cols) + Tactile Materiality Matrix (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 items-stretch">
          
          {/* Editorial Column (6 cols): Cormorant Essay + Lato Prose */}
          <div className="lg:col-span-6 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-10 shadow-brutalist flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-ui font-semibold tracking-wider uppercase text-[var(--theme-muted)]">
                <BookOpen className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>Fragmento del Manifiesto Biocultural</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-medium text-[var(--theme-primary)] tracking-tight leading-tight">
                El Océano no es paisaje; es un co-autor estructural.
              </h3>

              <div className="space-y-4 font-body text-base text-[var(--theme-text)] leading-relaxed">
                <p>
                  Durante más de un siglo, la arquitectura moderna concibió el litoral como un lienzo pasivo: una postal contemplativa para ser enmarcada tras muros cortina de vidrio hermético, defendida con escolleras de roca bruta que terminan siendo pulverizadas por la fuerza del mar.
                </p>
                <blockquote className="font-display text-2xl text-[var(--theme-secondary)] italic border-l-2 border-[var(--theme-border)] pl-4 py-1 leading-snug">
                  "El eco-brutalismo que practicamos en MUNΛRQ desconfía de la ligereza efímera. Cuando el frente costero azota con vientos de temporal y niebla saturada de cloruros, solo la masa monolítica, calibrada con precisión geométrica y química mineral neutra, perdura con dignidad."
                </blockquote>
                <p>
                  Nuestros edificios no luchan contra la pátina salina: la anticipan. Los poros del hormigón puzolánico se convierten en micro-arrecifes que neutralizan la acidez del agua y ofrecen anclaje biológico a especies endémicas. La arquitectura deviene geología viva.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--theme-border)]/20 flex items-center justify-between text-xs font-dimensioning text-[var(--theme-secondary)]">
              <span className="font-bold text-[var(--theme-primary)]">MUNΛRQ ESTUDIO DE ARQUITECTURA</span>
              <span className="text-[var(--theme-muted)]">ENSAYO PUBLICADO EN TECTÓNICA V</span>
            </div>
          </div>

          {/* Tactile Materiality Catalog (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Material Selector Buttons with Inter UI */}
            <div className="grid grid-cols-2 gap-3">
              {MATERIAL_SAMPLES.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`p-3.5 border-2 border-[var(--theme-border)] text-left transition-all flex flex-col justify-between ${
                    selectedMaterial.id === mat.id
                      ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-[var(--theme-card)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-dimensioning tracking-widest">
                    <span>{mat.code}</span>
                    {selectedMaterial.id === mat.id && <Check className="w-3.5 h-3.5 text-[var(--theme-mist)]" />}
                  </div>
                  <span className="font-display text-lg font-medium tracking-tight mt-2 block">
                    {mat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Material Deep Inspection Card */}
            <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-brutalist flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-dimensioning text-[var(--theme-muted)] uppercase pb-3 border-b border-[var(--theme-border)]">
                  <span>{selectedMaterial.code} // FICHA TÉCNICA</span>
                  <span className="text-[var(--theme-primary)] font-bold font-ui">{selectedMaterial.type}</span>
                </div>

                <h4 className="font-display text-3xl font-medium text-[var(--theme-primary)] tracking-tight mt-4">
                  {selectedMaterial.name}
                </h4>

                <p className="font-display text-xl text-[var(--theme-secondary)] italic leading-relaxed mt-2 border-l-2 border-[var(--theme-mist)] pl-3 py-0.5">
                  "{selectedMaterial.tactileTexture}"
                </p>

                {/* Material Metrics List with Swiss 721 BT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs font-dimensioning">
                  <div className="p-3 border border-[var(--theme-border)] bg-[var(--theme-bg)]">
                    <span className="text-[var(--theme-muted)] block text-[10px] uppercase font-ui">Composición Tectónica</span>
                    <span className="font-bold text-[var(--theme-primary)]">{selectedMaterial.composition}</span>
                  </div>

                  <div className="p-3 border border-[var(--theme-border)] bg-[var(--theme-bg)]">
                    <span className="text-[var(--theme-muted)] block text-[10px] uppercase font-ui">Química y Receptividad</span>
                    <span className="font-bold text-[var(--theme-primary)]">PH {selectedMaterial.ph}</span>
                  </div>

                  <div className="p-3 border border-[var(--theme-border)] bg-[var(--theme-bg)]">
                    <span className="text-[var(--theme-muted)] block text-[10px] uppercase font-ui">Durabilidad en Inmersión</span>
                    <span className="font-bold text-[var(--theme-primary)]">{selectedMaterial.lifespan}</span>
                  </div>

                  <div className="p-3 border border-[var(--theme-border)] bg-[var(--theme-bg)]">
                    <span className="text-[var(--theme-muted)] block text-[10px] uppercase font-ui">Captura de Carbono</span>
                    <span className="font-bold text-[var(--theme-primary)]">{selectedMaterial.carbonSaved}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-secondary)]">
                <span>HOMOLOGADO PARA COSTAS DE ALTO IMPACTO (CLASE III-C)</span>
                <span className="font-bold">PROBETA REF: #882</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
