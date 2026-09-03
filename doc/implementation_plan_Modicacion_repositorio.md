# Fichas de Lecciones Aprendidas - Desarrollo Dinámico

El presente plan aborda la solicitud para hacer dinámica la vista de "Fichas de Lecciones Aprendidas", reemplazando los datos ficticios con los datos provenientes de los archivos JSON proporcionados y creando una vista detallada basada en el esquema del PDF.

## User Review Required

> [!IMPORTANT]
> **Aprobación de Fase 1 (Orquestación)**
> Estamos en la Fase 1 del flujo de Orquestación. Por favor, revisa este plan. Una vez aprobado, se ejecutarán los agentes en paralelo (Frontend Specialist, Backend/Script Specialist, etc.) para implementar los cambios.

## Open Questions

> [!WARNING]
> 1. ¿Deseas que el listado de la tabla en `repositorio.html` se genere dinámicamente leyendo todos los JSONs en tiempo real (mediante JS/fetch), o solo modificamos el HTML estático de la tabla para que apunte a las nuevas páginas? (Se asume carga dinámica vía JS por el punto 3).
> 2. Para la "nueva página web" (el detalle de la ficha), ¿creamos un archivo llamado `ficha_leccion_aprendida.html` que lea un parámetro en la URL (ej. `?id=LA-001`) para cargar el JSON correspondiente?

## Proposed Changes

---

### Frontend / HTML

#### [MODIFY] [repositorio.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/repositorio.html)
- Se eliminarán las filas estáticas (LA-001 a LA-004) de la sección "2.1 Fichas de Lecciones Aprendidas".
- Se agregará un contenedor `<tbody>` vacío con un ID específico (ej. `tabla-lecciones-aprendidas`) para inyectar los datos dinámicamente mediante JavaScript.

#### [NEW] [ficha_leccion_aprendida.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html)
- Nueva página basada en la estructura general del portal, pero diseñada para mostrar el contenido completo de una "Ficha de Lección Aprendida" siguiendo la disposición del `anexo-01-formulario-estandarizado-fla-v2.pdf`.
- Contendrá secciones para: Metadatos de Trazabilidad, Descripción del Incidente, Acción Mitigadora, Lección Aprendida y Validación de Calidad.

---

### Scripts / Lógica Dinámica

#### [NEW] [js/lecciones_aprendidas.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/lecciones_aprendidas.js)
- Script encargado de hacer `fetch` a los archivos JSON (`simulacion-registro-fla-1-1.json`, `1-2.json`, `1-3.json`).
- Renderizará las filas en la tabla de `repositorio.html`.
- Incluirá la lógica para que, al hacer clic en "Ver Ficha", se redirija a `ficha_leccion_aprendida.html?id=...`.

#### [NEW] [js/detalle_ficha.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_ficha.js)
- Script para `ficha_leccion_aprendida.html`.
- Leerá el parámetro de la URL, cargará el JSON correspondiente y poblará los campos del DOM de manera dinámica.

## Verification Plan

### Manual Verification
- Cargar `repositorio.html` en un servidor local y verificar que la tabla se llene con los 3 registros JSON.
- Hacer clic en "Ver Ficha" y verificar que la redirección lleve a la nueva página mostrando todos los campos correctamente formateados.
