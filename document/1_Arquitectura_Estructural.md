# Arquitectura Estructural del Portal Web AGROIDEAS

## Resumen Ejecutivo
El Portal Web de Gestión y Modernización de AGROIDEAS es una plataforma estática modular de alto rendimiento basada en el paradigma de **Micro-Componentes Dinámicos Desacoplados**. Separa de manera estricta la capa de presentación estructural (HTML5 semántico + Tailwind CSS), la estandarización global y comportamiento interactivo (`js/components.js`, `content-loader.js`, `chatbot-engine.js`) y los datos dinámicos (`data/*.json`).

---

## 1. El Paradigma de Componentes Dinámicos

Para evitar la redundancia de código en las múltiples páginas del sitio y garantizar escalabilidad institucional sin un servidor de renderizado backend (SSR), el portal utiliza inyectores de DOM optimizados.

### El Motor Central: `js/components.js`
Este script se ejecuta al final del cuerpo (`<body>`) de todas las páginas del portal para realizar las siguientes operaciones globales:

- **Inyección y Sincronización del Header:** Ubica la etiqueta `<header>` vacía e inyecta dinámicamente la barra de navegación corporativa, resaltando automáticamente el ítem activo según el atributo `data-page-id` del `<body>`.
- **Inyección del Footer:** Rellena el elemento `<footer>` con los enlaces legales, de contacto, créditos institucionales y accesos rápidos de la entidad.
- **Menú Móvil Interactivo:** Genera el botón hamburguesa en dispositivos móviles/tablets (`md:hidden`) y gestiona transiciones suaves de apertura y cierre.
- **Inicialización de Bibliotecas Externas:** Renderiza los íconos de **Lucide Icons** (`lucide.createIcons()`) e inicializa **AOS (Animate On Scroll)** con parámetros de rendimiento afinados (`duration: 800`, `once: true`).
- **Efecto de Navegación "Glassmorphism":** Captura el evento de scroll de la ventana y modifica las clases del Navbar para aplicar opacidad, sombra y desenfoque al desplazarse hacia abajo.

---

## 2. Árbol de Directorios y Organización de Archivos

La estructura real del proyecto en el sistema de archivos obedece a la siguiente jerarquía normalizada:

```text
/portal_modernizacion-main/
│
├── css/
│   ├── modern-styles.css    # Variables globales institucionales, tipografía, glassmorphism y transiciones.
│   ├── repositorio.css      # Estilos especializados para pestañas, filtros y tablas DataTables.
│   └── text-colors.css / chatbot.css # Estilos complementarios para el módulo del Asistente IA.
│
├── js/
│   ├── components.js       # Core de inyección de componentes globales (Header, Footer, Nav móvil).
│   ├── content-loader.js   # Motor de carga asíncrona de contenidos, videos HD y tablas del repositorio.
│   └── chatbot-engine.js   # Motor de procesamiento conversacional semántico para el Asistente IA.
│
├── data/
│   ├── content.json         # Base de contenidos estructurados (secciones de ejes, enlaces de video, catálogos).
│   └── chatbot_knowledge.json # Base de conocimiento e historial de respuestas del Asistente IA.
│
├── images/                  # Activos gráficos corporativos, logos institucionales y diagramas.
│
├── document/                # Documentación técnica corporativa en Markdown (Índice, UI, Arquitectura, etc.).
│
├── index.html               # Página Principal / Home del portal.
├── gestion_procesos.html    # Eje 1: Gestión por Procesos (y video explicativo en Google Drive).
├── gestion_conocimiento.html # Eje 2: Gestión del Conocimiento.
├── gestion_calidad.html     # Eje 3: Gestión de la Calidad y Mejora Regulatoria.
├── gestion_innovacion.html  # Eje 4: Innovación Pública y Co-creación.
├── repositorio.html         # Repositorio Institucional (4 pestañas activas con tablas interactivas).
├── chatbot.html             # Interfaz del Asistente IA (Chatbot GxP).
├── doc_gestion.html         # Hub de Documentos de Gestión (MOP, MAPRO, ROF, POI).
├── estructura_organica.html # Organigrama interactivo y estructura jerárquica de la UPP.
└── contacto.html            # Directorio de coordinadores GxP y formulario de consultas.
```

---

## 3. Estandarización Modular de las Páginas

### A. Ejes de Gestión (`gestion_*.html`)
Las 4 páginas de ejes de modernización siguen una plantilla estructural idéntica dividida en 5 secciones delimitadas por IDs semánticos:
1. `id="definition"` (1. Definición / Marco Teórico)
2. `id="purpose"` (2. Finalidad / Cadena de Valor)
3. `id="phases"` (3. Fases o Actividades del Proceso)
4. `id="roles"` (4. Roles, Operadores y Responsabilidades)
5. `id="multimedia"` (5. Contenido Multimedia: Video Explicativo en HD 1080p con enlace hacia Google Drive)

### B. Repositorio Institucional (`repositorio.html`)
Diseñado modularmente en **4 Pestañas / Ejes Documentales** que se conmutan mediante el script de pestañas y cargan información en tablas procesadas por DataTables:
- **Pestaña 1 (`data-target="normatividad"`):** 1. Normatividad y Directivas (y buscador centralizado).
- **Pestaña 2 (`data-target="conocimiento"`):** 2. Gestión del Conocimiento.
- **Pestaña 3 (`data-target="innovacion"`):** 3. Innovación Pública.
- **Pestaña 4 (`data-target="publicaciones"`):** 4. Publicaciones y Procesos.
*(Nota de Arquitectura: La pestaña de Planeamiento y Resultados fue eliminada del alcance de presentación para evitar redundancia con el Hub en `doc_gestion.html`).*

### C. Asistente IA (`chatbot.html`)
Diseñado con una interfaz conversacional de doble panel (historial lateral y chat principal), vinculado directamente a `js/chatbot-engine.js` para procesar consultas sin latencia del lado del servidor.

---

## 4. Beneficios de la Arquitectura para Humanos y Agentes IA

1. **Cero Mantenimiento Duplicado:** Modificar un ítem del menú de navegación requiere editar únicamente `js/components.js`, propagándose de forma instantánea a las 10 páginas del portal.
2. **Desacoplamiento de Contenido:** Agentes de IA o redactores de contenido pueden modificar directivas o cambiar el enlace de un video tutorial en `data/content.json` sin alterar la maquetación HTML ni correr riesgo de romper estilos Tailwind.
3. **Alto Rendimiento y Carga Asíncrona:** Al ejecutarse con scripts diferidos (`defer` o al final del `<body>`), el navegador renderiza el contenido HTML y estilos Tailwind de manera inmediata, alcanzando puntuaciones excelentes en métricas de *Core Web Vitals*.
4. **Interoperabilidad:** La estructura limpia y basada en JSON facilita que en una fase posterior los motores locales (`content-loader.js` y `chatbot-engine.js`) sean redirigidos hacia APIs REST de SharePoint o servidores institucionales mediante una simple sustitución de URL `fetch()`.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
