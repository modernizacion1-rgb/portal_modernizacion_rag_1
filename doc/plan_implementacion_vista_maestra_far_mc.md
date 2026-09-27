# Plan de Implementación: Vista Maestra y Script de Carga FAR-MC (Sección 2.5 Micro-Cursos)

Documento técnico y operativo para la implementación de la **Vista Maestra Documental** y su **Script de Carga Dinámica** para las Fichas de Aprendizaje Rápido de Micro-Cursos (**FAR-MC V2.0**), integrando los 18 archivos JSON existentes en la carpeta `data/` con el Repositorio Institucional (`repositorio.html`) y el Aula Virtual (`microcurso.html`).

---

## 1. Contexto y Objetivos del Proyecto

El Portal de Modernización de **AGROIDEAS** cuenta con el Repositorio Central de Activos de Conocimiento (`repositorio.html`), estructurado en 5 familias documentales clave:
1. **2.1** Fichas de Lecciones Aprendidas (FLA) &rarr; `ficha_leccion_aprendida.html` + `js/detalle_ficha.js`
2. **2.2** Fichas de Buenas Prácticas (FBP) &rarr; `ficha_buena_practica.html` + `js/detalle_ficha_bp.js`
3. **2.3** Guías Técnicas de "Saber Hacer" (GT-SH) &rarr; `guia_tecnica_saber_hacer.html` + `js/detalle_guia_sh.js`
4. **2.4** Actas de Entrega de Conocimiento (TCO / Offboarding) &rarr; `transferencia_conocimiento_organizacional.html` + `js/detalle_tco.js`
5. **2.5 Micro-Cursos (Fichas de Conocimiento FAR-MC)** &rarr; **Objetivo del presente plan**.

### Objetivos Específicos
- Crear la **Vista Maestra Oficial** (`ficha_microcurso.html`) que represente el formato formal estandarizado de la Ficha de Aprendizaje Rápido (FAR-MC V2.0) con diseño institucional (`#1A5336`, `#53A548`, `#F1C40F`).
- Desarrollar el **Script de Carga Dinámica** (`js/detalle_far_mc.js`) capaz de consumir los 18 archivos JSON (`far-mc-1-m1.json` a `far-mc-6-d3.json`) vía parámetro URL (`?id=far-mc-X-XX`).
- Cumplir el requerimiento de visualización en el bloque **Navegación y Trazabilidad**, mostrando de forma prioritaria y limpia los 4 pares CLAVE: VALOR:
  - `ModuloNumero`
  - `ModuloNombre`
  - `SubtemaCodigo`
  - `SubtemaTitulo`
- Vincular la vista con el botón *"Descargar Ficha (PDF)"* del Aula Virtual (`microcurso.html`) y el modal de `repositorio.html`, permitiendo la generación de PDF oficial mediante impresión nativa del navegador (`window.print()`) a costo S/. 0.00.

---

## 2. Alcance y Especificación de Datos (JSON FAR-MC V2.0)

La vista maestra procesará los 18 activos de conocimiento desarrollados, distribuidos en los 6 módulos temáticos:

| Módulo | Denominación del Módulo | Subtemas y Archivos JSON |
| :--- | :--- | :--- |
| **Módulo 1** | Inducción en Modernización de la Gestión Pública | `far-mc-1-m1.json` (M1.1)<br>`far-mc-1-m2.json` (M1.2)<br>`far-mc-1-m3.json` (M1.3) |
| **Módulo 2** | Implementación de Gestión por Procesos | `far-mc-2-a1.json` (A.1)<br>`far-mc-2-a2.json` (A.2)<br>`far-mc-2-a3.json` (A.3) |
| **Módulo 3** | Implementación de Gestión del Conocimiento | `far-mc-3-b1.json` (B.1)<br>`far-mc-3-b2.json` (B.2)<br>`far-mc-3-b3.json` (B.3) |
| **Módulo 4** | Implementación de Gestión de Innovación | `far-mc-4-c1.json` (C.1)<br>`far-mc-4-c2.json` (C.2)<br>`far-mc-4-c3.json` (C.3) |
| **Módulo 5** | Uso de herramientas de IA en AGROIDEAS | `far-mc-5-e1.json` (E.1)<br>`far-mc-5-e2.json` (E.2)<br>`far-mc-5-e3.json` (E.3) |
| **Módulo 6** | Calidad de los Servicios | `far-mc-6-d1.json` (D.1)<br>`far-mc-6-d2.json` (D.2)<br>`far-mc-6-d3.json` (D.3) |

---

## 3. Arquitectura y Mapeo Visual de la Vista Maestra (`ficha_microcurso.html`)

La vista mantendrá la línea visual de las fichas 2.1 a 2.4, estructurada en bloques numerados con números Romanos:

```
┌────────────────────────────────────────────────────────────────────────┐
│  HEADER INSTITUCIONAL (components.js: Menú, Logo AGROIDEAS / MIDAGRI)  │
├────────────────────────────────────────────────────────────────────────┤
│  HERO PRINCIPAL CON DEGRADADO INSTITUCIONAL                            │
│  - Breadcrumbs: Inicio > Repositorio Institucional > Micro-Cursos       │
│  - Badges: Código Referencia (ej. FAR-MC-MOD-01-M1.1) | Versión FAR-MC │
│  - Título Principal del Subtema                                        │
│  - Metadatos Rápidos: Proceso Vinculado | Lectura: 3 min | Público Obj. │
├────────────────────────────────────────────────────────────────────────┤
│  [SECCIÓN I] NAVEGACIÓN Y TRAZABILIDAD (Requerimiento Clave: Valor)    │
│  ┌───────────────────────┬──────────────────────────────────────────┐  │
│  │ MÓDULO N°: 1          │ MÓDULO: Inducción en Modernización...    │  │
│  ├───────────────────────┼──────────────────────────────────────────┤  │
│  │ SUBTEMA CÓDIGO: M1.1  │ SUBTEMA TÍTULO: Finalidad y Principios.. │  │
│  └───────────────────────┴──────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────────────────┤
│  [SECCIÓN II] SÍNTESIS EJECUTIVA                                       │
│  - Tarjeta con Contexto y Dolor Institucional resuelto en AGROIDEAS    │
├────────────────────────────────────────────────────────────────────────┤
│  [SECCIÓN III] NÚCLEO DEL SABER Y MARCO NORMATIVO                      │
│  - 3.1 Pilar Legal Fundacional (Leyes, Decretos Supremos, Resoluciones)│
│  - 3.2 Aplicación Práctica AGROIDEAS (Preguntas 5W+2H):                │
│        * 2.1 Objetivo (¿Qué se está desarrollando?)                    │
│        * 2.2 Finalidad (¿Para qué se está desarrollando?)               │
│        * 2.3 Actores (Líderes, Ejecutores, Beneficiarios)              │
│        * 2.4 Momento / Fase (¿Cuándo se debe desarrollar?)             │
├────────────────────────────────────────────────────────────────────────┤
│  [SECCIÓN IV] TOQUE DEL EXPERTO Y ALERTAS DE CAMPO                     │
│  - Alerta Roja Crítica (Peligro operativo a evitar en campo / sede)     │
│  - Tip Práctico del Experto (Atajo lícito, recomendaciones clave)      │
├────────────────────────────────────────────────────────────────────────┤
│  [SECCIÓN V] CIERRE OPERATIVO Y AUTOEVALUACIÓN                         │
│  - Regla de Oro Operativa (Lema / directriz rectora de AGROIDEAS)       │
│  - Pregunta de Autoevaluación interactiva con opciones (a, b, c)        │
│  - Sustento Pedagógico desplegable con retroalimentación inmediata    │
├────────────────────────────────────────────────────────────────────────┤
│  BARRA DE ACCIONES INFERIOR                                            │
│  - [ < Volver al Repositorio ]                                         │
│  - [ > Ir al Aula Virtual (Video / Test) ]                             │
│  - [ Imprimir Ficha Oficial (PDF) ]                                    │
├────────────────────────────────────────────────────────────────────────┤
│  FOOTER INSTITUCIONAL (components.js)                                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Fases de Implementación

### Fase 1: Creación de la Vista Maestra (`ficha_microcurso.html`)
1. **Estructura HTML5 y Recursos:**
   - Incorporación de Tailwind CSS (configurado con paleta institucional `primary: #1A5336`, `secondary: #53A548`, `accent: #F1C40F`).
   - Lucide Icons y animaciones AOS.
   - Contenedores semánticos (`<header>`, `<main>`, `<section>`, `<footer>`).
2. **Estado de Carga y Errores:**
   - Spinner animado (`#loader`) mientras se realiza el `fetch`.
   - Contenedor de error (`#error-message`) con botón de retorno al repositorio si el parámetro o archivo no existe.
3. **Estilos de Impresión (@media print):**
   - Ocultar cabeceras fijas, botones de acción y pie de página web.
   - Asegurar fondos blancos, tipografía nítida para impresión A4 y saltos de página controlados (`break-inside: avoid`).

### Fase 2: Desarrollo del Script Cargador (`js/detalle_far_mc.js`)
1. **Captura de Parámetro URL:**
   - Extracción del parámetro `?id=` (ejemplo: `?id=far-mc-1-m1` o `?id=far-mc-1-m1.json`).
2. **Petición Asíncrona:**
   - `fetch('data/' + cleanId + '.json')` con validación de cabeceras HTTP (`response.ok`).
3. **Mapeo Dinámico y Despliegue de Datos:**
   - **Trazabilidad Prioritaria:** Poblado de los elementos del grid CLAVE: VALOR (`ModuloNumero`, `ModuloNombre`, `SubtemaCodigo`, `SubtemaTitulo`).
   - **Pilar Legal:** Bucle dinámico que renderiza cada norma en tarjetas con iconos alusivos (`scale`, `book-check`, etc.).
   - **Aplicación Práctica:** Mapeo de objetivo, finalidad, momento y matriz de actores (Líderes, Ejecutores, Beneficiarios).
   - **Alertas y Tips:** Renderizado condicional con estilos visuales diferenciados (rojo de peligro para la Alerta Roja, esmeralda para el Tip Práctico).
   - **Evaluación:** Renderizado de la pregunta, alternativas y panel de sustento pedagógico.
4. **Manejadores de Eventos:**
   - Vinculación del botón de impresión: `window.print()`.
   - Configuración del botón *"Ir al Aula Virtual"* para redireccionar automáticamente a `microcurso.html?modulo=moduloX&subtema=XX`.

### Fase 3: Integración en el Ecosistema Digital
1. **Conexión en `microcurso.html`:**
   - Actualizar el botón existente *"Descargar Ficha (PDF)"* para que enlace dinámicamente a `ficha_microcurso.html?id=far-mc-X-XX`.
2. **Conexión en `repositorio.html` y `js/microcurso-modal.js`:**
   - Incorporar en el modal de selección de subtemas un enlace o botón secundario: *"Ver Ficha Técnica Oficial (FAR-MC)"*.

---

## 5. Criterios de Aceptación y Verificación

1. **Integridad de Datos:** Los 18 archivos JSON cargan sin errores de consola ni campos vacíos.
2. **Fidelidad Visual:** El bloque de Navegación y Trazabilidad presenta con absoluta claridad los 4 campos solicitados.
3. **Responsive Design:** La vista es 100% legible y adaptable en dispositivos móviles, tablets y monitores de escritorio.
4. **Calidad de Impresión:** Al pulsar *"Imprimir Ficha Oficial (PDF)"*, el cuadro de diálogo de impresión genera un documento formal, limpio y listo para su exportación a PDF en hoja A4 institucional.
5. **Navegación Fluida:** Transición perfecta entre `repositorio.html` &harr; `microcurso.html` &harr; `ficha_microcurso.html`.
