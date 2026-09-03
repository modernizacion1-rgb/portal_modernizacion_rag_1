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

        const ficha = dataArray[0];
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
        // Cabecera
        document.getElementById('ficha-codigo').textContent = ficha.MetadatosTrazabilidad.CodigoUnicoRegistro || 'N/A';
        document.getElementById('ficha-titulo').textContent = ficha.MetadatosTrazabilidad.TituloLeccionAprendida || 'Sin Título';
        document.getElementById('ficha-fecha').textContent = ficha.MetadatosTrazabilidad.FechaRegistro || '--/--/----';

        // I. Metadatos
        document.getElementById('meta-proceso').textContent = ficha.MetadatosTrazabilidad.ProcesoMisionalVinculado || 'No especificado';
        document.getElementById('meta-unidad').textContent = ficha.MetadatosTrazabilidad.UnidadOrganizacionalOrigen || 'No especificado';
        document.getElementById('meta-autor').textContent = ficha.MetadatosTrazabilidad.AutorEspecialista || 'No especificado';

        // II. Descripción del Incidente
        document.getElementById('desc-etapa').textContent = ficha.DescripcionIncidente.EtapaHito || 'No especificada';
        document.getElementById('desc-problema').textContent = ficha.DescripcionIncidente.ProblemaDesviacion || ficha.DescripcionIncidente.ProblemaOdesviacion || 'No especificada';
        document.getElementById('desc-causa').textContent = ficha.DescripcionIncidente.AnalisisCausaRaiz || 'No especificado';

        // III. Acción Mitigadora
        document.getElementById('accion-procedimiento').textContent = ficha.AccionMitigadora.ProcedimientoSolucion || 'No especificado';
        document.getElementById('accion-exito').textContent = ficha.AccionMitigadora.CriteriosExitoSolucion || 'No especificado';
        document.getElementById('accion-impacto').textContent = ficha.AccionMitigadora.ImpactoEstimadoSolucion || 'No especificado';

        // IV. Lección Aprendida
        document.getElementById('leccion-sintesis').textContent = ficha.LeccionAprendida.SintesisLeccionAprendida || 'No especificado';
        document.getElementById('leccion-colegas').textContent = ficha.LeccionAprendida.RecomendacionOperativaColegas || 'No especificado';
        document.getElementById('leccion-entidad').textContent = ficha.LeccionAprendida.RecomendacionEntidad || 'No especificado';

        // V. Validación de Calidad
        const tbody = document.getElementById('validacion-tbody');
        tbody.innerHTML = ''; // Limpiar filas previas
        
        if (ficha.ValidacionCalidad && Array.isArray(ficha.ValidacionCalidad)) {
            ficha.ValidacionCalidad.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-slate-50 transition-colors";
                
                const icon = item.Cumple 
                    ? `<i data-lucide="check" class="w-5 h-5 text-emerald-500 mx-auto"></i>` 
                    : `<i data-lucide="x" class="w-5 h-5 text-red-500 mx-auto"></i>`;

                tr.innerHTML = `
                    <td class="py-4 px-4 font-semibold text-slate-800 border-r border-slate-100">${item.Criterio}</td>
                    <td class="py-4 px-4 text-center border-r border-slate-100">${icon}</td>
                    <td class="py-4 px-4 text-xs leading-relaxed text-slate-600">${item.Sustento}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-500">No hay datos de validación</td></tr>`;
        }
        
        // Re-inicializar iconos de Lucide para los nuevos elementos insertados
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
});
