# Portal Web de Modernización de la Gestión Pública - AGROIDEAS

Este proyecto es una plataforma web estática de alto rendimiento desarrollada para difundir, gestionar e informar sobre el **Proceso de Modernización de la Gestión Pública** en el contexto de **AGROIDEAS** (Programa de Compensaciones para la Competitividad - MIDAGRI). La web proporciona un centro de conocimiento centralizado, normatividad, guías metodológicas, un organigrama interactivo, visores de instrumentos técnicos estandarizados, un **Aula Virtual de Micro-Cursos** y un **Asistente IA (Chatbot)** para optimizar la toma de decisiones y la mejora continua institucional.

---

## 🚀 Características Principales

- **Arquitectura Estática Desacoplada ("Backend-Less"):** Toda la información variable (textos de secciones, videos explicativos, **43 directivas legales**, currícula de **6 módulos de micro-cursos (18 subtemas)**, base de conocimiento del chatbot, **13 registros de instrumentos ETMC** y **18 fichas pedagógicas FAR-MC**) se gestiona de manera declarativa a través de **36 archivos JSON** localizados en [data/](data/).
- **Diseño Premium y Responsivo:** Construido con **Tailwind CSS** (vía CDN) y variables CSS institucionales (`css/modern-styles.css`) bajo la línea gráfica **"Impulsa Agroideas"**, implementando efectos de vanguardia como *Glassmorphism*, sombras de elevación multinivel y compatibilidad WCAG AAA.
- **Inyección Centralizada de Componentes:** Uso de Vanilla JavaScript (`js/components.js`) para la inyección automática del **Header Global**, **Footer**, menú móvil y la inicialización centralizada de íconos y animaciones en **15 de las 16 páginas del portal** (`microcurso.html` emplea un mini-header curricular propio).
- **Asistente IA y Búsqueda por Relevancia (`chatbot.html`):** Módulo inteligente con motor **RAG local** (scoring ponderado por keywords/question-patterns con normalización NFD) que consulta el archivo `data/chatbot_knowledge.json` mediante `js/chatbot-engine.js`, ofreciendo respuestas inmediatas sobre normatividad, flujos y lineamientos GxP, con **reconocimiento de voz** y un **conector opcional a Google Gemini** (`gemini-flash-latest`) para generación en tiempo real.
- **Repositorio Documental Interactivo (`repositorio.html`):** Catálogo centralizado estructurado en **4 Pestañas / Ejes Documentales** con tablas avanzadas **DataTables** (exportación a Excel/PDF/impresión). Incluye el motor `js/directivas-table.js` con ordenamiento cronológico descendente por fecha de aprobación, y **5 sub-acordeones** en la pestaña *Gestión del Conocimiento*: registros FLA, FBP, GT-SH y TCO validados por el **Equipo Técnico de Mejora Continua (ETMC)** y la cuadrícula de **6 Módulos de Micro-Cursos** de autoaprendizaje.
- **Visores Dinámicos Desacoplados (5 plantillas únicas):**
  - **Instrumentos ETMC (Anexos 01 al 04 SGP-PCM):** `ficha_*.html`, `guia_*.html`, `transferencia_*.html` renderizan casos de conocimiento mediante parámetros de consulta (`?id=...`), respetando la jerarquía oficial de secciones Romanas y campos Arábigos.
  - **Fichas pedagógicas FAR-MC:** `ficha_microcurso.html` renderiza las 18 *Fichas de Aprendizaje Rápido de Micro-Curso* (esquema oficial `far-mc-v2.json`) con impresión directa optimizada (`@media print`).
- **Integración Híbrida de Documentos:** El botón oficial institucional **"Imprimir Ficha Oficial (PDF)"** (`#btn-imprimir-pdf`) de los 4 visores ETMC abre el documento formal en PDF alojado en **Google Drive** en una nueva pestaña (`window.open`), con mecanismo de contingencia local (`window.print()`). Las **normativas** enlazan a las publicaciones oficiales del portal del Estado (**gob.pe**).

---

## 📁 Estructura General del Proyecto y Páginas Web (16 Páginas)

El portal está organizado en **16 páginas web modulares** que cubren los ejes estratégicos, repositorios, interacción inteligente e instrumentos técnicos:

| Archivo HTML | Tipo | Propósito y Descripción |
| :--- | :--- | :--- |
| **[index.html](index.html)** | Principal | **Inicio / Home:** Visión institucional, pilares de transformación GxP, accesos directos y bienvenida. |
| **[gestion_procesos.html](gestion_procesos.html)** | Eje 1 | **Gestión por Procesos:** Cadena de valor, mapeo de procesos, roles, operadores y tutorial en Google Drive (Sección 5). |
| **[gestion_conocimiento.html](gestion_conocimiento.html)** | Eje 2 | **Gestión del Conocimiento:** Políticas, captura, transferencia y retención del capital intelectual. |
| **[gestion_calidad.html](gestion_calidad.html)** | Eje 3 | **Gestión de la Calidad:** Mejora regulatoria, estándares de servicio ciudadano y simplificación administrativa. |
| **[gestion_innovacion.html](gestion_innovacion.html)** | Eje 4 | **Innovación Pública:** Laboratorios de innovación, pilotos colaborativos y co-creación agraria. |
| **[repositorio.html](repositorio.html)** | Catálogo | **Repositorio Central:** 4 pestañas (*Normatividad*, *Conocimiento*, *Innovación*, *Publicaciones*) con DataTables y **5 acordeones** de conocimiento (ETMC + Micro-Cursos). |
| **[chatbot.html](chatbot.html)** | IA / Chatbot | **Asistente IA (Chatbot SAMGP):** Consola ejecutiva conversacional (RAG local + conector Google Gemini, voz y exportación de historial). |
| **[microcurso.html](microcurso.html)** | Aula Virtual | **Micro-Cursos (SPA):** Plantilla dinámica única que carga video, referencia a ficha FAR-MC y cuestionario interactivo desde `data/cursos.json` (6 módulos × 3 subtemas). |
| **[doc_gestion.html](doc_gestion.html)** | Hub | **Documentos de Gestión:** Acceso al MOP, MAPRO, ROF, PEI, POI y marco estratégico institucional. |
| **[estructura_organica.html](estructura_organica.html)** | Institucional | **Estructura Orgánica:** Organigrama interactivo y detalle jerárquico de la Unidad de Planeamiento y Presupuesto (UPP). |
| **[contacto.html](contacto.html)** | Soporte | **Directorio y Contacto:** Formulario de consultas, directorio de coordinadores GxP y soporte técnico. |
| **[ficha_buena_practica.html](ficha_buena_practica.html)** | Visor ETMC | **Ficha de Buena Práctica (FBP - Anexo 02):** Visor dinámico desacoplado (`?id=...`) con problema, solución y factores de éxito. |
| **[ficha_leccion_aprendida.html](ficha_leccion_aprendida.html)** | Visor ETMC | **Ficha de Lección Aprendida (FLA - Anexo 01):** Visor dinámico desacoplado (`?id=...`) con 5 secciones Romanas y 17 campos. |
| **[guia_tecnica_saber_hacer.html](guia_tecnica_saber_hacer.html)** | Visor ETMC | **Guía Técnica de "Saber Hacer" (GT-SH - Anexo 03):** Visor dinámico 5W+2H con alertas de riesgo y tips del experto. |
| **[transferencia_conocimiento_organizacional.html](transferencia_conocimiento_organizacional.html)** | Visor ETMC | **Transferencia de Conocimiento (TCO - Anexo 04):** Visor dinámico de actas de relevo y offboarding de puesto. |
| **[ficha_microcurso.html](ficha_microcurso.html)** | Visor FAR-MC | **Ficha de Aprendizaje Rápido de Micro-Curso (FAR-MC V2.0):** Visor dinámico pedagógico (`?id=far-mc-{m}-{s}`) con síntesis ejecutiva, núcleo de saber, alertas de campo y autoevaluación (impresión directa). |

> [!NOTE]
> **Estandarización de Ejes de Gestión:** Las páginas de los 4 ejes (`gestion_*.html`) siguen un esquema uniforme de 5 secciones: **1. Definición / Marco Teórico**, **2. Finalidad / Cadena de Valor**, **3. Fases o Actividades**, **4. Roles y Operadores**, y **5. Contenido Multimedia (Video Explicativo)**.

---

## 📚 Documentación Técnica para Desarrolladores y Agentes IA

Para conocer la arquitectura detallada, guías de estilo, manuales operativos y patrones de integración, consulte el corpus documental en el directorio [document/](document/):

1. **[Índice y Guía General de la Documentación](document/0_Indice_Documentacion.md)**: Resumen del ecosistema documental y reglas mandatorias para agentes IA.
2. **[Arquitectura Estructural y Tecnológica](document/1_Arquitectura_Estructural.md)**: Árbol real de directorios (16 páginas, 12 scripts JS, 36 fuentes JSON) y motor de inyección global `components.js`.
3. **[Guía de Estilos UI e Identidad Visual](document/2_Guia_de_Estilos_UI.md)**: Paleta "Impulsa Agroideas", tipografía Montserrat/Inter, componentes visuales y diseño estandarizado de las fichas técnicas ETMC y pedagógicas FAR-MC.
4. **[Manual de Despliegue y Mantenimiento](document/3_Manual_Despliegue_Mantenimiento.md)**: Instrucciones de despliegue (IIS, Apache, Nginx) y guías de actualización de contenidos, normativas, micro-cursos/fichas FAR-MC y registros ETMC sin tocar HTML.
5. **[Arquitectura de Datos e Interacción Dinámica](document/4_Arquitectura_Datos_Interaccion.md)**: Detalle de los 36 archivos JSON, flujos de carga asíncrona Mermaid, DataTables cronológico, motor RAG del chatbot y flujo SPA de micro-cursos.
6. **[Integración con Sistemas Externos y Escalabilidad](document/5_Integracion_Sistemas_Externos.md)**: Incrustación en SharePoint (SPFx) / Teams, gestión documental en Google Drive y gob.pe, mapeo de APIs REST y sinergia con la plataforma ESV / SIPA.

---

## 🛠️ Stack Tecnológico

- **Estructura Base:** HTML5 semántico, JavaScript Vanilla (ES6+, clase `SAMGPChatbotEngine` y objetos `components` / `contentLoader`).
- **Estilos y Maquetación:** [Tailwind CSS](https://tailwindcss.com/) (CDN) + CSS3 Variables (`css/modern-styles.css`, `css/repositorio.css`, `css/chatbot.css`).
- **Iconografía:** [Lucide Icons](https://lucide.dev/) (iconos vectoriales institucionales).
- **Animaciones e Interacción:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) y transiciones suaves de interfaz.
- **Tablas Avanzadas:** [DataTables.net](https://datatables.net/) + Buttons + Responsive + pdfMake + JSZip (búsqueda multicampo, orden cronológico y exportación a Excel/PDF, solo en `repositorio.html`).
- **Gestión Documental Cloud:** Google Drive para videos HD (1080p) y fichas ETMC oficiales en PDF; portales **gob.pe** como fuente oficial de normativas.
- **IA Opcional:** Conector a **Google Gemini** (`gemini-flash-latest`) configurable por el usuario desde el panel del chatbot.

---

## 💻 Instrucciones Rápidas de Ejecución y Mantenimiento

1. **Clonado / Descarga:** Clona o extrae el repositorio en tu equipo de desarrollo o servidor web institucional.
2. **Conexión a Internet:** Asegúrate de contar con acceso a internet para la carga de bibliotecas de diseño e íconos (CDNs oficiales).
3. **Ejecución Local:** Abre `index.html` en el navegador (se recomienda usar la extensión *Live Server* de VS Code o `python -m http.server 8000` para evitar bloqueos CORS locales en la lectura de archivos JSON).
4. **Modificación de Menús y Footer:** Para cambiar enlaces de navegación o pie de página en las 15 páginas que consumen el inyector, edita únicamente **[js/components.js](js/components.js)**.
5. **Actualización de Contenidos y Datos:**
   - Textos de ejes y videos: **[data/content.json](data/content.json)**.
   - Catálogo de **43 normativas** (campos: `titulo`, `resolucion_aprobatoria`, `fecha`, `descripcion`, `enlace`): **[data/normativas_agroideas.json](data/normativas_agroideas.json)**.
   - Base de conocimiento del Chatbot (24 nodos, 9 categorías): **[data/chatbot_knowledge.json](data/chatbot_knowledge.json)**.
   - Aula Virtual de Micro-Cursos (6 módulos, 18 subtemas): **[data/cursos.json](data/cursos.json)**.
   - **Nuevos casos e instrumentos ETMC:** crea o edita los archivos `data/simulacion-registro-*.json` o `data/Formato-registro-TCO-*.json` asegurando la inclusión de la propiedad `"Link"` (Google Drive) y añade el enlace en el acordeón correspondiente de **[repositorio.html](repositorio.html)**.
   - **Fichas pedagógicas de micro-cursos:** crea o edita `data/far-mc-*.json` y valida su estructura contra el esquema **[data/far-mc-v2.json](data/far-mc-v2.json)**; el visor correspondiente es `ficha_microcurso.html?id={archivo}` (impresión directa, sin propiedad `Link`).

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
