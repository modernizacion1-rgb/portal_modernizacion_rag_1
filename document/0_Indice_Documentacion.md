# Documentación Técnica: Plataforma de Gestión del Conocimiento GxP

Esta carpeta contiene el corpus oficial de documentación técnica, arquitectónica y funcional para la Plataforma Web **"Gestión y Modernización Institucional (GxP)"**, desarrollada para **AGROIDEAS** (Programa de Compensaciones para la Competitividad - MIDAGRI).

Este conjunto de documentos está redactado tanto para **profesionales de Tecnologías de la Información (OTI), consultores y desarrolladores humanos**, como para **agentes de Inteligencia Artificial (IA)** responsables del mantenimiento, refactorización y escalabilidad futura del portal.

---

## 📑 Índice Detallado de Documentos

1. **[`1_Arquitectura_Estructural.md`](./1_Arquitectura_Estructural.md)**  
   - **Enfoque:** Arquitectura de software, árbol real de directorios y modularización de micro-componentes.  
   - **Contenido clave:** Detalla el uso de **Tailwind CSS (vía CDN)**, **HTML5 semántico**, **JavaScript Vanilla** y variables nativas en `css/modern-styles.css`. Explica el motor del inyector central (`js/components.js`) responsable de renderizar el Header, Footer, transiciones y menú móvil en las **16 páginas** del portal, la arquitectura SPA del Aula Virtual de Micro-Cursos (`microcurso.html`) y los **5 visores dinámicos desacoplados**: los 4 instrumentos ETMC (`ficha_buena_practica.html`, `ficha_leccion_aprendida.html`, `guia_tecnica_saber_hacer.html` y `transferencia_conocimiento_organizacional.html`) más el visor pedagógico **FAR-MC** (`ficha_microcurso.html`).

2. **[`2_Guia_de_Estilos_UI.md`](./2_Guia_de_Estilos_UI.md)**  
   - **Enfoque:** Identidad visual, diseño interactivo y guía de UI/UX.  
   - **Contenido clave:** Documenta la paleta cromática institucional de la línea gráfica **"Impulsa Agroideas"** (`--color-primary #1A5336`, `--color-secondary #53A548`, `--color-accent #F1C40F`), la tipografía **Montserrat/Inter**, el efecto de transparencia modular (*Glassmorphism*), el sistema de iconografía (**Lucide Icons**), animaciones al hacer scroll (**AOS**), las directrices visuales para las tablas del Repositorio (`css/repositorio.css`), el Asistente IA (`css/chatbot.css`), el Aula Virtual de Micro-Cursos y los **patrones visuales estandarizados de las Fichas Técnicas ETMC y FAR-MC** (jerarquía Romana/Arábiga, alertas cromáticas diferenciadas, sellos de validación SGP-PCM y botones de acción dual PDF/Print).

3. **[`3_Manual_Despliegue_Mantenimiento.md`](./3_Manual_Despliegue_Mantenimiento.md)**  
   - **Enfoque:** Operaciones, publicación en servidores locales/web y actualización sin tocar código HTML.  
   - **Contenido clave:** Guía paso a paso para desplegar en servidores locales, Apache, Nginx o IIS/cPanel bajo la filosofía *Serverless Ready & Zero-Build*. Instruye sobre cómo modificar la navegación en `js/components.js` y cómo actualizar contenidos, videos (Drive HD 1080p), catálogo de **43 normativas** (`data/normativas_agroideas.json` con campos `titulo`, `resolucion_aprobatoria`, `fecha`, `descripcion`, `enlace`), los **6 módulos / 18 subtemas** de micro-cursos (`data/cursos.json`), las **18 fichas pedagógicas FAR-MC** (`data/far-mc-*.json`), la base del chatbot (`data/chatbot_knowledge.json`) y los **registros de instrumentos ETMC (FLA, FBP, GT-SH, TCO)** en `data/` con sus enlaces correspondientes a Google Drive.

4. **[`4_Arquitectura_Datos_Interaccion.md`](./4_Arquitectura_Datos_Interaccion.md)**  
   - **Enfoque:** Lógica de datos desacoplada, motores JavaScript e integraciones interactivas.  
   - **Contenido clave:** Explica el funcionamiento del cargador de contenidos (`js/content-loader.js`), la estructura y ciclo de vida de los **36 archivos JSON** del directorio `/data`, la estructura de **4 Pestañas del Repositorio Institucional** con tablas **DataTables** ordenadas cronológicamente y los **5 sub-acordeones** de la pestaña *Gestión del Conocimiento*, el motor **RAG local con scoring por keywords/tokens** del **Asistente IA (`js/chatbot-engine.js`)** con conector a Google Gemini (modelo `gemini-flash-latest`), el flujo SPA de los **Micro-Cursos** (`microcurso.js`), y los controladores de carga asíncrona de los **5 visores** (`detalle_ficha.js`, `detalle_buena_practica.js`, `detalle_guia_tecnica.js`, `detalle_transferencia.js` y `detalle_far_mc.js`), con diagramas de secuencia Mermaid.

5. **[`5_Integracion_Sistemas_Externos.md`](./5_Integracion_Sistemas_Externos.md)**  
   - **Enfoque:** Proyección corporativa, integración con Intranet e interoperabilidad REST.  
   - **Contenido clave:** Establece la hoja de ruta y los hitos técnicos para incrustar el portal y visores individuales de fichas dentro de una intranet **SharePoint / Microsoft Office 365** (mediante SPFx e IFrames), redirección e inicio de sesión único (SSO con `@agroideas.gob.pe`), arquitectura de repositorio documental en la nube (**Google Drive** para fichas ETMC/FAR-MC y **portales gob.pe** para normativas oficiales), deep-linking institucional, y la transición de los 36 archivos JSON locales hacia **APIs REST** y sinergia con el ecosistema **ESV / SIPA**.

---

## 🧠 Guía Rápida para Agentes de Inteligencia Artificial (AI Agents)

Si eres un **agente de IA** o un desarrollador automatizado analizando este repositorio para resolver un ticket o solicitud del usuario, sigue estas reglas estructurales absolutas:

1. **No modifiques código duplicado en cada HTML para cambiar el menú:** Toda la barra de navegación del encabezado (`<header>`) y el pie de página (`<footer>`) se generan globalmente desde `js/components.js`.
2. **Estructura de las páginas de Ejes (`gestion_*.html`):** Mantén estrictamente las 5 secciones estándar (*1. Definición*, *2. Finalidad*, *3. Fases/Actividades*, *4. Roles* y *5. Contenido Multimedia*).
3. **Pestañas del Repositorio (`repositorio.html`):** El repositorio cuenta con **4 pestañas documentales activas** (`normatividad`, `conocimiento`, `innovacion`, `publicaciones`). La pestaña *2. Gestión del Conocimiento* contiene **5 sub-acordeones**: 2.1 Lecciones Aprendidas, 2.2 Buenas Prácticas, 2.3 Guías Técnicas "Saber Hacer", 2.4 Actas de Entrega (Offboarding) y 2.5 Micro-Cursos. No reintroduzcas la pestaña *5. Planeamiento y Resultados*, ya que fue retirada por definición de arquitectura.
4. **Visores Dinámicos Desacoplados (`ficha_*.html`, `guia_*.html`, `transferencia_*.html`):** Son **5 plantillas únicas** (4 ETMC + 1 FAR-MC pedagógicas) que se alimentan mediante el parámetro URL `?id={nombre_archivo_json}`. No crees archivos HTML individuales por cada lección, buena práctica, guía, acta o subtema de micro-curso. Para agregar un nuevo caso, crea el archivo JSON en `/data/` y enlázalo en el acordeón correspondiente de `repositorio.html`.
5. **Botón Oficial de Impresión / PDF (`#btn-imprimir-pdf`):** En los **4 visores de instrumentos ETMC**, el botón oficial debe mantener el id `#btn-imprimir-pdf`. Su controlador asociado captura la propiedad `"Link"` del JSON y abre el archivo oficial PDF en Google Drive en una nueva pestaña (`target="_blank"`, `noopener,noreferrer`), utilizando `window.print()` únicamente como fallback de contingencia. **Excepción:** el visor pedagógico FAR-MC (`ficha_microcurso.html`) utiliza exclusivamente `window.print()` porque sus fichas se generan para impresión directa y no consumen la propiedad `"Link"`.
6. **Enlaces de Video Explicativo:** Al modificar la Sección 5 de multimedia en los ejes de gestión, actualiza tanto la etiqueta `<a>` dentro del archivo HTML (con atributos `target="_blank" rel="noopener noreferrer"`) como la propiedad `"video_url"` correspondiente dentro de `data/content.json`.
7. **Micro-Cursos (`microcurso.html`):** El Aula Virtual es una **plantilla SPA única** que lee `data/cursos.json` mediante parámetros de URL (`?modulo=...&subtema=...`). El catálogo cuenta con **6 módulos × 3 subtemas = 18 fichas FAR-MC** en `data/far-mc-{m}-{s}.json`, cada una enlazada desde el Modal "Índice de Módulo" (`microcurso-modal.js`) con botones duales **"Ficha"** (visor FAR-MC) y **"Aula"** (SPA). No crees páginas HTML individuales por curso; edita únicamente `data/cursos.json` y, si es un subtema nuevo, su ficha `far-mc-*.json` siguiendo el esquema `data/far-mc-v2.json` (JSON Schema draft-07).
8. **Catálogo de Normativas (`data/normativas_agroideas.json`):** Es un arreglo plano de **43 registros** con los campos reales `titulo`, `resolucion_aprobatoria`, `fecha` (texto en español), `descripcion` y `enlace` (URL oficial en gob.pe). No uses campos inexistentes como `numero`, `nombre`, `anio`, `fecha_aprobacion`, `categoria` ni `enlace_drive`.
9. **Estilos de UI:** Si creas nuevos componentes, utiliza clases de utilidad de **Tailwind CSS** y respeta las variables raíz de `css/modern-styles.css` (paleta "Impulsa Agroideas": `primary`, `secondary`, `accent`). Ten en cuenta que `chatbot.html` conserva la configuración legacy de Tailwind (`pcm-red`/`agro-blue`) pendiente de migración, y que las clases `blue-*` en `js/components.js` son residuales de la línea gráfica anterior.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
