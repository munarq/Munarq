export type ResourceFormat = "EXCEL" | "BIM" | "WEB TOOL" | "DOCUMENTO";
export type ResourceStatus = "available" | "coming-soon";

export type ResourceSpec = {
  label: string;
  value: string;
};

export type Resource = {
  slug: string;
  index: string;
  format: ResourceFormat;
  status: ResourceStatus;
  title: string;
  subtitle: string;
  description: string;
  version: string;
  priceMXN: number;
  specs: ResourceSpec[];
  image?: string;
  paymentLink: string;
  waitlistEmail?: string;
};

export const resources: Resource[] = [
  {
    slug: "boh-parametrico",
    index: "01",
    format: "EXCEL",
    status: "coming-soon",
    title: "BOH Paramétrico",
    subtitle: "Zonificación de cocinas comerciales · Café-Bistro",
    description:
      "Plantilla paramétrica en Excel que modela 8 zonas funcionales de una cocina comercial. Integra cálculo automatizado de factores de demanda eléctrica bajo NEC 220.56 y especificación de drenajes indirectos según NOM-093-SSA1. Reemplaza la hoja de zonificación manual con una sola tabla dinámica auditable.",
    version: "v3.13",
    priceMXN: 890,
    specs: [
      { label: "Formato", value: "XLSX · Excel 365 / 2019" },
      { label: "Alcance", value: "8 zonas funcionales" },
      { label: "Normativa", value: "NEC 220.56 · NOM-093-SSA1" },
      { label: "Salida", value: "Cuadro de cargas + memoria técnica" },
      { label: "Actualización", value: "v3.13 · 2026" },
    ],
    paymentLink: "",
    waitlistEmail: "studio@munarq.mx",
  },
  {
    slug: "qto-push",
    index: "02",
    format: "BIM",
    status: "coming-soon",
    title: "MUNΛRQ QTO Push",
    subtitle: "Automatización de Quantity Takeoffs · Revit → Dynamo → CPython",
    description:
      "Paquete de automatización BIM compuesto por un grafo de extracción en Dynamo y un esquema de CPython. Extrae cuantificaciones de obra directamente desde modelos de Revit, estandarizando toda la exportación en unidades métricas estrictas y eliminando el retrabajo manual de tablas de planificación.",
    version: "v6",
    priceMXN: 1890,
    specs: [
      { label: "Formato", value: "DYN + CPython (.py)" },
      { label: "Compatible", value: "Revit 2023+ · Dynamo 2.13+" },
      { label: "Unidades", value: "Sistema Métrico Decimal (SI)" },
      { label: "Salida", value: "CSV + tabla de planificación" },
      { label: "Actualización", value: "v6 · 2026" },
    ],
    paymentLink: "",
    waitlistEmail: "studio@munarq.mx",
  },
  {
    slug: "motores-zero-dependency",
    index: "03",
    format: "WEB TOOL",
    status: "coming-soon",
    title: "Motores Zero-Dependency",
    subtitle: "Calculadoras HTML · Sin servidor · Sin base de datos",
    description:
      "Suite de herramientas interactivas programadas en HTML, CSS y JavaScript puro. Calculan aforo de locales, pre-dimensionamiento de escaleras y cuadros de cargas normativas directamente en el navegador. No requieren instalación, licencia de software ni conexión a base de datos: se abren localmente y funcionan offline.",
    version: "v1",
    priceMXN: 390,
    specs: [
      { label: "Formato", value: "HTML + CSS + JS (vanilla)" },
      { label: "Ejecución", value: "Local · navegador · sin instalación" },
      { label: "Módulos", value: "Aforo · Escaleras · Cargas" },
      { label: "Salida", value: "Pantalla + impresión" },
      { label: "Actualización", value: "v1 · 2026" },
    ],
    paymentLink: "",
    waitlistEmail: "studio@munarq.mx",
  },
  {
    slug: "matriz-envolvente",
    index: "04",
    format: "DOCUMENTO",
    status: "coming-soon",
    title: "Matriz de Cumplimiento de Envolvente",
    subtitle: "NOM-020-ENER-2011 · Validado en Ribera 33",
    description:
      "Documento de trabajo estructurado para evaluar la ganancia térmica de edificios bajo NOM-020-ENER-2011. Formato de tabla auditable con celdas de verificación por sistema constructivo, listo para integrarse directamente en evaluaciones de certificación LEED v5. Validado en la entrega del proyecto Ribera 33.",
    version: "v1",
    priceMXN: 590,
    specs: [
      { label: "Formato", value: "PDF + XLSX de trabajo" },
      { label: "Normativa", value: "NOM-020-ENER-2011 · LEED v5" },
      { label: "Alcance", value: "Envolvente térmica por sistema" },
      { label: "Uso", value: "Auditoría + certificación" },
      { label: "Actualización", value: "v1 · 2026" },
    ],
    paymentLink: "",
    waitlistEmail: "studio@munarq.mx",
  },
];
