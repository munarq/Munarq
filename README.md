# MUNΛRQ
### Biocultural & Computational Architecture Studio

> *Mineral tectonics, vegetal envelopes.*  
> Estudio de arquitectura eco-brutalista y biophilic que fusiona hormigón visto, estratos vegetales y diseño computacional.

---

## 1. Identidad Visual & Brand Book

MUNΛRQ opera con una disciplina estética estricta inspirada en publicaciones canónicas de arquitectura (*El Croquis*, *Detail*, *Domus*):

| Elemento | Especificación |
|---|---|
| **Paleta Principal** | **Concrete White** (`#F5F5F5`), **Onyx** (`#1A1A1A`), **Moss Green** (`#61752D` / `#8ba83b`) |
| **Paleta Secundaria** | **Pure White** (`#FFFFFF`), **Carbon** (`#555555`), **Dark Canvas** (`#121212`), **Greige** (`#E8E6DF`) |
| **Geometría** | Bordes ortogonales con **0px border-radius** universal. Profundidad resuelta con líneas perimetrales de **1px** (`box-shadow: none !important`). |
| **Tratamiento Gráfico** | Imágenes en **escala de grises (100%)** con transición fluida a color y sutil micro-zoom (`scale(1.05)`) en interacción hover. |
| **Tipografía** | **Cormorant** (Display y títulos serif), **Montserrat** (Monogramas y acentos), **Inter** (Texto editorial y UI), **Space Mono** (Metadatos, acotaciones y coordenadas). |

---

## 2. Estructura del Repositorio

```text
munarq/
├── .github/
│   └── workflows/
│       └── ci.yml               # CI automatizado (Typecheck + Vite + esbuild)
├── public/
│   ├── favicon.svg              # Isotipo geométrico en SVG
│   └── robots.txt               # Directivas de indexación y sitemap
├── src/
│   ├── components/
│   │   ├── Footer.tsx           # Pie de página y créditos editoriales
│   │   ├── Hero.tsx             # Apertura editorial de pantalla completa
│   │   ├── Manifesto.tsx        # Declaración doctrinal y tectónica
│   │   ├── Navbar.tsx           # Navegación fija con selector de tema
│   │   ├── ProjectBlueprintModal.tsx # Pliegos técnicos vectoriales (SVG 1:50)
│   │   ├── ResearchLab.tsx      # Calculadora estructural y Mapeo Biocultural
│   │   ├── Reveal.tsx           # Observer de aparición progresiva
│   │   └── SelectedWorks.tsx    # Cuadrícula editorial de obras
│   ├── lib/
│   │   ├── api.ts               # Cliente HTTP para /api/analyze
│   │   ├── projects.ts          # Fuente de datos normalizada de obras
│   │   └── useTheme.ts          # Persistencia de tema claro/oscuro
│   ├── App.tsx                  # Enrutador principal y controlador de hash
│   ├── index.css                # Motor de estilos Tailwind v4 y variantes
│   └── main.tsx                 # Entrada de aplicación React 19
├── server.ts                    # Backend Express + @google/genai con fallback
├── vite.config.ts               # Bundler Vite con proxy inverso /api -> :3001
├── tsconfig.json                # Configuración TypeScript estricta
├── metadata.json                # Descriptor de aplicación AI Studio
├── .env.example                 # Variables de entorno documentadas
└── package.json                 # Scripts de orquestación y dependencias
```

---

## 3. Stack Tecnológico

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend**: Express 4, Node.js 20+, `tsx`, `esbuild`.
- **Inteligencia Artificial**: `@google/genai` (modelo `gemini-3.8-flash`) con degradación determinista matemática local si no se configura API key.
- **Seguridad**: Validación estricta de cotas en payload, rate limiter por IP en memoria y variables de entorno protegidas en el servidor.

---

## 4. Instalación y Ejecución Local

### Prerrequisitos
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### 1. Clonar e instalar dependencias
```bash
git clone https://github.com/tu-usuario/munarq.git
cd munarq
npm install
```

### 2. Configurar variables de entorno
Copia la plantilla `.env.example`:
```bash
cp .env.example .env
```
Edita `.env` con tus credenciales:
```env
GEMINI_API_KEY="AIzaSy..."       # Opcional (degrada a cálculo local si falta)
PORT="3001"                     # Puerto del backend Express
```

### 3. Iniciar entorno de desarrollo
```bash
npm run dev
```
- **Cliente Web**: `http://localhost:3000`
- **API Express**: `http://localhost:3001` (con proxy automático `/api` desde Vite)

---

## 5. Scripts de Compilación y Producción

| Comando | Acción |
|---|---|
| `npm run lint` | Ejecuta verificación estricta de tipos (`tsc --noEmit`). |
| `npm run build` | Compila frontend con Vite y empaqueta `server.ts` con esbuild en `dist/server.js`. |
| `npm run start` | Inicia el servidor de producción sirviendo la API y el bundle estático. |

---

## 6. Endpoints de la API

### `GET /api/health`
Estado del servicio y disponibilidad de credenciales Gemini.

### `POST /api/analyze`
Genera un análisis estructural y bioclimático editorial para vigas simplemente apoyadas.
- **Rate Limit**: 20 solicitudes / minuto por IP.
- **Cotas**: Luz (`1.0` a `50.0` m), Carga (`0.5` a `100.0` kN/m²).
- **Respuesta**:
```json
{
  "text": "Párrafo editorial analizando inercia, deflexión y carbono embebido...",
  "source": "gemini" // o "fallback" si opera sin clave externa
}
```

---

## 7. Licencia

Código bajo [Licencia MIT](LICENSE). Fotografías y material arquitectónico propiedad intelectual de MUNΛRQ Studio.
