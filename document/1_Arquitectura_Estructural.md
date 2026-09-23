# Arquitectura Estructural del Portal Web AGROIDEAS

## Resumen Ejecutivo
El Portal Web de Gestión y Modernización de AGROIDEAS es una plataforma estática modular de alto rendimiento basada en el paradigma de **Micro-Componentes Dinámicos Desacoplados**. Integra **15 páginas HTML** que separan de manera estricta la capa de presentación estructural (HTML5 semántico + Tailwind CSS), la estandarización global y comportamiento interactivo (`js/components.js`, `content-loader.js`, `chatbot-engine.js`, controladores de visores ETMC) y los datos dinámicos organizados en **17 archivos JSON** dentro del directorio `/data`.

---

## 1. El Paradigma de Componentes Dinámicos

Para evitar la redundancia de código en las 15 páginas del sitio y garantizar escalabilidad institucional sin un servidor de renderizado backend (SSR), el portal utiliza inyectores de DOM optimizados y plantillas desacopladas.

### El Motor Central: `js/components.js`
Este script se ejecuta al final del cuerpo (`<body>`) de todas las páginas del portal para realizar las siguientes operaciones globales:

- **Inyección y Sincronización del Header:** Ubica la etiqueta `<header>` vacía e inyecta dinámicamente la barra de navegación corporativa de la **Unidad de Planeamiento y Presupuesto (UPP)**, incluyendo el menú desplegable **"Ejes de Gestión"** (Conocimiento, Procesos, Calidad, Innovación) y los accesos a Documentos, Contacto, Asistente IA y Repositorio.
- **Inyección del Footer:** Rellena el elemento `<footer>` con los créditos institucionales, la fecha de última actualización dinámica (`#current-date-footer`) y los accesos rápidos de la entidad.
- **Menú Móvil Interactivo:** Genera el botón hamburguesa en dispositivos móviles/tablets (`md:hidden`) y gestiona transiciones suaves de apertura y cierre.
- **Inicialización de Bibliotecas Externas:** Renderiza los íconos de **Lucide Icons** (`lucide.createIcons()`) e inicializa **AOS (Animate On Scroll)** con parámetros de rendimiento afinados (`duration: 800`, `once: true`).
- **Efecto de Navegación "Glassmorphism":** Captura el evento de scroll de la ventana y modifica las clases del Navbar para aplicar opacidad, sombra y desenfoque al desplazarse hacia abajo.

---

## 2. Árbol de Directorios y Organización de Archivos

La estructura real del proyecto en el sistema de archivos obedece a la siguiente jerarquía normalizada:

```text
/portal_modernizacion-main/
│
├── css/
│   ├── modern-styles.css    # Variables globales institucionales (paleta "Impulsa Agroideas"), tipografía, glassmorphism y transiciones.
│   ├── repositorio.css      # Estilos especializados para pestañas, filtros, acordeones y tablas DataTables.
│   └── chatbot.css          # Estilos del Asistente IA (burbujas, sidebar, FAB flotante) y del widget global.
│
├── js/
│   ├── components.js        # Core de inyección de componentes globales (Header, Footer, Nav móvil en 15 páginas).
│   ├── content-loader.js    # Motor de carga asíncrona de contenidos, videos HD y tablas del repositorio.
│   ├── chatbot-engine.js    # Motor RAG local + TF-IDF + conector Gemini para el Asistente IA.
│   ├── microcurso.js        # Lógica del Aula Virtual SPA (lee parámetros URL y renderiza el curso).
│   ├── microcurso-modal.js  # Carga de datos y apertura del modal "Índice de Módulo" en el repositorio.
│   ├── directivas-table.js  # Procesamiento DataTables con orden cronológico y renderizado de normativas institucionales.
│   ├── detalle_buena_practica.js # Controlador dinámico para visor de Fichas de Buena Práctica (FBP).
│   ├── detalle_ficha.js     # Controlador dinámico para visor de Fichas de Lección Aprendida (FLA).
│   ├── detalle_guia_tecnica.js   # Controlador dinámico para visor de Guías Técnicas Saber Hacer (GT-SH).
│   ├── detalle_transferencia.js  # Controlador dinámico para visor de Transferencia de Conocimiento (TCO).
│   ├── update_html.js       # Utilidad Node.js para inyectar la config. de Tailwind y migrar colores (mantenimiento).
│   └── fix_red.js           # Utilidad Node.js de corrección de colores específica (mantenimiento).
│
├── data/
│   ├── content.json         # Base de contenidos estructurados (secciones de ejes, enlaces de video, catálogos).
│   ├── chatbot_knowledge.json # Corpus normativo SAMGP (9 módulos) para el Asistente IA.
│   ├── cursos.json          # Currícula de Micro-Cursos (5 módulos, subtemas, videos y cuestionarios).
│   ├── normativas_agroideas.json # Catálogo oficial de normativas, directivas y resoluciones con enlaces Drive.
│   ├── simulacion-registro-fla-1-1.json # Muestra FLA: Lección aprendida San Martín (Anexo 01).
│   ├── simulacion-registro-fla-1-2.json # Muestra FLA: Lección aprendida USE (Anexo 01).
│   ├── simulacion-registro-fla-1-3.json # Muestra FLA: Lección aprendida UPDC (Anexo 01).
│   ├── simulacion-registro-fbp-2-1.json # Muestra FBP: Buena práctica Arequipa (Anexo 02).
│   ├── simulacion-registro-fbp-2-2.json # Muestra FBP: Buena práctica Arequipa v2 (Anexo 02).
│   ├── simulacion-registro-fbp-2-3.json # Muestra FBP: Buena práctica UA (Anexo 02).
│   ├── simulacion-registro-fbp-2-3..json # Archivo de respaldo/equivalente FBP 2-3.
│   ├── simulacion-registro-GT-SH-3-1.json # Muestra GT-SH: Guía técnica Negocios (Anexo 03).
│   ├── simulacion-registro-GT-SH-3-2.json # Muestra GT-SH: Guía técnica Negocios v2 (Anexo 03).
│   ├── simulacion-registro-GT-SH-3-3.json # Muestra GT-SH: Guía técnica Negocios v3 (Anexo 03).
│   ├── Formato-registro-TCO-4-1.json    # Muestra TCO: Acta de transferencia offboarding (Anexo 04).
│   ├── Formato-registro-TCO-4-2.json    # Muestra TCO: Acta de transferencia offboarding v2 (Anexo 04).
│   └── Formato-registro-TCO-4-3.json    # Muestra TCO: Acta de transferencia offboarding v3 (Anexo 04).
│
├── images/                  # Activos gráficos corporativos, logos institucionales y diagramas.
├── document/                # Documentación técnica corporativa en Markdown (Índice, UI, Arquitectura, etc.).
├── doc/                     # Planes de implementación y walkthroughs históricos del proyecto.
├── LineaGrafica/            # Piezas visuales y PDFs de la identidad "Impulsa Agroideas".
├── MARCO NORMATIVO SAMGP 2026/ # Repositorio normativo fuente (PDFs) referenciado por el chatbot.
│
├── index.html               # Página Principal / Home del portal.
├── gestion_procesos.html    # Eje 1: Gestión por Procesos (y video explicativo en Google Drive).
├── gestion_conocimiento.html # Eje 2: Gestión del Conocimiento.
├── gestion_calidad.html     # Eje 3: Gestión de la Calidad y Mejora Regulatoria.
├── gestion_innovacion.html  # Eje 4: Innovación Pública y Co-creación.
├── repositorio.html         # Repositorio Institucional (4 pestañas activas con tablas interactivas).
├── chatbot.html             # Interfaz del Asistente IA (Chatbot SAMGP).
├── microcurso.html          # Aula Virtual SPA de Micro-Cursos (plantilla dinámica única).
├── doc_gestion.html         # Hub de Documentos de Gestión (MOP, MAPRO, ROF, POI).
├── estructura_organica.html # Organigrama interactivo y estructura jerárquica de la UPP.
├── contacto.html            # Directorio de coordinadores GxP y formulario de consultas.
├── ficha_buena_practica.html # Visor dinámico desacoplado: Ficha de Buena Práctica (Anexo 02).
├── ficha_leccion_aprendida.html # Visor dinámico desacoplado: Ficha de Lección Aprendida (Anexo 01).
├── guia_tecnica_saber_hacer.html # Visor dinámico desacoplado: Guía Técnica del Saber Hacer (Anexo 03).
└── transferencia_conocimiento_organizacional.html # Visor dinámico: Transferencia de Conocimiento (Anexo 04).
```

---

## 3. Estandarización Modular de las Páginas

### A. Ejes de Gestión (`gestion_*.html`)
Las 4 páginas de ejes de modernización siguen una plantilla estructural idéntica dividida en 5 secciones delimitadas por IDs semánticos:
1. `id="definition"` (1. Definición / Marco Teórico)
2. `id="purpose"` (2. Finalidad / Cadena de Valor)
3. `id="phases"` (3. Fases o Actividades del Proceso)
4. `id="roles"` (4. Roles, Operadores y Responsabilidades)
5. `id="multimedia"` (5. Contenido Multimedia: Video Explicativo en HD 1080p con enlace hacia Google Drive)

### B. Repositorio Institucional (`repositorio.html`)
Diseñado modularmente en **4 Pestañas / Ejes Documentales** con tablas procesadas por DataTables:
- **Pestaña 1 (`data-target="normatividad"`):** 1. Normatividad y Directivas, alimentada por `directivas-table.js` a partir de `data/normativas_agroideas.json`, con ordenamiento cronológico descendente y enlaces directos a Google Drive.
- **Pestaña 2 (`data-target="conocimiento"`):** 2. Gestión del Conocimiento, con **4 sub-acordeones** que enlazan a los visores de instrumentos ETMC y la cuadrícula de **5 Micro-Cursos**.
- **Pestaña 3 (`data-target="innovacion"`):** 3. Innovación Pública.
- **Pestaña 4 (`data-target="publicaciones"`):** 4. Publicaciones y Procesos.
*(Nota de Arquitectura: La pestaña de Planeamiento y Resultados fue retirada de la vista para evitar redundancia con el Hub en `doc_gestion.html`).*

### C. Asistente IA (`chatbot.html`)
Diseñado con una interfaz conversacional de doble panel (historial lateral y chat principal), vinculado directamente a `js/chatbot-engine.js` para procesar consultas mediante **RAG local (TF-IDF)** sin latencia del lado del servidor, con un **conector opcional a Google Gemini** para generación en tiempo real.

### D. Aula Virtual de Micro-Cursos (`microcurso.html`)
Plantilla **SPA (Single Page Application)** única. Mediante parámetros de URL (`?modulo=modulo1&subtema=A.1`), `js/microcurso.js` lee `data/cursos.json` y renderiza dinámicamente el título, el video, la ficha PDF y el cuestionario interactivo del subtema seleccionado. El acceso se origina desde el **Modal "Índice de Módulo"** (`js/microcurso-modal.js`) en la pestaña *2. Gestión del Conocimiento* del repositorio.

### E. Visores Dinámicos Desacoplados de Instrumentos ETMC
El portal implementa **4 visores especializados** que corresponden directamente a los instrumentos oficiales estandarizados del Equipo Técnico de Mejora Continua (ETMC), regulados bajo lineamientos SGP-PCM:
- **`ficha_leccion_aprendida.html` (Anexo 01 - FLA):** Controlado por `js/detalle_ficha.js`, renderiza 5 secciones en números Romanos (I a V) y 17 campos numerados en Arábigos.
- **`ficha_buena_practica.html` (Anexo 02 - FBP):** Controlado por `js/detalle_buena_practica.js`, renderiza la estructura de identificación, problema, solución innovadora, factores de éxito y sostenibilidad.
- **`guia_tecnica_saber_hacer.html` (Anexo 03 - GT-SH):** Controlado por `js/detalle_guia_tecnica.js`, renderiza el paso a paso técnico (5W+2H), recursos requeridos y la sección *"Toque del Experto"* (alertas de riesgo, atajos lícitos y troubleshooting).
- **`transferencia_conocimiento_organizacional.html` (Anexo 04 - TCO):** Controlado por `js/detalle_transferencia.js`, renderiza las actas de relevo y entrega de puesto (offboarding), contactos clave, cartera de proyectos y compromisos pendientes.

**Mecanismo Común de los Visores ETMC:**
1. **Deep-linking:** Todos reciben el parámetro de consulta `?id={nombre_archivo}` (ej. `?id=simulacion-registro-fla-1-1`).
2. **Consumo Asíncrono:** El script lee `data/{id}.json`, valida la estructura de datos y puebla semánticamente los nodos del DOM.
3. **Acción Dual del Botón Oficial (`#btn-imprimir-pdf`):** Si el JSON contiene la propiedad `"Link"` con una URL válida de Google Drive, el botón abre el documento PDF oficial en una nueva pestaña (`window.open(linkPdf, '_blank', 'noopener,noreferrer')`). En ausencia de enlace, ejecuta `window.print()` como contingencia local.

---

## 4. Beneficios de la Arquitectura para Humanos y Agentes IA

1. **Cero Mantenimiento Duplicado:** Modificar un ítem del menú de navegación requiere editar únicamente `js/components.js`, propagándose de forma instantánea a las **15 páginas** del portal.
2. **Desacoplamiento de Contenido y Casos:** Agentes de IA o redactores pueden agregar una nueva lección aprendida o buena práctica simplemente subiendo un archivo JSON a `/data/` y agregando una fila en el acordeón de `repositorio.html`, sin tener que crear ni maquetar nuevos archivos HTML.
3. **Alto Rendimiento y Carga Asíncrona:** Al ejecutarse con scripts diferidos (`defer` o al final del `<body>`), el navegador renderiza el contenido HTML y estilos Tailwind de manera inmediata, alcanzando puntuaciones óptimas en métricas de *Core Web Vitals*.
4. **Interoperabilidad y Proyección:** La arquitectura basada en archivos JSON homogéneos permite que en una fase posterior los motores locales (`content-loader.js`, `directivas-table.js`, `detalle_*.js`) sustituyan las rutas locales por llamadas a APIs REST institucionales o SharePoint Lists con mínimas modificaciones de código.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
