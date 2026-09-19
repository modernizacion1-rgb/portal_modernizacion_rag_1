# Plan de Orquestación: Reestructuración y Alineación de Micro-Cursos (Fichas de Conocimiento)

## 1. Diagnóstico del Problema
En `repositorio.html` (vista "2. Gestión del Conocimiento", numeral "2.5 Micro-Cursos (Fichas de Conocimiento)") existía un desfase de indexación respecto a `data/cursos.json`:
- En `repositorio.html` se mostraban 5 tarjetas, pero el Módulo 1 (Inducción en Modernización) no contaba con subtemas desarrollados en el JSON.
- Esto provocó que `modulo1` apuntara a Gestión por Procesos (Eje A), `modulo2` a Gestión del Conocimiento (Eje B), etc.
- Además, el usuario ha solicitado incorporar formalmente el **Módulo 6: "Calidad de los Servicios"** para vincularlo directamente con el desarrollo actual del **Eje D**.

---

## 2. Estructura Definitiva de Módulos y Subtemas (6 Módulos)

### Módulo 1: Inducción en Modernización de la Gestión Pública (NUEVO DESARROLLO)
- **ID:** `modulo1`
- **Eje:** EJE TRANSVERSAL / SAMGP
- **Descripción:** Fundamentos del Sistema Administrativo de Modernización y la PNMGP al 2030 para servidores de AGROIDEAS.
- **Subtemas:**
  1. **M1.1: Finalidad y Principios de la Ley Marco de Modernización**
     - *Descripción:* Principios rectores de la Ley N° 27658 y D.S. N° 030-2002-PCM. Enfoque centrado en las personas, valor público y eficiencia operativa.
     - *Cuestionario:* 2 preguntas interactivas.
  2. **M1.2: La Política Nacional de Modernización de la Gestión Pública (PNMGP al 2030)**
     - *Descripción:* Modelo conceptual de la PNMGP (D.S. N° 103-2022-PCM), objetivos prioritarios, gobernanza pública orientada a resultados y bienes/servicios agrarios.
     - *Cuestionario:* 2 preguntas interactivas.
  3. **M1.3: El Sistema Administrativo de Modernización (SAMGP) en AGROIDEAS**
     - *Descripción:* Aplicación del D.S. N° 123-2018-PCM en la entidad: rol rector de la SGP-PCM, articulación interna de la UPP y adopción de directivas y normas técnicas.
     - *Cuestionario:* 2 preguntas interactivas.

### Módulo 2: Implementación de Gestión por Procesos
- **ID:** `modulo2`
- **Eje:** EJE A
- **Descripción:** Diseño Transversal de Flujos de Valor
- **Subtemas:**
  - **A.1:** Conceptos Fundamentales y el Ciclo de la Gestión por Procesos (NT N° 002-2025-PCM/SGP).
  - **A.2:** Interpretación del Mapa de Procesos Nivel 0 de AGROIDEAS (RDE de arquitectura general).
  - **A.3:** Metodología para el Llenado de la Ficha de Producto y Proceso (FPP - Anexo 7 de la NT).

### Módulo 3: Implementación de Gestión del Conocimiento
- **ID:** `modulo3`
- **Eje:** EJE B
- **Descripción:** Resguardo del Capital Intelectual
- **Subtemas:**
  - **B.1:** Introducción a la GC y la Técnica 5W+2H (Ciclo del Conocimiento y captura estructurada).
  - **B.2:** Cultura de Mejora: Las Fichas de Lecciones Aprendidas (Activos preventivos ante fallas operativas).
  - **B.3:** Protección de la Memoria: El Offboarding (Protocolo de entrega de conocimiento al cesar o rotar).

### Módulo 4: Implementación de Gestión de Innovación
- **ID:** `modulo4`
- **Eje:** EJE C
- **Descripción:** Prototipado e Iteración Ágil
- **Subtemas:**
  - **C.1:** Formulación de la Ficha FIIP (Criterios normativos para el llenado del Anexo 1).
  - **C.2:** El Modelo Doble Diamante Aplicado a AGROIDEAS (Descubrir, Definir, Desarrollar/Idear, Entregar).
  - **C.3:** Diseño de PMV en Espacios Seguros (Experimentación ágil y controlada a bajo costo).

### Módulo 5: Uso de herramientas de IA en la AGROIDEAS
- **ID:** `modulo5`
- **Eje:** EJE TECNOLOGÍA E IA
- **Descripción:** Inteligencia Artificial y Eficiencia Pública
- **Subtemas:**
  - **E.1:** Fundamentos de IA y 'Grounding' Normativo.
  - **E.2:** Asistencia Inteligente y Prompting.
  - **E.3:** Prototipado Agéntico y Automatización.

### Módulo 6: Calidad de los Servicios (NUEVO VÍNCULO EJE D)
- **ID:** `modulo6`
- **Eje:** EJE D
- **Descripción:** Pertinencia Territorial y Estándares de Servicio
- **Subtemas:**
  - **D.1:** Criterios de Verificación de Campo para Elegibilidad.
  - **D.2:** Herramientas Tecnológicas y Seguridad de Información.
  - **D.3:** Estándares de Calidad y Medición de Satisfacción del Productor Agrario (NT N° 001-2022-PCM/SGP).

---

## 3. Plan de Acción Multi-Agente (Fase 2)

1. **frontend-specialist**:
   - Actualizar `repositorio.html` en la sección 2.5:
     - Ajustar la grilla para albergar armoniosamente las 6 tarjetas de microcursos (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6` o diseño responsive adaptativo).
     - Incorporar la tarjeta del **Módulo 6: Calidad de los Servicios** con llamada a `openMicroCursoModal('modulo6')`, imagen alusiva y etiqueta `EJE D`.
     - Homogeneizar colores, insignias y títulos de las 6 tarjetas.

2. **backend-specialist**:
   - Modificar `data/cursos.json` reestructurando los 6 módulos completos con sus respectivos subtemas, preguntas, opciones, respuestas correctas y metadatos.

3. **test-engineer**:
   - Probar apertura de modal en `repositorio.html` para los 6 módulos (`modulo1` a `modulo6`).
   - Verificar navegación al aula SPA `microcurso.html?modulo=...&subtema=...` y su botón de retorno.
   - Ejecutar verificaciones de sintaxis y calidad.
