/**
 * detalle_buena_practica.js
 * Script asíncrono para la carga dinámica de valores en la Ficha de Buena Práctica (FBP)
 * Basado en el esquema oficial de captura Anexo 02 (PDF).
 */

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let fichaId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contenido = document.getElementById('ficha-contenido');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (!fichaId) {
        showError("No se proporcionó un ID de ficha en los parámetros de la URL.");
        return;
    }

    try {
        const ficha = await fetchFichaData(fichaId);
        popularFichaBuenaPractica(ficha);

        loader.classList.add('hidden');
        contenido.classList.remove('hidden');

        // Inicializar o refrescar iconos de Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }

    } catch (error) {
        console.error("Error al cargar la Ficha de Buena Práctica:", error);
        showError(`Ocurrió un error al cargar los datos de la ficha (${error.message}). Por favor, verifique el archivo de simulación.`);
    }

    /**
     * Realiza el fetch con tolerancia a extensiones y nombres con doble punto
     */
    async function fetchFichaData(id) {
        const candidates = [];
        
        // Si ya incluye .json
        if (id.endsWith('.json')) {
            candidates.push(`data/${id}`);
            const base = id.replace(/\.json$/, '');
            candidates.push(`data/${base}.json`);
        } else {
            candidates.push(`data/${id}.json`);
            candidates.push(`data/${id}..json`);
        }

        let lastError = null;
        for (const url of candidates) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        return data[0];
                    }
                    if (data && typeof data === 'object') {
                        return data;
                    }
                }
            } catch (err) {
                lastError = err;
            }
        }

        throw new Error(`Archivo no encontrado en data/${id}`);
    }

    function showError(message) {
        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = message;
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    /**
     * Inyecta los valores del objeto FBP en el DOM
     */
    function popularFichaBuenaPractica(fbp) {
        const meta = fbp.MetadatosTrazabilidad || {};
        const just = fbp.JustificacionDiagnostico || {};
        const exp = fbp.DesarrolloExperiencia || {};
        const evid = fbp.EvidenciasDocumentacion || {};
        const validacion = fbp.ValidacionCalidad || [];
        const estado = fbp.EstadoAprobacion || '[ X ] APROBADO / PUBLICADO';

        // 1. HERO / CABECERA
        const codigoReg = meta.CodigoUnicoRegistro || 'BP-S/C-2026';
        document.getElementById('ficha-codigo').textContent = codigoReg;
        document.getElementById('ficha-titulo').textContent = meta.TituloBuenaPractica || 'Ficha de Buena Práctica';
        
        // Extraer unidad y territorio para el hero
        document.getElementById('hero-territorio').textContent = meta.Territorio ? formatTerritorioCorto(meta.Territorio) : 'Ámbito Nacional';
        
        const orgOrigen = extraerUnidadOrg(meta.InformacionInicial);
        if (orgOrigen) {
            document.getElementById('hero-unidad').textContent = orgOrigen;
        }

        // 2. SECCIÓN I: METADATOS
        document.getElementById('meta-codigo').textContent = codigoReg;
        document.getElementById('meta-territorio').textContent = meta.Territorio || 'No especificado';
        document.getElementById('meta-titulo').textContent = meta.TituloBuenaPractica || 'Sin Título';
        document.getElementById('meta-info-inicial').textContent = meta.InformacionInicial || 'No especificado';
        document.getElementById('meta-proceso').textContent = meta.ProcesoInstitucionalVinculado || 'No especificado';
        document.getElementById('meta-servicio').textContent = meta.Servicio || 'No especificado';

        // 3. SECCIÓN II: JUSTIFICACIÓN
        document.getElementById('just-problema').textContent = just.ProblemaOperativo || 'No especificado';
        document.getElementById('just-idea').textContent = just.IdeaInnovadora || 'No especificado';

        // 4. SECCIÓN III: DESARROLLO Y EXPERIENCIA
        renderFormattedText('exp-justificacion', exp.ExperienciaJustificacion || 'No especificado');
        document.getElementById('exp-actores').textContent = exp.ActoresInvolucrados || 'No especificado';
        document.getElementById('exp-obstaculos').textContent = exp.ObstaculosRiesgos || 'No especificado';

        // 5. SECCIÓN IV: EVIDENCIAS
        const rawEvidencias = evid.EnlacesEvidencias || 'Sin enlaces registrados';
        document.getElementById('evidencias-texto').textContent = rawEvidencias;
        renderEvidenciasLinks(rawEvidencias);

        // 6. SECCIÓN V: VALIDACIÓN Y CALIFICACIÓN
        document.getElementById('estado-texto').textContent = estado.replace(/\[\s*[Xx]\s*\]\s*/, '').trim();

        const tbody = document.getElementById('validacion-tbody');
        tbody.innerHTML = '';

        if (Array.isArray(validacion) && validacion.length > 0) {
            validacion.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-50/80 transition-colors border-b border-slate-100";

                const cumple = item.Cumple === true || String(item.Cumple).toLowerCase() === 'true';
                const badgeCumple = cumple
                    ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-xs">
                         <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i> [ X ] SÍ
                       </span>`
                    : `<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-lg font-bold text-xs">
                         <i data-lucide="x" class="w-4 h-4 text-rose-600"></i> [ X ] NO
                       </span>`;

                tr.innerHTML = `
                    <td class="py-4 px-4 font-bold text-slate-800 border-r border-slate-100 align-top">${escapeHtml(item.Criterio || '')}</td>
                    <td class="py-4 px-4 text-center border-r border-slate-100 align-middle">${badgeCumple}</td>
                    <td class="py-4 px-4 text-xs leading-relaxed text-slate-600 align-top text-justify">${escapeHtml(item.Sustento || '')}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="3" class="py-6 text-center text-slate-400">No se encontraron registros de validación técnica.</td></tr>`;
        }

        // Configuración de Botón de Descarga / Impresión Oficial (PDF en Google Drive)
        const btnPdf = document.getElementById('btn-imprimir-pdf');
        if (btnPdf) {
            const linkPdf = ficha.Link || (meta && meta.Link);
            btnPdf.onclick = (e) => {
                e.preventDefault();
                if (linkPdf) {
                    window.open(linkPdf, '_blank', 'noopener,noreferrer');
                } else {
                    window.print();
                }
            };
        }
    }

    /**
     * Renderiza enlaces a carpetas de Drive o herramientas
     */
    function renderEvidenciasLinks(texto) {
        const container = document.getElementById('evidencias-links');
        container.innerHTML = '';

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = texto.match(urlRegex);

        if (matches && matches.length > 0) {
            matches.forEach((url, idx) => {
                const cleanUrl = url.replace(/[.,;)]+$/, '');
                const btn = document.createElement('a');
                btn.href = cleanUrl;
                btn.target = "_blank";
                btn.rel = "noopener noreferrer";
                btn.className = "inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-sm group";
                btn.innerHTML = `
                    <i data-lucide="external-link" class="w-4 h-4 text-accent group-hover:scale-110 transition-transform"></i>
                    <span>Abrir Carpeta de Evidencias Digitales (${idx + 1})</span>
                `;
                container.appendChild(btn);
            });
        }
    }

    /**
     * Formatea párrafos y negritas básicas de markdown si existen
     */
    function renderFormattedText(elementId, text) {
        const el = document.getElementById(elementId);
        if (!el) return;

        // Limpiar
        el.innerHTML = '';

        // Separar párrafos
        const paragraphs = text.split(/\n\s*\n/);
        paragraphs.forEach(p => {
            const pEl = document.createElement('p');
            pEl.className = "mb-3 last:mb-0";
            
            // Reemplazar negritas **texto**
            let formatted = escapeHtml(p.trim());
            formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Reemplazar viñetas si empiezan con - o *
            if (formatted.startsWith('- ') || formatted.startsWith('* ')) {
                formatted = `<span class="inline-block w-2 h-2 rounded-full bg-primary mr-2 align-middle"></span>` + formatted.substring(2);
            }

            pEl.innerHTML = formatted;
            el.appendChild(pEl);
        });
    }

    function extraerUnidadOrg(info) {
        if (!info) return null;
        const match = info.match(/Unidad Orgánica(?:\s+de\s+Origen)?:\s*([^\n|]+)/i);
        return match ? match[1].trim() : null;
    }

    function formatTerritorioCorto(territorio) {
        if (!territorio) return 'Ámbito Nacional';
        if (territorio.length > 45) {
            return territorio.substring(0, 42) + '...';
        }
        return territorio;
    }

    function escapeHtml(string) {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return String(string).replace(/[&<>"']/g, s => entityMap[s]);
    }
});
