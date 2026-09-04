# Plan de Ejecución: Vinculación de Fichas Oficiales con PDF en Google Drive

> **Task Slug**: `plan-vinculacion-pdf-drive`
> **Estado**: Aprobado por el usuario - En Ejecución

## 1. Contexto y Objetivos
Sustituir la acción estática de impresión local (`window.print()`) en las páginas de fichas oficiales del repositorio por la apertura directa del documento oficial en formato PDF alojado en Google Drive.

## 2. Alcance de Archivos

### 2.1 Archivos de Datos (JSON)
- `data/simulacion-registro-fla-1-1.json` -> ID `1zxT8KWYA2z-HXQigZh6OaC4okgh8TVvg`
- `data/simulacion-registro-fla-1-2.json` -> ID `1SlV3CakNJs3F5lDVE57GiwVsqZ6F-WQB`
- `data/simulacion-registro-fla-1-3.json` -> ID `1jgd0pt8q8icLfkQE9pKbi0eByXW-NTh7`
- `data/simulacion-registro-fbp-2-1.json` -> ID `1ikehnG9UBlvMBub5G2C9UdaofHImidaU`
- `data/simulacion-registro-fbp-2-2.json` -> ID `1l2rHtGA_dTljZXrVap4OI59XwQ_c_bPL`
- `data/simulacion-registro-fbp-2-3..json` y `data/simulacion-registro-fbp-2-3.json` -> ID `1gnHxRdW5mfx_KrD8qD94HnPOT7KWcYOW`
- `data/simulacion-registro-GT-SH-3-1.json` -> ID `1UmmUlaPWlXxBMk1RMHbAjv6jnL67I1KF`
- `data/simulacion-registro-GT-SH-3-2.json` -> ID `1rmBCRsSSkNOiSnzc1HWqkLD4zSqbocht`
- `data/simulacion-registro-GT-SH-3-3.json` -> ID `1RbZfL5LhI_jXABsud36WYTtEiMGFjRKv`

### 2.2 Vistas Web (HTML)
- `ficha_leccion_aprendida.html`
- `ficha_buena_practica.html`
- `guia_tecnica_saber_hacer.html`

### 2.3 Scripts Dinámicos (JS)
- `js/detalle_ficha.js`
- `js/detalle_buena_practica.js`
- `js/detalle_guia_tecnica.js`

## 3. Plan de Asignación por Agentes
1. **backend-specialist**: Actualización e inyección del campo `"Link"` en los JSON de simulación.
2. **frontend-specialist**: Asignación de identificadores de control y manipulación del evento de clic en las vistas y scripts dinámicos con apertura en nueva ventana.
3. **test-engineer**: Validación de sintaxis JSON, pruebas de integración y verificación funcional.
