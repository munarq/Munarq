import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, Layers, Compass, CheckCircle2, FileText } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenBriefWithProject?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenBriefWithProject,
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'elevation' | 'materials'>('blueprint');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] shadow-brutalist-lg my-8 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="flex items-center gap-3">
            <span className="font-ui text-xs font-bold text-[var(--theme-primary)] bg-[var(--theme-card)] px-2 py-1 border border-[var(--theme-border)]">
              {project.code}
            </span>
            <div className="flex flex-col">
              <h3 className="font-display text-2xl font-medium text-[var(--theme-primary)] tracking-tight truncate max-w-md sm:max-w-xl">
                {project.title}
              </h3>
              <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] uppercase tracking-wider">
                {project.location} · {project.coordinates}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] hover:bg-[var(--theme-primary)] hover:text-white transition-colors text-[var(--theme-primary)]"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs with Inter UI */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--theme-border)] bg-[var(--theme-bg)] overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-3 py-1.5 font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] transition-all flex items-center gap-1.5 ${
                activeTab === 'blueprint' 
                  ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm' 
                  : 'bg-[var(--theme-card)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Planta Arquitectónica</span>
            </button>

            <button
              onClick={() => setActiveTab('elevation')}
              className={`px-3 py-1.5 font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] transition-all flex items-center gap-1.5 ${
                activeTab === 'elevation' 
                  ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm' 
                  : 'bg-[var(--theme-card)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sección Tectónica & Marea</span>
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] transition-all flex items-center gap-1.5 ${
                activeTab === 'materials' 
                  ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm' 
                  : 'bg-[var(--theme-card)] text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Matriz Biocultural</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 font-dimensioning text-xs text-[var(--theme-secondary)]">
            <span className="text-[var(--theme-muted)]">ESCALA:</span>
            <span className="font-bold">{project.blueprint.scale}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 bg-[var(--theme-card)]">
          
          {/* TAB 1: BLUEPRINT SVG VIEWER */}
          {activeTab === 'blueprint' && (
            <div className="space-y-6">
              <div className="border-2 border-[var(--theme-border)] bg-[#031d27] p-4 sm:p-6 text-white relative blueprint-lines-dark overflow-hidden">
                <span className="absolute top-2 left-2 font-dimensioning text-xs text-white/50">+</span>
                <span className="absolute top-2 right-2 font-dimensioning text-xs text-white/50">+</span>
                <span className="absolute bottom-2 left-2 font-dimensioning text-xs text-white/50">+</span>
                <span className="absolute bottom-2 right-2 font-dimensioning text-xs text-white/50">+</span>

                <div className="flex items-center justify-between text-[10px] font-dimensioning tracking-widest text-[#a9cad3] uppercase pb-4 border-b border-[#194c60]">
                  <span>SISTEMA TECTÓNICO: {project.typology}</span>
                  <span>{project.blueprint.datumElevation}</span>
                  <span>{project.blueprint.orientation}</span>
                </div>

                {/* Interactive Vector Floor Plan SVG */}
                <div className="py-6 flex justify-center">
                  <svg 
                    viewBox="0 0 800 400" 
                    className="w-full max-w-3xl h-auto drop-shadow-md select-none font-dimensioning"
                  >
                    <line x1="40" y1="20" x2="760" y2="20" stroke="#194c60" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="40" y1="380" x2="760" y2="380" stroke="#194c60" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="40" y1="20" x2="40" y2="380" stroke="#194c60" strokeDasharray="4 4" strokeWidth="1" />
                    <line x1="760" y1="20" x2="760" y2="380" stroke="#194c60" strokeDasharray="4 4" strokeWidth="1" />

                    <text x="50" y="395" fill="#88c0d0" fontSize="9">0M</text>
                    <text x="250" y="395" fill="#88c0d0" fontSize="9">10M</text>
                    <text x="500" y="395" fill="#88c0d0" fontSize="9">20M</text>
                    <text x="730" y="395" fill="#88c0d0" fontSize="9">30M</text>

                    {/* Zone 1 */}
                    <g 
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredZone('Z-01')}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <rect 
                        x="100" y="80" width="160" height="240" 
                        fill={hoveredZone === 'Z-01' ? '#033141' : '#04222e'} 
                        stroke="#88c0d0" strokeWidth="2.5" 
                      />
                      <line x1="100" y1="80" x2="260" y2="320" stroke="#194c60" strokeWidth="0.75" />
                      <line x1="260" y1="80" x2="100" y2="320" stroke="#194c60" strokeWidth="0.75" />
                      <text x="120" y="190" fill="#ffffff" fontWeight="bold" fontSize="12">[Z-01]</text>
                      <text x="120" y="210" fill="#88c0d0" fontSize="9">CÁMARA SUBACUÁTICA</text>
                      <text x="120" y="225" fill="#a9cad3" fontSize="8">COTA: -4.200 M</text>
                    </g>

                    {/* Zone 2 */}
                    <g 
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredZone('Z-02')}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <rect 
                        x="270" y="60" width="220" height="280" 
                        fill={hoveredZone === 'Z-02' ? '#033141' : '#082b3a'} 
                        stroke="#88c0d0" strokeWidth="2.5" 
                      />
                      <rect x="290" y="80" width="180" height="240" fill="none" stroke="#356479" strokeDasharray="3 3" />
                      <text x="310" y="190" fill="#ffffff" fontWeight="bold" fontSize="12">[Z-02]</text>
                      <text x="310" y="210" fill="#88c0d0" fontSize="9">PLATAFORMA TELEMETRÍA</text>
                      <text x="310" y="225" fill="#a9cad3" fontSize="8">COTA: +2.800 M</text>
                    </g>

                    {/* Zone 3 */}
                    <g 
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredZone('Z-03')}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <rect 
                        x="500" y="80" width="160" height="150" 
                        fill={hoveredZone === 'Z-03' ? '#033141' : '#0a3547'} 
                        stroke="#88c0d0" strokeWidth="2.5" 
                      />
                      <text x="515" y="145" fill="#ffffff" fontWeight="bold" fontSize="12">[Z-03]</text>
                      <text x="515" y="165" fill="#88c0d0" fontSize="9">CULTIVO DE MICROALGAS</text>
                      <text x="515" y="180" fill="#a9cad3" fontSize="8">COTA: +6.500 M</text>
                    </g>

                    {/* Zone 4 */}
                    <g 
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredZone('Z-04')}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <polygon 
                        points="500,240 680,240 730,320 500,320" 
                        fill={hoveredZone === 'Z-04' ? '#033141' : '#0c3d52'} 
                        stroke="#88c0d0" strokeWidth="2.5" 
                      />
                      <text x="525" y="280" fill="#ffffff" fontWeight="bold" fontSize="12">[Z-04]</text>
                      <text x="525" y="295" fill="#88c0d0" fontSize="9">VOLADIZO METEOROLÓGICO</text>
                      <text x="525" y="308" fill="#a9cad3" fontSize="8">COTA: +10.200 M</text>
                    </g>

                    <line x1="100" y1="45" x2="660" y2="45" stroke="#88c0d0" strokeWidth="1" />
                    <text x="360" y="40" fill="#88c0d0" fontSize="10" textAnchor="middle">CRUJÍA ESTRUCTURAL CONTINUA: 38.40 METROS (SWISS 721 BT)</text>
                  </svg>
                </div>

                {/* Zone buttons with Inter UI */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#194c60]">
                  {project.blueprint.zones.map((zone) => (
                    <div 
                      key={zone.id}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                      className={`p-2.5 border transition-all cursor-pointer ${
                        hoveredZone === zone.id 
                          ? 'border-white bg-[var(--theme-primary)]' 
                          : 'border-[#194c60] bg-[#03222d]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-dimensioning text-[#88c0d0]">
                        <span className="font-bold">{zone.id}</span>
                        <span>{zone.level}</span>
                      </div>
                      <p className="font-ui text-xs font-semibold text-white mt-1 truncate">
                        {zone.name}
                      </p>
                      <span className="font-dimensioning text-[10px] text-[#a9cad3] block mt-0.5">
                        {zone.area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structural Notes */}
              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-5">
                <h4 className="font-display text-lg font-medium text-[var(--theme-primary)] mb-3">
                  Notas de Cálculo y Comportamiento Marítimo
                </h4>
                <ul className="space-y-2">
                  {project.blueprint.structuralNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-body text-[var(--theme-muted)]">
                      <span className="font-ui text-[var(--theme-primary)] font-bold">[{idx + 1}]</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: ELEVATION AND HYDRODYNAMIC SECTION */}
          {activeTab === 'elevation' && (
            <div className="space-y-6">
              <div className="border-2 border-[var(--theme-border)] bg-[#031d27] p-6 text-white blueprint-lines-dark">
                <div className="flex items-center justify-between text-xs font-dimensioning text-[#88c0d0] uppercase pb-3 border-b border-[#194c60]">
                  <span>ALZADO OESTE // INCIDENCIA DE EMBATE MAREAL</span>
                  <span>PERFIL BATIMÉTRICO: -12.000 M A +14.000 M</span>
                </div>

                <div className="py-6 flex justify-center">
                  <svg viewBox="0 0 800 320" className="w-full max-w-3xl h-auto font-dimensioning">
                    <polygon 
                      points="0,320 0,220 180,210 320,180 500,140 800,110 800,320" 
                      fill="#011319" 
                      stroke="#194c60" 
                      strokeWidth="2" 
                    />
                    <text x="30" y="290" fill="#88c0d0" fontSize="10">BATOLITO GRANÍTICO COSTERO</text>

                    <line x1="0" y1="190" x2="450" y2="190" stroke="#356479" strokeDasharray="5 3" strokeWidth="1.5" />
                    <text x="10" y="185" fill="#a9cad3" fontSize="9">PLEAMAR MÁXIMA VIVA (+3.800 M)</text>

                    <line x1="0" y1="230" x2="350" y2="230" stroke="#194c60" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="10" y="245" fill="#88c0d0" fontSize="9">BAJAMAR EQUINOCCIAL (+0.000 M)</text>

                    <polygon 
                      points="280,260 280,90 420,90 420,130 520,130 520,170 560,170 560,250" 
                      fill="#083749" 
                      stroke="#c6e2ed" 
                      strokeWidth="2" 
                    />

                    <polygon 
                      points="260,90 260,60 480,60 480,90" 
                      fill="#0b4860" 
                      stroke="#88c0d0" 
                      strokeWidth="2" 
                    />
                    <text x="275" y="80" fill="#ffffff" fontWeight="bold" fontSize="10">VOLADIZO TÉCNICO (+14.200 M)</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BIOCULTURAL MATERIAL MATRIX */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-6 shadow-brutalist-sm">
                <h4 className="font-display text-2xl font-medium text-[var(--theme-primary)] mb-2">
                  Matriz de Materiales y Química Litoral
                </h4>
                <p className="font-body text-xs text-[var(--theme-muted)] mb-6 leading-relaxed">
                  Cada componente se selecciona no solo por su resistencia física a cloruros marinos, sino por su capacidad de mineralización y bioreceptividad para organismos intermareales.
                </p>

                <div className="divide-y-2 divide-[var(--theme-border)]">
                  {project.materials.map((mat, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-display text-xl font-medium text-[var(--theme-primary)]">
                          0{idx + 1}. {mat.name}
                        </span>
                        <span className="font-ui text-[11px] text-[var(--theme-secondary)] bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)] font-semibold">
                          {mat.receptivity}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[var(--theme-muted)] leading-relaxed">
                        {mat.description}
                      </p>
                      <div className="font-dimensioning text-[10px] text-[var(--theme-secondary)] uppercase">
                        <span>PROCEDENCIA: </span>
                        <span className="font-bold text-[var(--theme-primary)]">{mat.origin}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t-2 border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="flex items-center gap-2 text-xs font-ui text-[var(--theme-secondary)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--theme-primary)]" />
            <span>Dossier normalizado con especificaciones bioculturales completas.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenBriefWithProject && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBriefWithProject(project.title);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] shadow-brutalist-sm transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                Solicitar Proyecto Similar
              </button>
            )}

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[var(--theme-card)] hover:bg-[var(--theme-surface)] text-[var(--theme-primary)] font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)]"
            >
              Cerrar Dossier
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
