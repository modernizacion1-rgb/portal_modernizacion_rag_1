# Plan de Implementación: Vinculación del Botón Oficial PDF con Enlaces de Google Drive

Este plan detalla las modificaciones para transformar la acción del botón **"Imprimir Ficha Oficial (PDF)"** en `ficha_leccion_aprendida.html` (y de manera extensiva en `ficha_buena_practica.html` y `guia_tecnica_saber_hacer.html`), pasando del comando local `window.print()` a la apertura directa del documento PDF oficial almacenado en **Google Drive** en una nueva pestaña del navegador.

---

## Revisión del Usuario Requerida

> [!IMPORTANT]
> Se identificaron 9 archivos JSON de simulación que corresponden a tres tipos de documentos institucionales:
> 1. **Fichas de Lección Aprendida (FLA)**: `simulacion-registro-fla-1-1`, `fla-1-2`, `fla-1-3` (visualizadas en [ficha_leccion_aprendida.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html)).
> 2. **Fichas de Buenas Prácticas (FBP)**: `simulacion-registro-fbp-2-1`, `fbp-2-2`, `fbp-2-3` (visualizadas en [ficha_buena_practica.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_buena_practica.html)).
> 3. **Guías Técnicas de Saber Hacer (GT-SH)**: `simulacion-registro-GT-SH-3-1`, `GT-SH-3-2`, `GT-SH-3-3` (visualizadas en [guia_tecnica_saber_hacer.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/guia_tecnica_saber_hacer.html)).
>
> **Comportamiento propuesto del botón**:
> - Al hacer clic, abre en una nueva pestaña (`target="_blank"`) el enlace oficial de Google Drive correspondiente al registro cargado.
> - Si por algún motivo un registro no cuenta con enlace a Drive, mantiene como respaldo seguro la función nativa `window.print()`.

---

## Preguntas y Decisiones de Diseño

1. **Apertura de Enlace**: Se abrirá en una nueva pestaña mediante `window.open(link, '_blank', 'noopener,noreferrer')` o mediante etiqueta `<a>` con estilo idéntico de botón, preservando la página actual del usuario.
2. **Persistencia y Respaldo**: En caso de que se agreguen futuras fichas sin campo `Link`, el sistema detectará la ausencia del enlace y ejecutará `window.print()` automáticamente para no dejar el botón inoperativo.

---

## Cambios Propuestos

### 1. Datos del Repositorio (Capa JSON en `data/`)

Se incorporará la propiedad `"Link"` tanto en la raíz de cada objeto como dentro de `"MetadatosTrazabilidad"` para máxima robustez técnica.

#### [MODIFY] [simulacion-registro-fla-1-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-1.json)
- Añadir `"Link": "https://drive.google.com/file/d/1zxT8KWYA2z-HXQigZh6OaC4okgh8TVvg/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-fla-1-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-2.json)
- Añadir `"Link": "https://drive.google.com/file/d/1SlV3CakNJs3F5lDVE57GiwVsqZ6F-WQB/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-fla-1-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fla-1-3.json)
- Añadir `"Link": "https://drive.google.com/file/d/1jgd0pt8q8icLfkQE9pKbi0eByXW-NTh7/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-fbp-2-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-1.json)
- Añadir `"Link": "https://drive.google.com/file/d/1ikehnG9UBlvMBub5G2C9UdaofHImidaU/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-fbp-2-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-2.json)
- Añadir `"Link": "https://drive.google.com/file/d/1l2rHtGA_dTljZXrVap4OI59XwQ_c_bPL/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-fbp-2-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-3.json) y [simulacion-registro-fbp-2-3..json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-fbp-2-3..json)
- Añadir `"Link": "https://drive.google.com/file/d/1gnHxRdW5mfx_KrD8qD94HnPOT7KWcYOW/view?usp=sharing"` en ambos archivos para evitar fallos por nomenclatura.

#### [MODIFY] [simulacion-registro-GT-SH-3-1.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-1.json)
- Añadir `"Link": "https://drive.google.com/file/d/1UmmUlaPWlXxBMk1RMHbAjv6jnL67I1KF/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-GT-SH-3-2.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-2.json)
- Añadir `"Link": "https://drive.google.com/file/d/1rmBCRsSSkNOiSnzc1HWqkLD4zSqbocht/view?usp=sharing"`

#### [MODIFY] [simulacion-registro-GT-SH-3-3.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/simulacion-registro-GT-SH-3-3.json)
- Añadir `"Link": "https://drive.google.com/file/d/1RbZfL5LhI_jXABsud36WYTtEiMGFjRKv/view?usp=sharing"`

---

### 2. Vistas HTML

#### [MODIFY] [ficha_leccion_aprendida.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html)
- Identificar el botón en la línea 303:
  ```html
  <!-- Antes -->
  <button onclick="window.print()" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
      <i data-lucide="printer" class="w-4 h-4"></i> Imprimir Ficha Oficial (PDF)
  </button>
  ```
- Modificarlo para asignarle `id="btn-imprimir-pdf"` y remover el inline `onclick="window.print()"`:
  ```html
  <!-- Después -->
  <button id="btn-imprimir-pdf" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm">
      <i data-lucide="printer" class="w-4 h-4"></i> Imprimir Ficha Oficial (PDF)
  </button>
  ```

#### [MODIFY] [ficha_buena_practica.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_buena_practica.html)
- Asignar `id="btn-imprimir-pdf"` al botón de impresión oficial (línea 290).

#### [MODIFY] [guia_tecnica_saber_hacer.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/guia_tecnica_saber_hacer.html)
- Asignar `id="btn-imprimir-pdf"` al botón de impresión oficial (línea 353).

---

### 3. Lógica JavaScript Dinámica

#### [MODIFY] [js/detalle_ficha.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_ficha.js)
- En la función `popularFicha(ficha)`, extraer el campo `Link`:
  ```javascript
  const linkPdf = ficha.Link || (ficha.MetadatosTrazabilidad && ficha.MetadatosTrazabilidad.Link);
  const btnPdf = document.getElementById('btn-imprimir-pdf');
  if (btnPdf) {
      btnPdf.onclick = (e) => {
          e.preventDefault();
          if (linkPdf) {
              window.open(linkPdf, '_blank', 'noopener,noreferrer');
          } else {
              window.print();
          }
      };
  }
  ```

#### [MODIFY] [js/detalle_buena_practica.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_buena_practica.js)
- Implementar la misma vinculación al botón `btn-imprimir-pdf` en `popularFichaBuenaPractica(ficha)`.

#### [MODIFY] [js/detalle_guia_tecnica.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_guia_tecnica.js)
- Implementar la misma vinculación al botón `btn-imprimir-pdf` en `popularGuia(guia)`.

---

## Plan de Verificación

### Pruebas de Carga y Enlace en Navegador
1. Iniciar o verificar servidor local de desarrollo.
2. Abrir cada uno de los URLs correspondientes y validar que al hacer clic en el botón **"Imprimir Ficha Oficial (PDF)"**:
   - `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-1` → Abre Google Drive con ID `1zxT8KWYA2z-HXQigZh6OaC4okgh8TVvg`.
   - `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-2` → Abre Google Drive con ID `1SlV3CakNJs3F5lDVE57GiwVsqZ6F-WQB`.
   - `ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-3` → Abre Google Drive con ID `1jgd0pt8q8icLfkQE9pKbi0eByXW-NTh7`.
   - `ficha_buena_practica.html?id=simulacion-registro-fbp-2-1` → Abre Google Drive con ID `1ikehnG9UBlvMBub5G2C9UdaofHImidaU`.
   - `ficha_buena_practica.html?id=simulacion-registro-fbp-2-2` → Abre Google Drive con ID `1l2rHtGA_dTljZXrVap4OI59XwQ_c_bPL`.
   - `ficha_buena_practica.html?id=simulacion-registro-fbp-2-3` → Abre Google Drive con ID `1gnHxRdW5mfx_KrD8qD94HnPOT7KWcYOW`.
   - `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-1` → Abre Google Drive con ID `1UmmUlaPWlXxBMk1RMHbAjv6jnL67I1KF`.
   - `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-2` → Abre Google Drive con ID `1rmBCRsSSkNOiSnzc1HWqkLD4zSqbocht`.
   - `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-3` → Abre Google Drive con ID `1RbZfL5LhI_jXABsud36WYTtEiMGFjRKv`.
3. Validar sintaxis JSON en todos los archivos modificados mediante script Node/PowerShell para garantizar que no existan errores de parseo (`JSON.parse`).
