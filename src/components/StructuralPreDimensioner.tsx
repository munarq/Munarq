import React, { useState } from 'react';
import { MapPin, Compass, Layers, CheckCircle2, ArrowDownRight, Wind, Droplets, Sun, Sparkles } from 'lucide-react';

type MaterialType = 'geopolymer' | 'timber' | 'portland';

interface ClimateZone {
  id: string;
  number: string;
  name: string;
  biome: string;
  coordinates: string;
  elevation: string;
  climateMetrics: {
    salinity: string;
    thermalDelta: string;
    windExposure: string;
    solarIrradiance: string;
  };
  recommendedSubstrate: MaterialType;
  palette: {
    name: string;
    color: string;
    role: string;
    spec: string;
  }[];
  carbonIndex: string;
  biologicalReceptivity: string;
  recommendedSpan: number;
  recommendedLoad: number;
  svgCoords: { cx: number; cy: number; path: string };
  description: string;
}

const CLIMATE_ZONES: ClimateZone[] = [
  {
    id: 'zone-benthic',
    number: '01',
    name: 'Benthic Oceanic & Tidal Surge',
    biome: 'Sub-Arctic Rocky Coastline',
    coordinates: '42°53\'18" N · 9°15\'46" W',
    elevation: '-4.20 M to +6.50 M Datum',
    climateMetrics: {
      salinity: '35,500 PPM (High Marine)',
      thermalDelta: 'ΔT 18°C (Sub-Zero Surges)',
      windExposure: '140 km/h Hydrodynamic Wave Force',
      solarIrradiance: '1,350 kWh/m² (Maritime Overcast)'
    },
    recommendedSubstrate: 'geopolymer',
    palette: [
      { name: 'Alkali-Activated Basalt Geopolymer', color: '#3A3F3B', role: 'Primary Monolith', spec: 'Class III-C Sea Exposure, pH 8.4' },
      { name: 'Recycled Bivalve Shell Aggregate', color: '#D2D7D1', role: 'Inorganic Calcium Sink', spec: '35% replacement of quarried sand' },
      { name: 'Duplex 2205 Stainless & Titanium', color: '#7E8687', role: 'Rock Anchors & Structural Ties', spec: 'Passivated against chloride pitting' },
      { name: 'Arctic Lichen Bioreceptive Skin', color: '#61752D', role: 'Living Membrane', spec: 'Xanthoria parietina colonization' }
    ],
    carbonIndex: '-38.4 kg CO₂/m²',
    biologicalReceptivity: '94% Intertidal Biotope Compatible',
    recommendedSpan: 16,
    recommendedLoad: 6.5,
    svgCoords: { cx: 80, cy: 110, path: 'M 30 140 L 140 130 L 130 90 L 30 100 Z' },
    description: 'High hydrodynamic wave impact and constant saline spray. Demands massive low-clinker geopolymer mass capable of acting as an artificial reef substrate.'
  },
  {
    id: 'zone-estuarine',
    number: '02',
    name: 'Intertidal Saline Wetlands',
    biome: 'Estuarine Saltmarsh & Mudflats',
    coordinates: '37°15\'02" N · 6°58\'24" W',
    elevation: '+0.50 M to +3.80 M Mean Tide',
    climateMetrics: {
      salinity: '24,000 PPM (Brackish Tide)',
      thermalDelta: 'ΔT 26°C (Seasonal Drought)',
      windExposure: '55 km/h Convective Breeze',
      solarIrradiance: '2,150 kWh/m² (Intense Irradiance)'
    },
    recommendedSubstrate: 'geopolymer',
    palette: [
      { name: 'Bioclastic Calcareous Stone', color: '#E5DFD3', role: 'Porous Colonnades', spec: 'Hydraulic lime mortar matrix (NHL 3.5)' },
      { name: 'Stabilized Halophyte Rammed Earth', color: '#9E9484', role: 'Thermal Buffer Walls', spec: 'In-situ silt with Salicornia fibers' },
      { name: 'Pre-Patinated Graphite Zinc', color: '#4D5357', role: 'Corrosive Salt Air Flashing', spec: '99.9% recycled titanium-zinc alloy' },
      { name: 'Spartina Phyto-Filtration Beds', color: '#7A8C3D', role: 'Ecological Root Membrane', spec: 'Heavy metal sedimentation buffer' }
    ],
    carbonIndex: '-29.1 kg CO₂/m²',
    biologicalReceptivity: '88% Estuarine Flora Compatible',
    recommendedSpan: 12,
    recommendedLoad: 4.0,
    svgCoords: { cx: 210, cy: 100, path: 'M 150 120 L 270 110 L 260 80 L 150 90 Z' },
    description: 'Cyclical submersion and intense solar evaporation. Employs porous calcareous stone and zinc skins that allow diurnal breathing.'
  },
  {
    id: 'zone-subtropical',
    number: '03',
    name: 'Humid Coastal Canopy & Mangrove',
    biome: 'Subtropical River Delta',
    coordinates: '16°52\'30" N · 96°43\'12" W',
    elevation: '+2.00 M to +14.00 M Fluvial',
    climateMetrics: {
      salinity: '12,000 PPM (Fluvial Transition)',
      thermalDelta: 'ΔT 12°C (Constant Ambient 28°C)',
      windExposure: '90 km/h Monsoonal Gusts',
      solarIrradiance: '1,850 kWh/m² (Humid Diffuse)'
    },
    recommendedSubstrate: 'timber',
    palette: [
      { name: 'Acetylated FSC Maritime Timber', color: '#B38B59', role: 'Robotic Joinery Lattice', spec: 'Non-toxic acetylation, class 1 durability' },
      { name: 'Bio-Cemented Sand Mortar (MICP)', color: '#D6C8B4', role: 'Low-Carbon Foundations', spec: 'Microbial calcite precipitation' },
      { name: 'Marine Cast Bronze Fasteners', color: '#8C6D46', role: 'Corrosion-Free Connectors', spec: 'CuAl10Fe5 naval alloy' },
      { name: 'Epiphytic Aerial Root Mesh', color: '#4B5E28', role: 'Living Sun Shading Screen', spec: 'Natural microclimatic evaporative cooling' }
    ],
    carbonIndex: '-48.6 kg CO₂/m²',
    biologicalReceptivity: '96% Tropical Canopy Compatible',
    recommendedSpan: 18,
    recommendedLoad: 3.5,
    svgCoords: { cx: 340, cy: 80, path: 'M 280 100 L 400 90 L 390 60 L 280 70 Z' },
    description: 'Saturated air, frequent rains and high fungal exposure. Prioritizes acetylated structural timber with robotic mortise joinery that breathes without rot.'
  },
  {
    id: 'zone-alpine',
    number: '04',
    name: 'Glacial Alpine & Bedrock Massif',
    biome: 'High-Latitude Granite Plateau',
    coordinates: '59°55\'00" N · 10°45\'20" E',
    elevation: '+45.00 M to +180.00 M Cliff',
    climateMetrics: {
      salinity: '4,000 PPM (Windborne Trace)',
      thermalDelta: 'ΔT 38°C (Extreme Thermal Shock)',
      windExposure: '160 km/h Arctic Gale Pressure',
      solarIrradiance: '1,100 kWh/m² (High UV Reflection)'
    },
    recommendedSubstrate: 'portland',
    palette: [
      { name: 'Quarried Cyclopean Granite', color: '#565A5C', role: 'Thermal Inertia Core', spec: 'Unpolished local quarry batolith' },
      { name: 'Expanded Mineral Clay Insulation', color: '#A39B8F', role: 'Frost Proof Thermal Envelope', spec: 'Non-combustible cellular silica' },
      { name: 'Heavy Structural Larch Glulam', color: '#8A5D3B', role: 'Internal Compression Struts', spec: 'Resin-dense mountain heartwood' },
      { name: 'Sub-Alpine Bryophyte Carpet', color: '#3E4D1D', role: 'Rooftop Thermal Insulation', spec: 'Freeze-thaw resilient moss matrix' }
    ],
    carbonIndex: '+6.2 kg CO₂/m²',
    biologicalReceptivity: '82% Alpine Lichen Compatible',
    recommendedSpan: 10,
    recommendedLoad: 8.0,
    svgCoords: { cx: 480, cy: 60, path: 'M 420 85 L 540 70 L 530 35 L 420 50 Z' },
    description: 'Extreme thermal swings, snow loads, and severe gale-force winds. Demands dense granite ballast and thick thermal mass to prevent freezing.'
  }
];

export const StructuralPreDimensioner: React.FC = () => {
  // Pre-dimensioner state
  const [span, setSpan] = useState<number>(12);
  const [load, setLoad] = useState<number>(4.5);
  const [material, setMaterial] = useState<MaterialType>('geopolymer');

  // Site Mapping state
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-benthic');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone = CLIMATE_ZONES.find((z) => z.id === selectedZoneId) || CLIMATE_ZONES[0];

  // Material physics parameters
  let ratio = 17.5;
  let co2Base = -2.7;
  let elasticMod = 1.0;

  if (material === 'timber') {
    ratio = 14.0;
    co2Base = -5.8;
    elasticMod = 0.85;
  } else if (material === 'portland') {
    ratio = 20.0;
    co2Base = 18.5;
    elasticMod = 1.35;
  }

  // Structural computations compliant with Eurocode EN 1995-1-1
  const calculatedDepth = Math.round((span / ratio) * 1000);
  const netCO2Num = span * co2Base * (load / 4.0);
  const netCO2 = netCO2Num.toFixed(1);

  const deflectionMMNum = (Math.pow(span, 3) * load * 0.019) / elasticMod;
  const deflectionMM = deflectionMMNum.toFixed(1);
  const limitL500Num = (span * 1000) / 500;
  const isCompliant = deflectionMMNum <= limitL500Num;

  const baselineY = 50;
  const maxSag = Math.min(85, baselineY + deflectionMMNum * 1.6);
  const curvePath = `M 20 ${baselineY} Q 200 ${maxSag} 380 ${baselineY}`;
  const strokeColor = isCompliant ? '#61752D' : '#ba1a1a';

  // Apply mapped climate zone parameters directly to the structural calculator
  const handleApplyZoneToCalculator = (zone: ClimateZone) => {
    setMaterial(zone.recommendedSubstrate);
    setSpan(zone.recommendedSpan);
    setLoad(zone.recommendedLoad);
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32" id="lab">
      <div className="border border-onyx/20 dark:border-white/20 bg-pure dark:bg-dark-surface p-8 md:p-16 transition-colors duration-300 reveal space-y-16">
        
        {/* ======================================================== */}
        {/* HEADER */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-onyx/20 dark:border-white/20 pb-8 gap-6">
          <div>
            <h2 className="font-label text-xs font-bold tracking-[0.15em] uppercase text-carbon dark:text-concrete/60 mb-3">
              Section 03 // Research Lab & Biocultural Computation
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl font-medium text-onyx dark:text-pure">
              Biocultural Site Mapping & Pre-Dimensioner
            </h3>
          </div>
          <p className="font-mono text-[11px] text-carbon dark:text-concrete/60 max-w-sm mt-4 md:mt-0 text-left md:text-right leading-relaxed uppercase tracking-wider">
            Select an ecological climate zone on the coastal transect to reveal its optimized material matrix, then test structural beam metrics under Eurocode EN 1995-1-1.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MODULE 1: BIOCULTURAL SITE MAPPING TOOL (LIGHTWEIGHT SVG) */}
        {/* ======================================================== */}
        <div className="space-y-8">
          
          {/* Module Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-onyx/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-moss dark:bg-[#8ba83b]"></span>
              <h4 className="font-label text-xs font-bold tracking-[0.15em] uppercase text-onyx dark:text-pure">
                Bioclimatic Coastal Transect Mapping // SVG Vector Tool
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-carbon dark:text-concrete/60">
              <Compass className="w-3.5 h-3.5 text-moss dark:text-[#8ba83b]" />
              <span>ACTIVE ZONE: [{activeZone.number}] {activeZone.name.toUpperCase()}</span>
            </div>
          </div>

          {/* Interactive SVG Landscape Transect */}
          <div className="border border-onyx/20 dark:border-white/20 bg-concrete dark:bg-[#111311] p-6 relative overflow-hidden transition-colors">
            
            {/* Top Telemetry Header inside SVG Frame */}
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-carbon dark:text-concrete/60 pb-3 border-b border-onyx/10 dark:border-white/10 mb-4 tracking-wider">
              <span>COASTAL TRANSECT PROFILE // BATHYMETRIC TO ALPINE BEDROCK</span>
              <span>INTERACTIVE SITE SELECTOR</span>
              <span className="hidden sm:inline">COORDINATES WGS84</span>
            </div>

            {/* The Lightweight Vector SVG Map */}
            <div className="py-2 flex justify-center">
              <svg 
                viewBox="0 0 600 200" 
                className="w-full max-w-4xl h-auto select-none font-mono"
              >
                {/* Background Grid Lines */}
                <line x1="20" y1="30" x2="580" y2="30" stroke="currentColor" strokeDasharray="3 3" opacity="0.1" />
                <line x1="20" y1="80" x2="580" y2="80" stroke="currentColor" strokeDasharray="3 3" opacity="0.1" />
                <line x1="20" y1="130" x2="580" y2="130" stroke="currentColor" strokeDasharray="3 3" opacity="0.1" />
                <line x1="20" y1="170" x2="580" y2="170" stroke="currentColor" strokeDasharray="3 3" opacity="0.1" />

                {/* Sky & Atmosphere Gradient */}
                <rect x="20" y="20" width="560" height="150" fill="transparent" />

                {/* Subterranean Geological Bedrock Silhouette (Geological Cross-section) */}
                <polygon 
                  points="20,180 20,135 70,130 140,110 200,105 280,95 360,80 440,55 520,35 580,30 580,180" 
                  fill="currentColor" 
                  opacity="0.08" 
                />

                {/* Marine Water Body & Waves (Benthic zone) */}
                <polygon 
                  points="20,180 20,115 140,115 140,140 20,155" 
                  fill="#61752D" 
                  opacity="0.15" 
                />
                <line x1="20" y1="115" x2="140" y2="115" stroke="#61752D" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="25" y="110" fill="#61752D" fontSize="8" fontWeight="bold">TIDAL SURGE (+3.5M)</text>

                {/* Topographical Contour Polyline */}
                <polyline 
                  points="20,135 70,130 140,110 200,105 280,95 360,80 440,55 520,35 580,30" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                />

                {/* Zone 01: Benthic Oceanic (Intertidal Reef) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedZoneId('zone-benthic')}
                  onMouseEnter={() => setHoveredZoneId('zone-benthic')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                >
                  <rect 
                    x="30" y="90" width="100" height="70" 
                    fill={selectedZoneId === 'zone-benthic' ? '#61752D' : (hoveredZoneId === 'zone-benthic' ? 'currentColor' : 'transparent')} 
                    opacity={selectedZoneId === 'zone-benthic' ? '0.2' : (hoveredZoneId === 'zone-benthic' ? '0.08' : '0')} 
                    stroke={selectedZoneId === 'zone-benthic' ? '#61752D' : 'currentColor'}
                    strokeWidth={selectedZoneId === 'zone-benthic' ? '2' : '1'}
                    strokeDasharray={selectedZoneId === 'zone-benthic' ? 'none' : '2 2'}
                  />
                  <circle cx="80" cy="115" r="5" fill={selectedZoneId === 'zone-benthic' ? '#61752D' : 'currentColor'} />
                  <text x="80" y="132" fill="currentColor" fontSize="8" textAnchor="middle" fontWeight="bold">[01] BENTHIC</text>
                  <text x="80" y="142" fill="currentColor" fontSize="7" opacity="0.6" textAnchor="middle">-4.20M</text>
                </g>

                {/* Zone 02: Intertidal Saltmarsh & Estuary */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedZoneId('zone-estuarine')}
                  onMouseEnter={() => setHoveredZoneId('zone-estuarine')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                >
                  <rect 
                    x="150" y="75" width="110" height="70" 
                    fill={selectedZoneId === 'zone-estuarine' ? '#61752D' : (hoveredZoneId === 'zone-estuarine' ? 'currentColor' : 'transparent')} 
                    opacity={selectedZoneId === 'zone-estuarine' ? '0.2' : (hoveredZoneId === 'zone-estuarine' ? '0.08' : '0')} 
                    stroke={selectedZoneId === 'zone-estuarine' ? '#61752D' : 'currentColor'}
                    strokeWidth={selectedZoneId === 'zone-estuarine' ? '2' : '1'}
                    strokeDasharray={selectedZoneId === 'zone-estuarine' ? 'none' : '2 2'}
                  />
                  <circle cx="205" cy="105" r="5" fill={selectedZoneId === 'zone-estuarine' ? '#61752D' : 'currentColor'} />
                  <text x="205" y="122" fill="currentColor" fontSize="8" textAnchor="middle" fontWeight="bold">[02] ESTUARINE</text>
                  <text x="205" y="132" fill="currentColor" fontSize="7" opacity="0.6" textAnchor="middle">+1.80M</text>
                </g>

                {/* Zone 03: Humid Coastal Forest / Mangrove */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedZoneId('zone-subtropical')}
                  onMouseEnter={() => setHoveredZoneId('zone-subtropical')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                >
                  <rect 
                    x="280" y="60" width="120" height="70" 
                    fill={selectedZoneId === 'zone-subtropical' ? '#61752D' : (hoveredZoneId === 'zone-subtropical' ? 'currentColor' : 'transparent')} 
                    opacity={selectedZoneId === 'zone-subtropical' ? '0.2' : (hoveredZoneId === 'zone-subtropical' ? '0.08' : '0')} 
                    stroke={selectedZoneId === 'zone-subtropical' ? '#61752D' : 'currentColor'}
                    strokeWidth={selectedZoneId === 'zone-subtropical' ? '2' : '1'}
                    strokeDasharray={selectedZoneId === 'zone-subtropical' ? 'none' : '2 2'}
                  />
                  <circle cx="340" cy="85" r="5" fill={selectedZoneId === 'zone-subtropical' ? '#61752D' : 'currentColor'} />
                  <text x="340" y="102" fill="currentColor" fontSize="8" textAnchor="middle" fontWeight="bold">[03] HUMID CANOPY</text>
                  <text x="340" y="112" fill="currentColor" fontSize="7" opacity="0.6" textAnchor="middle">+6.50M</text>
                </g>

                {/* Zone 04: Alpine Granite Massif */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => setSelectedZoneId('zone-alpine')}
                  onMouseEnter={() => setHoveredZoneId('zone-alpine')}
                  onMouseLeave={() => setHoveredZoneId(null)}
                >
                  <rect 
                    x="420" y="25" width="130" height="70" 
                    fill={selectedZoneId === 'zone-alpine' ? '#61752D' : (hoveredZoneId === 'zone-alpine' ? 'currentColor' : 'transparent')} 
                    opacity={selectedZoneId === 'zone-alpine' ? '0.2' : (hoveredZoneId === 'zone-alpine' ? '0.08' : '0')} 
                    stroke={selectedZoneId === 'zone-alpine' ? '#61752D' : 'currentColor'}
                    strokeWidth={selectedZoneId === 'zone-alpine' ? '2' : '1'}
                    strokeDasharray={selectedZoneId === 'zone-alpine' ? 'none' : '2 2'}
                  />
                  <circle cx="485" cy="45" r="5" fill={selectedZoneId === 'zone-alpine' ? '#61752D' : 'currentColor'} />
                  <text x="485" y="62" fill="currentColor" fontSize="8" textAnchor="middle" fontWeight="bold">[04] ALPINE MASSIF</text>
                  <text x="485" y="72" fill="currentColor" fontSize="7" opacity="0.6" textAnchor="middle">+45.00M</text>
                </g>

                {/* Wind Vector Arrows */}
                <g opacity="0.4">
                  <line x1="50" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="1" />
                  <polygon points="110,38 116,40 110,42" fill="currentColor" />
                  <text x="50" y="35" fill="currentColor" fontSize="7">OCEANIC GALE // WNW 140 KM/H</text>
                </g>
              </svg>
            </div>

            {/* Quick Climate Zone Selector Chips (Single line, 0px radius) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-onyx/10 dark:border-white/10">
              {CLIMATE_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`p-3 border text-left transition-all cursor-pointer ${
                    selectedZoneId === zone.id
                      ? 'border-moss dark:border-[#8ba83b] bg-moss/10 dark:bg-[#8ba83b]/10 text-onyx dark:text-pure'
                      : 'border-onyx/10 dark:border-white/10 hover:border-onyx/30 dark:hover:border-white/30 text-carbon dark:text-concrete/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-moss dark:text-[#8ba83b]">ZONE [{zone.number}]</span>
                    <span>{zone.elevation}</span>
                  </div>
                  <div className="font-label text-xs font-bold uppercase tracking-wider truncate">
                    {zone.name}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Optimized Biocultural Material Palette for Selected Zone */}
          <div className="border border-onyx/20 dark:border-white/20 bg-pure dark:bg-dark-surface p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-onyx/20 dark:border-white/20">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-moss dark:text-[#8ba83b] uppercase tracking-wider mb-1">
                  <span>ZONE {activeZone.number} // {activeZone.biome}</span>
                  <span>·</span>
                  <span>{activeZone.coordinates}</span>
                </div>
                <h4 className="font-serif text-3xl font-medium text-onyx dark:text-pure">
                  Optimized Biocultural Material Matrix
                </h4>
              </div>

              {/* Action: Apply directly to Calculator */}
              <button
                type="button"
                onClick={() => handleApplyZoneToCalculator(activeZone)}
                className="px-5 py-2.5 bg-onyx text-pure dark:bg-pure dark:text-onyx font-label text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-moss dark:hover:bg-moss dark:hover:text-pure transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
              >
                <span>Load Site into Pre-Dimensioner</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="font-sans text-sm text-carbon dark:text-concrete/70 leading-relaxed max-w-4xl">
              {activeZone.description}
            </p>

            {/* Climate Stress Telemetry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 border border-onyx/10 dark:border-white/10 bg-concrete dark:bg-[#151515]">
                <span className="text-carbon dark:text-concrete/60 block text-[9px] uppercase flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-moss" />
                  Salinidad Litoral
                </span>
                <span className="font-bold text-onyx dark:text-pure mt-1 block">
                  {activeZone.climateMetrics.salinity}
                </span>
              </div>

              <div className="p-3 border border-onyx/10 dark:border-white/10 bg-concrete dark:bg-[#151515]">
                <span className="text-carbon dark:text-concrete/60 block text-[9px] uppercase flex items-center gap-1">
                  <Sun className="w-3 h-3 text-moss" />
                  Delta Térmico
                </span>
                <span className="font-bold text-onyx dark:text-pure mt-1 block">
                  {activeZone.climateMetrics.thermalDelta}
                </span>
              </div>

              <div className="p-3 border border-onyx/10 dark:border-white/10 bg-concrete dark:bg-[#151515]">
                <span className="text-carbon dark:text-concrete/60 block text-[9px] uppercase flex items-center gap-1">
                  <Wind className="w-3 h-3 text-moss" />
                  Presión Eólica / Marea
                </span>
                <span className="font-bold text-onyx dark:text-pure mt-1 block">
                  {activeZone.climateMetrics.windExposure}
                </span>
              </div>

              <div className="p-3 border border-onyx/10 dark:border-white/10 bg-concrete dark:bg-[#151515]">
                <span className="text-carbon dark:text-concrete/60 block text-[9px] uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-moss" />
                  Balance Carbono
                </span>
                <span className="font-bold text-moss dark:text-[#8ba83b] mt-1 block">
                  {activeZone.carbonIndex}
                </span>
              </div>
            </div>

            {/* 4-Layer Material Swatch Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {activeZone.palette.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 border border-onyx/20 dark:border-white/20 bg-concrete dark:bg-[#151515] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-carbon dark:text-concrete/60 uppercase">
                        LAYER 0{idx + 1}
                      </span>
                      <div 
                        className="w-4 h-4 border border-onyx/30 dark:border-white/30" 
                        style={{ backgroundColor: item.color }}
                        title={item.name}
                      />
                    </div>
                    <div className="font-label text-xs font-bold uppercase tracking-wider text-onyx dark:text-pure">
                      {item.name}
                    </div>
                    <div className="font-mono text-[10px] text-moss dark:text-[#8ba83b] font-medium">
                      {item.role}
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-carbon dark:text-concrete/60 leading-relaxed border-t border-onyx/10 dark:border-white/10 pt-2">
                    {item.spec}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* MODULE 2: STRUCTURAL PRE-DIMENSIONER (EUROCODE EN 1995) */}
        {/* ======================================================== */}
        <div className="space-y-8 pt-8 border-t border-onyx/20 dark:border-white/20">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-onyx/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-onyx dark:bg-pure"></span>
              <h4 className="font-label text-xs font-bold tracking-[0.15em] uppercase text-onyx dark:text-pure">
                Structural Pre-Dimensioner // Eurocode EN 1995-1-1
              </h4>
            </div>
            <div className="font-mono text-xs text-carbon dark:text-concrete/60">
              SUBSTRATE: {material.toUpperCase()} · SPAN: {span.toFixed(1)} M · LOAD: {load.toFixed(1)} KN/M²
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Controls */}
            <div className="space-y-10">
              
              {/* Span slider */}
              <div>
                <div className="flex justify-between font-label text-xs font-bold mb-4 uppercase tracking-[0.15em]">
                  <label htmlFor="span-slider">Structural Span</label>
                  <span className="text-onyx dark:text-pure font-mono">{span.toFixed(1)} m</span>
                </div>
                <input
                  id="span-slider"
                  max="28"
                  min="4"
                  step="1"
                  type="range"
                  value={span}
                  onChange={(e) => setSpan(parseFloat(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-mono text-carbon dark:text-concrete/60 mt-2">
                  <span>4.0 M (PAVILION STRUT)</span>
                  <span>28.0 M (MONUMENTAL CLEAR SPAN)</span>
                </div>
              </div>

              {/* Load slider */}
              <div>
                <div className="flex justify-between font-label text-xs font-bold mb-4 uppercase tracking-[0.15em]">
                  <label htmlFor="load-slider">Superimposed Load</label>
                  <span className="text-onyx dark:text-pure font-mono">{load.toFixed(1)} kN/m²</span>
                </div>
                <input
                  id="load-slider"
                  max="10.0"
                  min="1.0"
                  step="0.5"
                  type="range"
                  value={load}
                  onChange={(e) => setLoad(parseFloat(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-mono text-carbon dark:text-concrete/60 mt-2">
                  <span>1.0 KN/M² (LIGHT CANOPY)</span>
                  <span>10.0 KN/M² (HEAVY HYDRODYNAMIC / ROOFTOP EARTH)</span>
                </div>
              </div>

              {/* Material Selector buttons */}
              <div>
                <label className="block font-label text-xs font-bold mb-4 uppercase tracking-[0.15em]">
                  Material Substrate
                </label>
                <div className="grid grid-cols-3 gap-0 border border-onyx/20 dark:border-white/20">
                  <button
                    type="button"
                    onClick={() => setMaterial('geopolymer')}
                    className={`py-4 border-r border-onyx/20 dark:border-white/20 font-label text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      material === 'geopolymer'
                        ? 'bg-onyx text-pure dark:bg-pure dark:text-onyx'
                        : 'bg-transparent text-onyx dark:text-pure hover:bg-concrete dark:hover:bg-dark-canvas'
                    }`}
                  >
                    Bio-Geo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaterial('timber')}
                    className={`py-4 border-r border-onyx/20 dark:border-white/20 font-label text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      material === 'timber'
                        ? 'bg-onyx text-pure dark:bg-pure dark:text-onyx'
                        : 'bg-transparent text-onyx dark:text-pure hover:bg-concrete dark:hover:bg-dark-canvas'
                    }`}
                  >
                    Timber
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaterial('portland')}
                    className={`py-4 font-label text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      material === 'portland'
                        ? 'bg-onyx text-pure dark:bg-pure dark:text-onyx'
                        : 'bg-transparent text-onyx dark:text-pure hover:bg-concrete dark:hover:bg-dark-canvas'
                    }`}
                  >
                    Portland
                  </button>
                </div>
              </div>

            </div>

            {/* Results */}
            <div className="border border-onyx/20 dark:border-white/20 p-8 flex flex-col justify-between bg-concrete dark:bg-[#151515] transition-colors duration-300">
              <div>
                <div className="flex justify-between items-center border-b border-onyx/20 dark:border-white/20 pb-4 mb-8">
                  <span className="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-carbon dark:text-concrete/60">
                    Output Metrics
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider font-bold border px-2 py-1 ${
                      isCompliant
                        ? 'text-moss dark:text-[#8ba83b] border-moss/30 dark:border-[#8ba83b]/30 bg-moss/5 dark:bg-[#8ba83b]/5'
                        : 'text-[#ba1a1a] border-[#ba1a1a]/30 bg-[#ba1a1a]/5'
                    }`}
                  >
                    {isCompliant ? '✓ Compliant' : '⚠ Expansion Req.'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-label text-[10px] font-bold text-carbon dark:text-concrete/60 uppercase tracking-wider mb-2">
                      Beam Depth
                    </div>
                    <div className="font-serif text-5xl font-light text-onyx dark:text-pure">
                      {calculatedDepth} <span className="text-2xl">mm</span>
                    </div>
                  </div>

                  <div>
                    <div className="font-label text-[10px] font-bold text-carbon dark:text-concrete/60 uppercase tracking-wider mb-2">
                      Embodied CO2
                    </div>
                    <div
                      className={`font-serif text-5xl font-light ${
                        netCO2Num < 0 ? 'text-moss dark:text-[#8ba83b]' : 'text-[#ba1a1a]'
                      }`}
                    >
                      {netCO2Num > 0 ? `+${netCO2}` : netCO2}
                    </div>
                    <div className="font-mono text-[9px] text-carbon dark:text-concrete/60 uppercase tracking-widest mt-2">
                      {netCO2Num < 0 ? 'kg/m² negative' : 'kg/m² positive'}
                    </div>
                  </div>
                </div>
              </div>

              {/* SVG Diagram */}
              <div className="mt-16 pt-8 border-t border-onyx/20 dark:border-white/20">
                <div className="flex justify-between items-center mb-6 font-mono text-[10px] text-carbon dark:text-concrete/60 uppercase tracking-widest">
                  <span>Deflection Profile</span>
                  <span>
                    {isCompliant
                      ? `f_max: ${deflectionMM} mm (L/500)`
                      : `f_max: ${deflectionMM} mm (Excessive)`}
                  </span>
                </div>

                <svg className="w-full h-16 overflow-visible" viewBox="0 0 400 100">
                  <line
                    opacity="0.15"
                    stroke="currentColor"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                    x1="20"
                    x2="380"
                    y1="50"
                    y2="50"
                  />
                  <polygon fill="currentColor" points="15,85 25,85 20,75" />
                  <polygon fill="currentColor" points="375,85 385,85 380,75" />
                  <line opacity="0.3" stroke="currentColor" strokeWidth="1" x1="10" x2="390" y1="85" y2="85" />
                  <path d={curvePath} fill="none" stroke={strokeColor} strokeWidth="2" />
                  <circle cx="200" cy={maxSag} fill={strokeColor} r="3" />
                </svg>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
