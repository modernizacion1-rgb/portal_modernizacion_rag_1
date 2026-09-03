# Plan de Implementación: Fichas de Buenas Prácticas (FBP) Dinámicas

El presente plan establece la hoja de ruta para la actualización de la **Sección 2.2 Fichas de Buenas Prácticas (Estandarización Nacional)** del Repositorio Institucional de AGROIDEAS, reemplazando las 4 fichas ficticias actuales por los registros reales (`data/simulacion-registro-fbp-*.json`), creando la nueva página web de visualización oficial basada en el **Anexo 02 (PDF)** y el script de carga dinámica de datos.

---

## User Review Required

> [!IMPORTANT]
> **Aprobación de la Fase 1 (Planificación)**
> Para dar inicio a la implementación de código, solicitamos su revisión y aprobación del presente plan estructurado en 3 fases técnicas.

> [!NOTE]
> **Normalización del nombre de archivo `simulacion-registro-fbp-2-3..json`**:
> El tercer archivo en el directorio `data/` contiene dos puntos consecutivos antes de la extensión (`simulacion-registro-fbp-2-3..json`). El script y la vista contemplarán soporte resiliente para leer tanto con o sin doble punto para evitar cualquier error 404.

---

## Open Questions

> [!TIP]
> **Detalle sobre el punto 3 de la solicitud:**
> En el requerimiento se solicita *"Generar el script que permita cargar en forma dinámica los valores del documento JSON en la página web que contenga el desarrollo del esquema del documento JSON del formato: Fichas de Lecciones Aprendidas"*. 
> - Se creará el script especializado `js/detalle_buena_practica.js` para la nueva página `ficha_buena_practica.html` (formato FBP - Anexo 02), manteniendo a su vez `js/detalle_ficha.js` para las Fichas de Lecciones Aprendidas (FLA - Anexo 01).
> - Se confirmará que ambos scripts compartan robustez y estructura estandarizada.

---

## Proposed Changes

Grupo de cambios organizado por componentes y archivos:

### 1. Interfaz de Catálogo y Repositorio

#### [MODIFY] [repositorio.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/repositorio.html)
- **Localización**: Sección 2.2 `accordion-item` (líneas 252 a 325 aprox.).
- **Acción**:
  - Eliminar las 4 filas ficticias (BP-001 a BP-004 con `href="#"`).
  - Incorporar los 3 registros reales extraídos de los archivos JSON de simulación:
    1. **FBP-001**: `[BP-UR_AREQUIPA-001-2026]` Pre-evaluación express mediante mesa de ayuda regional virtual (UR Arequipa - PM02). Enlace a `ficha_buena_practica.html?id=simulacion-registro-fbp-2-1`.
    2. **FBP-002**: `[BP-UR_AREQUIPA-002-2026]` Pre-evaluación express con marco normativo ampliado RM N° 0188-2025-MIDAGRI. Enlace a `ficha_buena_practica.html?id=simulacion-registro-fbp-2-2`.
    3. **FBP-003**: `[BP-UA-002-2026]` Validación digital preventiva y asincrónica para la reducción de tiempos en la rendición de cuentas por viáticos (Unidad de Administración - S.02). Enlace a `ficha_buena_practica.html?id=simulacion-registro-fbp-2-3..json` (o `simulacion-registro-fbp-2-3`).
  - Actualizar el botón de enlace con icono `file-check` y estilo acorde a la línea gráfica (paleta primaria/acento).

---

### 2. Esquema Web Oficial de Ficha de Buena Práctica (FBP)

#### [NEW] [ficha_buena_practica.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/ficha_buena_practica.html)
- **Propósito**: Desarrollar la vista detallada que refleja el esquema formal del **Anexo 02: Formulario Estandarizado FBP (PDF)**.
- **Estructura visual modular**:
  - **Banner institucional y Breadcrumb**: Navegación `Inicio > Repositorio Institucional > Ficha de Buena Práctica`.
  - **Encabezado oficial**: Código FO-FBP-2026, Versión 02, MIDAGRI - AGROIDEAS / UPP / Área de Modernización.
  - **Regla General de Austeridad y Control Documental (RDE)**.
  - **Sección I: Metadatos, Trazabilidad y Reconocimiento**:
    - Código Único de Registro (Badge destacado).
    - Título de la Buena Práctica.
    - Información Inicial (Equipo Diseñador, Unidad Orgánica de Origen, Contacto).
    - Territorio (Ámbito georreferenciable).
    - Proceso Institucional Vinculado (PM01, PM02, Soporte S.02, etc.).
    - Servicio público o trámite beneficiado.
  - **Sección II: Justificación y Diagnóstico de la Línea de Base (Why)**:
    - Problema Público u Operativo (cuello de botella/retraso).
    - Idea Innovadora (propuesta metodológica disruptiva).
  - **Sección III: Desarrollo y Experiencia de la Práctica (How, What)**:
    - Experiencia y Justificación (desglose de fases, sustento legal, tiempo de permanencia).
    - Actores Involucrados (participantes y roles).
    - Obstáculos Superados y Mitigación de Riesgos.
  - **Sección IV: Evidencias y Documentación Generada**:
    - Enlaces de evidencias (carpetas de Google Drive, Sheets, Looker Studio interactivos y accesibles).
  - **Sección V: Bloque de Validación y Calificación (Uso exclusivo del ETMC)**:
    - Tabla de Criterios (SGP-PCM): Eficacia y Beneficio Medible, Viabilidad Legal, Sostenibilidad y Austeridad (Costo S/. 0.00), Replicabilidad.
    - Estado de Aprobación Final (Badge oficial: `[ X ] APROBADO / PUBLICADO`).
    - Recuadro de Firmas de Conformidad del Equipo Técnico de Mejora Continua (ETMC): Líder UPP, Dueña del Proceso, UAJ y UA.
  - **Estados de Interfaz**: Loader animado, pantalla de error amigable, botón para retornar al Repositorio.

---

### 3. Lógica y Carga Dinámica de Datos

#### [NEW] [js/detalle_buena_practica.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/detalle_buena_practica.js)
- **Propósito**: Script JavaScript asíncrono que extrae el parámetro `?id=` de la URL, realiza el `fetch` al archivo JSON correspondiente en `data/` y renderiza dinámicamente cada campo en el DOM de `ficha_buena_practica.html`.
- **Características**:
  - Manejo de tolerancia de nombres (`.json` y `..json`).
  - Formateo inteligente de texto multilínea (fases numeradas, viñetas y negritas).
  - Renderizado dinámico de la tabla de Validación de Calidad (iconos check/cruz, criterios y sustentos).
  - Re-inicialización automática de iconos de Lucide tras la inyección del DOM.
  - Manejo de excepciones y estados de carga (Spinner -> Contenido / Error).

---

## Verification Plan

### Automated Tests / Lint
- Validación de sintaxis HTML/JS.
- Verificación de consistencia de enlaces y rutas relativas.

### Manual Verification
1. Abrir `repositorio.html` en el navegador local:
   - Desplegar el acordeón "2.2 Fichas de Buenas Prácticas (Estandarización Nacional)".
   - Comprobar que las filas corresponden a BP-001 (Arequipa PM02), BP-002 (Arequipa ampliada) y BP-003 (Administración viáticos).
2. Hacer clic en "Ver Ficha" de cada uno de los 3 registros:
   - Verificar la correcta carga de `data/simulacion-registro-fbp-2-1.json`.
   - Verificar la correcta carga de `data/simulacion-registro-fbp-2-2.json`.
   - Verificar la correcta carga de `data/simulacion-registro-fbp-2-3..json`.
3. Comprobar fidelidad visual con el **Anexo 02 (PDF)**:
   - Disposición de las 5 secciones.
   - Tabla de validación con sus 4 criterios y sustentos.
   - Sello de estado de aprobación y bloque de firmas ETMC.
   - Enlaces de evidencias funcionales.
