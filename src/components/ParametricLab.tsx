import React, { useState } from 'react';
import { Sliders, RefreshCw, ArrowUpRight, Activity } from 'lucide-react';

interface ParametricLabProps {
  onApplyToBrief: (params: {
    tideAmplitude: number;
    salinity: number;
    porosity: number;
    wallThickness: number;
    waveDissipation: number;
    carbonCapture: number;
  }) => void;
}

export const ParametricLab: React.FC<ParametricLabProps> = ({ onApplyToBrief }) => {
  const [tideAmplitude, setTideAmplitude] = useState<number>(3.6);
  const [salinity, setSalinity] = useState<number>(35000);
  const [porosity, setPorosity] = useState<number>(24);
  const [wallThickness, setWallThickness] = useState<number>(90);

  const hydrodynamicResistance = Math.round((wallThickness * 1.1) + (tideAmplitude * 18.5));
  const waveDissipation = Math.min(96, Math.round(35 + (porosity * 1.2) + (wallThickness * 0.22)));
  const carbonCapture = Math.round((porosity * 1.4) + (wallThickness * 0.35));
  const colonizationMonths = Math.max(3, Math.round(18 - (porosity * 0.32) - (salinity / 10000)));

  const handleReset = () => {
    setTideAmplitude(3.6);
    setSalinity(35000);
    setPorosity(24);
    setWallThickness(90);
  };

  return (
    <section id="laboratorio" className="py-16 sm:py-20 border-b-2 border-[var(--theme-border)] bg-[var(--theme-card)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[var(--theme-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-dimensioning tracking-widest text-[var(--theme-secondary)] uppercase mb-2">
              <span>SECCIÓN 02</span>
              <span>/</span>
              <span>HERRAMIENTA COMPUTACIONAL PARAMÉTRICA</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--theme-primary)] tracking-tight">
              Laboratorio Biocultural de Fluidos & Masa
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-3 py-2 border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] hover:bg-[var(--theme-surface)] text-xs font-ui font-semibold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-stretch">
          
          {/* Controls Column (5 cols) using Inter UI & Swiss 721 BT */}
          <div className="lg:col-span-5 border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-6 sm:p-8 shadow-brutalist flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--theme-border)]">
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  <span>Calibración de Variables Costeras</span>
                </span>
                <span className="font-dimensioning text-[10px] text-[var(--theme-muted)] uppercase">v2.4 FEA</span>
              </div>

              {/* Slider 1 */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <label htmlFor="tide-slider" className="font-semibold text-[var(--theme-primary)] uppercase">
                    [01] Carrera de Marea Equinoccial
                  </label>
                  <span className="font-dimensioning bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)] font-bold tabular-nums text-[var(--theme-primary)]">
                    {tideAmplitude.toFixed(1)} M
                  </span>
                </div>
                <input
                  id="tide-slider"
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={tideAmplitude}
                  onChange={(e) => setTideAmplitude(parseFloat(e.target.value))}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-dimensioning text-[var(--theme-muted)]">
                  <span>0.5 M (MEDITERRÁNEO)</span>
                  <span>5.0 M (ATLÁNTICO / MAR DEL NORTE)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="pt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <label htmlFor="wall-slider" className="font-semibold text-[var(--theme-primary)] uppercase">
                    [02] Espesor Monolítico de Muro
                  </label>
                  <span className="font-dimensioning bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)] font-bold tabular-nums text-[var(--theme-primary)]">
                    {wallThickness} CM
                  </span>
                </div>
                <input
                  id="wall-slider"
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={wallThickness}
                  onChange={(e) => setWallThickness(parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-dimensioning text-[var(--theme-muted)]">
                  <span>30 CM (TABIQUE)</span>
                  <span>150 CM (MONOLITO PESADO)</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="pt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <label htmlFor="porosity-slider" className="font-semibold text-[var(--theme-primary)] uppercase">
                    [03] Porosidad & Capacidad Bioreceptiva
                  </label>
                  <span className="font-dimensioning bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)] font-bold tabular-nums text-[var(--theme-primary)]">
                    {porosity}%
                  </span>
                </div>
                <input
                  id="porosity-slider"
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={porosity}
                  onChange={(e) => setPorosity(parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-dimensioning text-[var(--theme-muted)]">
                  <span>5% (BLINDAJE DENSO)</span>
                  <span>40% (ARRECIFE ARTIFICIAL)</span>
                </div>
              </div>

              {/* Slider 4 */}
              <div className="pt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-ui">
                  <label htmlFor="salinity-slider" className="font-semibold text-[var(--theme-primary)] uppercase">
                    [04] Salinidad de Aguas Litorales
                  </label>
                  <span className="font-dimensioning bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)] font-bold tabular-nums text-[var(--theme-primary)]">
                    {salinity.toLocaleString()} PPM
                  </span>
                </div>
                <input
                  id="salinity-slider"
                  type="range"
                  min="15000"
                  max="45000"
                  step="1000"
                  value={salinity}
                  onChange={(e) => setSalinity(parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--theme-primary)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-dimensioning text-[var(--theme-muted)]">
                  <span>15K (ESTUARIO)</span>
                  <span>45K (OCÉANO ABIERTO)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[var(--theme-border)]">
              <button
                onClick={() => onApplyToBrief({
                  tideAmplitude,
                  salinity,
                  porosity,
                  wallThickness,
                  waveDissipation,
                  carbonCapture
                })}
                className="w-full py-3.5 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white font-ui text-xs font-semibold uppercase tracking-wider border-2 border-[var(--theme-border)] shadow-brutalist-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Transferir Parámetros al Encargo</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dynamic SVG Viewport & Metric Readout */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="border-2 border-[var(--theme-border)] bg-[#031d27] p-5 sm:p-6 text-white blueprint-lines-dark shadow-brutalist relative overflow-hidden flex-1 flex flex-col justify-between">
              
              <div className="absolute top-2 left-2 font-dimensioning text-xs text-white/50">+</div>
              <div className="absolute top-2 right-2 font-dimensioning text-xs text-white/50">+</div>
              <div className="absolute bottom-2 left-2 font-dimensioning text-xs text-white/50">+</div>
              <div className="absolute bottom-2 right-2 font-dimensioning text-xs text-white/50">+</div>

              <div className="flex items-center justify-between text-xs font-dimensioning text-[#88c0d0] uppercase border-b border-[#194c60] pb-3">
                <span className="flex items-center gap-2 font-bold text-white font-ui">
                  <Activity className="w-4 h-4 text-[#88c0d0]" />
                  <span>SIMULADOR DE SECCIÓN ESTRUCTURAL DINÁMICA</span>
                </span>
                <span>ESCALA VISUAL 1:20</span>
              </div>

              <div className="py-4 my-auto flex justify-center">
                <svg viewBox="0 0 600 300" className="w-full max-w-xl h-auto font-dimensioning select-none">
                  <rect x="0" y="0" width="600" height="300" fill="#011b24" opacity="0.6" />
                  <polygon points="0,300 0,250 200,240 600,240 600,300" fill="#02141a" />
                  <line x1="0" y1="240" x2="600" y2="240" stroke="#194c60" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="20" y="275" fill="#4a798a" fontSize="9">FONDO MARINO // ESTRATO ROCOSO</text>

                  {(() => {
                    const waterY = 220 - ((tideAmplitude - 0.5) / 4.5) * 120;
                    return (
                      <g>
                        <rect x="0" y={waterY} width="250" height={240 - waterY} fill="#053344" opacity="0.75" />
                        <line x1="0" y1={waterY} x2="250" y2={waterY} stroke="#356479" strokeWidth="2" strokeDasharray="6 3" />
                        <text x="15" y={waterY - 8} fill="#88c0d0" fontSize="9" fontWeight="bold">
                          PLEAMAR (+{tideAmplitude.toFixed(1)} M)
                        </text>
                      </g>
                    );
                  })()}

                  <path d="M 10 160 Q 35 145 60 160 T 110 160 T 160 160 T 210 160" fill="none" stroke="#6d9bad" strokeWidth="1.5" opacity="0.7" />
                  <path d="M 10 180 Q 35 165 60 180 T 110 180 T 160 180 T 210 180" fill="none" stroke="#6d9bad" strokeWidth="1.5" opacity="0.7" />

                  {(() => {
                    const wallWidth = 60 + ((wallThickness - 30) / 120) * 160;
                    const wallX = 250;
                    return (
                      <g>
                        <rect 
                          x={wallX} 
                          y="40" 
                          width={wallWidth} 
                          height="200" 
                          fill="#0b4860" 
                          stroke="#c6e2ed" 
                          strokeWidth="2.5" 
                        />

                        <line x1={wallX} y1="40" x2={wallX + wallWidth} y2="240" stroke="#194c60" strokeWidth="1" />
                        <line x1={wallX + wallWidth} y1="40" x2={wallX} y2="240" stroke="#194c60" strokeWidth="1" />

                        {Array.from({ length: Math.min(25, Math.round(porosity * 0.8)) }).map((_, i) => {
                          const px = wallX + 8 + (i * 27) % (wallWidth - 16);
                          const py = 60 + (i * 23) % 150;
                          return (
                            <circle key={i} cx={px} cy={py} r="2.5" fill="#88c0d0" opacity="0.7" />
                          );
                        })}

                        <line x1={wallX} y1="25" x2={wallX + wallWidth} y2="25" stroke="#88c0d0" strokeWidth="1.5" />
                        <line x1={wallX} y1="20" x2={wallX} y2="30" stroke="#88c0d0" strokeWidth="1.5" />
                        <line x1={wallX + wallWidth} y1="20" x2={wallX + wallWidth} y2="30" stroke="#88c0d0" strokeWidth="1.5" />
                        <text x={wallX + wallWidth / 2} y="18" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                          {wallThickness} CM ESPESOR (SWISS 721)
                        </text>

                        <text x={wallX + wallWidth + 25} y="140" fill="#88c0d0" fontSize="10">ESPACIO INTERIOR</text>
                        <text x={wallX + wallWidth + 25} y="155" fill="#a9cad3" fontSize="8">CLIMATIZACIÓN PASIVA</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-dimensioning text-[#88c0d0] pt-3 border-t border-[#194c60]">
                <span>DISIPACIÓN ENERGÉTICA DE OLA: {waveDissipation}%</span>
                <span>COMPATIBILIDAD BÉNTICA: C60/75 POZ</span>
              </div>
            </div>

            {/* Metrics Output Grid using Swiss 721 BT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 shadow-brutalist-sm">
                <span className="font-ui text-[10px] text-[var(--theme-muted)] uppercase block">
                  Resistencia Hidrodinámica
                </span>
                <span className="font-dimensioning text-2xl font-bold text-[var(--theme-primary)] tabular-nums mt-1 block">
                  {hydrodynamicResistance}
                </span>
                <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] font-semibold">
                  KN/M² DE EMPUJE
                </span>
              </div>

              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 shadow-brutalist-sm">
                <span className="font-ui text-[10px] text-[var(--theme-muted)] uppercase block">
                  Disipación de Oleaje
                </span>
                <span className="font-dimensioning text-2xl font-bold text-[var(--theme-primary)] tabular-nums mt-1 block">
                  {waveDissipation}%
                </span>
                <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] font-semibold">
                  AMORTIGUACIÓN
                </span>
              </div>

              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 shadow-brutalist-sm">
                <span className="font-ui text-[10px] text-[var(--theme-muted)] uppercase block">
                  Captura de Carbono
                </span>
                <span className="font-dimensioning text-2xl font-bold text-[var(--theme-primary)] tabular-nums mt-1 block">
                  -{carbonCapture}
                </span>
                <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] font-semibold">
                  KG CO₂ / M² MURO
                </span>
              </div>

              <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-bg)] p-4 shadow-brutalist-sm">
                <span className="font-ui text-[10px] text-[var(--theme-muted)] uppercase block">
                  Colonización Flora
                </span>
                <span className="font-dimensioning text-2xl font-bold text-[var(--theme-primary)] tabular-nums mt-1 block">
                  {colonizationMonths}
                </span>
                <span className="font-dimensioning text-[10px] text-[var(--theme-secondary)] font-semibold">
                  MESES A BIOTOPO
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
