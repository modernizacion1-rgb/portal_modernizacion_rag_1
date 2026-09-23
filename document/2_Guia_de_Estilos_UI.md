# Guía de Estilos UI e Identidad Visual - AGROIDEAS

## Resumen de UI (User Interface) y Filosofía de Diseño
El Portal Web de Gestión y Modernización adopta una estética **Modern Government / Tech Executive**, combinando la sobriedad y formalidad institucional del Estado peruano (MIDAGRI - AGROIDEAS) con tendencias visuales modernas de alta usabilidad: efecto espejo (*Glassmorphism*), elevación de sombras multinivel, bordes de curvatura orgánica y tipografía sin serifa de alta legibilidad en pantallas digitales.

---

## 1. Framework y Metodología (Tailwind CSS)
El sitio utiliza **Tailwind CSS** (inyectado vía CDN de desarrollo o empaquetado optimizado en producción) como motor principal de diseño declarativo:
- **Agilidad Maquetadora:** Permite construir layouts complejos y adaptativos aplicando clases directamente en las etiquetas HTML.
- **Consistencia Visual:** Normaliza las escalas de espaciado (`p-6`, `my-12`, `gap-8`), radios de borde (`rounded-2xl`, `rounded-3xl`, `rounded-[3rem]`) y sombras (`shadow-sm`, `shadow-xl`, `shadow-2xl`).
- **Desacoplamiento Estructural:** Evita la colisión de estilos en cascada y facilita la creación de nuevos micro-componentes por parte de desarrolladores o agentes IA sin inflar el tamaño de hojas CSS externas.

---

## 2. Sistema de Variables Institucionales (`css/modern-styles.css`)
Los colores clave del branding institucional han sido definidos como variables CSS raíz (`:root`) dentro de `css/modern-styles.css`, siguiendo la línea gráfica **"Impulsa Agroideas"** (Verde Principal, Verde Activo y Acento Amarillo), y extendidos en la configuración local de Tailwind en el `<head>` de cada documento:

```css
:root {
    --color-primary: #1A5336;   /* Verde Principal (Oscuro) / Solidez institucional */
    --color-secondary: #53A548; /* Verde Activo (Claro) / Botones, iconos e interactividad */
    --color-accent: #F1C40F;    /* Acento Amarillo/Dorado / Resaltado crítico y etiquetas */
    --color-bg-light: #F4F6F5;  /* Fondo secundario claro */
    --color-text-main: #333333; /* Texto de párrafos y lectura prolongada */
    --color-text-inverse: #FFFFFF;
}
```

En la configuración de Tailwind, estos tokens se mapean como `primary: '#1A5336'`, `secondary: '#53A548'`, `accent: '#F1C40F'` y `bglight: '#F4F6F5'`, junto con las fuentes `sans` (Inter) y `heading` (Montserrat), garantizando contraste WCAG AAA para accesibilidad web.

### Tipografía Institucional
- **Títulos y Encabezados (H1–H6):** **Montserrat** (Bold / ExtraBold), para peso e impacto institucional moderno.
- **Cuerpo de Texto y Párrafos:** **Inter** (Regular / Medium), para lectura cómoda en documentos y descripciones.
- Ambas fuentes se importan vía Google Fonts en `css/modern-styles.css`.

---

## 3. Componentes Visuales y Patrones Estandarizados

### A. Glassmorphism Header & Navbar
La barra de navegación fija (`<header>`) emplea un fondo semitransparente combinado con un desenfoque de fondo (`backdrop-blur-md bg-white/80 border-b border-slate-200/80`). Al realizar scroll, el script central (`js/components.js`) intensifica la opacidad y añade sombra flotante para mantener la legibilidad sobre los banners de cabecera.

### B. Tarjetas de Contenido (Cards) y Elevación Dinámica
Los módulos de los ejes estratégicos, las tarjetas de roles y los bloques informativos utilizan radios de curvatura pronunciados (`rounded-3xl` o `rounded-[2.5rem]`) combinados con bordes finos (`border border-slate-100`). Al posicionar el cursor sobre ellos, experimentan transiciones de elevación (`hover:-translate-y-1 hover:shadow-xl transition-all duration-300`).

### C. Contenedores de Video Tutorial (Sección 5 Multimedia)
Para la presentación audiovisual en las páginas de ejes (`gestion_*.html`), se ha establecido el siguiente patrón visual obligatorio:
- **Estructura HTML (`<a>` interactivo):** El reproductor se encapsula en una etiqueta `<a>` con `target="_blank" rel="noopener noreferrer"` y clases `block relative aspect-video bg-slate-900 rounded-3xl overflow-hidden group cursor-pointer border-4 border-slate-50 shadow-lg`.
- **Overlay de Reproducción:** Capa degradada (`absolute inset-0 bg-gradient-to-br from-slate-800 to-primary flex items-center justify-center`) con un botón central animado (`w-20 h-20 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:scale-110 group-hover:bg-secondary transition-all duration-500`).
- **Etiqueta HD:** Distintivo superior que resalta la calidad (`span` con clases `px-3 py-1 bg-accent/20 text-accent text-[10px] font-black rounded-full uppercase`).

### D. Pestañas y Tablas Interactivas del Repositorio (`css/repositorio.css`)
En la página `repositorio.html`, la navegación documental se divide en **4 pestañas corporativas** (`normatividad`, `conocimiento`, `innovacion`, `publicaciones`):
- **Botones de Pestaña:** Emplean tarjetas con iconos vectoriales y cambio de fondo al activarse (`tab-link min-w-[150px] p-4 rounded-xl font-bold flex flex-col items-center gap-2`).
- **Tablas DataTables:** Cabeceras limpias con tipografía mayúscula de espaciado ancho (`text-[10px] uppercase font-black tracking-widest text-slate-500 bg-slate-50`), filas con resaltado flotante al pasar el mouse (`hover:bg-secondary/10`) y botones de descarga en formato ícono (`w-8 h-8 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white`).

### E. Interfaz del Asistente IA (`chatbot.html` / `css/chatbot.css`)
El módulo conversacional utiliza un diseño tipo consola ejecutiva de doble panel:
- Panel lateral izquierdo para historial de consultas frecuentes, filtros temáticos (9 categorías normativas) y sugerencias rápidas.
- Panel central derecho para la burbuja de chat con avatares institucionales (logo AGROIDEAS para la IA y avatar ciudadano para las consultas), indicadores de tipeo (*typing indicator*) y resaltado de enlaces normativos en formato *pill*.
- **Widget Flotante Global (FAB):** Botón circular con resplandor inyectado en la esquina inferior derecha de todas las páginas para acceder al asistente de forma inmediata.

### F. Aula Virtual de Micro-Cursos (`microcurso.html`)
El entorno de aprendizaje SPA presenta un **visualizador de video** (iframe de YouTube/Google Vids), una **sección de descarga de fichas PDF**, un **panel lateral de Check de Aprendizaje (quiz interactivo)** y una **barra de progreso** que avanza conforme el usuario responde. El **Modal "Índice de Módulo"** en el repositorio lista los subtemas con numeración secuencial y botones "Iniciar" que enlazan al Aula Virtual.

### G. Patrones de Componentes de Fichas Técnicas ETMC (`ficha_*.html`, `guia_*.html`, `transferencia_*.html`)
Para garantizar rigurosidad técnica y uniformidad visual con los formularios impresos oficiales (Anexos 01 al 04 de la SGP-PCM), los 4 visores de conocimiento incorporan los siguientes componentes de diseño:

1. **Hero Banner Institucional:**
   - Fondo con degradado oficial: `bg-gradient-to-r from-primary to-primary/90 text-white rounded-3xl p-6 md:p-8 shadow-lg`.
   - Badges de Metadatos y Trazabilidad: Píldoras traslúcidas (`px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold tracking-wider`).
   - Botón de retorno al catálogo: `inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all`.

2. **Jerarquía Estructural (Secciones Romanas y Campos Arábigos):**
   - **Títulos de Sección (I, II, III...):** Bloques destacados con numeración Romana, tipografía `font-heading font-black text-primary text-xl` y barras divisorias de acento (`w-12 h-1 bg-secondary rounded-full`).
   - **Campos de Información (1, 2, 3...):** Tarjetas con fondo blanco y bordes ligeros (`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm`), donde las etiquetas emplean `text-xs font-black text-slate-400 uppercase tracking-wider` y los datos adoptan `text-sm text-slate-700 leading-relaxed`.

3. **Cajas de Alerta Técnica y "Toque del Experto":**
   - **Alerta Roja (Riesgo Crítico):** `border-l-4 border-red-500 bg-red-50/70 p-4 rounded-r-2xl text-red-900 text-sm` con icono `alert-triangle`.
   - **Atajo Lícito / Tip de Eficiencia:** `border-l-4 border-secondary bg-emerald-50/70 p-4 rounded-r-2xl text-emerald-900 text-sm` con icono `zap` o `lightbulb`.
   - **Solución a Problemas (Troubleshooting):** `border-l-4 border-blue-500 bg-blue-50/70 p-4 rounded-r-2xl text-blue-900 text-sm` con icono `wrench`.

4. **Bloque de Validación y Conformidad del ETMC:**
   - Tabla de Criterios SGP-PCM con badges de estado: `px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold`.
   - Grilla de Firmas y Validación: Tarjetas con simulación de sello institucional y firma del Equipo Técnico de Mejora Continua.

5. **Botón Oficial de Impresión / PDF (`#btn-imprimir-pdf`):**
   - Estilo institucional: `inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-secondary hover:shadow-lg transition-all duration-300 shadow-sm`.
   - Acción dinámica: Invoca el enlace de Google Drive del documento oficial vía `window.open()` con fallback a `window.print()`.

### H. Tabla de Normatividad Institucional (`directivas-table.js`)
- Renderiza las directivas institucionales contenidas en `data/normativas_agroideas.json`.
- Badges por tipo de norma: `RDE` (Verde institucional), `DIRECTIVA` (Azul corporativo), `GUÍA` (Ámbar/Dorado).
- Botón de enlace directo a Google Drive: Ícono vectorial `external-link` con hover interactivo.
- Ordenamiento cronológico predeterminado descendente por fecha de emisión.

---

## 4. Sistema de Iconografía y Animaciones

### A. Lucide Icons
Migrado en un 100% al estándar vectorial minimalista **Lucide Icons** (`https://unpkg.com/lucide@latest`). Los íconos se inyectan como atributos semánticos `<i data-lucide="nombre-icono" class="w-5 h-5"></i>` y son procesados dinámicamente tras cada carga o conmutación de pestaña.

### B. Animaciones al hacer Scroll (AOS)
La biblioteca **AOS** gestiona la aparición progresiva de elementos en pantalla:
- Configuración global: `duration: 800ms`, `easing: 'ease-out-cubic'`, `once: true`.
- Efectos recomendados según contexto:
  - `data-aos="fade-up"`: Para tarjetas, tablas y bloques de sección principal.
  - `data-aos="fade-right"`: Para títulos de cabecera y banners laterales.
  - `data-aos="zoom-in"`: Para modales, íconos de hitos y contenedores multimedia.

---

## 5. Directrices de Diseño Responsivo (Mobile-First)

El portal está optimizado para funcionar sin degradación visual desde smartphones (320px) hasta monitores Ultra-Wide (4K):
- **Escritorio (`lg:` y `xl:`):** Grids de 2 a 3 columnas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), menú superior horizontal persistente y tablas con despliegue horizontal extendido.
- **Tablets y Móviles (`< md`):** Colapso automático de grillas a 1 sola columna vertical (`grid-cols-1`), menú superior reemplazado por botón hamburguesa con cajón retráctil, y contenedores de tablas con desbordamiento horizontal controlado (`overflow-x-auto`) para permitir desplazamiento táctil sin romper el contenedor padre.

> [!TIP]
> **Regla para Agentes IA:** Al generar nuevos botones de llamada a la acción principal (CTA), utiliza invariablemente el patrón institucional de Tailwind: `inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-300`.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
