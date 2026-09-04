# Walkthrough: Vinculación del Botón Oficial PDF con Enlaces de Google Drive

Se implementó exitosamente el cambio de comportamiento del botón **"Imprimir Ficha Oficial (PDF)"** para que abra de forma directa el documento oficial en formato PDF alojado en **Google Drive** en una nueva pestaña del navegador, enriqueciendo los datos de simulación y cubriendo la arquitectura completa de fichas institucionales.

---

## 1. Cambios Realizados

### Capa de Datos (JSON)
Se inyectó la propiedad `"Link"` (tanto en la raíz del objeto como dentro de `"MetadatosTrazabilidad"`) en los 9 documentos de simulación solicitados:
- [simulacion-registro-fla-1-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-1.json) (`LA-UR_SAN_MARTIN-004-2026`)
- [simulacion-registro-fla-1-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-2.json) (`LA-USE-003-2026`)
- [simulacion-registro-fla-1-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-3.json) (`LA-UPDC-001-2026`)
- [simulacion-registro-fbp-2-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-1.json) (`BP-UR_AREQUIPA-001-2026`)
- [simulacion-registro-fbp-2-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-2.json) (`BP-UR_AREQUIPA-001-2026`)
- [simulacion-registro-fbp-2-3..json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-3..json) y `simulacion-registro-fbp-2-3.json` (`BP-UA-002-2026`)
- [simulacion-registro-GT-SH-3-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-1.json) (`GT-SH-NEG-001-2026 / V.01`)
- [simulacion-registro-GT-SH-3-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-2.json) (`GT-SH-NEG-001-2026 / V.01`)
- [simulacion-registro-GT-SH-3-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-3.json) (`GT-SH-NEG-001-2026 / V.01`)

### Vistas HTML
- [ficha_leccion_aprendida.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html): Se asignó `id="btn-imprimir-pdf"` y se retiró el handler inline `onclick="window.print()"`.
- [ficha_buena_practica.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_buena_practica.html): Se asignó `id="btn-imprimir-pdf"` y se retiró el handler inline.
- [guia_tecnica_saber_hacer.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/guia_tecnica_saber_hacer.html): Se asignó `id="btn-imprimir-pdf"` y se retiró el handler inline.

### Scripts Dinámicos (JS)
- [js/detalle_ficha.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_ficha.js): Configura el evento `click` sobre `btn-imprimir-pdf` para abrir `window.open(linkPdf, '_blank', 'noopener,noreferrer')`, con fallback a `window.print()` en caso de ausencia de enlace.
- [js/detalle_buena_practica.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_buena_practica.js): Vinculación idéntica adaptada al modelo de FBP.
- [js/detalle_guia_tecnica.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_guia_tecnica.js): Vinculación idéntica adaptada al modelo de GT-SH.

---

## 2. Verificación de Resultados

1. **Integridad JSON**: Validación automatizada con Python `json.load()` sobre todos los 17 archivos de `data/`, confirmando 0 errores de sintaxis y existencia del campo `Link` en todos los archivos de simulación.
2. **Seguridad y Validación**:
   - `security_scan.py`: 0 vulnerabilidades críticas o altas.
   - `lint_runner.py`: Ejecución completada satisfactoriamente.
3. **Mapeo Verificado de URLs**:
   | Documento JSON | Vista | Enlace Google Drive Vinculado |
   |---|---|---|
   | `simulacion-registro-fla-1-1.json` | `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-1` | `https://drive.google.com/file/d/1zxT8KWYA2z-HXQigZh6OaC4okgh8TVvg/view?usp=sharing` |
   | `simulacion-registro-fla-1-2.json` | `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-2` | `https://drive.google.com/file/d/1SlV3CakNJs3F5lDVE57GiwVsqZ6F-WQB/view?usp=sharing` |
   | `simulacion-registro-fla-1-3.json` | `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-3` | `https://drive.google.com/file/d/1jgd0pt8q8icLfkQE9pKbi0eByXW-NTh7/view?usp=sharing` |
   | `simulacion-registro-fbp-2-1.json` | `ficha_buena_practica.html?id=simulacion-registro-fbp-2-1` | `https://drive.google.com/file/d/1ikehnG9UBlvMBub5G2C9UdaofHImidaU/view?usp=sharing` |
   | `simulacion-registro-fbp-2-2.json` | `ficha_buena_practica.html?id=simulacion-registro-fbp-2-2` | `https://drive.google.com/file/d/1l2rHtGA_dTljZXrVap4OI59XwQ_c_bPL/view?usp=sharing` |
   | `simulacion-registro-fbp-2-3.json` | `ficha_buena_practica.html?id=simulacion-registro-fbp-2-3..json` | `https://drive.google.com/file/d/1gnHxRdW5mfx_KrD8qD94HnPOT7KWcYOW/view?usp=sharing` |
   | `simulacion-registro-GT-SH-3-1.json` | `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-1` | `https://drive.google.com/file/d/1UmmUlaPWlXxBMk1RMHbAjv6jnL67I1KF/view?usp=sharing` |
   | `simulacion-registro-GT-SH-3-2.json` | `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-2` | `https://drive.google.com/file/d/1rmBCRsSSkNOiSnzc1HWqkLD4zSqbocht/view?usp=sharing` |
   | `simulacion-registro-GT-SH-3-3.json` | `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-3` | `https://drive.google.com/file/d/1RbZfL5LhI_jXABsud36WYTtEiMGFjRKv/view?usp=sharing` |
