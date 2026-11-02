import { RecommendationPillar } from '../types';

export const ARCHITECTURE_WEB_RECOMMENDATIONS: RecommendationPillar[] = [
  {
    id: 'pillar-01',
    number: '01',
    tag: 'Tectónica & Identidad',
    title: 'Identidad Tectónica vs. Plantillas Genéricas (Anti-Slop)',
    subtitle: 'Cómo transmitir peso físico, rigor constructivo y autoridad conceptual en la web.',
    summary: 'Los estudios de arquitectura de primer nivel internacional (Herzog & de Meuron, Souto de Moura, SANAA, Elemental) proyectan su arquitectura en la web a través de la contención, la precisión ortogonal y la ausencia de artificios decorativos.',
    whyItMatters: 'Un promotor institucional o un cliente que va a invertir millones de euros en una obra singular descarta inmediatamente webs que parecen plantillas de startups de software (pastillas de colores, sombras difuminadas, degradados violetas y esquinas redondeadas tipo iOS).',
    antiPattern: 'Tarjetas flotantes con bordes `rounded-2xl`, píldoras de colores para etiquetas (`rounded-full bg-blue-100`), sombras difusas con desenfoque (`blur-md`), y tipografía estándar del sistema (`Inter` o `Roboto`).',
    solution: 'Adopción del Eco-Brutalismo Oceánico: geometría de radio cero (`rounded-none`), marcos perimetrales tectónicos de 2px en `#033141`, sombras duras de desplazamiento arquitectónico (`4px 4px 0px #033141`) y líneas de replanteo con cruces de cota (`+`).',
    checklist: [
      'Eliminar todo borde redondeado (`rounded-none` estricto en botones, tarjetas e inputs).',
      'Definir líneas de cota continuas de 1px a 2px en lugar de espacios vacíos desarticulados.',
      'Sustituir sombras suaves por desplazamientos rígidos ortogonales (offset de 4px o 6px).',
      'Utilizar fondos minerales desaturados (`#F4F8F9`, `#F2FBFF`) que evoquen hormigón lavado y niebla salina.'
    ],
    codeSnippet: `/* Desplazamiento brutalista puro sin desenfoque */
.brutalist-frame {
  border: 2px solid #033141;
  border-radius: 0px;
  box-shadow: 4px 4px 0px #033141;
  background-color: #F4F8F9;
}`
  },
  {
    id: 'pillar-02',
    number: '02',
    tag: 'Tipografía',
    title: 'Jerarquía Tipográfica Tripartita Rigurosa',
    subtitle: 'El diálogo entre masa escultórica (Syne), reflexión humanista (Cormorant) y telemetría (Space Mono).',
    summary: 'La arquitectura es simultáneamente ingeniería pesada, reflexión humanística y cálculo paramétrico. La web debe reflejar estas tres dimensiones sin saturar.',
    whyItMatters: 'El visitante percibe el rigor intelectual del estudio cuando la tipografía editorial (manifiesto) convive en tensión calibrada con la tipografía monospaciada de planos y la titulación escultórica.',
    antiPattern: 'Usar una sola tipografía genérica para todo el sitio, o mezclar más de 3 familias sin rol jerárquico claro. Textos en mayúsculas forzadas difíciles de leer en párrafos largos.',
    solution: 'Regla del 2+1: Syne (Titulares pesados de corte escultórico), Cormorant Garamond (Citas del manifiesto y memoria conceptual), Space Mono (Cotas, coordenadas, m² y especificaciones técnicas), y DM Sans (Prosa operativa de alta legibilidad).',
    checklist: [
      'Titulares con Syne en pesos 700/800 con tracking negativo (-0.03em).',
      'Memorias conceptuales y fragmentos teóricos en Cormorant Garamond en cursiva o peso 500.',
      'Fichas técnicas y telemetría con Space Mono y números tabulares (`font-mono tabular-nums`).',
      'Textos largos de proyectos en DM Sans (15-16px, interlineado 1.6, medida 65-75ch).'
    ],
    codeSnippet: `<h1>SYNE 800 · TECTÓNICA COSTERA</h1>
<p class="font-cormorant italic text-lg">"La masa mineral absorbe la pulsación del oleaje..."</p>
<span class="font-mono text-xs uppercase tracking-widest">LAT 42°53'N · COTAS -4.20M</span>`
  },
  {
    id: 'pillar-03',
    number: '03',
    tag: 'Dossier de Proyectos',
    title: 'Anatomía del Caso de Estudio Arquitectónico',
    subtitle: 'Estructuración completa: de la planimetría vectorial a la huella biocultural.',
    summary: 'Una web de arquitectura no es una galería de fotos de Instagram. Cada proyecto debe presentarse como un dossier técnico-editorial con rigor de publicación monográfica (tipo El Croquis o Detail).',
    whyItMatters: 'Comités de concursos públicos, universidades y promotores de élite juzgan a un estudio por su capacidad de documentar la construcción, los detalles de encuentro y el desempeño ambiental.',
    antiPattern: 'Subir solo 3 renders o fotos sin planos, sin cotas, sin memoria constructiva y sin créditos de ingeniería.',
    solution: 'Estructurar cada proyecto en 4 capas obligatorias: 1. Fotografía construida en atmósfera real; 2. Planimetría vectorial interactiva (plantas, secciones con cotas); 3. Ficha de materiales bioculturales y resistencia climática; 4. Desglose de colaboradores y créditos técnicos.',
    checklist: [
      'Incluir visor interactivo de plano en planta (SVG) con selector de cotas y zonas.',
      'Detallar el sistema estructural y las cargas de diseño (ej. empuje hidrodinámico o vientos).',
      'Describir el origen y bioreceptividad de cada material (puzolanas, hormigón de conchas, zinc marino).',
      'Añadir coordenadas geográficas reales y orientación azimutal respecto al oleaje o soleamiento.'
    ],
    codeSnippet: `// Estructura de metadatos requerida por proyecto
{
  coordenadas: "42°53'18\" N · 9°15'46\" W",
  cotaReplanteo: "+0.00m (Bajamar Equinoccial)",
  empujeHidraulico: "120 kN/m²",
  bioreceptividad: "94% compatibilidad de flora litoral"
}`
  },
  {
    id: 'pillar-04',
    number: '04',
    tag: 'Herramientas Interactivas',
    title: 'Calculadoras y Laboratorios Paramétricos en Vivo',
    subtitle: 'Transformar la web de un catálogo estático a un motor de investigación activo.',
    summary: 'Incorporar un módulo interactivo (como el Biocultural Parametric Lab de MOONU) donde clientes y colegas puedan simular variables climáticas y ver respuestas formales y de fijación de carbono.',
    whyItMatters: 'Demuestra competencia técnica real en diseño computacional y ecología aplicada, posicionando al estudio en la vanguardia frente a firmas tradicionales que solo muestran imágenes pasivas.',
    antiPattern: 'Afirmar que el estudio es "innovador y sostenible" con textos vacíos sin aportar pruebas cuantitativas ni herramientas interactivas verificables.',
    solution: 'Desarrollar un simulador paramétrico client-side donde al alterar la amplitud de marea, la salinidad o la porosidad requerida, se recalcule dinámicamente el espesor murario, la disipación de ola y los kg de CO₂ retenidos.',
    checklist: [
      'Proporcionar controles deslizantes matemáticos con unidades físicas explícitas (m, kN/m², kg CO₂).',
      'Visualizar en tiempo real el corte esquemático de la sección del muro en SVG reactivo.',
      'Generar un informe descargable o imprimible con las variables calibradas para el cliente.',
      'Conectar el simulador con el formulario de encargo (brief) para pre-llenar los requisitos del sitio.'
    ]
  },
  {
    id: 'pillar-05',
    number: '05',
    tag: 'Conversión & Encargos',
    title: 'El "Brief Tectónico" vs. El Formulario de Contacto Trivial',
    subtitle: 'Cómo calificar y captar encargos de alto valor con un configurador de proyecto.',
    summary: 'Los clientes serios no quieren un formulario genérico con "Nombre", "Email" y "Mensaje". Prefieren un proceso guiado que demuestre que el estudio comprende la complejidad de su emplazamiento.',
    whyItMatters: 'Un "Brief Builder" interactivo filtra clientes desalineados, reduce semanas de reuniones preliminares y entrega al arquitecto los datos clave del solar desde el primer contacto.',
    antiPattern: 'Un formulario estándar con campos vacíos y botón de "Enviar", o botones tipo popup invasivos que molestan la lectura del portfolio.',
    solution: 'Configurador en 3 pasos: 1. Tipología y escala (m² y uso); 2. Condiciones de emplazamiento (cota de costa, exposición al oleaje/salitre); 3. Requerimientos bioculturales y horizonte de presupuesto. Al finalizar, genera un resumen formal de encargo.',
    checklist: [
      'Preguntar por distancia a la línea de costa y exposición salina.',
      'Permitir seleccionar objetivos ecológicos (fijación de carbono, bioreceptividad, autosuficiencia).',
      'Ofrecer exportación en texto/resumen estructurado del encargo arquitectónico.',
      'Conectar con enlace directo a correo profesional verificado (`arqmoonu@gmail.com`).'
    ]
  },
  {
    id: 'pillar-06',
    number: '06',
    tag: 'Rendimiento & UI',
    title: 'Contrato de Barra Superior y Cero Distracción Visual',
    subtitle: 'Regla de las 3 zonas: Wordmark, 4 enlaces concisos y 1 llamada a la acción.',
    summary: 'La barra de navegación debe cumplir estrictamente el contrato de una sola fila y 3 zonas separadas por un espacio generoso, sin amontonar estados, ni menús desplegables caóticos.',
    whyItMatters: 'Un encabezado sobrecargado con banderas, selectores de idioma innecesarios, teléfonos gigantes o widgets de redes sociales destruye la serenidad espacial del sitio.',
    antiPattern: 'Cabeceras con 2 o 3 filas, pastillas de colores dentro de los enlaces, o logos con subtítulos diminutos pegados.',
    solution: 'Zona 1: Wordmark sobrio en tipografía Syne; Zona 2: 4 enlaces directos con subrayado sutil al pasar el cursor; Zona 3: 1 botón de acción primario con borde negro-marino y desplazamiento brutalista.',
    checklist: [
      'Cabecera en una sola fila fija o estática con borde inferior de 2px (`border-[#033141]`).',
      'Links directos a las secciones troncales: Proyectos, Manifiesto, Laboratorio, y Auditoría.',
      'Controles táctiles optimizados para móvil sin menús que cubran más del 15% de la pantalla.',
      'Sin iconos decorativos parpadeantes o falsos indicadores de estado en tiempo real.'
    ]
  }
];

export const ARCHITECTURAL_WEB_CHECKLIST = [
  { id: 'chk-1', task: 'Planimetrías vectoriales (plantas, cortes) en formato SVG nítido y legible en retina display.', status: 'Essential', category: 'Portfolio' },
  { id: 'chk-2', task: 'Fotografía con luz natural y atmósfera de intemperie (sin renders hiper-brillantes de fantasía).', status: 'Essential', category: 'Imágenes' },
  { id: 'chk-3', task: 'Ficha de materiales con geolocalización de canteras o suministros de proximidad.', status: 'Recommended', category: 'Biocultural' },
  { id: 'chk-4', task: 'Memoria explicativa en tono sobrio y reflexivo (evitar jerga de marketing comercial).', status: 'Essential', category: 'Contenido' },
  { id: 'chk-5', task: 'Configurador de encargos con cálculo de programa arquitectónico y condicionantes costeros.', status: 'High-Impact', category: 'Conversión' },
  { id: 'chk-6', task: 'Identidad tipográfica propia con al menos una fuente display escultórica y una monospaciada técnica.', status: 'Essential', category: 'Tipografía' },
  { id: 'chk-7', task: 'Cumplimiento de contraste WCAG AA sobre fondos de hormigón claro y piedra caliza.', status: 'Technical', category: 'Accesibilidad' },
  { id: 'chk-8', task: 'Velocidad de carga inmediata con precarga de planos e imágenes optimizadas en WebP/AVIF.', status: 'Technical', category: 'Performance' }
];
