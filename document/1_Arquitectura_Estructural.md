# Arquitectura Estructural del Portal Web AGROIDEAS

## Resumen Ejecutivo
El Portal Web de Gestión y Modernización de AGROIDEAS es una plataforma estática modular de alto rendimiento basada en el paradigma de **Micro-Componentes Dinámicos Desacoplados**. Integra **16 páginas HTML** que separan de manera estricta la capa de presentación estructural (HTML5 semántico + Tailwind CSS), la estandarización global y comportamiento interactivo (`js/components.js`, `content-loader.js`, `chatbot-engine.js`, controladores de visores ETMC y FAR-MC) y los datos dinámicos organizados en **36 archivos JSON** dentro del directorio `/data`.

---

## 1. El Paradigma de Componentes Dinámicos

Para evitar la redundancia de código en las 16 páginas del sitio y garantizar escalabilidad institucional sin un servidor de renderizado backend (SSR), el portal utiliza inyectores de DOM optimizados y plantillas desacopladas.

### El Motor Central: `js/components.js`
Este script se ejecuta al final del cuerpo (`<body>`) de **15 de las 16 páginas** del portal (todas excepto `microcurso.html`, que emplea un mini-header propio de navegación curricular) para realizar las siguientes operaciones globales:

- **Inyección y Sincronización del Header:** Reemplaza la etiqueta `<header>` vacía vía `outerHTML` con la barra de navegación corporativa de la **Unidad de Planeamiento y Presupuesto (UPP)**, incluyendo el logo (`images/Logo_AGROIDEAS.jpg`), el menú desplegable **"Ejes de Gestión"** (Conocimiento, Procesos, Calidad, Innovación) y los accesos a **Documentos**, **Contacto**, **Asistente IA** y **Repositorio**.
- **Inyección del Footer:** Rellena el elemento `<footer>` con los créditos institucionales, la fecha de última actualización dinámica (`#current-date-footer`, formato `DD/MM/YYYY`) y los accesos rápidos de la entidad.
- **Menú Móvil Interactivo:** Genera el botón hamburguesa en dispositivos móviles/tablets (`md:hidden`, controlado por `#mobile-menu-button` / `#mobile-menu`) y gestiona transiciones suaves de apertura y cierre.
- **Inicialización de Bibliotecas Externas:** Renderiza los íconos de **Lucide Icons** (`lucide.createIcons()`) e inicializa **AOS (Animate On Scroll)** con parámetros de rendimiento afinados (`duration: 800`, `once: true`, `offset: 100`), protegido con `typeof AOS !== 'undefined'` para las páginas que solo incluyen el CSS de AOS sin su script.
- **Efecto de Navegación "Glassmorphism":** Captura el evento de scroll de la ventana y modifica las clases del `#navbar` para aplicar opacidad, sombra y desenfoque al desplazarse hacia abajo (`bg-white/95 shadow-xl`).

> [!WARNING] 
> **Nota de estilo heredado:** El markup inyectado por `components.js` (header/footer) utiliza parcialmente clases de la línea gráfica anterior (`bg-blue-700`, `text-blue-900`) en lugar de los tokens institucionales (`primary`, `secondary`). Es una migración pendiente hacia la paleta "Impulsa Agroideas"; al editar este archivo, prioriza el uso de las variables institucionales.

---

## 2. Árbol de Directorios y Organización de Archivos

La estructura real del proyecto en el sistema de archivos obedece a la siguiente jerarquía normalizada:

```text
/portal_modernizacion-main/
│
├── css/
│   ├── modern-styles.css    # Variables globales institucionales (paleta "Impulsa Agroideas"), tipografía (Google Fonts Montserrat/Inter vía @import), glassmorphism y transiciones.
│   ├── repositorio.css      # Estilos especializados para pestañas, filtros, acordeones y tablas DataTables.
│   └── chatbot.css          # Estilos del Asistente IA (burbujas, sidebar). Incluye estilos de un FAB global (#global-chatbot-fab) actualmente reservado/no instanciado.
│
├── js/                      # 12 scripts JavaScript (10 de runtime + 2 utilidades Node.js de mantenimiento).
│   ├── components.js        # Core de inyección de componentes globales (Header, Footer, Nav móvil en 15 de 16 páginas).
│   ├── content-loader.js    # Motor de carga asíncrona de contenidos de ejes, videos HD y tablas del repositorio (innovación y publicaciones).
│   ├── chatbot-engine.js    # Clase SAMGPChatbotEngine: RAG local con scoring por keywords/tokens + conector Google Gemini (gemini-flash-latest).
│   ├── microcurso.js        # Lógica del Aula Virtual SPA (lee parámetros URL y renderiza el subtema con quiz y barra de progreso).
│   ├── microcurso-modal.js  # Carga de datos y apertura del modal "Índice de Módulo" en el repositorio (soporta deep-link ?openModal=).
│   ├── directivas-table.js  # Procesamiento DataTables con orden cronológico de las 43 normativas institucionales.
│   ├── detalle_buena_practica.js # Controlador dinámico para visor de Fichas de Buena Práctica (FBP).
│   ├── detalle_ficha.js     # Controlador dinámico para visor de Fichas de Lección Aprendida (FLA).
│   ├── detalle_guia_tecnica.js   # Controlador dinámico para visor de Guías Técnicas Saber Hacer (GT-SH).
│   ├── detalle_transferencia.js  # Controlador dinámico para visor de Transferencia de Conocimiento (TCO).
│   ├── detalle_far_mc.js    # Controlador dinámico para visor de Fichas de Aprendizaje Rápido de Micro-Curso (FAR-MC, solo window.print()).
│   ├── update_html.js       # Utilidad Node.js (requiere fs) para inyectar la config. de Tailwind y migrar colores (mantenimiento one-shot).
│   └── fix_red.js           # Utilidad Node.js de corrección de colores específica (mantenimiento one-shot).
│
├── data/                    # 36 archivos JSON (4 corporativos + 13 instrumentos ETMC + 18 fichas FAR-MC + 1 esquema JSON Schema FAR-MC V2.0).
│   ├── content.json         # Base de contenidos estructurados: sections (4 ejes), documents (cards del hub) y repository (innovacion_tablas, publicaciones_upp y subárbol directivas heredado/en desuso por el loader).
│   ├── chatbot_knowledge.json # Corpus normativo SAMGP: metadata (versión 2026.6), 10 categorías (1 "Todos" + 9 temáticas) y 24 knowledge_nodes.
│   ├── cursos.json          # Currícula de Micro-Cursos: 6 módulos con 3 subtemas cada uno (18 fichas FAR-MC), videos, pdf_url y cuestionarios de 3 opciones.
│   ├── normativas_agroideas.json # Catálogo oficial de 43 directivas/resoluciones con campos: titulo, resolucion_aprobatoria, fecha, descripcion, enlace (gob.pe).
│   ├── simulacion-registro-fla-1-1.json # Muestra FLA: Lección aprendida San Martín (Anexo 01).
│   ├── simulacion-registro-fla-1-2.json # Muestra FLA: Lección aprendida USE (Anexo 01).
│   ├── simulacion-registro-fla-1-3.json # Muestra FLA: Lección aprendida UPDC (Anexo 01).
│   ├── simulacion-registro-fbp-2-1.json # Muestra FBP: Buena práctica Arequipa (Anexo 02).
│   ├── simulacion-registro-fbp-2-2.json # Muestra FBP: Buena práctica Arequipa v2 (Anexo 02).
│   ├── simulacion-registro-fbp-2-3.json # Muestra FBP: Buena práctica UA (Anexo 02).
│   ├── simulacion-registro-fbp-2-3..json # Duplicado de respaldo FBP 2-3 (nombre con doble punto; enlazado así desde repositorio.html, pendiente de saneamiento).
│   ├── simulacion-registro-GT-SH-3-1.json # Muestra GT-SH: Guía técnica Negocios (Anexo 03).
│   ├── simulacion-registro-GT-SH-3-2.json # Muestra GT-SH: Guía técnica Negocios v2 (Anexo 03).
│   ├── simulacion-registro-GT-SH-3-3.json # Muestra GT-SH: Guía técnica Negocios v3 (Anexo 03).
│   ├── Formato-registro-TCO-4-1.json    # Muestra TCO: Acta de transferencia offboarding (Anexo 04).
│   ├── Formato-registro-TCO-4-2.json    # Muestra TCO: Acta de transferencia offboarding v2 (Anexo 04).
│   ├── Formato-registro-TCO-4-3.json    # Muestra TCO: Acta de transferencia offboarding v3 (Anexo 04).
│   ├── far-mc-v2.json       # Esquema JSON Schema (draft-07) "Esquema Estándar FAR-MC V2.0" que define la estructura oficial de las fichas pedagógicas.
│   ├── far-mc-1-m1.json     # Fichas FAR-MC (18 en total): far-mc-{1..6}-{m1..m3|a1..d3}.json, una por subtema de los 6 módulos …
│   └── far-mc-6-d3.json     # … (far-mc-1-m1..m3, far-mc-2-a1..a3, far-mc-3-b1..b3, far-mc-4-c1..c3, far-mc-5-e1..e3, far-mc-6-d1..d3).
│
├── images/                  # Activos gráficos corporativos (Logo_AGROIDEAS.jpg).
├── document/                # Documentación técnica corporativa en Markdown (Índice, Arquitectura, UI, Despliegue, Datos, Integración).
├── MARCO NORMATIVO SAMGP 2026/ # Repositorio normativo fuente (~58 PDFs + enlaces) en 9 subcarpetas (0 a 8), referenciado por el campo pdf_path de los knowledge_nodes del chatbot.
│
├── index.html               # Página Principal / Home del portal.
├── gestion_procesos.html    # Eje 1: Gestión por Procesos (y video explicativo en Google Drive).
├── gestion_conocimiento.html # Eje 2: Gestión del Conocimiento.
├── gestion_calidad.html     # Eje 3: Gestión de la Calidad y Mejora Regulatoria.
├── gestion_innovacion.html  # Eje 4: Innovación Pública y Co-creación.
├── repositorio.html         # Repositorio Institucional (4 pestañas, 5 sub-acordeones de conocimiento, DataTables con exportación).
├── chatbot.html             # Interfaz del Asistente IA (Chatbot SAMGP con reconocimiento de voz).
├── microcurso.html          # Aula Virtual SPA de Micro-Cursos (plantilla dinámica única; no usa components.js).
├── doc_gestion.html         # Hub de Documentos de Gestión (MOP, MAPRO, ROF, POI).
├── estructura_organica.html # Organigrama interactivo y estructura jerárquica de la UPP.
├── contacto.html            # Directorio de coordinadores GxP y formulario de consultas.
├── ficha_buena_practica.html # Visor dinámico desacoplado: Ficha de Buena Práctica (Anexo 02).
├── ficha_leccion_aprendida.html # Visor dinámico desacoplado: Ficha de Lección Aprendida (Anexo 01).
├── guia_tecnica_saber_hacer.html # Visor dinámico desacoplado: Guía Técnica del Saber Hacer (Anexo 03).
├── transferencia_conocimiento_organizacional.html # Visor dinámico: Transferencia de Conocimiento (Anexo 04).
└── ficha_microcurso.html    # Visor dinámico desacoplado: Ficha de Aprendizaje Rápido de Micro-Curso (FAR-MC V2.0, impresión directa).
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
- **Pestaña 1 (`data-target="normatividad"`):** 1. Normatividad y Directivas, alimentada por `directivas-table.js` a partir de `data/normativas_agroideas.json` (**43 registros** con campos `titulo`, `resolucion_aprobatoria`, `fecha` en texto español, `descripcion` y `enlace` hacia portales oficiales gob.pe), con ordenamiento cronológico descendente por fecha de aprobación.
- **Pestaña 2 (`data-target="conocimiento"`):** 2. Gestión del Conocimiento, con **5 sub-acordeones**: **2.1** Fichas de Lecciones Aprendidas (FLA), **2.2** Fichas de Buenas Prácticas (FBP), **2.3** Guías Técnicas "Saber Hacer" (GT-SH), **2.4** Actas de Entrega (Offboarding / TCO) y **2.5** Micro-Cursos (cuadrícula de **6 módulos** con modal "Índice de Módulo").
- **Pestaña 3 (`data-target="innovacion"`):** 3. Innovación Pública, con 2 acordeones: **3.1** Portafolio de Fichas de Iniciativa de Innovación Pública (FIIP) y **3.2** Informes de Evaluación, más tablas renderizadas vía `content-loader.js` (`[data-innov-table]`).
- **Pestaña 4 (`data-target="publicaciones"`):** 4. Publicaciones y Procesos, con 3 acordeones que cubren Arquitectura de Procesos, MAPRO/BPMN y la Biblioteca de Documentos Técnicos (publicaciones de la UPP cargadas desde `data/content.json` en la tabla `#repoTable`).
*(Nota de Arquitectura: La pestaña de Planeamiento y Resultados fue retirada de la vista para evitar redundancia con el Hub en `doc_gestion.html`).*

> [!WARNING]
> **Enlace pendiente de saneamiento:** La fila de Buenas Prácticas `BP-2-3` en la pestaña *Conocimiento* apunta actualmente a `?id=simulacion-registro-fbp-2-3..json` (nombre con doble punto). Aunque el controlador `detalle_buena_practica.js` resuelve variantes del nombre, el enlace debería normalizarse a `?id=simulacion-registro-fbp-2-3.json` en una próxima refactorización menor.

### C. Asistente IA (`chatbot.html`)
Diseñado con una interfaz conversacional de doble panel (historial lateral con filtros de las **9 categorías normativas** y chat principal con reconocimiento de voz del navegador), vinculado directamente a `js/chatbot-engine.js` para procesar consultas mediante **RAG local con scoring por keywords/tokens** (scoring ponderado sobre `question_patterns`, `keywords`, `title` y `answer` de cada `knowledge_node`, sin latencia del lado del servidor, con un **conector opcional a Google Gemini** (modelo `gemini-flash-latest`, grounding con los 3 nodos de mayor puntuación) para generación en tiempo real.

> [!NOTE]
> **Configuración de estilos heredada:** `chatbot.html` es la única página del portal que conserva la configuración legacy de Tailwind (`pcm-red`/`agro-blue`) en lugar de la paleta institucional "Impulsa Agroideas". Su hoja `css/chatbot.css` incluye además los estilos de un widget flotante global (`#global-chatbot-fab`), actualmente **no instanciado** por ningún script (código reservado para una futura versión).

### D. Aula Virtual de Micro-Cursos (`microcurso.html`)
Plantilla **SPA (Single Page Application)** única. Mediante parámetros de URL (`?modulo=modulo1&subtema=M1.1`), `js/microcurso.js` lee `data/cursos.json` y renderiza dinámicamente el título, el contenedor de video (actualmente un placeholder visual con el iframe reservado), el botón de ficha PDF y el cuestionario interactivo del subtema seleccionado, incluyendo una **barra de progreso** que avanza al completar las respuestas. El acceso se origina desde el **Modal "Índice de Módulo"** (`js/microcurso-modal.js`) en la pestaña *2. Gestión del Conocimiento* del repositorio, que ofrece por cada subtema dos botones: **"Ficha"** (abre el visor FAR-MC `ficha_microcurso.html?id=...`) y **"Aula"** (abre la SPA `microcurso.html?modulo=...&subtema=...`).

El catálogo es de **6 módulos × 3 subtemas = 18 fichas pedagógicas** (IDs heterogéneos: `M1.1–M1.3`, `A.1–A.3`, `B.1–B.3`, `C.1–C.3`, `E.1–E.3`, `D.1–D.3`), mapeados al archivo `far-mc-{modulo}-{sub}.json` correspondiente por la función `resolverFarMcId` (compartida por `microcurso.js` y `microcurso-modal.js`).

### E. Visores Dinámicos Desacoplados (Instrumentos ETMC y Fichas Pedagógicas FAR-MC)
El portal implementa **5 visores especializados**. Los 4 primeros corresponden directamente a los instrumentos oficiales estandarizados del Equipo Técnico de Mejora Continua (ETMC), regulados bajo lineamientos SGP-PCM; el quinto es el visor pedagógico de las Fichas de Aprendizaje Rápido de Micro-Curso (FAR-MC):
- **`ficha_leccion_aprendida.html` (Anexo 01 - FLA):** Controlado por `js/detalle_ficha.js`, renderiza 5 secciones en números Romanos (I a V) y 17 campos numerados en Arábigos.
- **`ficha_buena_practica.html` (Anexo 02 - FBP):** Controlado por `js/detalle_buena_practica.js`, renderiza la estructura de identificación, problema, solución innovadora, factores de éxito y sostenibilidad.
- **`guia_tecnica_saber_hacer.html` (Anexo 03 - GT-SH):** Controlado por `js/detalle_guia_tecnica.js`, renderiza el paso a paso técnico (5W+2H), recursos requeridos y la sección *"Toque del Experto"* (alertas de riesgo, atajos lícitos y troubleshooting).
- **`transferencia_conocimiento_organizacional.html` (Anexo 04 - TCO):** Controlado por `js/detalle_transferencia.js`, renderiza las actas de relevo y entrega de puesto (offboarding), contactos clave, cartera de proyectos y compromisos pendientes.
- **`ficha_microcurso.html` (FAR-MC V2.0):** Controlado por `js/detalle_far_mc.js`, renderiza las 18 **Fichas de Aprendizaje Rápido de Micro-Curso** definidas por el esquema `data/far-mc-v2.json` (JSON Schema draft-07): `NavegacionYTrazabilidad`, `MetadatosFicha`, `SintesisEjecutiva`, `NucleoSaberYMarcoNormativo`, `ToqueDelExpertoYAlertasCampo` y `CierreOperativoYAutoevaluacion`.

**Mecanismo Común de los Visores Desacoplados:**
1. **Deep-linking:** Todos reciben el parámetro de consulta `?id={nombre_archivo}` (ej. `?id=simulacion-registro-fla-1-1` o `?id=far-mc-1-m1`).
2. **Consumo Asíncrono:** El script lee `data/{id}.json` (los controladores ETMC soportan raíz objeto o arreglo `[0]`; el controlador FAR-MC espera un objeto único), valida la estructura de datos y puebla semánticamente los nodos del DOM.
3. **Acción del Botón Oficial (`#btn-imprimir-pdf`):**
   - **Visores ETMC (FLA, FBP, GT-SH, TCO):** Si el JSON contiene la propiedad `"Link"` con una URL válida de Google Drive, el botón abre el documento PDF oficial en una nueva pestaña (`window.open(linkPdf, '_blank', 'noopener,noreferrer')`). En ausencia de enlace, ejecuta `window.print()` como contingencia local.
   - **Visor Pedagógico FAR-MC:** Utiliza exclusivamente `window.print()` con estilos `@media print` propios, ya que las fichas FAR-MC están diseñadas para impresión directa y no consumen la propiedad `"Link"`.

---

## 4. Beneficios de la Arquitectura para Humanos y Agentes IA

1. **Cero Mantenimiento Duplicado:** Modificar un ítem del menú de navegación requiere editar únicamente `js/components.js`, propagándose de forma instantánea a las **15 páginas** del portal que consumen el inyector global.
2. **Desacoplamiento de Contenido y Casos:** Agentes de IA o redactores pueden agregar una nueva lección aprendida, buena práctica, guía técnica, acta de transferencia o ficha de micro-curso simplemente subiendo un archivo JSON a `/data/` y agregando una fila en el acordeón correspondiente de `repositorio.html`, sin tener que crear ni maquetar nuevos archivos HTML.
3. **Alto Rendimiento y Carga Asíncrona:** Al ejecutarse con scripts diferidos (`defer` o al final del `<body>`), el navegador renderiza el contenido HTML y estilos Tailwind de manera inmediata, alcanzando puntuaciones óptimas en métricas de *Core Web Vitals*.
4. **Interoperabilidad y Proyección:** La arquitectura basada en archivos JSON homogéneos permite que en una fase posterior los motores locales (`content-loader.js`, `directivas-table.js`, `detalle_*.js`) sustituyan las rutas locales por llamadas a APIs REST institucionales o SharePoint Lists con mínimas modificaciones de código.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
