document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fichaId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contenido = document.getElementById('ficha-contenido');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (!fichaId) {
        showError("No se proporcionó un ID de ficha en la URL.");
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

        const ficha = Array.isArray(dataArray) ? dataArray[0] : dataArray;
        if (!ficha) {
            throw new Error("No se encontraron datos en el archivo JSON.");
        }
        popularFicha(ficha);

        loader.classList.add('hidden');
        contenido.classList.remove('hidden');

    } catch (error) {
        console.error("Error al cargar la ficha:", error);
        showError("Ocurrió un error al cargar la información de la ficha. Por favor, intente nuevamente más tarde.");
    }

    function showError(message) {
        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = message;
    }

    function popularFicha(ficha) {
        const meta = ficha.MetadatosTrazabilidad || {};
        const desc = ficha.DescripcionIncidente || {};
        const acc = ficha.AccionMitigadora || {};
        const lec = ficha.LeccionAprendida || {};

        // Hero & Cabecera
        const codigo = meta.CodigoUnicoRegistro || 'N/A';
        const titulo = meta.TituloLeccionAprendida || 'Sin Título';
        const fecha = meta.FechaRegistro || '--/--/----';
        const unidad = meta.UnidadOrganizacionalOrigen || 'AGROIDEAS';

        document.getElementById('ficha-codigo').textContent = codigo;
        document.getElementById('ficha-titulo').textContent = titulo;
        document.getElementById('ficha-fecha').textContent = fecha;
        document.getElementById('hero-unidad').textContent = unidad;

        // SECCIÓN I: Metadatos y Trazabilidad (Campos 1 a 6)
        if(document.getElementById('meta-codigo')) document.getElementById('meta-codigo').textContent = codigo;
        if(document.getElementById('meta-fecha-cuerpo')) document.getElementById('meta-fecha-cuerpo').textContent = fecha;
        if(document.getElementById('meta-titulo')) document.getElementById('meta-titulo').textContent = titulo;
        if(document.getElementById('meta-proceso')) document.getElementById('meta-proceso').textContent = meta.ProcesoMisionalVinculado || 'No especificado';
        if(document.getElementById('meta-unidad')) document.getElementById('meta-unidad').textContent = unidad;
        if(document.getElementById('meta-autor')) document.getElementById('meta-autor').textContent = meta.AutorEspecialista || 'No especificado';

        // SECCIÓN II: Descripción del Incidente o Desviación (Campos 7 a 9)
        if(document.getElementById('desc-etapa')) document.getElementById('desc-etapa').textContent = desc.EtapaHito || 'No especificada';
        if(document.getElementById('desc-problema')) document.getElementById('desc-problema').textContent = desc.ProblemaDesviacion || desc.ProblemaOdesviacion || 'No especificada';
        if(document.getElementById('desc-causa')) document.getElementById('desc-causa').textContent = desc.AnalisisCausaRaiz || 'No especificado';

        // SECCIÓN III: Acción Mitigadora Aplicada (Campos 10 a 12)
        if(document.getElementById('accion-procedimiento')) document.getElementById('accion-procedimiento').textContent = acc.ProcedimientoSolucion || 'No especificado';
        if(document.getElementById('accion-exito')) document.getElementById('accion-exito').textContent = acc.CriteriosExitoSolucion || 'No especificado';
        if(document.getElementById('accion-impacto')) document.getElementById('accion-impacto').textContent = acc.ImpactoEstimadoSolucion || 'No especificado';

        // SECCIÓN IV: Declaración de la Lección Aprendida (Campos 13 a 15)
        if(document.getElementById('leccion-sintesis')) document.getElementById('leccion-sintesis').textContent = lec.SintesisLeccionAprendida || 'No especificado';
        if(document.getElementById('leccion-colegas')) document.getElementById('leccion-colegas').textContent = lec.RecomendacionOperativaColegas || 'No especificado';
        if(document.getElementById('leccion-entidad')) document.getElementById('leccion-entidad').textContent = lec.RecomendacionEntidad || 'No especificado';

        // SECCIÓN V: Validación de Calidad (Campos 16 y 17)
        const tbody = document.getElementById('validacion-tbody');
        if (tbody) {
            tbody.innerHTML = ''; // Limpiar filas previas
            
            if (ficha.ValidacionCalidad && Array.isArray(ficha.ValidacionCalidad)) {
                ficha.ValidacionCalidad.forEach(item => {
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
            document.getElementById('estado-texto').textContent = ficha.EstadoAprobacion || 'APROBADO / VIGENTE';
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
        
        // Re-inicializar iconos de Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
});
