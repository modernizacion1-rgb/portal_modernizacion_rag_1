# Reestructuración y Desarrollo de Micro-Cursos (Fichas de Conocimiento)

Reorganización completa de los módulos de microcursos en el Repositorio de Modernización de AGROIDEAS (`repositorio.html`), subsanando el desfase existente entre las tarjetas visuales y el archivo de datos `data/cursos.json`. Se proyectan y desarrollan los subtemas del **Módulo 1: Inducción en Modernización de la Gestión Pública** y se realinean los **Ejes A, B y C** a los **Módulos 2, 3 y 4** respectivamente.

## User Review Required

> [!IMPORTANT]
> - **Módulo 1 (Nuevo contenido):** Se proponen 3 subtemas estructurados (`M1.1`, `M1.2`, `M1.3`) fundamentados en la **Ley N° 27658**, el **D.S. N° 103-2022-PCM (PNMGP al 2030)** y el **D.S. N° 123-2018-PCM (Reglamento SAMGP)**. Cada uno incluirá su descripción, enlace de material y preguntas interactivas tipo test.
> - **Realineación de IDs:**
>   - `modulo1` -> Inducción en Modernización de la Gestión Pública.
>   - `modulo2` -> Eje A: Implementación de Gestión por Procesos (`A.1`, `A.2`, `A.3`).
>   - `modulo3` -> Eje B: Implementación de Gestión del Conocimiento (`B.1`, `B.2`, `B.3`).
>   - `modulo4` -> Eje C: Implementación de Gestión de Innovación (`C.1`, `C.2`, `C.3`).
>   - `modulo5` -> Uso de herramientas de IA en AGROIDEAS (`E.1`, `E.2`, `E.3`).
> - **Compatibilidad:** Los enlaces generados por `microcurso-modal.js` hacia `microcurso.html?modulo=...&subtema=...` y el botón de retorno quedarán 100% calibrados.

## Open Questions

- ¿Deseas mantener en `modulo5` el curso sobre **Uso de herramientas de IA en AGROIDEAS** (como está actualmente en la tarjeta 5 de `repositorio.html`), o prefieres que se incluya adicionalmente o en su lugar el curso de **Calidad de Servicios**? (Por defecto, mantendremos IA en `modulo5` para respetar la tarjeta 5 visible).

## Proposed Changes

---

### Datos y Contenido Formativo

#### [MODIFY] [cursos.json](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/cursos.json)
- Reestructurar el arreglo de módulos:
  - **Módulo 1 (`modulo1`):** "Inducción en Modernización de la Gestión Pública", Eje Transversal/SAMGP.
    - `M1.1`: Finalidad y Principios de la Ley Marco de Modernización (Ley N° 27658 y D.S. N° 030-2002-PCM).
    - `M1.2`: La Política Nacional de Modernización de la Gestión Pública (PNMGP al 2030 - D.S. N° 103-2022-PCM).
    - `M1.3`: El Sistema Administrativo de Modernización de la Gestión Pública (SAMGP) en AGROIDEAS (D.S. N° 123-2018-PCM).
  - **Módulo 2 (`modulo2`):** "Implementación de Gestión por Procesos" (Eje A: `A.1`, `A.2`, `A.3`).
  - **Módulo 3 (`modulo3`):** "Implementación de Gestión del Conocimiento" (Eje B: `B.1`, `B.2`, `B.3`).
  - **Módulo 4 (`modulo4`):** "Implementación de Gestión de Innovación" (Eje C: `C.1`, `C.2`, `C.3`).
  - **Módulo 5 (`modulo5`):** "Uso de herramientas de IA en la AGROIDEAS" (Eje IA / Tecnológico: `E.1`, `E.2`, `E.3`).
  - Se mantendrá archivado / respaldado el contenido de Calidad de Servicios si se requiere a futuro.

---

### Interfaz de Usuario y Repositorio

#### [MODIFY] [repositorio.html](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/repositorio.html)
- En la sección **2.5 Micro-Cursos (Fichas de Conocimiento)** (líneas ~470-525):
  - Calibrar las etiquetas de cabecera de las tarjetas:
    - Tarjeta 1: `MÓDULO 1` / `EJE TRANSVERSAL` - "Inducción en Modernización de la Gestión Pública" (`openMicroCursoModal('modulo1')`).
    - Tarjeta 2: `MÓDULO 2` / `EJE A` - "Implementación de Gestión por Procesos" (`openMicroCursoModal('modulo2')`).
    - Tarjeta 3: `MÓDULO 3` / `EJE B` - "Implementación de Gestión del Conocimiento" (`openMicroCursoModal('modulo3')`).
    - Tarjeta 4: `MÓDULO 4` / `EJE C` - "Implementación de Gestión de Innovación" (`openMicroCursoModal('modulo4')`).
    - Tarjeta 5: `MÓDULO 5` / `EJE IA` - "Uso de herramientas de IA en AGROIDEAS" (`openMicroCursoModal('modulo5')`).
  - Asegurar la correcta coherencia cromática y badges.

---

### Aula Virtual y Scripts de Soporte

#### [VERIFY] [microcurso-modal.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/microcurso-modal.js)
- Comprobar que la inyección de `module.subtemas` en el modal funcione idénticamente con los identificadores `M1.1`, `A.1`, `B.1`, `C.1`, `E.1`.

#### [VERIFY] [microcurso.js](file:///e:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/microcurso.js)
- Comprobar que la búsqueda `data.modulos.find(m => m.id === moduleId)` y `module.subtemas.find(s => s.id === subtemaId)` en `microcurso.html` renderice adecuadamente título, badges, preguntas y navegación de regreso.

---

## Verification Plan

### Automated / Syntax Tests
- Validación de JSON: Verificar que `data/cursos.json` contenga JSON válido sin errores de sintaxis.
- Verificación de enlaces cruzados y estructura de IDs.

### Manual Verification
1. Abrir `repositorio.html` en el navegador.
2. Navegar a **2. Gestión del Conocimiento** -> **2.5 Micro-Cursos (Fichas de Conocimiento)**.
3. Probar la apertura del modal para cada uno de los 5 módulos:
   - Clic en Módulo 1 -> Debe abrir "Inducción en Modernización de la Gestión Pública" con los subtemas M1.1, M1.2 y M1.3.
   - Clic en Módulo 2 -> Debe abrir "Implementación de Gestión por Procesos" con Eje A (A.1, A.2, A.3).
   - Clic en Módulo 3 -> Debe abrir "Implementación de Gestión del Conocimiento" con Eje B (B.1, B.2, B.3).
   - Clic en Módulo 4 -> Debe abrir "Implementación de Gestión de Innovación" con Eje C (C.1, C.2, C.3).
   - Clic en Módulo 5 -> Debe abrir "Uso de herramientas de IA en AGROIDEAS".
4. Hacer clic en "Iniciar" en un subtema de Módulo 1 (ej. `M1.1`) para verificar que cargue en `microcurso.html`, renderice el cuestionario interactivo y permita regresar correctamente al repositorio.
