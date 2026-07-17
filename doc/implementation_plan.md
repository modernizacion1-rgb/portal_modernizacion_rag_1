# Prototipo de Asistente Virtual / Chatbot Normativo SAMGP (Opción 1 con Simulación LocalStorage & JSON)

Este plan detalla la implementación técnica e integral del prototipo conversacional para el **Sistema Administrativo de Modernización de la Gestión Pública (SAMGP)** integrado al portal web actual `portal_modernizacion-main`. Siguiendo la selección de la **Opción 1** y el requerimiento de prototipado de alto nivel, utilizaremos una base de conocimiento estructurada en **JSON** con el contenido normativo y enlaces directos a los archivos PDF de las 8 carpetas suministradas, junto con la API **LocalStorage** para simular el servidor/backend y gestionar la inteligencia de recuperación.

---

## Revisión Requerida del Usuario / Decisiones

> [!IMPORTANT]
> **1. Simulación Dual (Offline RAG Local + Live LLM opcional en LocalStorage)**
> Para que el prototipo sea 100% funcional, rápido y sin requerir claves de pago desde el primer instante, el motor del chatbot (`js/chatbot-engine.js`) ejecutará un algoritmo local de búsqueda semántica y puntuación TF-IDF sobre `data/chatbot_knowledge.json`. Además, dispondrá de un panel de configuración en interfaz donde el usuario podrá introducir opcionalmente una API Key de Google Gemini en `LocalStorage` si desea generar respuestas dinámicas en tiempo real.

> [!TIP]
> **2. Enlaces Directos al Repositorio Normativo (PDFs Reales)**
> Cada respuesta generada o recuperada por el chatbot no solo citará la norma en texto (*Ej. "Art. 4, Ley N° 27658"*), sino que incluirá un **botón/enlace de descarga directa** que abrirá el archivo PDF exacto dentro de la carpeta `MARCO NORMATIVO SAMGP 2026/`, conectando la experiencia conversacional directamente con los documentos reales.

---

## Preguntas Abiertas

1. **Nombre del Asistente:** Se propone **"Asistente SAMGP - Inteligencia Normativa al 2030"** (y en los menús **"Asistente IA"**).
2. **Punto de Acceso Global (Botón Flotante + Menú):** Para que el ciudadano o servidor público sienta un portal verdaderamente moderno, se implementará:
   - Un ícono en la barra de navegación superior (`header`).
   - Un **Widget / Botón Flotante (FAB)** en la esquina inferior derecha en todas las páginas de la web para acceder directamente al asistente.

---

## Cambios Propuestos

### 1. Base de Conocimiento Normativa Completa (JSON)

#### [NEW] [chatbot_knowledge.json](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/data/chatbot_knowledge.json)
- Estructuración exhaustiva por categorías y módulos correspondientes a las 8 carpetas de `MARCO NORMATIVO SAMGP 2026`:
  1. **Marco de Modernización:** Ley N° 27658 y DS N° 030-2002-PCM (Finalidad, definición, ámbito y proceso de modernización).
  2. **Política Nacional al 2030 (PNMGP):** DS N° 103-2022-PCM (Problema público, situación futura deseada, los 3 enfoques transversales, los 4 objetivos prioritarios y los lineamientos).
  3. **Reglamento del SAMGP:** DS N° 123-2018-PCM (Ámbito, articulación entre sistemas, rol de la Secretaría de Gestión Pública - SGP).
  4. **Gestión por Procesos:** NT N° 002-2025-PCM/SGP y Guía Práctica (Procesos estratégicos, operativos, de soporte, fases de determinación y mejora continua).
  5. **Gestión de Calidad de Servicios:** Norma Técnica GCS (Planificación de la calidad, encuestas de satisfacción ciudadana y estándares).
  6. **Gestión del Conocimiento:** RSGP N° 001-2025-PCM/SGP y Norma Técnica (Fases: Identificación, captura, organización y transferencia del saber en entidades públicas).
  7. **Innovación Pública:** RSGP N° 007-2025-PCM/SGP (Ciclo de innovación, co-creación con la ciudadanía y pilotaje de soluciones públicas).
  8. **Organización del Estado:** Ley N° 29158 y Lineamientos ROF/MOP DS N° 054-2018-PCM.
- **Estructura por nodo de conocimiento:**
  - `id`: Identificador único.
  - `category`: Categoría normativa para filtrado (ej. `politica_2030`, `gestion_procesos`).
  - `title`: Título conceptual.
  - `source`: Norma legal precisa (ej. *"Ley N° 27658, Artículo 4"*).
  - `pdf_path`: Ruta relativa al archivo PDF en el repositorio (ej. `MARCO NORMATIVO SAMGP 2026/3. NT GESTIÓN POR PROCESOS/GxP_3 - NT-N-002-2025-pcm-sgp-f-f.pdf`).
  - `keywords`: Array de palabras clave de indexación semántica.
  - `question_patterns`: Preguntas emparejadas comunes.
  - `answer`: Respuesta redactada con rigor institucional y claridad explicativa.

---

### 2. Motor Inteligente & Gestión de Sesión en LocalStorage

#### [NEW] [chatbot-engine.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/chatbot-engine.js)
- **Carga e Indexación:** Descarga `data/chatbot_knowledge.json` y lo indexa en caché de `LocalStorage` (`samgp_knowledge_base`).
- **Control del Alcance (Out of Scope Guardrail):** Si el usuario hace una consulta ajena a las materias de modernización del Estado (o si el puntaje de similitud es inferior a `0.25`), el motor responde amablemente recordando su alcance normativo estricto.
- **Búsqueda Multicriterio (RAG Local):** Algoritmo de puntuación por relevancia combinando coincidencias exactas de frases, palabras clave y pesos por categoría.
- **Funcionalidades Avanzadas de Historial (`samgp_chat_history`):**
  - Almacena de forma persistente la conversación en `LocalStorage`.
  - Permite limpiar el historial o exportar la conversación actual en formato texto (`Copiar / Descargar Consulta`) para que los servidores públicos puedan sustentar informes técnicos.
- **Conector Opcional LLM en Vivo:** Si se introduce un API Key de Gemini en el modal de configuración, el motor envía un prompt con el contexto recuperado de nuestro JSON a la API REST de Gemini, logrando respuestas generativas 100% reales sin alterar la estabilidad del prototipo offline.

---

### 3. Interfaz Conversacional de Alta Fidelidad (UI/UX Premium)

#### [NEW] [chatbot.html](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/chatbot.html)
- Diseño responsivo con Tailwind CSS, Lucide Icons, animaciones AOS y Glassmorphism que cautivará desde el primer instante.
- **Secciones de la página:**
  - **Barra Lateral / Filtros Temáticos:** Permite filtrar las sugerencias o preguntas específicamente por: *Todos los temas, Política 2030, Gestión por Procesos, Gestión del Conocimiento, Calidad, Innovación o Marco Legal*.
  - **Cabecera del Asistente:** Estado en tiempo real (*"Corpus Normativo Activo - 8 Módulos"*), botón de reinicio de chat, exportación de chat y ajustes.
  - **Chips de Prompts Rápidos (Quick Suggestions):** Botones interactivos categorizados para probar al instante con preguntas frecuentes e impactantes.
  - **Lienzo de Chat Flotante:**
    - Burbujas diferenciadas para usuario e IA.
    - Indicador visual de "Buscando en el marco legal... / Escribiendo respuesta...".
    - **Tarjetas de Citas (Citation Badges):** Cada respuesta incluye una tarjeta visual de fuente con un botón *"Ver / Descargar PDF Normativo"* que enlaza directamente al documento original.
  - **Área de Input Inteligente:** Caja de texto con autoajuste, botón de voz (simulado o reconocimiento nativo de navegador `webkitSpeechRecognition` si está disponible), y botón de envío.

#### [NEW] [chatbot.css](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/css/chatbot.css)
- Animaciones fluidas, scrollbars estilizadas, transiciones de tarjetas legales y estilos de tipografía moderna.

---

### 4. Ubicuidad y Navegación Global en el Portal

#### [MODIFY] [components.js](file:///d:/AGROIDEAS%20GxP%20-%20Gestion%20Conocimiento/DOCUMENTOS%20DE%20GESTI%C3%93N/8.%20PROPUESTA%20DE%20REPOSITORIO%20CENTRAL/portal_modernizacion-main/js/components.js)
- **Menú Superior (`header`):** Incorporación del enlace *"Asistente IA"* con un icono de chispa/bot brillante para visibilidad inmediata.
- **Widget Flotante Global (FAB):** Se inyectará automáticamente un botón flotante en la esquina inferior derecha (`botón circular flotante con ícono de asistente y notificación tooltip "Consulta la Ley de Modernización"`) en todas las páginas del portal (`index.html`, `repositorio.html`, etc.) que redirige de inmediato al usuario a `chatbot.html`.

---

## Plan de Verificación

### 1. Verificación de Carga e Indexación
- Verificar en la pestaña `Application -> LocalStorage` de las herramientas de desarrollador que la clave `samgp_knowledge_base` cargue perfectamente los 8 módulos normativos.
- Verificar que las rutas de los archivos PDF coincidan milimétricamente con las carpetas existentes en `MARCO NORMATIVO SAMGP 2026/`.

### 2. Pruebas de Precisión Normativa y RAG Local
Ejecutar batería de 6 pruebas funcionales:
- **Prueba 1 (Ley Marco):** Preguntar *"¿Cuál es la finalidad principal y qué es valor público según la Ley 27658?"*. Verificar que cite el Artículo 4 de la Ley N° 27658 y ofrezca el PDF `LEY N°27658.pdf`.
- **Prueba 2 (Política 2030):** Preguntar *"¿Cuáles son los 4 objetivos prioritarios de la Política Nacional de Modernización al 2030?"*. Verificar desglose exacto de OP1, OP2, OP3 y OP4 con cita al DS N° 103-2022-PCM.
- **Prueba 3 (Gestión por Procesos):** Preguntar *"¿Cómo se clasifican los procesos según la nueva Norma Técnica 002-2025?"*. Verificar clasificación (Estratégicos, Operativos y de Soporte) con enlace a `GxP_3 - NT-N-002-2025-pcm-sgp-f-f.pdf`.
- **Prueba 4 (Gestión del Conocimiento):** Preguntar *"¿Cuáles son las fases de la gestión del conocimiento en entidades públicas?"*. Verificar respuesta (Identificación, Captura, Organización y Transferencia) citando la RSGP N° 001-2025-PCM/SGP.
- **Prueba 5 (Filtro Out-of-Scope):** Preguntar *"¿Cómo cocinar arroz con pollo?"*. Verificar respuesta de salvaguarda indicando que solo responde sobre el SAMGP y la Ley de Modernización.
- **Prueba 6 (Exportación y Persistencia):** Verificar que el botón de exportar/copiar funcione y que recargar la página conserve el historial sin pérdida en `LocalStorage`.

### 3. Verificación de Interfaz y Navegación
- Comprobar que el widget flotante sea visible en `index.html` y que al hacer clic dirija fluidamente a `chatbot.html`.
