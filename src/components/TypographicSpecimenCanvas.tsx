import React, { useState } from 'react';
import { Type, Palette, Check, Layers, Sliders, Sparkles, Terminal } from 'lucide-react';

export type PaletteTheme = 'oceanic' | 'nord' | 'solarized-light';

interface TypographicSpecimenCanvasProps {
  currentPalette: PaletteTheme;
  onSelectPalette: (palette: PaletteTheme) => void;
}

export const TypographicSpecimenCanvas: React.FC<TypographicSpecimenCanvasProps> = ({
  currentPalette,
  onSelectPalette,
}) => {
  const [activeTab, setActiveTab] = useState<'specimen' | 'comparison' | 'matrix'>('specimen');

  const palettes = [
    {
      id: 'oceanic' as PaletteTheme,
      name: 'Biocultural Oceanic',
      subtitle: 'Abyssal Marine & Glacial Mist',
      primaryHex: '#033141',
      secondaryHex: '#194c60',
      accentHex: '#a9cad3',
      bgHex: '#f2fbff',
      cardHex: '#f4f8f9'
    },
    {
      id: 'nord' as PaletteTheme,
      name: 'Nord Palette',
      subtitle: 'Arctic Polar Night & Snow Storm',
      primaryHex: '#2E3440',
      secondaryHex: '#3B4252',
      accentHex: '#88C0D0',
      bgHex: '#ECEFF4',
      cardHex: '#FFFFFF'
    },
    {
      id: 'solarized-light' as PaletteTheme,
      name: 'Solarized Light',
      subtitle: 'Ethan Schoonover Precision Warmth',
      primaryHex: '#002B36',
      secondaryHex: '#073642',
      accentHex: '#2AA198',
      bgHex: '#FDF6E3',
      cardHex: '#FFFDF8'
    }
  ];

  return (
    <section id="specimen-canvas" className="py-16 sm:py-20 border-b-2 border-[var(--theme-border)] bg-[var(--theme-bg)] transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[var(--theme-border)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-dimensioning tracking-widest text-[var(--theme-secondary)] uppercase mb-2">
              <span>MUNΛRQ TYPOGRAPHY STANDARD v3.2</span>
              <span>/</span>
              <span>CANVAS DE ESPECÍMENES & PALETAS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[var(--theme-primary)] tracking-tight">
              Muestrario Tipográfico & Matriz Cromática
            </h2>
          </div>

          {/* Palette Selector Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-dimensioning text-xs text-[var(--theme-muted)] uppercase tracking-wider">
              Conmutar Paleta:
            </span>
            <div className="flex items-center gap-1.5 p-1 border-2 border-[var(--theme-border)] bg-[var(--theme-card)]">
              {palettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPalette(p.id)}
                  className={`px-3 py-1.5 font-ui text-xs font-medium transition-all flex items-center gap-2 ${
                    currentPalette === p.id
                      ? 'bg-[var(--theme-primary)] text-white shadow-brutalist-sm'
                      : 'text-[var(--theme-primary)] hover:bg-[var(--theme-surface)]'
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 border border-white/50" 
                    style={{ backgroundColor: p.accentHex }}
                  />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Typographic Role Specification Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-[var(--theme-border)]">
          
          {/* 1. Cormorant Medium */}
          <div className="p-4 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] shadow-brutalist-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-muted)] uppercase">
              <span>TITULARES & DISPLAY</span>
              <span className="text-[var(--theme-primary)] font-bold">500 MEDIUM</span>
            </div>
            <p className="font-display text-2xl text-[var(--theme-primary)] font-medium leading-tight">
              Cormorant Medium
            </p>
            <p className="font-body text-xs text-[var(--theme-muted)] leading-relaxed">
              Titulación monumental, títulos de capítulos y citas poéticas de memoria de proyecto.
            </p>
          </div>

          {/* 2. Inter */}
          <div className="p-4 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] shadow-brutalist-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-muted)] uppercase">
              <span>UI, TAGS & CÓDIGO</span>
              <span className="text-[var(--theme-primary)] font-bold">400 / 600</span>
            </div>
            <p className="font-ui text-xl text-[var(--theme-primary)] font-semibold leading-tight tracking-tight">
              Inter UI Engine
            </p>
            <p className="font-body text-xs text-[var(--theme-muted)] leading-relaxed">
              Etiquetas de estado, botones interactivos, bloques de código CSS/HTML y controles de navegación.
            </p>
          </div>

          {/* 3. Swiss 721 BT */}
          <div className="p-4 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] shadow-brutalist-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-muted)] uppercase">
              <span>COTAS TÉCNICAS</span>
              <span className="text-[var(--theme-primary)] font-bold">TABULAR</span>
            </div>
            <p className="font-dimensioning text-lg text-[var(--theme-primary)] font-bold tracking-wider leading-tight">
              SWISS 721 BT
            </p>
            <p className="font-body text-xs text-[var(--theme-muted)] leading-relaxed">
              Cotas métricas de planos, distancias batimétricas, empujes kN/m² y coordenadas UTM.
            </p>
          </div>

          {/* 4. Lato */}
          <div className="p-4 border-2 border-[var(--theme-border)] bg-[var(--theme-card)] shadow-brutalist-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-dimensioning text-[var(--theme-muted)] uppercase">
              <span>PROSA EDITORIAL</span>
              <span className="text-[var(--theme-primary)] font-bold">REGULAR 400</span>
            </div>
            <p className="font-body text-xl text-[var(--theme-primary)] font-normal leading-tight">
              Lato Operational
            </p>
            <p className="font-body text-xs text-[var(--theme-muted)] leading-relaxed">
              Cuerpo de texto continuo, memorias constructivas y análisis descriptivos de concursos.
            </p>
          </div>

        </div>

        {/* Specimen Interactive Testing Harness */}
        <div className="pt-10 space-y-10">
          
          {/* Specimen Block 1: Headline + Technical Telemetry + Inter Badges + Lato Body */}
          <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-10 shadow-brutalist space-y-8">
            
            {/* Top Coordinate Datum Bar using Swiss 721 BT */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--theme-border)] text-xs font-dimensioning text-[var(--theme-secondary)] uppercase">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[var(--theme-primary)] bg-[var(--theme-surface)] px-2 py-0.5 border border-[var(--theme-border)]">
                  FIG. 24 // PLIEGO TEC-01
                </span>
                <span>COTAS ZONA 01: +12.450 M</span>
                <span>AZIMUT: 284.5° WNW</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--theme-muted)]">PALETA ACTIVA:</span>
                <span className="font-bold text-[var(--theme-primary)] uppercase">
                  {palettes.find(p => p.id === currentPalette)?.name}
                </span>
              </div>
            </div>

            {/* Display Headline in Cormorant Medium */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-ui text-xs font-medium text-[var(--theme-secondary)] uppercase tracking-wider bg-[var(--theme-surface)] px-2.5 py-1 border border-[var(--theme-border)]">
                  Cormorant Medium 500 · Escala Display
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--theme-primary)] leading-[1.1] font-medium tracking-tight">
                El monolito marítimo y la disipación hidrodinámica del Atlántico Norte.
              </h3>
            </div>

            {/* Sub-Headline & Dimensioning Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 border border-[var(--theme-border)] bg-[var(--theme-bg)] space-y-1">
                <span className="font-dimensioning text-[10px] text-[var(--theme-muted)] uppercase block">
                  Swiss 721 BT // Medición Dimensional
                </span>
                <div className="font-dimensioning text-xl font-bold text-[var(--theme-primary)]">
                  L = 48.60 M · E = 1.20 M
                </div>
                <span className="font-ui text-[11px] text-[var(--theme-secondary)] block">
                  Espesor murario resistente a onda solitaria
                </span>
              </div>

              <div className="p-4 border border-[var(--theme-border)] bg-[var(--theme-bg)] space-y-1">
                <span className="font-dimensioning text-[10px] text-[var(--theme-muted)] uppercase block">
                  Swiss 721 BT // Carga de Diseño
                </span>
                <div className="font-dimensioning text-xl font-bold text-[var(--theme-primary)]">
                  185.4 KN/M² DINÁMICA
                </div>
                <span className="font-ui text-[11px] text-[var(--theme-secondary)] block">
                  Presión de ola calculada por simulación CFD
                </span>
              </div>

              <div className="p-4 border border-[var(--theme-border)] bg-[var(--theme-bg)] space-y-1">
                <span className="font-dimensioning text-[10px] text-[var(--theme-muted)] uppercase block">
                  Inter // Interfaz de Estado
                </span>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-ui text-xs font-semibold px-2 py-0.5 bg-[var(--theme-primary)] text-white">
                    VERIFICADO
                  </span>
                  <span className="font-ui text-xs text-[var(--theme-secondary)]">
                    Norma UNE-EN 1992-1-1
                  </span>
                </div>
                <span className="font-ui text-[11px] text-[var(--theme-muted)] block mt-1">
                  Tag UI con Inter sans-serif
                </span>
              </div>
            </div>

            {/* Lato Body Text Demonstration */}
            <div className="pt-4 border-t border-[var(--theme-border)] space-y-3">
              <span className="font-ui text-xs font-medium text-[var(--theme-secondary)] uppercase tracking-wider block">
                Lato Regular 400 · Demostración de Prosa Operativa y Memoria de Proyecto:
              </span>
              <p className="font-body text-base text-[var(--theme-text)] leading-relaxed max-w-4xl">
                La intervención espacial en el litoral de Finisterre responde a la necesidad de estabilizar el cantil rocoso mediante una estructura de gravidez continua. A diferencia de las escolleras provisionales de mampostería suelta, el encofrado monolítico de hormigón puzolánico permite que el volumen absorba las presiones hidrodinámicas convirtiendo las cavidades inferiores en refugios de biodiversidad bentónica. Los acabados texturados al desencofrado retienen el spray salino y aceleran la formación de líquenes marinos que atenúan la degradación química superficial.
              </p>
            </div>

            {/* Code Block Specimen using Inter */}
            <div className="border-2 border-[var(--theme-border)] bg-[var(--theme-primary)] text-white p-5 font-ui text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/20 text-[11px] text-[var(--theme-mist)]">
                <span className="flex items-center gap-2 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Inter para Bloques de Código & Fórmulas Paramétricas</span>
                </span>
                <span className="font-dimensioning">CODE SPECIMEN</span>
              </div>
              <pre className="pt-3 text-[12px] leading-relaxed overflow-x-auto text-[var(--theme-tint)]">
{`/* Tipografía de Inter aplicada a bloques de código técnico y variables */
const calculateWaveThrust = (heightMeters: number, bathymetryDepth: number): number => {
  const g = 9.80665; // Aceleración gravitatoria (m/s²)
  const rhoMarine = 1025; // Densidad del agua atlántica (kg/m³)
  return Math.round((0.5 * rhoMarine * g * Math.pow(heightMeters, 2)) / 1000); // kN/m²
};`}
              </pre>
            </div>

          </div>

          {/* Nord vs Solarized Light Palette Comparison Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Nord Simulation Card */}
            <div className="border-2 border-[#2E3440] bg-[#ECEFF4] p-6 text-[#2E3440] shadow-brutalist space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2E3440]">
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#2E3440]">
                  Nord Arctic Preview
                </span>
                <span className="font-dimensioning text-[10px] text-[#4C566A]">
                  POLAR NIGHT · FROST #88C0D0
                </span>
              </div>

              <h4 className="font-display text-2xl font-medium text-[#2E3440] leading-snug">
                Pabellón de Hielo & Mareas Nórdicas
              </h4>

              <p className="font-body text-xs text-[#4C566A] leading-relaxed">
                Inter actuando en la interfaz sobria de Nord con fondos Snow Storm (#ECEFF4) y tipografía de lectura en Lato oscuro (#2E3440).
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="font-ui text-[11px] font-semibold bg-[#2E3440] text-white px-2.5 py-1">
                  INTER BADGE
                </span>
                <span className="font-dimensioning text-[11px] text-[#2E3440] font-bold">
                  COTA +4.200 M
                </span>
                <button
                  onClick={() => onSelectPalette('nord')}
                  className="ml-auto font-ui text-[11px] font-bold text-[#2E3440] underline hover:text-[#5E81AC]"
                >
                  Activar Nord en Sitio →
                </button>
              </div>
            </div>

            {/* Solarized Light Simulation Card */}
            <div className="border-2 border-[#002B36] bg-[#FDF6E3] p-6 text-[#073642] shadow-brutalist space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#002B36]">
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#002B36]">
                  Solarized Light Preview
                </span>
                <span className="font-dimensioning text-[10px] text-[#657B83]">
                  BASE3 #FDF6E3 · CYAN #2AA198
                </span>
              </div>

              <h4 className="font-display text-2xl font-medium text-[#002B36] leading-snug">
                Observatorio Solar & Cálculos de Salinidad
              </h4>

              <p className="font-body text-xs text-[#657B83] leading-relaxed">
                La calidez del papel de archivo Base3 (#FDF6E3) complementa la elegancia de Cormorant Medium y la nitidez técnica de Inter.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="font-ui text-[11px] font-semibold bg-[#002B36] text-[#FDF6E3] px-2.5 py-1">
                  INTER CYAN
                </span>
                <span className="font-dimensioning text-[11px] text-[#002B36] font-bold">
                  SWISS 721 · 35,000 PPM
                </span>
                <button
                  onClick={() => onSelectPalette('solarized-light')}
                  className="ml-auto font-ui text-[11px] font-bold text-[#002B36] underline hover:text-[#2AA198]"
                >
                  Activar Solarized en Sitio →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
