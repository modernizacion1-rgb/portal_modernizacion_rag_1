# Integración con Sistemas Externos y Escalabilidad Corporativa

## 1. Integración con la Intranet Institucional (SharePoint / Microsoft 365)
El "Portal Web de Gestión y Modernización de AGROIDEAS" ha sido estructurado como una solución frontend ligera, altamente modular y ágil, concebida para convivir de forma autónoma o integrarse de manera transparente en el ecosistema digital corporativo del MIDAGRI (SharePoint Online / Microsoft 365 / Microsoft Teams).

### Escenarios Técnicos de Convivencia e Interoperabilidad:
- **Incrustación de Módulos y Visores ETMC/FAR-MC vía IFrame / SPFx:**
  - El portal completo, el Hub de Documentos de Gestión (`doc_gestion.html`), la Estructura Orgánica (`estructura_organica.html`), el Repositorio Central (`repositorio.html`) o **visores individuales de fichas** (ej. `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-1` o `ficha_microcurso.html?id=far-mc-1-m1`) pueden incrustarse en páginas de SharePoint mediante *Web Parts* desarrollados con **SharePoint Framework (SPFx)** o componentes *Page Viewer*.
  - La maquetación responsiva con Tailwind CSS se adapta automáticamente al ancho del contenedor en SharePoint sin recortar tablas ni desbordar modales.
- **Incrustación en Pestañas de Microsoft Teams:**
  - Los visores de instrumentos ETMC, las fichas pedagógicas FAR-MC y el Aula Virtual de Micro-Cursos pueden configurarse como pestañas (*Tabs*) en los canales de Teams de las Unidades Zonales y de Línea para capacitación y consulta continua.
- **Redirección y Validación Single Sign-On (SSO):**
  - Al operar bajo el dominio corporativo (`@agroideas.gob.pe`), la futura capa de autenticación para accesos internos o firmas digitales se integrará con **Azure Active Directory (Entra ID)** y **Microsoft Graph API**, permitiendo heredar la sesión activa del usuario sin pantallas de login adicionales.

---

## 2. Repositorio Documental en la Nube (Google Drive) y Fuentes Oficiales (gob.pe)

El portal adopta un modelo híbrido para la gestión documental:
1. **Frontend Ligero de Exploración:** Las vistas HTML renderizan los metadatos, resúmenes, pasos técnicos y validaciones del ETMC a partir de archivos JSON locales de alta velocidad.
2. **Almacenamiento Seguro en Google Drive Institucional (Fichas ETMC y videos):** Los documentos PDF firmados y oficiales (Formularios de Anexos 01 al 04, Actas de Relevo) y los videos HD de los ejes de gestión residen en unidades compartidas de Google Drive de la institución.
3. **Mapeo Dinámico de Enlaces:**
   - **Fichas ETMC (FLA, FBP, GT-SH, TCO):** los JSON almacenan los enlaces en la propiedad raíz `"Link"` (y en el bloque de metadatos). Al pulsar el botón institucional **"Imprimir Ficha Oficial (PDF)"** (`#btn-imprimir-pdf`), el portal ejecuta `window.open(linkPdf, '_blank', 'noopener,noreferrer')`, previsualizando el PDF oficial en el visor nativo de Google Drive.
   - **Normativas y directivas institucionales:** el catálogo `data/normativas_agroideas.json` almacena los enlaces en la propiedad **`enlace`**, apuntando a las publicaciones oficiales en el portal del Estado peruano (**gob.pe**), no a Google Drive. El botón "Ver norma" de la tabla abre el documento en la fuente oficial.
   - **Fichas pedagógicas FAR-MC:** no consumen enlace externo; el botón de acción ejecuta `window.print()` con estilos `@media print` para generación directa del documento.

---

## 3. Proyección Backend y REST APIs

Actualmente, el sistema consume **36 archivos JSON** estáticos en `/data` leídos asíncronamente mediante `fetch()`. La arquitectura desacoplada de los controladores (`content-loader.js`, `directivas-table.js`, `detalle_*.js`) permite migrar hacia un backend institucional (Node.js, Python FastAPI, .NET Core o SharePoint REST API) con mínimas modificaciones:

### Mapeo de Endpoints REST Proyectados:
| Recurso Actual (JSON) | Controlador Frontend | Endpoint REST Institucional Proyectado |
|---|---|---|
| `data/content.json` | `content-loader.js` | `GET /api/v1/portal/secciones` |
| `data/normativas_agroideas.json` | `directivas-table.js` | `GET /api/v1/normatividad/directivas` |
| `data/simulacion-registro-fla-*.json` | `detalle_ficha.js` | `GET /api/v1/etmc/lecciones-aprendidas/{id}` |
| `data/simulacion-registro-fbp-*.json` | `detalle_buena_practica.js` | `GET /api/v1/etmc/buenas-practicas/{id}` |
| `data/simulacion-registro-GT-SH-*.json` | `detalle_guia_tecnica.js` | `GET /api/v1/etmc/guias-tecnicas/{id}` |
| `data/Formato-registro-TCO-*.json` | `detalle_transferencia.js` | `GET /api/v1/etmc/transferencias/{id}` |
| `data/far-mc-*.json` (18 fichas) | `detalle_far_mc.js` | `GET /api/v1/capacitacion/fichas-far-mc/{id}` |
| `data/cursos.json` | `microcurso.js` / `microcurso-modal.js` | `GET /api/v1/capacitacion/cursos/{modulo}` |
| `data/chatbot_knowledge.json` | `chatbot-engine.js` | `GET /api/v1/asistente-ia/knowledge-base` |

### Consideraciones Técnicas de Backend:
- **Encabezados CORS (*Cross-Origin Resource Sharing*):** El servidor backend deberá autorizar peticiones provenientes del dominio de hosting del frontend.
- **Paginación del Lado del Servidor (`serverSide: true`):** Para el Repositorio de Normativas cuando supere los 5,000 registros históricos, se habilitará la delegación del filtrado y ordenamiento cronológico a la base de datos SQL o PostgreSQL.

---

## 4. Deep-Linking Institucional y Navegación Directa

El portal soporta enlaces directos con parámetros de consulta que facilitan el acceso desde correos electrónicos oficiales, memorandos digitales o intranet:
- **Visores ETMC:** `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-1`
- **Visor pedagógico FAR-MC:** `ficha_microcurso.html?id=far-mc-1-m1`
- **Aula Virtual:** `microcurso.html?modulo=modulo1&subtema=M1.1`
- **Apertura de Modales en el Catálogo:** `repositorio.html?openModal=modulo1` (abre automáticamente la pestaña *Conocimiento*, expande el acordeón 2.5 Micro-Cursos y lanza el modal del módulo; limpia el parámetro vía `history.replaceState`).

---

## 5. Evolución y Escalabilidad del Asistente IA (`chatbot.html`)

El Asistente IA funciona con **RAG local** (motor de relevancia por scoring de keywords/tokens sobre `data/chatbot_knowledge.json`, con normalización NFD y ~90 stopwords) y cuenta con un **conector a Google Gemini** (modelo `gemini-flash-latest`, in-context grounding con los 3 nodos de mayor puntaje):

- **Bases de Datos Vectoriales:** Escalabilidad hacia indexación vectorial semántica (Pinecone, ChromaDB o Azure AI Search).
- **Conectividad a Modelos Avanzados (Gemini Flash / GPT-4o):** Consultas en lenguaje natural contra todo el acervo normativo y fichas ETMC/FAR-MC, citando la resolución y abriendo el enlace oficial correspondiente.
- **Sinergia con la Plataforma ESV / SIPA:** Comparte la visión arquitectónica de los Espacios Seguros Virtuales (ESV), que implementa mentoría agéntica con Google Gemini y un modelador BPMN 2.0 en el navegador bajo la misma filosofía *Zero-Setup*.

---

## 6. Analítica Web, Monitoreo y Auditoría de Uso

- **Google Analytics 4 / Microsoft Clarity:** Métricas de trazabilidad:
  - Búsquedas más frecuentes en el Repositorio de Normativas.
  - Tasa de consulta y descarga de Fichas ETMC y Guías Técnicas.
  - Reproducción de videos tutoriales en Google Drive.
  - Patrones de consulta e *intents* planteados al Asistente IA.
- **Monitoreo de Errores (Sentry):** Detección proactiva de fallas de red, bloqueos CORS o excepciones JavaScript en navegadores corporativos.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
