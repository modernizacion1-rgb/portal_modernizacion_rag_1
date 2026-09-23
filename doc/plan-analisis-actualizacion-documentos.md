# Plan de Orquestación: Análisis Integral y Actualización Documental

## 1. Resumen Ejecutivo
Orquestación multi-agente para la revisión técnica, análisis integral y actualización sistemática del corpus documental en la carpeta `document/` del Portal Web de Gestión y Modernización de AGROIDEAS.

## 2. Puntos Clave de Evaluación y Diagnóstico
1. **Arquitectura Estructural:** Transición de 11 a 15 páginas HTML, incorporación de 4 visores dinámicos desacoplados de instrumentos ETMC y árbol real de dependencias.
2. **UI y Filosofía de Diseño:** Identidad "Impulsa Agroideas", sistema de diseño Tailwind CSS, Glassmorphism, accesibilidad WCAG AAA y nuevos componentes de fichas técnicas.
3. **Requerimientos de Ejecución:** Filosofía *Serverless Ready & Zero-Build*, configuración de servidores web (IIS, Apache, Nginx) y guías de mantenimiento sin tocar código HTML.
4. **Arquitectura de Datos e Interacción:** Desacoplamiento JSON, ciclo de vida de los 17 archivos de datos, flujos DataTables con ordenamiento cronológico y motor RAG local del Asistente IA.
5. **Integración con Sistemas Externos:** Escenarios de incrustación en Microsoft 365 / SharePoint (SPFx), autenticación SSO Azure AD (Entra ID), transición hacia APIs REST y sinergia con el ecosistema ESV / SIPA.

## 3. Matriz de Agentes Asignados (Mínimo 3)
| # | Agente | Dominio / Tarea Asignada |
|---|---|---|
| 1 | `project-planner` | Estructuración del plan, auditoría del estado del código y detección de brechas. |
| 2 | `frontend-specialist` | Evaluación de UI, consistencia visual, accesibilidad y actualización de `2_Guia_de_Estilos_UI.md`. |
| 3 | `backend-specialist` / `database-architect` | Evaluación de arquitectura de datos, flujos interactivos, APIs y actualización de `4_Arquitectura_Datos_Interaccion.md` y `5_Integracion_Sistemas_Externos.md`. |
| 4 | `documentation-writer` | Consolidación y actualización de `0_Indice_Documentacion.md`, `1_Arquitectura_Estructural.md` y `3_Manual_Despliegue_Mantenimiento.md`. |

## 4. Estado de Aprobación y Ejecución
- Estado: **Fase 2 (Implementación y Actualización) completada al 100%**.
- Los 6 documentos técnicos de la carpeta `document/` (`0_Indice_Documentacion.md`, `1_Arquitectura_Estructural.md`, `2_Guia_de_Estilos_UI.md`, `3_Manual_Despliegue_Mantenimiento.md`, `4_Arquitectura_Datos_Interaccion.md` y `5_Integracion_Sistemas_Externos.md`) han sido auditados, armonizados y actualizados exhaustivamente con el estado real del portal (15 páginas HTML, 4 visores ETMC, 12 scripts JS, 17 archivos JSON, integración con Google Drive y DataTables cronológico).
