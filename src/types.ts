export interface Project {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  typology: 'Coastal Monolith' | 'Saline Habitat' | 'Benthic Observatory' | 'Parametric Infrastructure';
  year: string;
  location: string;
  coordinates: string;
  area: string;
  image: string;
  status: 'Construido' | 'En Construcción' | 'Investigación Prototípica';
  client: string;
  structuralEngineer: string;
  leadArchitect: string;
  description: string;
  manifestoExcerpt: string;
  materials: {
    name: string;
    description: string;
    origin: string;
    receptivity: string;
  }[];
  metrics: {
    carbonBalance: string;
    tidalResistance: string;
    concreteDensity: string;
    porosityIndex: string;
  };
  blueprint: {
    scale: string;
    orientation: string;
    datumElevation: string;
    zones: { id: string; name: string; area: string; level: string }[];
    structuralNotes: string[];
  };
}

export interface RecommendationPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  whyItMatters: string;
  antiPattern: string;
  solution: string;
  checklist: string[];
  codeSnippet?: string;
  tag: string;
}

export interface BriefRequest {
  clientName: string;
  organization: string;
  email: string;
  typology: string;
  location: string;
  targetArea: number;
  marineExposure: 'Submerged / Intertidal' | 'Coastal Cliff (<100m)' | 'Coastal Plain (<1km)' | 'Continental Inland';
  sustainabilityGoals: string[];
  estimatedBudget: string;
  briefNotes: string;
}
