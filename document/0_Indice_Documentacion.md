# Documentación Técnica: Plataforma de Gestión del Conocimiento GxP

Esta carpeta contiene el corpus oficial de documentación técnica, arquitectónica y funcional para la Plataforma Web **"Gestión y Modernización Institucional (GxP)"**, desarrollada para **AGROIDEAS** (Programa de Compensaciones para la Competitividad - MIDAGRI).

Este conjunto de documentos está redactado tanto para **profesionales de Tecnologías de la Información (OTI), consultores y desarrolladores humanos**, como para **otros agentes de Inteligencia Artificial (IA)** responsables del mantenimiento, refactorización y escalabilidad futura del portal.

---

## 📑 Índice Detallado de Documentos

1. **[`1_Arquitectura_Estructural.md`](./1_Arquitectura_Estructural.md)**  
   - **Enfoque:** Arquitectura de software, árbol real de directorios y modularización de micro-componentes.  
   - **Contenido clave:** Detalla el uso de **Tailwind CSS (vía CDN)**, **HTML5 semántico**, **JavaScript Vanilla** y variables nativas en `css/modern-styles.css`. Explica a fondo el motor del inyector central (`js/components.js`) responsable de renderizar el Header, Footer, transiciones y menú móvil en las 10 páginas del portal.

2. **[`2_Guia_de_Estilos_UI.md`](./2_Guia_de_Estilos_UI.md)**  
   - **Enfoque:** Identidad visual, diseño interactivo y guía de UI/UX.  
   - **Contenido clave:** Documenta la paleta cromática institucional de AGROIDEAS (`--agro-blue`, `--agro-green`, `--pcm-red`), el efecto de transparencia modular (*Glassmorphism*), el sistema de iconografía (**Lucide Icons**), animaciones al hacer scroll (**AOS**) y las directrices visuales para las tablas del Repositorio (`css/repositorio.css`) y el Asistente IA (`css/chatbot.css`).

3. **[`3_Manual_Despliegue_Mantenimiento.md`](./3_Manual_Despliegue_Mantenimiento.md)**  
   - **Enfoque:** Operaciones, publicación en servidores locales/web y actualización sin tocar código HTML.  
   - **Contenido clave:** Guía paso a paso para desplegar en servidores locales, Apache, Nginx o IIS/cPanel sin pasos complejos de compilación. Instruye sobre cómo modificar los menús en `js/components.js` y cómo actualizar textos, enlaces de video (Drive HD 1080p) y directivas editando únicamente los archivos de datos en `data/content.json` y `data/chatbot_knowledge.json`.

4. **[`4_Arquitectura_Datos_Interaccion.md`](./4_Arquitectura_Datos_Interaccion.md)**  
   - **Enfoque:** Lógica de datos desacoplada, motores JavaScript e integraciones interactivas.  
   - **Contenido clave:** Explica el funcionamiento del cargador de contenidos (`js/content-loader.js`), la estructura de **4 Pestañas del Repositorio Institucional** con tablas **DataTables** (*1. Normatividad*, *2. Conocimiento*, *3. Innovación*, *4. Publicaciones*) y el motor de procesamiento semántico del **Asistente IA (`js/chatbot-engine.js`)** con diagramas de flujo Mermaid.

5. **[`5_Integracion_Sistemas_Externos.md`](./5_Integracion_Sistemas_Externos.md)**  
   - **Enfoque:** Proyección corporativa, integración con Intranet e interoperabilidad REST.  
   - **Contenido clave:** Establece la hoja de ruta y los hitos técnicos para incrustar el portal dentro de una intranet **SharePoint / Microsoft Office 365** (mediante SPFx e IFrames), redirección e inicio de sesión único (SSO con `@agroideas.gob.pe`) y la migración de los archivos JSON locales a servicios backend REST o APIs de grandes modelos de lenguaje (LLM).

---

## 🧠 Guía Rápida para Agentes de Inteligencia Artificial (AI Agents)

Si eres un **agente de IA** o un desarrollador automatizado analizando este repositorio para resolver un ticket o solicitud del usuario, sigue estas reglas estructurales absolutas:

1. **No modifiques código duplicado en cada HTML para cambiar el menú:** Toda la barra de navegación del encabezado (`<header>`) y el pie de página (`<footer>`) se generan globalmente desde `js/components.js`.
2. **Estructura de las páginas de Ejes (`gestion_*.html`):** Mantén estrictamente las 5 secciones estándar (*1. Definición*, *2. Finalidad*, *3. Fases/Actividades*, *4. Roles* y *5. Contenido Multimedia*).
3. **Pestañas del Repositorio (`repositorio.html`):** El repositorio cuenta con **4 pestañas documentales activas** (`normatividad`, `conocimiento`, `innovacion`, `publicaciones`). No reintroduzcas la pestaña *5. Planeamiento y Resultados*, ya que fue retirada por definición de arquitectura.
4. **Enlaces de Video Explicativo:** Al modificar la Sección 5 de multimedia en los ejes de gestión, actualiza tanto la etiqueta `<a>` dentro del archivo HTML (con atributos `target="_blank" rel="noopener noreferrer"`) como la propiedad `"video_url"` correspondiente dentro de `data/content.json`.
5. **Estilos de UI:** Si creas nuevos componentes, utiliza clases de utilidad de **Tailwind CSS** y respeta las variables raíz de `css/modern-styles.css`.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
