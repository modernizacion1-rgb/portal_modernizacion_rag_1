# Walkthrough: Actualización Integral de la Documentación Técnica (`document/`)

Se ha completado con éxito la auditoría, sincronización y actualización exhaustiva de los **6 documentos técnicos** institucionales ubicados en la carpeta `document/` del **Portal Web de Gestión y Modernización de AGROIDEAS** (MIDAGRI).

---

## 1. Documentos Actualizados

| Documento | Alcance de la Actualización | Estado |
|---|---|---|
| [0_Indice_Documentacion.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/0_Indice_Documentacion.md) | Sincronización del catálogo general a 15 páginas HTML, incorporación de los 4 visores ETMC, resumen de 17 archivos JSON y reglas mandatorias actualizadas para agentes de IA (deep-linking y botón oficial de impresión `#btn-imprimir-pdf`). | ✅ Actualizado |
| [1_Arquitectura_Estructural.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/1_Arquitectura_Estructural.md) | Árbol real del proyecto con 15 páginas HTML, 12 scripts JS y 17 fuentes de datos JSON. Nueva Sección 3.E detallando el paradigma de los 4 visores desacoplados ETMC y el botón dual de Google Drive con fallback a impresión local. | ✅ Actualizado |
| [2_Guia_de_Estilos_UI.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/2_Guia_de_Estilos_UI.md) | Incorporación de la guía visual para Fichas Técnicas ETMC: jerarquía de Secciones en números Romanos y campos en números Arábigos, alertas cromáticas (riesgo crítico, atajos, troubleshooting), bloque de firmas ETMC/SGP-PCM y estilos de la tabla de directivas institucionales. | ✅ Actualizado |
| [3_Manual_Despliegue_Mantenimiento.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/3_Manual_Despliegue_Mantenimiento.md) | Nuevos protocolos de mantenimiento: Subsección 3.F (registro de nuevos casos de simulación FLA, FBP, GT-SH, TCO y carga del campo `"Link"` en JSON) y Subsección 3.G (gestión del catálogo normativo en `normativas_agroideas.json`), más soporte de tipos MIME en IIS para los 17 archivos JSON. | ✅ Actualizado |
| [4_Arquitectura_Datos_Interaccion.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/4_Arquitectura_Datos_Interaccion.md) | Descripción detallada de las 17 bases de datos JSON (incluyendo las 12 muestras de instrumentos ETMC y `normativas_agroideas.json`), diagramas de secuencia Mermaid del flujo de carga desacoplada, controladores `detalle_*.js` y lógica del evento de apertura del PDF en Google Drive. | ✅ Actualizado |
| [5_Integracion_Sistemas_Externos.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/document/5_Integracion_Sistemas_Externos.md) | Integración con SharePoint / Teams para visores individuales de fichas, arquitectura en la nube con Google Drive para documentos oficiales en PDF, mapeo completo de endpoints REST para los 17 archivos JSON y deep-linking institucional. | ✅ Actualizado |
| [plan-analisis-actualizacion-documentos.md](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/doc/plan-analisis-actualizacion-documentos.md) | Actualización del estado en el documento de orquestación de la carpeta `doc/` a Fase 2 (Implementación y Actualización) completada al 100%. | ✅ Actualizado |

---

## 2. Puntos Clave Sincronizados con el Código Real

1. **Escala del Portal:**
   - **Antes:** Se indicaban 11 páginas HTML y 3 archivos JSON.
   - **Ahora:** Se documentan con rigor las **15 páginas HTML activas** (las 11 iniciales + los 4 visores de instrumentos ETMC), los **12 scripts JavaScript** y los **17 archivos JSON** de datos.

2. **Visores Dinámicos Desacoplados ETMC:**
   - Se formalizó la arquitectura de deep-linking `?id={nombre_archivo}` para:
     - `ficha_leccion_aprendida.html` (Anexo 01 - FLA)
     - `ficha_buena_practica.html` (Anexo 02 - FBP)
     - `guia_tecnica_saber_hacer.html` (Anexo 03 - GT-SH)
     - `transferencia_conocimiento_organizacional.html` (Anexo 04 - TCO)

3. **Acción del Botón Oficial de Impresión (`#btn-imprimir-pdf`):**
   - Se documentó el comportamiento dinámico que recupera la propiedad `"Link"` del documento JSON y abre el archivo oficial PDF en Google Drive en una nueva pestaña (`window.open`), manteniendo `window.print()` como contingencia local en caso de ausencia de enlace.

4. **Repositorio Institucional y DataTables:**
   - Se detalló el motor `directivas-table.js` que consume `normativas_agroideas.json`, renderiza badges de categoría y aplica ordenamiento cronológico descendente por fecha de emisión.
