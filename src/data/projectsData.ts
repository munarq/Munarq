import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'benthic-observatory-01',
    code: 'ARC-01 // BTH',
    title: 'Observatorio Béntico Finisterre',
    subtitle: 'Laboratorio de Biogeoquímica Marina y Plataforma de Mareas',
    typology: 'Benthic Observatory',
    year: '2025',
    location: 'Costa da Morte, Galicia, España',
    coordinates: '42°53\'18" N · 9°15\'46" W',
    area: '1,420 m²',
    image: '/src/assets/images/project_benthic_observatory_1793593126682.jpg',
    status: 'Construido',
    client: 'Consorcio Oceanográfico del Atlántico Norte',
    structuralEngineer: 'Dr. I. Cendón & Tectónica Marítima S.L.',
    leadArchitect: 'MOONU Estudio de Arquitectura',
    description: 'Estructura monolítica de hormigón puzolánico anclada directamente en el batolito granítico intermareal. Diseñada para operar ininterrumpidamente bajo embates de rompiente oceánica de hasta 9 metros de cresta, el edificio actúa simultáneamente como rompeolas disipador de energía y refugio biológico para fauna bentónica.',
    manifestoExcerpt: 'La masa no compite con el océano; absorbe su pulsación tectónica mediante cavidades que favorecen la colonización de algas rojas y moluscos filtradores.',
    materials: [
      {
        name: 'Hormigón Puzolánico Marino pH Neutro',
        description: 'Mezcla con escorias de alto horno y cenizas volcánicas activadas, reduciendo la lixiviación salina y facilitando la adhesión de briozoos.',
        origin: 'Cantera litoral de Cabo Vilán',
        receptivity: '94% compatibilidad de biocolonización'
      },
      {
        name: 'Vidrio de Silicato Laminado 65mm',
        description: 'Aperturas subacuáticas presurizadas para telemetría bentónica y observación de corrientes de fondo.',
        origin: 'Fabricación técnica naval',
        receptivity: 'Refracción marina neutralizada'
      },
      {
        name: 'Bronce Marino al Aluminio',
        description: 'Elementos de cerrajería y juntas de dilatación con pasivación electroquímica marina.',
        origin: 'Fundición portuaria de Ferrol',
        receptivity: 'Inmune a la corrosión galvánica'
      }
    ],
    metrics: {
      carbonBalance: '-18% Huella de Carbono Neta',
      tidalResistance: '120 kN/m² Empuje Hidrodinámico',
      concreteDensity: '2,420 kg/m³ Masa Estructural',
      porosityIndex: '18.4% Superficie Bioreceptiva'
    },
    blueprint: {
      scale: '1:100 / Secciones Tectónicas',
      orientation: 'Orientación Azimutal 284° WNW (Oleaje Dominante)',
      datumElevation: 'Cota +0.00m (Bajamar Viva Equinoccial)',
      zones: [
        { id: 'Z-01', name: 'Cámara de Presión Subacuática', area: '185 m²', level: '-4.20m' },
        { id: 'Z-02', name: 'Plataforma Intermareal de Telemetría', area: '340 m²', level: '+2.80m' },
        { id: 'Z-03', name: 'Laboratorio de Microalgas', area: '410 m²', level: '+6.50m' },
        { id: 'Z-04', name: 'Voladizo Técnico de Observación', area: '260 m²', level: '+10.20m' }
      ],
      structuralNotes: [
        'Anclajes pasivos pretensados de titanio grado 5 introducidos 14 metros en roca madre.',
        'Muros de 90 cm con estriado vertical de encofrado estriado para canalizar escorrentía salina.',
        'Cámara de sobrepresión neumática para evacuación pasiva de niebla salina.'
      ]
    }
  },
  {
    id: 'saline-pavilion-02',
    code: 'ARC-02 // SAL',
    title: 'Pabellón de Halófitas y Filtro Salino',
    subtitle: 'Columnata Porosa y Balsa de Biorretención de Aguas Litorales',
    typology: 'Saline Habitat',
    year: '2024',
    location: 'Marisma de Odiel, Huelva, España',
    coordinates: '37°15\'02" N · 6°58\'24" W',
    area: '880 m²',
    image: '/src/assets/images/project_saline_pavilion_1793593127446.jpg',
    status: 'Construido',
    client: 'Fundación Patrimonio Biocultural',
    structuralEngineer: 'Gabinete de Estructuras Bioclimáticas',
    leadArchitect: 'MOONU Estudio de Arquitectura',
    description: 'Conjunto de pilares facetados de caliza bioclástica y hormigón ciclópeo que sostienen un dosel ortogonal. El agua salada fluye libremente entre las bases de los pilares con los ciclos mareales, alimentando jardines flotantes de Spartina y Salicornia que filtran metales pesados del estuario.',
    manifestoExcerpt: 'La arquitectura renuncia a la condición de barrera seca para constituirse en un filtro poroso de transición ecológica entre la tierra y la marea.',
    materials: [
      {
        name: 'Caliza Bioclástica y Cal Hidráulica Natural',
        description: 'Bloques de cantera costera tallados ortogonalmente con textura rugosa abierta al intercambio iónico.',
        origin: 'Estratos sedimentarios de Niebla',
        receptivity: 'Alta fijación de microfitobentos'
      },
      {
        name: 'Hormigón Ciclópeo con Árido de Concha Reciclada',
        description: 'Sustitución del 35% de grava mineral por conchas de bivalvos trituradas como sumidero biogénico de carbonato cálcico.',
        origin: 'Cooperativas marisqueras locales',
        receptivity: 'Superficie de pH 8.2 bioregulador'
      }
    ],
    metrics: {
      carbonBalance: '-34 kg CO₂/m² Fijación Pasiva',
      tidalResistance: '45 kN/m² Resistencia Hidráulica',
      concreteDensity: '2,180 kg/m³ Masa Aligerada',
      porosityIndex: '28.1% Porosidad Intersticial'
    },
    blueprint: {
      scale: '1:75 / Planta y Alzados',
      orientation: 'Eje Cardinal N-S (Flujo de Marea Ascendente)',
      datumElevation: 'Cota +1.50m (Pleamar Media)',
      zones: [
        { id: 'Z-01', name: 'Columnata de Dispersión Hidráulica', area: '310 m²', level: '+0.50m' },
        { id: 'Z-02', name: 'Canales de Sedimentación Salina', area: '240 m²', level: '-0.20m' },
        { id: 'Z-03', name: 'Pasarela Elevada de Tránsito Botánico', area: '190 m²', level: '+3.10m' },
        { id: 'Z-04', name: 'Cámara de Decantación Litoral', area: '140 m²', level: '-1.00m' }
      ],
      structuralNotes: [
        'Zapatas corridas escalonadas para evitar el lavado por sifonamiento en sustrato limoso.',
        'Nervaduras en V invertida que dispersan el flujo de las mareas vivas hacia las balsas vegetadas.'
      ]
    }
  },
  {
    id: 'tidal-residence-03',
    code: 'ARC-03 // DOM',
    title: 'Monolito Litoral y Refugio de Dunas',
    subtitle: 'Vivienda Tectónica y Espacio de Retiro en Arenal Oceánico',
    typology: 'Coastal Monolith',
    year: '2025',
    location: 'Praia do Guincho, Cascais, Portugal',
    coordinates: '38°43\'55" N · 9°28\'21" W',
    area: '560 m²',
    image: '/src/assets/images/project_tidal_residence_1793593127444.jpg',
    status: 'Construido',
    client: 'Coleccionista Privado & Diseñador Naval',
    structuralEngineer: 'Engenharia Oceânica Lda.',
    leadArchitect: 'MOONU Estudio de Arquitectura',
    description: 'Vivienda unifamiliar que emerge del sistema dunar como un afloramiento pétreo erosionado por el viento atlántico. Formada por dos volúmenes macizos de hormigón entablillado y zinc prepatinado marino, cuenta con un patio excavado que protege contra ráfagas de 100 km/h y capta la radiación solar térmica invernal.',
    manifestoExcerpt: 'Habitar la intemperie no exige blindaje hermético, sino una coreografía de masas pesadas que domestiquen la salinidad y la luz rasante.',
    materials: [
      {
        name: 'Hormigón Entablillado con Madera de Pino Marítimo',
        description: 'Encofrado de tablilla aserrada sin cepillar que transfiere el grano rugoso y la resina vegetal a la piel mineral.',
        origin: 'Pinares costeros de Leiria',
        receptivity: 'Pátina salina gradual autolimpiable'
      },
      {
        name: 'Zinc Prepatinado Gris Grafito',
        description: 'Chapa de zinc engatillada de 0.8mm tratada con fosfatado para resistencia a nieblas con alto tenor de cloruros.',
        origin: 'Laminación europea',
        receptivity: '100% reciclable de ciclo cerrado'
      }
    ],
    metrics: {
      carbonBalance: 'A+ Balance Energético Pasivo',
      tidalResistance: '95 km/h Protección Eólica Continua',
      concreteDensity: '2,350 kg/m³ Inercia Térmica',
      porosityIndex: '12.0% Piel Hidrófuga'
    },
    blueprint: {
      scale: '1:50 / Secciones de Detalle',
      orientation: 'Orientación SW 220° (Protección Eólica N)',
      datumElevation: 'Cota +18.40m sobre Nivel del Mar',
      zones: [
        { id: 'Z-01', name: 'Patio Excavado Termo-Protegido', area: '120 m²', level: '+16.80m' },
        { id: 'Z-02', name: 'Galería Tectónica Principal', area: '210 m²', level: '+18.40m' },
        { id: 'Z-03', name: 'Estudio de Navegación y Mirador', area: '95 m²', level: '+21.60m' },
        { id: 'Z-04', name: 'Cisterna Pluvial Subterránea', area: '80 m²', level: '+14.20m' }
      ],
      structuralNotes: [
        'Muros portantes de 40 cm que confieren 14 horas de retardo de inercia térmica en verano e invierno.',
        'Cámara de aire ventilada con perfiles ocultos de acero inoxidable dúplex 2205.'
      ]
    }
  },
  {
    id: 'speculative-pavilion-04',
    code: 'ARC-04 // PAR',
    title: 'Centro de Ecología Tectónica Litoral',
    subtitle: 'Infraestructura de Investigación Paramétrica y Cultivo Biológico',
    typology: 'Parametric Infrastructure',
    year: '2026',
    location: 'Acantilados de Famara, Lanzarote, Islas Canarias',
    coordinates: '29°07\'12" N · 13°33\'45" W',
    area: '2,850 m²',
    image: '/src/assets/images/hero_oceanic_architecture_1793593126605.jpg',
    status: 'Investigación Prototípica',
    client: 'Instituto Internacional de Arquitectura y Mares Vivos',
    structuralEngineer: 'MOONU Computational Lab',
    leadArchitect: 'MOONU Estudio de Arquitectura',
    description: 'Complejo de investigación escalonado en el acantilado basáltico compuesto por pasarelas en voladizo, una torre de observación meteorológica y una cúpula panorámica cantilever. Utiliza algoritmos de optimización topológica para minimizar el uso de hormigón un 32% manteniendo rigidez frente a vientos alisios y marejadas.',
    manifestoExcerpt: 'La computación contemporánea no produce formas arbitrarias; calcula el espesor exacto que exige la física marina y la geología de la roca madre.',
    materials: [
      {
        name: 'Hormigón Geopolimérico de Escoria Basáltica',
        description: 'Formulado a partir de ceniza volcánica local y silicato sódico sin clinker Portland, ahorrando un 78% de emisiones asociadas.',
        origin: 'Depósitos piroclásticos locales regulados',
        receptivity: 'Elevada afinidad con líquenes marinos'
      },
      {
        name: 'Titanio Grado 2 Anodizado Marino',
        description: 'Tirantes estructurales y pernos de alta elasticidad para suspensión de pasarelas técnicas.',
        origin: 'Ingeniería aeroespacial',
        receptivity: 'Vida útil estimada > 200 años'
      }
    ],
    metrics: {
      carbonBalance: '-42% Emisiones de Fabricación',
      tidalResistance: '160 kN/m² Resistencia a Tsunami Menor',
      concreteDensity: '2,480 kg/m³ Resistencia C60/75',
      porosityIndex: '22.6% Matriz Paramétrica'
    },
    blueprint: {
      scale: '1:200 / Masterplan Tectónico',
      orientation: 'Orientación NNW 340° (Encuentro Alisio-Océano)',
      datumElevation: 'Cotas Escalonadas de +12.00m a +48.00m',
      zones: [
        { id: 'Z-01', name: 'Muelles de Atraque para Batiscafos', area: '450 m²', level: '+4.00m' },
        { id: 'Z-02', name: 'Núcleo Central de Cálculo Estructural', area: '720 m²', level: '+18.00m' },
        { id: 'Z-03', name: 'Auditorio Volado sobre Rompiente', area: '580 m²', level: '+26.50m' },
        { id: 'Z-04', name: 'Observatorio Cúpula de Alisios', area: '320 m²', level: '+42.00m' }
      ],
      structuralNotes: [
        'Celosía hiperbólica en voladizo calculada mediante elementos finitos (FEA).',
        'Contrapesos sísmicos de masa sintonizada alojados en la torre de telemetría.'
      ]
    }
  }
];

export const STUDIO_METRICS = [
  { label: 'Proyectos Litorales Entregados', value: '28', unit: 'Obras' },
  { label: 'Reducción de Huella de Carbono', value: '-38%', unit: 'kg CO₂/m²' },
  { label: 'Resistencia Hidráulica Certificada', value: '160', unit: 'kN/m²' },
  { label: 'Superficie Bioreceptiva Integrada', value: '14,200', unit: 'm²' }
];

export const MATERIAL_SAMPLES = [
  {
    id: 'mat-01',
    code: 'MAT // PZ-01',
    name: 'Hormigón Puzolánico Marino',
    type: 'Matriz Mineral de Alta Resistencia',
    composition: 'Escoria de alto horno + ceniza volcánica + árido silíceo litoral',
    ph: '8.4 (Biocompatible)',
    lifespan: '> 150 años en inmersión',
    carbonSaved: '54 kg CO₂/m³ vs Portland estándar',
    tactileTexture: 'Superficie rugosa con estriado de 8mm, pátina mineral salina gris azulada.'
  },
  {
    id: 'mat-02',
    code: 'MAT // SH-02',
    name: 'Árido de Concha Biogénica Reciclada',
    type: 'Compuesto Carbonatado Circular',
    composition: 'Valvas de bivalvos calcinadas a baja temperatura (35% matriz)',
    ph: '8.1 (Incentivador de flora marina)',
    lifespan: '> 120 años',
    carbonSaved: '82 kg CO₂/m³ fijados biológicamente',
    tactileTexture: 'Inclusiones nacaradas reflectantes sobre base de hormigón claro pulido al agua.'
  },
  {
    id: 'mat-03',
    code: 'MAT // ZN-03',
    name: 'Zinc Prepatinado Litoral',
    type: 'Blindaje Metálico Auto-Regenerativo',
    composition: 'Aleación de zinc con 0.15% titanio y 0.2% cobre electrolítico',
    ph: 'Inerte',
    lifespan: '> 100 años en ambiente C5-M marino',
    carbonSaved: '100% reciclable sin degradación',
    tactileTexture: 'Acabado mate aterciopelado gris pizarra, resistente al rayado por arenas eólicas.'
  },
  {
    id: 'mat-04',
    code: 'MAT // WD-04',
    name: 'Madera de Pino Marítimo Acetilada',
    type: 'Elemento Orgánico de Transición',
    composition: 'Madera maciza saturada de anhídrido acético vegetal',
    ph: '6.8 (Neutral)',
    lifespan: '50 años en contacto con agua salada',
    carbonSaved: '-320 kg CO₂/m³ capturados',
    tactileTexture: 'Veta pronunciada expuesta al cepillado radial, tonalidad plateada natural con la edad.'
  }
];
