# Plan de Implementación: Vistas de Captura del Conocimiento (GT-SH, TCO y Estandarización)

Implementación y estandarización visual y estructural de las vistas de gestión del conocimiento en el Portal de Modernización de AGROIDEAS, basadas en los formularios oficiales institucionales (Anexos 01, 02, 03 y 04). El plan contempla la creación de dos nuevas páginas dinámicas (`guia_tecnica_saber_hacer.html` y `transferencia_conocimiento_organizacional.html`), sus respectivos scripts de carga dinámica en JS, la homogenización de la maquetación de `ficha_leccion_aprendida.html` con números Romanos para Secciones y números Arábigos para campos, y la actualización de los accesos en la tabla principal de `repositorio.html`.

## User Review Required

> [!IMPORTANT]
> **Estandarización de Estructura de Secciones y Campos**: Se aplicará una jerarquía visual homogénea basada en tarjetas con sombra suave (`shadow-sm`), bordes redondeados (`rounded-3xl`), números Romanos para las Secciones (I, II, III...) y números Arábigos jerárquicos (1, 2, 3...) para cada campo informativo, en concordancia directa con los formularios estandarizados en PDF (Anexo 01 al 04).

> [!NOTE]
> **Consistencia de Datos JSON**:
> - Para las **Guías Técnicas (GT-SH)** se vincularán los archivos: `data/simulacion-registro-GT-SH-3-1.json`, `data/simulacion-registro-GT-SH-3-2.json` y `data/simulacion-registro-GT-SH-3-3.json`.
> - Para **Transferencia de Conocimiento (TCO)** se vincularán los archivos: `data/Formato-registro-TCO-4-1.json`, `data/Formato-registro-TCO-4-2.json` y `data/Formato-registro-TCO-4-3.json`.

---

## Open Questions

- Ninguna pregunta bloqueante identificada. Las estructuras de datos JSON y las especificaciones de los formularios en PDF han sido inspeccionadas y mapeadas al 100%.

---

## Proposed Changes

### Portal del Repositorio Central

#### [MODIFY] [repositorio.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/repositorio.html)
- Actualizar las filas de la tabla de la **Sección 2.3: Guías Técnicas de "Saber Hacer"** para vincularlos a `guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-1`, `3-2` y `3-3`.
- Actualizar las filas de la tabla de la **Sección 2.4: Actas de Entrega de Conocimiento (Offboarding)** para vincularlos a `transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-1`, `4-2` y `4-3`.
- Revisar y garantizar la coherencia visual e iconográfica en los 4 bloques desplegables del acordeón (2.1, 2.2, 2.3 y 2.4).

---

### Vistas y Scripts de Fichas de Lecciones Aprendidas (FLA)

#### [MODIFY] [ficha_leccion_aprendida.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_leccion_aprendida.html)
- Rediseñar y homogenizar la maquetación a la línea gráfica de `ficha_buena_practica.html` (Hero banner con degradado institucional, badge de código, regla de austeridad, botones de impresión y retorno).
- Organizar la estructura en Secciones con números Romanos (I a V) y campos con números Arábigos (1 al 17) siguiendo fielmente el Anexo 01 (PDF).
- Incluir la sección de firmas de conformidad del Equipo Técnico de Mejora Continua (ETMC) e historial de versiones.

#### [MODIFY] [detalle_ficha.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_ficha.js)
- Optimizar el script de consumo de datos JSON (`simulacion-registro-fla-1-*.json`).
- Mapear adecuadamente los campos numerados y generar dinámicamente la tabla de validación de calidad y estado del badge.

---

### Vista y Script de Guías Técnicas de "Saber Hacer" (GT-SH)

#### [NEW] [guia_tecnica_saber_hacer.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/guia_tecnica_saber_hacer.html)
- Desarrollar la vista completa basada en `anexo-03-formulario-estandarizado-gt-sh-v2.pdf` estructurada en 6 secciones principales:
  - **SECCIÓN I**: Metadatos y Trazabilidad (Campos 1 al 7)
  - **SECCIÓN II**: Propósito y Valor Público (Campos 8 al 11)
  - **SECCIÓN III**: Desarrollo Técnico: El Paso a Paso (Campos 12 al 14)
  - **SECCIÓN IV**: El "Toque del Experto" - Captura de Conocimiento Tácito (Campos 15 al 17: Alertas Rojas, Atajos Lícitos, Troubleshooting)
  - **SECCIÓN V**: Recursos, Seguridad y Sostenibilidad (Campos 18 al 20)
  - **SECCIÓN VI**: Bloque de Validación y Calificación (ETMC) (Criterios SGP-PCM y Firmas de Conformidad)

#### [NEW] [detalle_guia_tecnica.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_guia_tecnica.js)
- Crear el script asíncrono para cargar y renderizar los datos de `data/simulacion-registro-GT-SH-3-*.json`.
- Formatear listas numeradas, bloques de alertas destacadas con estilos visuales diferenciados (rojo para alertas de riesgo, verde/ámbar para tips y atajos).

---

### Vista y Script de Transferencia de Conocimiento Organizacional (TCO / Offboarding)

#### [NEW] [transferencia_conocimiento_organizacional.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/transferencia_conocimiento_organizacional.html)
- Desarrollar la vista completa basada en `anexo-04-formulario-estandarizado-TCO-V2.pdf` estructurada en 7 secciones principales:
  - **SECCIÓN I**: Datos Generales e Información General del Puesto (Campos 1 al 5)
  - **SECCIÓN II**: Conocimiento Organizacional Crítico del Puesto (Procesos Críticos y Aspectos Pendientes/Alertas - Campos 6 y 7)
  - **SECCIÓN III**: Conocimiento Tácito (Casuística Frecuente y Criterios Indispensables - Campos 8 y 9)
  - **SECCIÓN IV**: Buenas Prácticas y Lecciones Aprendidas (Estrategias, Acciones a evitar, Curva de Aprendizaje - Campos 10 al 12)
  - **SECCIÓN V**: Conocimiento Organizacional: Marco Normativo de Aplicación Práctica (Campo 13)
  - **SECCIÓN VI**: Red de Coordinación (Contactos clave y finalidad - Campo 14)
  - **SECCIÓN VII**: Formalización y Cierre (Lugar, Fecha, Firmas del Servidor Saliente, Supervisor y RRHH - Campo 15)

#### [NEW] [detalle_transferencia.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_transferencia.js)
- Crear el script asíncrono para cargar y renderizar los datos de `data/Formato-registro-TCO-4-*.json`.
- Renderizar tablas interactivas para Procesos Críticos, Casuística Frecuente, Marco Normativo y Red de Coordinación.

---

## Verification Plan

### Automated Tests
- Ejecutar verificación de sintaxis JS/HTML para asegurar que no existan errores de parseo ni librerías no encontradas.

### Manual Verification
1. Abrir `repositorio.html` en el navegador y probar la navegación hacia cada una de las fichas:
   - Sección 2.1: Lecciones Aprendidas (FLA 1-1, 1-2, 1-3)
   - Sección 2.2: Buenas Prácticas (FBP 2-1, 2-2, 2-3)
   - Sección 2.3: Guías Técnicas "Saber Hacer" (GT-SH 3-1, 3-2, 3-3)
   - Sección 2.4: Transferencia de Conocimiento / Offboarding (TCO 4-1, 4-2, 4-3)
2. Verificar en cada página la correcta inyección de datos desde los archivos JSON mediante URL parameters (`?id=...`).
3. Comprobar la coherencia estética de las 4 vistas (Hero banner, números Romanos en Secciones, números Arábigos en campos, badges, tablas estilizadas y bloques de firmas).
4. Probar el funcionamiento del botón de impresión oficial (PDF) y el botón de retorno al Repositorio Central.
