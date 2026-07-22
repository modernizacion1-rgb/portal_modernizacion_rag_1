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
Los colores clave del branding institucional han sido definidos como variables CSS raiz (`:root`) dentro de `css/modern-styles.css` y extendidos en la configuración local de Tailwind en el `<head>` de cada documento:

```css
:root {
    --agro-blue: #0b4b8a;      /* Azul Profundo AGROIDEAS / Liderazgo y Confianza */
    --agro-green: #6aa84f;     /* Verde Agro / Competitividad y Crecimiento Agrario */
    --pcm-red: #e30613;        /* Rojo PCM / Identidad Nacional y Atención al Ciudadano */
    --glass-bg: rgba(255, 255, 255, 0.84); /* Fondo translúcido para barras y tarjetas espejo */
    --glass-border: rgba(255, 255, 255, 0.3);
}
```

En la configuración de Tailwind, estos tokens se mapean como `primary: '#1A5336'`, `secondary: '#53A548'`, y tonos esmeralda o pizarra (`bg-slate-50`, `text-slate-900`), garantizando contraste WCAG AAA para accesibilidad web.

---

## 3. Componentes Visuales y Patrones Estandarizados

### A. Glassmorphism Header & Navbar
La barra de navegación fija (`<header>`) emplea un fondo semitransparente combinado con un desenfoque de fondo (`backdrop-blur-md bg-white/80 border-b border-slate-200/80`). Al realizar scroll, el script central (`js/components.js`) intensifica la opacidad y añade sombra flotante para mantener la legibilidad sobre los banners de cabecera.

### B. Tarjetas de Contenido (Cards) y Elevación Dinámica
Los módulos de los ejes estratégicos, las tarjetas de roles y los bloques informativos utilizan radios de curvatura pronunciados (`rounded-3xl` o `rounded-[2.5rem]`) combinados con bordes finos (`border border-slate-100`). Al posicionar el cursor sobre ellos, experimentan transiciones de elevación (`hover:-translate-y-1 hover:shadow-xl transition-all duration-300`).

### C. Contenedores de Video Tutorial (Sección 5 Multimedia)
Para la presentación audiovisual en las páginas de ejes (`gestion_*.html`), se ha establecido el siguiente patrón visual obligatorio para el contenedor multimedia:
- **Estructura HTML (`<a>` interactivo):** El reproductor se encapsula en una etiqueta `<a>` con `target="_blank" rel="noopener noreferrer"` y clases de contenedor `block relative aspect-video bg-slate-900 rounded-3xl overflow-hidden group cursor-pointer border-4 border-slate-50 shadow-lg`.
- **Overlay de Reproducción:** Capa degradada (`absolute inset-0 bg-gradient-to-br from-slate-800 to-primary flex items-center justify-center`) con un botón central animado (`w-20 h-20 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:scale-110 group-hover:bg-red-600 transition-all duration-500`).
- **Etiqueta HD:** Distintivo superior que resalta la calidad (`span` con clases `px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-full uppercase`).

### D. Pestañas y Tablas Interactivas del Repositorio (`css/repositorio.css`)
En la página `repositorio.html`, la navegación documental se divide en **4 pestañas corporativas** (`normatividad`, `conocimiento`, `innovacion`, `publicaciones`):
- **Botones de Pestaña:** Emplean tarjetas con iconos vectoriales y cambio de fondo al activarse (`tab-link min-w-[150px] p-4 rounded-xl font-bold flex flex-col items-center gap-2`).
- **Tablas DataTables:** Cabeceras limpias con tipografía mayúscula de espaciado ancho (`text-[10px] uppercase font-black tracking-widest text-slate-500 bg-slate-50`), filas con resaltado flotante al pasar el mouse (`hover:bg-blue-50/50`) y botones de descarga en formato ícono (`w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white`).

### E. Interfaz del Asistente IA (`chatbot.html` / `css/chatbot.css`)
El módulo conversacional utiliza un diseño tipo consola ejecutiva de doble panel:
- Panel lateral izquierdo para historial de consultas frecuentes y sugerencias rápidas.
- Panel central derecho para la burbuja de chat con avatares institucionales (logo AGROIDEAS para la IA y avatar ciudadano para las consultas), indicadores de tipeo (*typing indicator*) y resaltado de enlaces normativos en formato *pill*.

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
> **Regla para Agentes IA:** Al generar nuevos botones de llamada a la acción principal (CTA), utiliza invariablemente el patrón institucional de Tailwind: `inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`.
