

| MINISTERIO DE DESARROLLO AGRARIO Y RIEGO \- MIDAGRIPROGRAMA DE COMPENSACIONES PARA LA COMPETITIVIDAD \- AGROIDEASDIRECTIVA DI N° 002-2022-MIDAGRI-SG-OGTI | MCVS-501 (NTP-ISO/IEC 12207:2016)FORMATO MCVS-202: ANÁLISIS DE REQUERIMIENTOS DETALLADO (HISTORIAS DE USUARIO) |
| :---: |

| Proyecto / Iniciativa: | Portal Web de Modernización de la Gestión Pública y Repositorio Central de AGROIDEAS (PWM-AGROIDEAS) |
| :---- | :---- |
| **Órgano Responsable / Área Usuaria:** | Unidad de Planeamiento y Presupuesto (UPP) \- Equipo Técnico de Mejora Continua (ETMC) |
| **Fecha de Actualización / Versión:** | 03 de Octubre de 2026 | Versión 1.0 (Final para Pase a Producción) |

**1\. RESUMEN EJECUTIVO Y ENFOQUE METODOLÓGICO ÁGIL (SCRUM)**

El presente documento especifica el Análisis de Requerimientos Detallado (Formato MCVS-202 / Anexo 9.7 de la Directiva DI N° 002-2022-MIDAGRI-SG-OGTI) para la construcción y puesta en producción del Portal Web de Modernización de la Gestión Pública y Repositorio Central (PWM-AGROIDEAS). Se adopta el enfoque de desarrollo ágil (Scrum) bajo la arquitectura de Micro-Componentes Dinámicos Desacoplados (Backend-Less), desglosando las necesidades operativas en Historias de Usuario estructuradas bajo el patrón 'Como \[Rol\], quiero \[Funcionalidad\], para \[Beneficio\]', asociando sus correspondientes Puntos de Historia (esfuerzo), prioridad y Criterios de Aceptación/Validación (Definition of Done) a Costo S/. 0.00.

**2\. MATRIZ DETALLADA DE HISTORIAS DE USUARIO Y CRITERIOS DE ACEPTACIÓN**

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-001***EP-01: Dashboard de Modernización e Identidad Glassmorphism* | Como Servidor Público de Sede Central y las 25 Unidades Regionales, quiero navegar por un Portal Web con interfaz responsiva Glassmorphism y carga dinámica de componentes, para acceder de forma ágil y centralizada a los activos de modernización sin barreras burocráticas. | Esfuerzo:5 Puntos (Días Ideales: 3\)**Prioridad:Alta** | **1** | **1\. Cabecera y Menú Institucional:** La barra de navegación principal debe inyectar dinámicamente los logotipos oficiales de MIDAGRI/AGROIDEAS y el menú estructurado desde el componente central js/components.js. |
|  |  |  | **2** | **2\. Accesibilidad Responsive:** El diseño debe adaptarse en milisegundos a resoluciones móviles (smartphones/tablets) y de escritorio mediante la cuadrícula Flexbox/Grid de Tailwind CSS. |
|  |  |  | **3** | **3\. Estética Glassmorphism:** Las tarjetas de los 6 Módulos de Modernización deben aplicar sombras multinivel, bordes de curvatura orgánica y efecto de transparencia sobre imagen de fondo. |
|  |  |  | **4** | **4\. Rendimiento y Austeridad:** El tiempo total de carga de la página principal debe ser inferior a 1.5 segundos, operando en modo estático de alta disponibilidad a Costo S/. 0.00. |

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-002***EP-02: Repositorio Centralizado del Catálogo de 18 Micro-Cursos (FAR-MC V2.0)* | Como Evaluador Técnico y Colaborador de las 25 Unidades Regionales, quiero consultar el catálogo de 18 Micro-Cursos e inspeccionar las fichas FAR-MC V2.0 por módulo, para unificar criterios de evaluación de elegibilidad y gestión de incentivos en todo el país. | Esfuerzo:8 Puntos (Días Ideales: 5\)**Prioridad:Alta** | **1** | **1\. Ingesta Agéntica JSON:** Renderizado dinámico de la grilla de micro-cursos mediante la lectura asincrónica del archivo far-mc-v2.json (o far-mc-\*.json individuales). |
|  |  |  | **2** | **2\. Filtros y Búsqueda por Módulo:** Permite filtrar de forma instantánea por Módulo (M1 al M6) y Eje Temático (EJE A al EJE F) mediante botones interactivos. |
|  |  |  | **3** | **3\. Descarga de Fichas Oficiales:** Cada tarjeta debe incorporar accesos directos para descargar la Ficha en formato editable Word (.docx) y la versión estandarizada en PDF. |
|  |  |  | **4** | **4\. Visualizador de Artefactos:** Inclusión de reproductor embebido de video HD (Drive) e infografía Bento Grid asociadas a cada ficha de aprendizaje rápido. |

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-003***EP-03: Asistente Virtual Inteligente con Grounding Normativo (Chatbot RAG)* | Como Servidor Civil de AGROIDEAS, quiero consultar a un Asistente Virtual Inteligente anclado exclusivamente en la normativa de la entidad, para absolver dudas operativas sobre el MOP y Directivas sin riesgo de alucinaciones ni respuestas falsas. | Esfuerzo:8 Puntos (Días Ideales: 5\)**Prioridad:Alta** | **1** | **1\. Búsqueda Semántica Local:** El motor RAG local (js/chatbot-engine.js) debe ejecutar búsquedas por similitud semántica y TF-IDF sobre la base de datos oficial chatbot\_knowledge.json. |
|  |  |  | **2** | **2\. Cita de Fuentes Oficiales:** Cada respuesta generada por el bot debe indicar explícitamente el artículo del MOP, norma de la PCM o directiva que sustenta la afirmación. |
|  |  |  | **3** | **3\. Regla de Anclaje Estricto:** Si la consulta realizada no cuenta con respaldo explícito en los documentos normativos cargados, el bot responderá 'Información no encontrada en las fuentes oficiales'. |
|  |  |  | **4** | **4\. Conector Opcional Gemini:** Soporta la conmutación asincrónica con la API de Google Gemini para procesamiento avanzado manteniendo las restricciones de anclaje a Costo S/. 0.00. |

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-004***EP-04: Captura y Registro Asincrónico de Fichas de Conocimiento (Panel Admin)* | Como Especialista de Campo y Miembro del ETMC, quiero registrar y gestionar borradores de Fichas FLA, FBP, GT-SH e iniciativas FIIP mediante el panel admin.html, para sistematizar el saber tácito de forma asincrónica a costo cero. | Esfuerzo:8 Puntos (Días Ideales: 5\)**Prioridad:Alta** | **1** | **1\. Integración con Google Forms/Sheets:** El formulario digital de admin.html debe enviar las entradas directamente a la base de datos de Google Sheets sin requerir un servidor backend dedicado. |
|  |  |  | **2** | **2\. Alertas del Workflow Apps Script:** Un disparador automático (trigger) debe notificar por correo corporativo y Google Chat a los miembros del ETMC al crearse un registro en estado Borrador. |
|  |  |  | **3** | **3\. Exportación a Formato JSON:** El panel debe permitir validar y convertir las fichas aprobadas por el ETMC en objetos JSON (ej. `simulacion-registro-fbp-*.json`) listos para su persistencia e ingesta directa en el directorio local `/data` del repositorio estático. |
|  |  |  | **4** | **4\. Autenticación de Dominio:** El acceso de administración está restringido exclusivamente a usuarios autenticados con cuentas institucionales @agroideas.gob.pe. |

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-005***EP-05: Módulo de Onboarding Automatizado para Unidades Regionales* | Como Nuevo Ingresante de las 25 Unidades Regionales, quiero contar con una ruta guiada de lectura obligatoria (Día 1 al Día 5), para acelerar mi asimilación técnica del MOP y reducir la curva de aprendizaje ante la rotación de personal. | Esfuerzo:5 Puntos (Días Ideales: 3\)**Prioridad:Media** | **1** | **1\. Ruta Guiada por Perfil:** La vista microcurso.html debe organizar automáticamente la secuencia de lecturas obligatorias según el puesto (Evaluador PM01/PM02, Legal, Administración). |
|  |  |  | **2** | **2\. Barra de Avance Interactivo:** Seguimiento visual del porcentaje de progreso de lectura completado por el servidor durante su primera semana de labores. |
|  |  |  | **3** | **3\. Micro-Evaluación Rápida:** Cierre de cada subtema mediante una pregunta pedagógica interactiva con alternativas múltiples y sustento normativo directo. |
|  |  |  | **4** | **4\. Reporte de Cumplimiento:** Emisión automática del registro de conformidad de Onboarding hacia la Unidad de Administración (Recursos Humanos) al culminar la ruta. |

| ID Historia / Épica | Enunciado Historia de Usuario (Como / Quiero / Para) | Esfuerzo / Prioridad | ID (\#) | Criterio de Aceptación (Título y Regla) |
| :---: | :---- | :---: | :---: | :---- |
| **US-PWM-006***EP-06: Monitoreo de KPIs de Satisfacción e Impacto en Looker Studio* | Como Jefe de la UPP y Director Ejecutivo, quiero visualizar un tablero de control gerencial embebido en Looker Studio, para monitorear en tiempo real el Índice de Satisfacción Ciudadana (CSAT) y la adopción del repositorio nacional. | Esfuerzo:5 Puntos (Días Ideales: 3\)**Prioridad:Media** | **1** | **1\. Embebido iFrame Seguro:** Integración transparente del tablero interactivo de Looker Studio conectado a las fuentes de datos consolidadas de Google Sheets. |
|  |  |  | **2** | **2\. Panel de Indicadores Clave:** Visualización en tiempo real de la Tasa de Participación Regional (100% UR), Índice CSAT (\>85%), y Tasa de Retención de Conocimiento Crítico. |
|  |  |  | **3** | **3\. Segmentación Dinámica:** Permite filtrar las métricas de gestión por Unidad Regional, Módulo Desarrollado, Proceso Misional y Rango de Fechas. |
|  |  |  | **4** | **4\. Sincronización Automática:** Actualización asincrónica del tablero cada 24 horas sin consumo de ancho de banda ni recarga manual de datos. |

**3\. MATRIZ RESUMEN DE ESTIMACIÓN Y PLANIFICACIÓN DE SPRINTS**

| ID Historia | Denominación del Requerimiento / Funcionalidad | Puntos Historia | Prioridad | Sprint Asignado |
| :---: | :---- | :---: | :---: | :---: |
| **US-PWM-001** | Dashboard Glassmorphism y Navegación Modular | 5 Puntos | Alta | Sprint 1 |
| **US-PWM-002** | Repositorio Central de 18 Micro-Cursos (FAR-MC V2.0) | 8 Puntos | Alta | Sprint 1 |
| **US-PWM-003** | Asistente Virtual Inteligente Chatbot RAG (Grounding MOP) | 8 Puntos | Alta | Sprint 2 |
| **US-PWM-004** | Captura Digital de Fichas FLA/FBP/GTSH/FIIP (admin.html) | 8 Puntos | Alta | Sprint 2 |
| **US-PWM-005** | Ruta de Onboarding Automatizado Regional (Día 1 a Día 5\) | 5 Puntos | Media | Sprint 3 |
| **US-PWM-006** | Tablero de Control Gerencial Looker Studio (CSAT/KPIs) | 5 Puntos | Media | Sprint 3 |

**4\. CONFORMIDAD TÉCNICA Y FIRMAS DEL EQUIPO ÁGIL**

| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ING. WALTER VÁSQUEZ PIÑAAnalista del Negocio / Product OwnerUnidad de Planeamiento y Presupuesto \- AGROIDEAS | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ING. CARLOS MENDOZA ALVAEspónsor del Proyecto / Jefe de UPPUnidad de Planeamiento y Presupuesto \- AGROIDEAS  |
| :---: | :---: |
| \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ESPECIALISTA EN DESARROLLO / SCRUM MASTEREquipo Técnico de Sistemas \- AGROIDEASOficina General de Tecnología de la Información | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_DIRECTOR DE OGTI / SISTEMASOficina General de Tecnología de la InformaciónMIDAGRI \- Sede Central |

