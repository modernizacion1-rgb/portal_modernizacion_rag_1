# Plan de Implementación: Vinculación de Enlaces de Google Drive en Botón de Impresión Oficial (TCO)

## Resumen del Diagnóstico y Análisis Técnico

Se ha revisado y evaluado la estructura actual del portal respecto a la carga dinámica de fichas y la acción del botón de impresión oficial:

1. **Patrón de Referencia Identificado**:
   - En `ficha_leccion_aprendida.html` (y análogamente en `ficha_buena_practica.html` y `guia_tecnica_saber_hacer.html`), el botón de impresión fue desacoplado del comando local `window.print()` y configurado con `id="btn-imprimir-pdf"`.
   - Su script controlador (`js/detalle_ficha.js`) lee la propiedad `"Link"` del documento JSON cargado y abre el archivo oficial en Google Drive en una nueva pestaña mediante `window.open(linkPdf, '_blank', 'noopener,noreferrer')`, manteniendo `window.print()` como mecanismo de contingencia si no existiese enlace.

2. **Diagnóstico en los Documentos TCO (Anexo 04)**:
   - Los documentos solicitados (`Formato-registro-TCO-4-1.json`, `Formato-registro-TCO-4-2.json` y `Formato-registro-TCO-4-3.json`) corresponden a las **Actas de Transferencia de Conocimiento Organizacional (TCO)**, accesibles desde el catálogo (`repositorio.html`) a través de `transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-*`.
   - Actualmente, en `transferencia_conocimiento_organizacional.html` (línea 378), el botón conserva la acción estática previa: `<button onclick="window.print()" ...> Imprimir Acta Oficial (PDF) </button>`.
   - El script `js/detalle_transferencia.js` aún no cuenta con el handler dinámico para captura del campo `Link`.
   - En `Formato-registro-TCO-4-1.json` y `Formato-registro-TCO-4-2.json`, el campo `"Link"` no está presente.
   - En `Formato-registro-TCO-4-3.json`, además de faltar el campo `"Link"`, la estructura raíz es un objeto único `{ ... }` en lugar de una lista `[ { ... } ]` como en los demás archivos del repositorio.

---

## Cambios Propuestos

### 1. Actualización de Datos JSON (`data/`)

Incorporar el atributo `"Link"` con su respectiva URL compartida de Google Drive en la sección `DatosGeneralesPuesto` y en la raíz de cada registro:

#### [MODIFY] [Formato-registro-TCO-4-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/Formato-registro-TCO-4-1.json)
- Añadir `"Link": "https://drive.google.com/file/d/1qCntuTs6oxYDnaSMmlHrfPbcVnKDJ41U/view?usp=sharing"` dentro de `DatosGeneralesPuesto` y en el objeto raíz.

#### [MODIFY] [Formato-registro-TCO-4-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/Formato-registro-TCO-4-2.json)
- Añadir `"Link": "https://drive.google.com/file/d/1f3dUx1dIcDbjCp7ND7H6CbUUaJtnMFOF/view?usp=sharing"` dentro de `DatosGeneralesPuesto` y en el objeto raíz.

#### [MODIFY] [Formato-registro-TCO-4-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/Formato-registro-TCO-4-3.json)
- Añadir `"Link": "https://drive.google.com/file/d/1Ow9lEy4S5qvdT1NE1d31GLr_E39hzD2O/view?usp=sharing"`.
- Normalizar la estructura encerrándola en array `[ { ... } ]` para estandarizarla con el resto de fuentes JSON del portal.

---

### 2. Actualización de Interfaz y Scripts (`transferencia_conocimiento_organizacional.html` y `js/detalle_transferencia.js`)

#### [MODIFY] [transferencia_conocimiento_organizacional.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/transferencia_conocimiento_organizacional.html)
- Sustituir el botón en línea 378:
  ```html
  <!-- ANTES -->
  <button onclick="window.print()" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
      <i data-lucide="printer" class="w-4 h-4"></i> Imprimir Acta Oficial (PDF)
  </button>

  <!-- DESPUÉS -->
  <button id="btn-imprimir-pdf" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
      <i data-lucide="printer" class="w-4 h-4"></i> Imprimir Acta Oficial (PDF)
  </button>
  ```

#### [MODIFY] [js/detalle_transferencia.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_transferencia.js)
- Robustecer la extracción del objeto `tco` para aceptar tanto Array `dataArray[0]` como Objeto directo `dataArray`.
- En `popularTransferencia(tco)`, enlazar el botón `btn-imprimir-pdf` para recuperar `tco.Link || (datosGen && datosGen.Link)`.
- Si existe el enlace, ejecutar `window.open(linkPdf, '_blank', 'noopener,noreferrer')`. Si no existe, invocar `window.print()` como fallback.

#### [VERIFY / HARMONIZE] [ficha_leccion_aprendida.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html) y [js/detalle_ficha.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_ficha.js)
- Confirmar que `ficha_leccion_aprendida.html` mantenga su comportamiento íntegro con los documentos FLA (`simulacion-registro-fla-1-1`, `1-2`, `1-3`) y que si un usuario consultase un ID TCO en `ficha_leccion_aprendida.html`, la lógica no genere excepciones de script.

---

## Plan de Verificación

### Pruebas Funcionales Automatizadas y Manuales
1. **Validación de Sintaxis JSON**:
   - Comprobar que los tres archivos (`Formato-registro-TCO-4-1.json`, `4-2.json`, `4-3.json`) sean JSON válido tras la edición.
2. **Navegación e Interacción**:
   - Abrir `transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-1`:
     - Comprobar carga completa de datos y código `EC-UR_PUNO-001-2026`.
     - Validar que al pulsar **"Imprimir Acta Oficial (PDF)"** se abra `https://drive.google.com/file/d/1qCntuTs6oxYDnaSMmlHrfPbcVnKDJ41U/view?usp=sharing`.
   - Abrir `transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-2`:
     - Comprobar carga completa y código `EC-URIE-002-2026`.
     - Validar enlace `https://drive.google.com/file/d/1f3dUx1dIcDbjCp7ND7H6CbUUaJtnMFOF/view?usp=sharing`.
   - Abrir `transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-3`:
     - Comprobar carga completa y código `EC-UPDC-003-2026`.
     - Validar enlace `https://drive.google.com/file/d/1Ow9lEy4S5qvdT1NE1d31GLr_E39hzD2O/view?usp=sharing`.
   - Verificar que no existan errores de consola JavaScript.
