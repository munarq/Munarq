import React, { useState } from 'react';
import { ARCHITECTURE_WEB_RECOMMENDATIONS, ARCHITECTURAL_WEB_CHECKLIST } from '../data/recommendationsData';
import { CheckSquare, Square, Copy, Check, Terminal } from 'lucide-react';

export const WebRecommendationsSection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(ARCHITECTURE_WEB_RECOMMENDATIONS[0].id);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'chk-1': true,
    'chk-2': true,
    'chk-3': true,
    'chk-6': true,
  });
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const selectedPillar = ARCHITECTURE_WEB_RECOMMENDATIONS.find(p => p.id === selectedPillarId) || ARCHITECTURE_WEB_RECOMMENDATIONS[0];

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyBlueprintMarkdown = () => {
    const md = `# GUÍA DE ESPECIFICACIÓN WEB: MUNΛRQ ARQUITECTURA
ESTILO: Biocultural Oceanic Eco-Brutalism
PALETA: Biocultural Oceanic / Nord / Solarized Light
ESTÁNDAR TIPOGRÁFICO:
- Cormorant Medium (500): Títulos principales y visualización de gran escala
- Inter: Bloques de código, etiquetas de estado, chips y elementos de UI
- Swiss 721 BT: Cotas técnicas, dimensiones y telemetría de replanteo
- Lato: Cuerpo de texto, memorias y descripciones operativas

1. PRINCIPIOS TECTÓNICOS:
- Cero radios en contenedores e interactivos (rounded-none).
- Desplazamientos duros ortogonales (box-shadow: 4px 4px 0px).
- Cruces de cota y líneas de replanteo continuas de 2px.

2. ESTRUCTURA DEL DOSSIER:
- Fotografía de obra construida en 4:3 o 16:9 con luz natural.
- Planimetría vectorial en SVG con cotas y niveles reales.
- Matriz biocultural de materiales (procedencia, pH, bioreceptividad).

3. EXPERIENCIA Y CONVERSIÓN:
- Simulador paramétrico interactivo de fluidos y carrera de marea.
- Configurador de encargos con cálculo de m² y programa arquitectónico.
- Contrato estricto de cabecera de 3 zonas sin sobrecarga.
`;
    navigator.clipboard.writeText(md);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <section id="recomendaciones" className="py-16 sm:py-20 border-b-2 border-[var(--theme-border)] bg-[var(--theme-card)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[var(--theme-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-dimensioning tracking-widest text-[var(--theme-secondary)] uppercase mb-2">
              <span>SECCIÓN 05</span>
              <span>/</span>
              <span>CONSULTORÍA & RECOMENDACIONES ESTRATÉGICAS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--theme-primary)] tracking-tight">
              Recomendaciones para la Web del Estudio
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyBlueprintMarkdown}
              className="px-4 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] shadow-brutalist-sm transition-all flex items-center gap-2"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-4 h-4 text-[var(--theme-tint)]" />
                  <span>Especificación Copiada</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Blueprint Web (MD)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
          
          {/* Pillar Selector Sidebar (4 cols) using Inter UI */}
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <span className="font-dimensioning text-xs text-[var(--theme-muted)] uppercase tracking-wider mb-2 block">
              Pilares de Diseño y Estructura Digital:
            </span>
            {ARCHITECTURE_WEB_RECOMMENDATIONS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 border-2 border-[var(--theme-border)] text-left transition-all flex items-center justify-between group ${
                  selectedPillarId === pillar.id
                    ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm translate-x-1'
                    : 'bg-[var(--theme-bg)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span className={`font-dimensioning text-xs font-bold ${
                    selectedPillarId === pillar.id ? 'text-[var(--theme-tint)]' : 'text-[var(--theme-secondary)]'
                  }`}>
                    [{pillar.number}]
                  </span>
                  <div className="truncate">
                    <span className="font-display text-lg font-medium tracking-tight block truncate">
                      {pillar.title}
                    </span>
                    <span className={`font-ui text-[10px] uppercase tracking-wider block ${
                      selectedPillarId === pillar.id ? 'text-[var(--theme-mist)]' : 'text-[var(--theme-muted)]'
                    }`}>
                      {pillar.tag}
                    </span>
                  </div>
                </div>
                <span className="font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Detailed Examination (8 cols) */}
          <div className="lg:col-span-8 border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-6 sm:p-8 shadow-brutalist flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Pillar Title Banner */}
              <div className="border-b-2 border-[var(--theme-border)] pb-4">
                <div className="flex items-center justify-between text-xs font-dimensioning text-[var(--theme-muted)] uppercase">
                  <span>PILAR ESTRATÉGICO {selectedPillar.number}</span>
                  <span className="bg-[var(--theme-surface)] text-[var(--theme-primary)] px-2 py-0.5 border border-[var(--theme-border)] font-bold font-ui text-[11px]">
                    {selectedPillar.tag}
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-medium text-[var(--theme-primary)] tracking-tight mt-2">
                  {selectedPillar.title}
                </h3>
                <p className="font-body text-sm font-medium text-[var(--theme-secondary)] mt-1">
                  {selectedPillar.subtitle}
                </p>
              </div>

              {/* Summary and Rationale in Lato */}
              <div className="space-y-4">
                <p className="font-body text-base text-[var(--theme-text)] leading-relaxed">
                  {selectedPillar.summary}
                </p>

                <div className="border-l-2 border-[var(--theme-border)] pl-4 py-1 bg-[var(--theme-surface)] p-3">
                  <span className="font-ui text-[11px] text-[var(--theme-primary)] uppercase font-bold block mb-1">
                    Impacto en Clientes Institucionales y Concursos:
                  </span>
                  <p className="font-body text-sm text-[var(--theme-muted)] leading-relaxed">
                    {selectedPillar.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Anti-Pattern vs. Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                <div className="p-4 border-2 border-[#ba1a1a] bg-[#ffdad6]/20">
                  <span className="font-ui text-[10px] text-[#ba1a1a] font-bold uppercase block mb-1">
                    ✕ Lo que destruye la credibilidad del estudio (Anti-Patrón):
                  </span>
                  <p className="text-[var(--theme-muted)] leading-relaxed">
                    {selectedPillar.antiPattern}
                  </p>
                </div>

                <div className="p-4 border-2 border-[var(--theme-border)] bg-[var(--theme-surface)]">
                  <span className="font-ui text-[10px] text-[var(--theme-primary)] font-bold uppercase block mb-1">
                    ✓ La solución adoptada en esta web (Recomendación):
                  </span>
                  <p className="text-[var(--theme-text)] leading-relaxed">
                    {selectedPillar.solution}
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="pt-2">
                <span className="font-ui text-xs font-bold text-[var(--theme-primary)] uppercase tracking-wider block mb-3">
                  Reglas de Verificación Técnica:
                </span>
                <ul className="space-y-2">
                  {selectedPillar.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-body text-[var(--theme-muted)]">
                      <span className="font-dimensioning text-[var(--theme-primary)] font-bold">[{idx + 1}]</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet rendered in Inter */}
              {selectedPillar.codeSnippet && (
                <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-primary)] p-4 text-white font-ui text-xs overflow-x-auto">
                  <div className="flex items-center justify-between text-[10px] text-[var(--theme-mist)] uppercase pb-2 border-b border-white/20 mb-2">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Implementación CSS / HTML (Inter Code Block)</span>
                    </span>
                    <span className="font-dimensioning">STANDARDS</span>
                  </div>
                  <pre className="text-[11px] leading-relaxed text-[var(--theme-tint)]">{selectedPillar.codeSnippet}</pre>
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-[var(--theme-border)]/20 flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-muted)]">
              <span>GUÍA DISEÑADA PARA: MUNΛRQ STUDIO</span>
              <span className="text-[var(--theme-primary)] font-bold font-ui">NORMATIVA WEB 2026</span>
            </div>
          </div>

        </div>

        {/* Global Architectural Web Readiness Checklist */}
        <div className="mt-12 border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-6 sm:p-8 shadow-brutalist">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-[var(--theme-border)]">
            <div>
              <span className="font-dimensioning text-xs text-[var(--theme-muted)] uppercase tracking-widest block mb-1">
                CHECKLIST DE VERIFICACIÓN PRE-LANZAMIENTO
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--theme-primary)] tracking-tight">
                Auditoría de Calidad para la Web del Estudio
              </h3>
            </div>
            <div className="font-dimensioning text-xs text-[var(--theme-primary)] bg-[var(--theme-surface)] px-3 py-1.5 border border-[var(--theme-border)] font-bold">
              {Object.values(completedTasks).filter(Boolean).length} DE {ARCHITECTURAL_WEB_CHECKLIST.length} REQUISITOS ACTIVOS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {ARCHITECTURAL_WEB_CHECKLIST.map((task) => {
              const isChecked = !!completedTasks[task.id];
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 border-2 border-[var(--theme-border)] flex items-start gap-3 cursor-pointer transition-all ${
                    isChecked ? 'bg-[var(--theme-card)]' : 'bg-[var(--theme-surface)] opacity-75 hover:opacity-100'
                  }`}
                >
                  <button className="mt-0.5 text-[var(--theme-primary)] shrink-0" aria-label="Toggle task">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[var(--theme-primary)]" />
                    ) : (
                      <Square className="w-4 h-4 text-[var(--theme-muted)]" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <p className={`font-body text-xs ${isChecked ? 'text-[var(--theme-text)] font-semibold' : 'text-[var(--theme-muted)]'}`}>
                      {task.task}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-ui">
                      <span className="text-[var(--theme-secondary)] uppercase">{task.category}</span>
                      <span className="text-[var(--theme-mist)]">·</span>
                      <span className="text-[var(--theme-muted)] font-semibold">{task.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
