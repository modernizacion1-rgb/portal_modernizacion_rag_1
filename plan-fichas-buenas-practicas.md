# Plan de Implementación: Fichas de Buenas Prácticas (FBP) Dinámicas

## 1. Resumen Ejecutivo
Actualización de la Sección 2.2 "Fichas de Buenas Prácticas (Estandarización Nacional)" en `repositorio.html`, sustituyendo los registros ficticios por las 3 fichas reales alojadas en `data/simulacion-registro-fbp-*.json`, construyendo la nueva página oficial `ficha_buena_practica.html` basada en el Anexo 02 (PDF) y programando el script `js/detalle_buena_practica.js` para la carga dinámica de datos.

## 2. Desglose de Tareas

### Tarea 1: Actualización de la Sección 2.2 en `repositorio.html`
- **Agente**: `frontend-specialist`
- **Input**: `data/simulacion-registro-fbp-2-1.json`, `data/simulacion-registro-fbp-2-2.json`, `data/simulacion-registro-fbp-2-3..json`
- **Output**: Modificación de las filas de la tabla de la Sección 2.2 en `repositorio.html`.
- **Verificación**: Inspección visual de la tabla en navegador mostrando las 3 buenas prácticas con sus códigos oficiales y enlaces a `ficha_buena_practica.html?id=...`.

### Tarea 2: Creación de la página web `ficha_buena_practica.html`
- **Agente**: `frontend-specialist`
- **Input**: Formato y distribución de `Documentos_Captura_del_Conocimiento/anexo-02-formulario-estandarizado-fbp-v2.pdf`, diseño base de `ficha_leccion_aprendida.html`.
- **Output**: Nuevo archivo `ficha_buena_practica.html` con las 5 secciones oficiales del Anexo 02, bloque de validación ETMC, regla de austeridad y sección de firmas.
- **Verificación**: Apertura de la página comprobando la correcta maquetación de todos los contenedores y compatibilidad responsive con Tailwind CSS.

### Tarea 3: Script de Carga Dinámica `js/detalle_buena_practica.js`
- **Agente**: `backend-specialist`
- **Input**: Estructura de datos JSON de `data/simulacion-registro-fbp-*.json`.
- **Output**: Archivo `js/detalle_buena_practica.js` que realiza fetch asíncrono con tolerancia a nombres (`.json` y `..json`), inyecta los valores en el DOM, formatea listas y textos multilínea y genera la tabla de evaluación de calidad.
- **Verificación**: Carga exitosa de las 3 fichas mediante URL parameters (`?id=simulacion-registro-fbp-2-1`, `?id=simulacion-registro-fbp-2-2`, `?id=simulacion-registro-fbp-2-3..json`).

## 3. Fase X: Verificación Final
- [ ] Enlace desde repositorio.html funcional para las 3 fichas.
- [ ] Carga completa de los datos en la vista detallada de la Ficha de Buena Práctica.
- [ ] Consistencia de estilos, iconos Lucide y tipografías institucionales.
