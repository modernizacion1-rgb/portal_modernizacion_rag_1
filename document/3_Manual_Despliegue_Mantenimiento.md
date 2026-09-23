# Manual de Despliegue y Mantenimiento - Portal Web AGROIDEAS

## Requisitos de Ejecución y Filosofía Arquitectónica
El Portal Web de Modernización de la Gestión Pública de AGROIDEAS es una plataforma **Estática de Alta Disponibilidad (Serverless Ready & Backend-Less)**. Ha sido diseñada expresamente para no requerir motores de bases de datos relacionales (MySQL, PostgreSQL, Oracle) ni servidores de lenguajes de backend tradicionales (PHP, Java/Tomcat, Python, ASP.NET) para su funcionamiento principal.

### Dependencias Externas (Inyectadas vía CDN en el `<head>` o al final del `<body>`):
- **Tailwind CSS (`https://cdn.tailwindcss.com`):** Para estilización rápida y diseño responsivo.
- **Lucide Icons (`https://unpkg.com/lucide@latest`):** Para iconografía vectorial institucional.
- **AOS Library (`https://unpkg.com/aos@2.3.1/dist/...`):** Para animaciones de aparición al hacer scroll.
- **jQuery & DataTables (`https://cdn.datatables.net/...`):** Para tablas interactivas con filtrado, ordenamiento cronológico y exportación de documentos en el repositorio.

---

## 1. Despliegue en Entorno de Desarrollo (Local o Pruebas)

Para previsualizar el sitio web en una computadora de trabajo, realizar modificaciones estéticas o auditar el contenido:

1. **Clonado del Repositorio:** Clona el código fuente desde el repositorio institucional Git (o extrae el archivo `.zip` con el directorio raíz `portal_modernizacion-main`).
2. **Conectividad a Internet:** Asegúrate de tener conexión activa a internet, ya que las bibliotecas de diseño e íconos se cargan en tiempo real desde los CDNs oficiales.
3. **Ejecución Local:** 
   - Puedes hacer doble clic en el archivo **`index.html`** para abrirlo directamente en el navegador (Chrome, Edge o Firefox).
   - *Recomendado para desarrolladores:* Utiliza la extensión **Live Server** de Visual Studio Code o el servidor integrado de Python (`python -m http.server 8000`) para simular peticiones HTTP reales y evitar bloqueos por protocolos locales de seguridad CORS (`file://`) al cargar los archivos JSON.
4. **Cero Compilación:** El portal no requiere ejecutar comandos de compilación como `npm install`, `npm run build` o `webpack`. El código fuente en HTML, JS y CSS es el mismo que se despliega en producción.

---

## 2. Despliegue en Servidores de Producción (Web / Intranet)

Debido a su diseño modular estático, el portal puede publicarse de forma inmediata sobre cualquier servidor web moderno o portal corporativo existente:

### A. Hosting Tradicional o Servidores Institucionales (Apache / Nginx / IIS)
- **Apache / cPanel / Plesk:** Copia el contenido completo de la carpeta raíz (las 15 páginas `.html`, carpetas `/css`, `/js`, `/data`, `/images`) directamente en el directorio público (`public_html` o `www`).
- **Microsoft IIS (Windows Server On-Premise):** Crea un nuevo sitio web en el Administrador de IIS apuntando al directorio físico del proyecto. Asegúrate de verificar en los Tipos MIME (*MIME Types*) que la extensión `.json` esté configurada como `application/json` para permitir la lectura correcta de los 17 archivos JSON ubicados en `/data`.
- **Nginx:** Define el `root` del server block apuntando a la carpeta del proyecto e incluye el manejo de índices (`index index.html;`).

### B. Plataformas Cloud Modernas (GitHub Pages / Vercel / Netlify / Azure Static Web Apps)
- Sube o conecta la rama `main` del repositorio de Git. La plataforma detectará el `index.html` automáticamente y publicará el portal en segundos sobre una red de distribución global (CDN) con certificados SSL/HTTPS automáticos.

---

## 3. Protocolos Oficiales de Mantenimiento y Actualización de Contenido

> [!IMPORTANT]
> **Regla de Oro del Mantenimiento:** Los archivos HTML (`*.html`) se consideran **plantillas estructurales**. Para modificar textos, videos explicativos, directivas de tabla o la lógica del menú, **NO edites manualmente cada página HTML por separado**. Utiliza los puntos centralizados que se detallan a continuación.

### A. Modificación de la Navegación Global y Créditos (`js/components.js`)
Si la Unidad de Planeamiento y Presupuesto (UPP) requiere añadir un nuevo enlace al menú superior, renombrar un eje estratégico o actualizar el número de contacto en el pie de página:
1. Abre el archivo **`js/components.js`** en tu editor de código.
2. Para cambiar el encabezado o menú superior, modifica la cadena HTML dentro del método `components.header`.
3. Para cambiar los créditos institucionales o enlaces rápidos del pie de página, modifica el bloque `components.footer`.
4. Al guardar el archivo en el servidor, el cambio se replicará al instante y de manera homogénea en las **15 páginas del portal**.

### B. Actualización de Secciones y Videos Tutoriales (`data/content.json`)
Para cambiar el texto de un eje de gestión, agregar un paso en una fase, o reemplazar la URL del video tutorial de un eje:
1. Abre el archivo **`data/content.json`**.
2. Localiza el objeto correspondiente dentro de `"sections"` (`"id": "gestion-procesos"`, `"gestion-conocimiento"`, etc.).
3. Para modificar el enlace del video de Google Drive en el Eje de Gestión por Procesos (Sección 5), ubica las claves:
   ```json
   "video_url": "https://drive.google.com/file/d/1nGhc-Aos3I6JXX2WGfRUqsDQZAe6v-k_/view?usp=sharing",
   "video_title": "Tutorial: Gestión por Procesos"
   ```
4. Reemplaza el enlace `"video_url"` por el nuevo link compartible de Google Drive. El script `js/content-loader.js` actualizará automáticamente el atributo `href` y abrirá el video en una nueva pestaña (`target="_blank"`).

### C. Gestión del Repositorio Institucional (`repositorio.html`)
La página del repositorio cuenta con **4 Pestañas / Ejes Documentales**:
1. `normatividad` (Normatividad y Directivas)
2. `conocimiento` (Gestión del Conocimiento)
3. `innovacion` (Innovación Pública)
4. `publicaciones` (Publicaciones y Procesos)

Para agregar un nuevo documento legal a estas tablas sin tocar código HTML ni reconfigurar DataTables:
- Edita el bloque `"repository"` en **`data/content.json`** y agrega un nuevo objeto con los campos: `"title"`, `"code"`, `"category"`, `"date"` y `"file_url"`. El script `content-loader.js` creará la fila en la tabla de forma automática.

### D. Actualización de la Base de Conocimiento del Asistente IA (`data/chatbot_knowledge.json`)
El Chatbot SAMGP (`chatbot.html`) no requiere reprogramar código de inteligencia artificial cuando cambia una norma o lineamiento GxP:
1. Abre el archivo **`data/chatbot_knowledge.json`**.
2. Agrega o actualiza los nodos de conocimiento (`knowledge_nodes`), organizados en **9 categorías normativas** (incluyendo *8. Instructivos Operativos*).
3. El motor local (`js/chatbot-engine.js`) leerá las nuevas definiciones inmediatamente para responder las consultas en la interfaz.
4. **Conector Gemini (opcional):** Para habilitar generación en tiempo real, el usuario puede ingresar una API Key de Google Gemini desde el panel de configuración del chatbot, almacenada en `LocalStorage`.

### E. Actualización de los Micro-Cursos (`data/cursos.json`)
El Aula Virtual (`microcurso.html`) es una plantilla SPA única; **no se crean páginas HTML por curso**:
1. Abre el archivo **`data/cursos.json`**.
2. Localiza el módulo (`modulos`) y el subtema (`subtemas`) a modificar.
3. Actualiza los campos `titulo`, `descripcion`, `video_url`, `pdf_url` o el arreglo `preguntas` (con `opciones` y `respuestaCorrecta`).
4. Al guardar, `js/microcurso.js` y `js/microcurso-modal.js` reflejarán los cambios automáticamente en el modal del repositorio y en el Aula Virtual.

### F. Mantenimiento y Registro de Nuevos Instrumentos ETMC (FLA, FBP, GT-SH, TCO)
Los 4 instrumentos del Equipo Técnico de Mejora Continua operan como visores dinámicos desacoplados (`ficha_*.html`, `guia_*.html`, `transferencia_*.html`). Para registrar un nuevo caso o actualizar uno existente:
1. **Crear o editar el archivo JSON en `/data`:**
   - Para Lecciones Aprendidas: `data/simulacion-registro-fla-{numero}.json`.
   - Para Buenas Prácticas: `data/simulacion-registro-fbp-{numero}.json`.
   - Para Guías Técnicas: `data/simulacion-registro-GT-SH-{numero}.json`.
   - Para Actas de Transferencia: `data/Formato-registro-TCO-{numero}.json`.
2. **Incorporar el enlace oficial a Google Drive:**
   Asegúrate de incluir la propiedad `"Link"` en la raíz del objeto JSON y dentro del bloque de metadatos con el enlace compartible del PDF oficial en Google Drive:
   ```json
   "Link": "https://drive.google.com/file/d/.../view?usp=sharing"
   ```
   Esto habilita que el botón oficial `#btn-imprimir-pdf` abra directamente el documento PDF oficial en una nueva pestaña.
3. **Vincular en el Acordeón del Repositorio (`repositorio.html`):**
   Abre `repositorio.html` y en el sub-acordeón correspondiente de la Pestaña *2. Gestión del Conocimiento*, agrega una fila en la tabla enlazando al visor correspondiente con el parámetro del ID:
   - `<a href="ficha_leccion_aprendida.html?id=simulacion-registro-fla-1-4">...</a>`
   - `<a href="ficha_buena_practica.html?id=simulacion-registro-fbp-2-4">...</a>`
   - `<a href="guia_tecnica_saber_hacer.html?id=simulacion-registro-GT-SH-3-4">...</a>`
   - `<a href="transferencia_conocimiento_organizacional.html?id=Formato-registro-TCO-4-4">...</a>`

### G. Mantenimiento del Catálogo de Normativas Institucionales (`data/normativas_agroideas.json`)
La tabla de directivas y normas institucionales de la Pestaña *1. Normatividad* se gestiona a través de `data/normativas_agroideas.json`:
1. Abre el archivo **`data/normativas_agroideas.json`**.
2. Agrega una nueva entrada en el arreglo principal con los campos:
   ```json
   {
       "numero": "RDE N° 045-2026-MIDAGRI-AGROIDEAS",
       "nombre": "Aprobación de la Directiva de Gestión de Procesos",
       "anio": "2026",
       "fecha_aprobacion": "2026-03-15",
       "categoria": "Resolución Directoral",
       "enlace_drive": "https://drive.google.com/file/d/.../view?usp=sharing"
   }
   ```
3. El script **`js/directivas-table.js`** procesará la entrada en el DataTables correspondiente, aplicando ordenamiento cronológico descendente y generando el botón de descarga directa hacia Google Drive.

---

## 4. Solución de Problemas Frecuentes (Troubleshooting)

- **El menú, el footer o los datos JSON no cargan en Chrome al abrir directamente los archivos (`file:///`):**  
  *Causa:* Las políticas de seguridad del navegador bloquean peticiones asíncronas `fetch()` cuando se usa el protocolo local `file://`.  
  *Solución:* Abre el portal utilizando un servidor web local (extensión Live Server de VS Code o ejecutando en terminal `python -m http.server 8000`).
- **Los archivos JSON no cargan en un servidor Windows IIS:**  
  *Causa:* Falta de registro del tipo MIME en IIS para la extensión `.json`.  
  *Solución:* En el Administrador de IIS, selecciona el sitio, ingresa a "Tipos MIME" (*MIME Types*) y añade la extensión `.json` con el tipo de contenido `application/json`.
- **Error al abrir un visor ETMC (pantalla en blanco o datos no encontrados):**  
  *Causa:* El parámetro `?id={nombre}` en la URL no coincide con el nombre exacto del archivo `.json` en la carpeta `data/`, o el JSON contiene errores de sintaxis (comas sobrantes, comillas no cerradas).  
  *Solución:* Comprueba que el archivo exista en `data/` y valida su sintaxis con una herramienta de validación JSON.
- **Rendimiento de las tablas DataTables en navegadores antiguos:**  
  *Solución:* Mantener la paginación habilitada (`pageLength: 10` o `25`) para evitar sobrecargar el DOM con renderizado masivo innecesario.

---

*Unidad de Planeamiento y Presupuesto (UPP) - AGROIDEAS | Modernización del Estado 2026*
