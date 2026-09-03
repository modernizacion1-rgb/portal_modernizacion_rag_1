document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fichaId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contenido = document.getElementById('ficha-contenido');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (!fichaId) {
        showError("No se proporcionó un ID de Guía Técnica en la URL.");
        return;
    }

    try {
        const cleanFichaId = fichaId.replace(/\.json$/i, '');
        const response = await fetch(`data/${cleanFichaId}.json`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const dataArray = await response.json();
        if (!dataArray || dataArray.length === 0) {
            throw new Error("El archivo JSON está vacío o tiene un formato incorrecto.");
        }

        const guia = dataArray[0];
        popularGuia(guia);

        loader.classList.add('hidden');
        contenido.classList.remove('hidden');

    } catch (error) {
        console.error("Error al cargar la Guía Técnica:", error);
        showError("Ocurrió un error al cargar la información de la Guía Técnica. Por favor, intente nuevamente más tarde.");
    }

    function showError(message) {
        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = message;
    }

    function popularGuia(guia) {
        const meta = guia.MetadatosTrazabilidad || {};
        const prop = guia.PropositoValorPublico || {};
        const des = guia.DesarrolloTecnicoPasoAPaso || {};
        const exp = guia.ToqueExpertoTácito || guia.ToqueExpertoTacito || {};
        const rec = guia.RecursosSostenibilidad || {};

        // Hero & Cabecera
        const codigo = meta.CodigoGuiaTecnica || 'GT-SH-000';
        const titulo = meta.TituloDescriptivo || 'Guía Técnica de Saber Hacer';
        const fecha = meta.FechaAprobacion || '--/--/----';
        const unidad = meta.UnidadOrganicaOrigen || 'AGROIDEAS';

        document.getElementById('ficha-codigo').textContent = codigo;
        document.getElementById('ficha-titulo').textContent = titulo;
        document.getElementById('ficha-fecha').textContent = fecha;
        document.getElementById('hero-unidad').textContent = unidad;

        // SECCIÓN I: Metadatos y Trazabilidad (Campos 1 a 7)
        if(document.getElementById('meta-codigo')) document.getElementById('meta-codigo').textContent = codigo;
        if(document.getElementById('meta-fecha')) document.getElementById('meta-fecha').textContent = fecha;
        if(document.getElementById('meta-titulo-cuerpo')) document.getElementById('meta-titulo-cuerpo').textContent = titulo;
        if(document.getElementById('meta-proceso')) document.getElementById('meta-proceso').textContent = meta.ProcesoVinculado || 'No especificado';
        if(document.getElementById('meta-unidad-cuerpo')) document.getElementById('meta-unidad-cuerpo').textContent = unidad;
        if(document.getElementById('meta-autor')) document.getElementById('meta-autor').textContent = meta.AutorMentor || 'No especificado';
        if(document.getElementById('meta-metodologia')) document.getElementById('meta-metodologia').textContent = meta.MetodologiaOrigen || 'No especificada';

        // SECCIÓN II: Propósito y Valor Público (Campos 8 a 11)
        if(document.getElementById('prop-objetivo')) document.getElementById('prop-objetivo').textContent = prop.ObjetivoGuia || 'No especificado';
        if(document.getElementById('prop-brecha')) document.getElementById('prop-brecha').textContent = prop.BrechaOperativa || 'No especificada';
        if(document.getElementById('prop-valor')) document.getElementById('prop-valor').textContent = prop.ValorPublicoGenerado || 'No especificado';
        if(document.getElementById('prop-publico')) document.getElementById('prop-publico').textContent = prop.PublicoObjetivo || 'No especificado';

        // SECCIÓN III: Desarrollo Técnico (Campos 12 a 14)
        if(document.getElementById('des-preparacion')) document.getElementById('des-preparacion').textContent = des.FasePreparacion || 'No especificada';
        if(document.getElementById('des-ejecucion')) document.getElementById('des-ejecucion').textContent = des.EjecucionSecuencial || 'No especificada';
        if(document.getElementById('des-criterios')) document.getElementById('des-criterios').textContent = des.CriteriosExitoTarea || 'No especificados';

        // SECCIÓN IV: El "Toque del Experto" (Campos 15 a 17)
        if(document.getElementById('exp-alertas')) document.getElementById('exp-alertas').textContent = exp.AlertasRiesgo || 'No hay alertas registradas';
        if(document.getElementById('exp-atajos')) document.getElementById('exp-atajos').textContent = exp.AtajosLicitosTips || 'No hay atajos registrados';
        if(document.getElementById('exp-imprevistos')) document.getElementById('exp-imprevistos').textContent = exp.ManejoImprevistos || 'No hay pautas de imprevistos registradas';

        // SECCIÓN V: Recursos, Seguridad y Sostenibilidad (Campos 18 a 20)
        if(document.getElementById('rec-recursos')) document.getElementById('rec-recursos').textContent = rec.RecursosHabilitadores || 'No especificados';
        if(document.getElementById('rec-periodicidad')) document.getElementById('rec-periodicidad').textContent = rec.PeriodicidadActualizacion || 'No especificada';
        if(document.getElementById('rec-seguridad')) document.getElementById('rec-seguridad').textContent = rec.SeguridadAccesibilidad || 'No especificada';

        // SECCIÓN VI: Validación de Calidad (Campo 21)
        const tbody = document.getElementById('validacion-tbody');
        if (tbody) {
            tbody.innerHTML = '';
            
            if (guia.ValidacionCalidad && Array.isArray(guia.ValidacionCalidad)) {
                guia.ValidacionCalidad.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.className = "hover:bg-slate-50 transition-colors";
                    
                    const icon = item.Cumple 
                        ? `<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 mx-auto"></i>` 
                        : `<i data-lucide="x-circle" class="w-5 h-5 text-rose-500 mx-auto"></i>`;

                    tr.innerHTML = `
                        <td class="py-4 px-4 font-semibold text-slate-800 border-r border-slate-100">${item.Criterio}</td>
                        <td class="py-4 px-4 text-center border-r border-slate-100">${icon}</td>
                        <td class="py-4 px-4 text-xs leading-relaxed text-slate-600">${item.Sustento}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-500">No hay datos de validación registrados</td></tr>`;
            }
        }

        // Estado Badge
        if (document.getElementById('estado-texto')) {
            document.getElementById('estado-texto').textContent = guia.EstadoAprobacion || '[ X ] APROBADO / VIGENTE';
        }
        
        // Re-inicializar iconos de Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
});
