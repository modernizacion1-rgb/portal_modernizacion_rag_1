# Plan de Actualización Integral de la Documentación Técnica (`document/`)

Revisión exhaustiva y actualización integral del corpus documental técnico institucional ubicado en la carpeta `document/` del **Portal Web de Gestión y Modernización de AGROIDEAS** (MIDAGRI). Esta actualización incorpora los avances recientes del proyecto: transición de 11 a 15 páginas HTML, integración de los 4 visores dinámicos desacoplados de instrumentos ETMC (Anexos 01 al 04), catálogo ampliado de 17 archivos de datos JSON, lógica del botón oficial de Google Drive (`#btn-imprimir-pdf`), y ordenamiento cronológico en DataTables.

## User Review Required

> [!IMPORTANT]
> **Alcance de la Actualización**: Se sincronizarán los 6 documentos de `document/` con el estado real y vigente del código fuente y la arquitectura de datos del repositorio:
> 1. `0_Indice_Documentacion.md`
> 2. `1_Arquitectura_Estructural.md`
> 3. `2_Guia_de_Estilos_UI.md`
> 4. `3_Manual_Despliegue_Mantenimiento.md`
> 5. `4_Arquitectura_Datos_Interaccion.md`
> 6. `5_Integracion_Sistemas_Externos.md`

> [!NOTE]
> **Fidelidad Institucional**: Se preservará la identidad corporativa "Impulsa Agroideas", la terminología formal de la Unidad de Planeamiento y Presupuesto (UPP) y el estándar normativo de modernización de la gestión pública (SAMGP - PCM).

---

## Open Questions

No existen preguntas bloqueantes. Toda la estructura de archivos, vistas HTML, scripts JS y fuentes JSON ha sido auditada directamente en el espacio de trabajo.

---

## Proposed Changes

### Corpus Documental (`document/`)

---

#### [MODIFY] [0_Indice_Documentacion.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/0_Indice_Documentacion.md)
- Actualizar el alcance cuantitativo de **11 a 15 páginas HTML activas**.
- Incorporar en el índice la mención y propósito de los 4 visores dinámicos de instrumentos ETMC:
  - Ficha de Buena Práctica (`ficha_buena_practica.html` - Anexo 02)
  - Ficha de Lección Aprendida (`ficha_leccion_aprendida.html` - Anexo 01)
  - Guía Técnica del Saber Hacer (`guia_tecnica_saber_hacer.html` - Anexo 03)
  - Transferencia de Conocimiento Organizacional (`transferencia_conocimiento_organizacional.html` - Anexo 04)
- Documentar el ecosistema de 17 archivos JSON en `/data` (corpus general, chatbot, microcursos, normativas y 12 simulaciones ETMC).
- Actualizar la "Guía Rápida para Agentes de Inteligencia Artificial" con las reglas del visor desacoplado (`?id=...`) y el patrón de vinculación del botón de impresión oficial (`#btn-imprimir-pdf` hacia Google Drive con fallback a `window.print()`).

---

#### [MODIFY] [1_Arquitectura_Estructural.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/1_Arquitectura_Estructural.md)
- **Árbol de Directorios Oficial:**
  - Reflejar las **15 páginas HTML** completas.
  - Reflejar los **12 scripts JavaScript** (incorporando `detalle_buena_practica.js`, `detalle_ficha.js`, `detalle_guia_tecnica.js`, `detalle_transferencia.js`, `directivas-table.js`).
  - Reflejar los **17 archivos JSON** de datos (incorporando `normativas_agroideas.json` y los 12 archivos de simulación FLA, FBP, GT-SH y TCO).
- **Sección 3 - Estandarización Modular de las Páginas:**
  - Agregar la subsección **E. Visores Dinámicos Desacoplados de Instrumentos ETMC**, explicando el funcionamiento por parámetro URL (`?id=...`), su arquitectura común y la correspondencia con los formularios oficiales en PDF (Anexos 01 al 04).
- **Sección 4 - Beneficios de la Arquitectura:**
  - Actualizar la métrica de propagación global de 11 a 15 páginas y el desacoplamiento de instrumentos de conocimiento.

---

#### [MODIFY] [2_Guia_de_Estilos_UI.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/2_Guia_de_Estilos_UI.md)
- **Patrones de Componentes de Fichas Técnicas ETMC:**
  - Documentar la estructura visual de las fichas: Hero banner con degradado (`from-primary to-primary/90`), badge de trazabilidad, jerarquía de Secciones en números Romanos (I, II, III...) y campos en números Arábigos (1, 2, 3...).
  - Documentar las cajas de alertas técnicas diferenciadas (alerta roja para riesgos críticos, ámbar para precauciones, verde/azul para tips de expertos y buenas prácticas).
  - Documentar el bloque de firmas de conformidad y validación técnica del ETMC (criterios SGP-PCM, badges de estado).
  - Documentar el patrón visual del botón de acción dual `#btn-imprimir-pdf` ("Imprimir Ficha Oficial (PDF)") y el botón de retorno rápido al repositorio.
- **Tablas y Vistas de Normatividad:**
  - Documentar los estilos aplicados a la tabla de directivas (`directivas-table.js`), badges de tipo de norma (RDE, Directiva, Guía) y botones de acceso directo a Google Drive.

---

#### [MODIFY] [3_Manual_Despliegue_Mantenimiento.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/3_Manual_Despliegue_Mantenimiento.md)
- Actualizar el alcance del sitio a 15 páginas HTML.
- **Protocolos de Mantenimiento:**
  - Agregar **Subsección F: Mantenimiento y Registro de Nuevos Instrumentos ETMC**:
    - Procedimiento para crear o actualizar simulaciones en `data/simulacion-registro-*.json` y `data/Formato-registro-TCO-*.json`.
    - Estructura obligatoria del campo `"Link"` (Google Drive) tanto en la raíz como en metadatos.
    - Registro del hipervínculo en el acordeón correspondiente de `repositorio.html` (`?id=...`).
  - Agregar **Subsección G: Mantenimiento del Catálogo de Normativas y Directivas (`data/normativas_agroideas.json`)**:
    - Estructura de campos (`numero`, `nombre`, `anio`, `fecha_aprobacion`, `enlace_drive`, `categoria`).
    - Explicación de cómo `directivas-table.js` procesa los datos y aplica ordenamiento cronológico automático.
- **Troubleshooting:**
  - Actualizar directrices para garantizar que servidores IIS y Apache reconozcan y sirvan los 17 archivos JSON con el tipo MIME `application/json`.

---

#### [MODIFY] [4_Arquitectura_Datos_Interaccion.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/4_Arquitectura_Datos_Interaccion.md)
- **Estructura de las Bases de Datos JSON (`/data`):**
  - Describir exhaustivamente los **17 archivos JSON**, agrupados en:
    1. Datos generales y repositorios (`content.json`, `normativas_agroideas.json`).
    2. Motor conversacional IA (`chatbot_knowledge.json`).
    3. Micro-cursos interactivos (`cursos.json`).
    4. Muestras documentales ETMC (12 archivos: FLA 1-1 a 1-3, FBP 2-1 a 2-3, GT-SH 3-1 a 3-3, TCO 4-1 a 4-3).
- **Ciclo de Vida de Renderizado de los Visores ETMC:**
  - Agregar diagrama Mermaid que ilustre el flujo: Clic en Repositorio -> Lectura de Query String (`?id=...`) -> Carga asíncrona de `data/{id}.json` -> Poblado semántico del DOM -> Vinculación dinámica del botón `#btn-imprimir-pdf` con `window.open(Link)`.
- **Lógica de Controladores JS:**
  - Documentar `detalle_buena_practica.js`, `detalle_ficha.js`, `detalle_guia_tecnica.js`, `detalle_transferencia.js` y `directivas-table.js`.
- **DataTables:**
  - Documentar el ordenamiento cronológico por fecha de aprobación (`order: [[2, 'desc']]` / columna fecha) y enlaces directos de descarga.

---

#### [MODIFY] [5_Integracion_Sistemas_Externos.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/5_Integracion_Sistemas_Externos.md)
- **Integración con SharePoint y Microsoft 365:**
  - Ampliar los casos de uso para incrustar no solo el portal completo o repositorios, sino también **visores individuales de fichas ETMC** en páginas temáticas de SharePoint o pestañas de Microsoft Teams.
  - Explicar la gestión de enlaces y permisos en Google Drive institucional para los documentos oficiales vinculados en el botón de impresión.
- **Hoja de Ruta de APIs REST:**
  - Detallar la transición de los 17 archivos JSON hacia microservicios backend REST: endpoints recomendados (`/api/normativas`, `/api/etmc/fla/{id}`, `/api/etmc/fbp/{id}`, `/api/etmc/gtsh/{id}`, `/api/etmc/tco/{id}`).
- **Deep Linking y Navegación Externa:**
  - Documentar el soporte para enlaces directos externos hacia subtemas de microcursos (`?modulo=...&subtema=...`), modales (`?openModal=...`) y fichas técnicas (`?id=...`).

---

## Verification Plan

### Verificación Automatizada y de Integridad
- Revisión de sintaxis Markdown y enlaces relativos entre documentos mediante scripts de validación.
- Comprobación de consistencia de rutas de archivos (`file:///...`) y nombres exactos de los 15 archivos HTML, 12 scripts JS y 17 archivos JSON.

### Verificación Manual
- Validación de legibilidad, coherencia de formato y alineación con los estándares institucionales de AGROIDEAS.
