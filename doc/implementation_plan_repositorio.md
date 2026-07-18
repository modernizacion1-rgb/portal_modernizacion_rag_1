# Reestructuración del Repositorio (repositorio.html)

A continuación, te presento el análisis, la reformulación de contenidos y la propuesta arquitectónica y de diseño visual para la nueva página del Repositorio Central de Modernización (`repositorio.html`), antes de tocar el código.

## 1. Análisis y Reformulación de Contenidos

Los 4 bloques que has planteado son excelentes porque abarcan todo el ecosistema de la modernización de manera integral. Aquí te presento la **reformulación pulida** para que los títulos y la jerarquía sean más intuitivos para el usuario final (el servidor público):

### ⚖️ Eje 1: Normatividad y Directivas
*Se enfoca en la "regla de juego".*
* **1.1. Lineamientos para la formulación de Directivas:** "La Directiva para hacer directivas" (Archivo PDF y flujograma).
* **1.2. Buscador / Listado Oficial de Directivas:** Un registro tabulado (tabla) donde se puedan buscar y descargar las directivas vigentes.
* **1.3. Formatos y Plantillas:** Anexos y documentos en Word para estandarizar la creación de nueva normativa.

### 🧠 Eje 2: Gestión del Conocimiento (Capital Intelectual)
*Se enfoca en el consumo y transferencia del "Saber Hacer".*
* **2.1. Registros de Conocimiento Sistematizado:** (Presentados como *Cards* que enlazan a páginas externas con el contenido en PDF, infografía o video).
  * *Lecciones Aprendidas:* Conocimiento capturado sobre éxitos o errores operativos.
  * *Buenas Prácticas:* Métodos estandarizados a nivel nacional listos para su réplica.
  * *Guías Técnicas de "Saber Hacer":* El "paso a paso" de un procedimiento, incluyendo alertas de riesgo y tips de expertos.
* **2.2. Micro-Cursos (Conocimiento Técnico-Operativo):** (Presentados como *Cards* que enlazan a los cursos desarrollados en otras páginas).
  * Inducción en Modernización de la Gestión Pública.
  * Implementación de Gestión por Procesos.
  * Implementación de Gestión del Conocimiento.
  * Implementación de Gestión de la Innovación Pública.

### 💡 Eje 3: Gestión de la Innovación Pública
*Se enfoca en el desarrollo y evaluación de nuevas ideas.*
* **3.1. Portafolio Institucional de Innovación (FIIP):** Fichas visuales mostrando las iniciativas actuales (pilotos, proyectos en incubación).
* **3.2. Informes de Evaluación FIIP:** Informes registrados sobre los resultados y métricas de innovación.

### ⚙️ Eje 4: Publicaciones de Modernización y Procesos
*Se enfoca en la operatividad y estandarización de la entidad.*
* **4.1. Arquitectura de Procesos:** Mapa de Procesos y Fichas de Productos y Procesos.
* **4.2. Documentos Operativos:** Manuales y Diagramas de Procesos.
* **4.3. Biblioteca de Modernización:** Publicaciones, memorias y boletines especializados.

---

## 2. Propuesta de Diseño e Interfaz (UI/UX) - Segunda Revisión

Respondiendo a tu retroalimentación, la arquitectura visual a nivel macro y micro será la siguiente:

### A. Estructura Macro (Navegación)
Se **mantendrá el diseño con tabuladores (Tabs)** que ya existe en la página actual. Los tabuladores principales serán los 4 Ejes mencionados arriba. Esto garantiza la familiaridad y aprovecha la estructura actual.

### B. Estructura Micro (Acordeones y Tablas Uniformes)
Todo el contenido interior de cada tabulador se presentará utilizando el **estilo de Acordeón** que ya tienes implementado. 
* Al desplegar un acordeón (ej. "2.1 Registros de Conocimiento Sistematizado"), el usuario verá el contenido organizado en una cuadrícula de *Cards* (tarjetas) o en el formato de *Tabla* uniforme, dependiendo de la naturaleza del contenido.
* **Para los Ejes 2 y 3 (Conocimiento e Innovación):** Dentro de los acordeones desplegables, usaremos *Cards* visuales que actúen como enlaces hacia las páginas donde se desarrollan los cursos o se muestran las infografías/videos.
* **Para los Ejes 1 y 4 (Normatividad y Publicaciones):** Dentro de los acordeones usaremos las tablas estilizadas que ya existen, asegurando un diseño estandarizado y limpio en toda la sección.

## User Review Required
> [!IMPORTANT]
> Revisa la propuesta de reestructuración de los ítems y el modelo de diseño (Menú Lateral + Contenido Dinámico) propuesto en el **punto 2**. Si estás de acuerdo con esta arquitectura de información y propuesta visual, indícamelo para proceder a construir el código de `repositorio.html` desde cero o sobre su base actual.
