export type Project = {
  slug: string;
  index: string;
  title: string;
  location: string;
  year: string;
  type: string;
  area: string;
  coords: string;
  image: string;
  size: "wide" | "half";
  description: string;
  system: string;
  carbonMetric: string;
  materials: { name: string; origin: string; role: string }[];
  datum: string;
  span: string;
};

export const projects: Project[] = [
  {
    slug: "casa-estrato",
    index: "01",
    title: "Casa Estrato",
    location: "Valle de Bravo, MX",
    year: "2024",
    type: "Vivienda unifamiliar",
    area: "420 m²",
    coords: "19.2047° N · 100.1319° W",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80&auto=format&fit=crop",
    size: "wide",
    description:
      "Monolito ciclópeo encastrado en ladera basáltica. La masa térmica del hormigón visto y los muros de tierra compactada amortiguan la oscilación térmica diurna, mientras una cubierta vegetal de especies rupícolas filtra el agua de escorrentía.",
    system: "Muros portantes de hormigón ciclópeo + Envolvente higrotérmica",
    carbonMetric: "-38% CO₂ eq vs. media regional",
    materials: [
      { name: "Hormigón ciclópeo", origin: "Áridos de cantera local (Valle de Bravo)", role: "Inercia térmica estructural" },
      { name: "Pino oaxaqueño laminado", origin: "Silvicultura certificada FSC", role: "Viguería secundaria" },
      { name: "Sustrato volcánico y musgo", origin: "Microcuenca local", role: "Retención hídrica en cubierta" },
    ],
    datum: "±0.00 M · COTA DE CORTE 1,840 MSNM",
    span: "14.20 M EN CRUJÍA PRINCIPAL",
  },
  {
    slug: "pabellon-mineral",
    index: "02",
    title: "Pabellón Mineral",
    location: "Oaxaca, MX",
    year: "2023",
    type: "Pabellón cultural",
    area: "180 m²",
    coords: "17.0732° N · 96.7266° W",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&q=80&auto=format&fit=crop",
    size: "half",
    description:
      "Intervención efímera permanente articulada mediante cantera verde oaxaqueña y juntas secas de cal apagada. Su geometría optimiza la ventilación por efecto chimenea y proporciona sombra continua a la plaza adyacente.",
    system: "Estructura autoportante de cantera tallada + Articulaciones en seco",
    carbonMetric: "92 kg CO₂/m² (ciclo de vida A1-A3)",
    materials: [
      { name: "Cantera verde de Magdalena", origin: "Oaxaca Central", role: "Celosía y muros autoportantes" },
      { name: "Mortero de cal aérea añeja", origin: "Tlacolula", role: "Juntas transpirables reversibles" },
      { name: "Acero pavonado en aceite", origin: "Taller artesanal", role: "Tensores de atado antisísmico" },
    ],
    datum: "±0.00 M · COTA PATIO 1,550 MSNM",
    span: "8.60 M EN VOLADIZO LATERAL",
  },
  {
    slug: "invernadero-urbano",
    index: "03",
    title: "Invernadero Urbano",
    location: "CDMX, MX",
    year: "2023",
    type: "Equipamiento",
    area: "1,200 m²",
    coords: "19.4326° N · 99.1332° W",
    image:
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=1600&q=80&auto=format&fit=crop",
    size: "half",
    description:
      "Laboratorio botánico y banco de germoplasma de alta densidad en la densa trama urbana. Su doble piel bioclimática de vidrio de baja emisividad y celosías cinéticas de madera regula la humedad y capta 180,000 litros de agua pluvial al año.",
    system: "Pórticos de acero reciclado S355 + Doble fachada bioclimática",
    carbonMetric: "+14,000 kWh/año producidos en cubierta solar bifacial",
    materials: [
      { name: "Acero reciclado de alta resistencia", origin: "Reciclaje metalúrgico regional", role: "Pórticos esbeltos" },
      { name: "Vidrio templado bajo en hierro", origin: "CDMX", role: "Captación fotosintética 92%" },
      { name: "Celosías de cedro blanco", origin: "Puebla", role: "Control solar automatizado" },
    ],
    datum: "±0.00 M · COTA AZOTEA 2,240 MSNM",
    span: "18.00 M EN NAVE BIOCLIMÁTICA",
  },
];
