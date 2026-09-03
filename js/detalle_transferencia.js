document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fichaId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contenido = document.getElementById('ficha-contenido');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (!fichaId) {
        showError("No se proporcionó un ID de Acta TCO en la URL.");
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

        const tco = dataArray[0];
        popularTransferencia(tco);

        loader.classList.add('hidden');
        contenido.classList.remove('hidden');

    } catch (error) {
        console.error("Error al cargar el Acta de Transferencia:", error);
        showError("Ocurrió un error al cargar la información del Acta TCO. Por favor, intente nuevamente más tarde.");
    }

    function showError(message) {
        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = message;
    }

    function popularTransferencia(tco) {
        const datosGen = tco.DatosGeneralesPuesto || {};
        const conCrit = tco.ConocimientoOrganizacionalCritico || {};
        const conTac = tco.ConocimientoTacito || {};
        const lecciones = tco.BuenasPracticasYLeccionesAprendidas || {};
        const marcoNorm = tco.MarcoNormativoAplicacionPractica || {};
        const redCoord = tco.RedCoordinacion || {};
        const cierre = tco.FormalizacionCierre || {};

        // Hero & Cabecera
        const codigo = datosGen.CodigoUnicoRegistro || 'EC-000';
        const nombres = datosGen.NombresApellidos || 'Servidor Civil Saliente';
        const puesto = datosGen.PuestoDesempenado || 'Puesto Institucional';
        const unidad = datosGen.UnidadFuncional || 'AGROIDEAS';

        document.getElementById('ficha-codigo').textContent = codigo;
        document.getElementById('ficha-titulo').textContent = `Acta de Transferencia de Conocimiento: ${puesto}`;
        document.getElementById('hero-servidor').textContent = nombres;
        document.getElementById('hero-unidad').textContent = unidad;

        // SECCIÓN I: Datos Generales (Campos 1 a 5)
        if(document.getElementById('meta-codigo')) document.getElementById('meta-codigo').textContent = `${codigo} (${datosGen.CircunstanciaAplicacion || 'Cese/Rotación'})`;
        if(document.getElementById('meta-nombres')) document.getElementById('meta-nombres').textContent = nombres;
        if(document.getElementById('meta-puesto')) document.getElementById('meta-puesto').textContent = puesto;
        if(document.getElementById('meta-unidad')) document.getElementById('meta-unidad').textContent = unidad;
        
        if(document.getElementById('meta-periodo')) {
            document.getElementById('meta-periodo').innerHTML = `
                <span><strong>Inicio:</strong> ${datosGen.FechaInicioPuesto || '--'}</span>
                <span>•</span>
                <span><strong>Término / Cese:</strong> ${datosGen.FechaTerminoPuesto || '--'}</span>
            `;
        }

        const ulFunciones = document.getElementById('meta-funciones');
        if (ulFunciones) {
            ulFunciones.innerHTML = '';
            if (Array.isArray(datosGen.FuncionesPrincipales)) {
                datosGen.FuncionesPrincipales.forEach(func => {
                    const li = document.createElement('li');
                    li.textContent = func;
                    ulFunciones.appendChild(li);
                });
            } else {
                ulFunciones.innerHTML = `<li>${datosGen.FuncionesPrincipales || 'No especificadas'}</li>`;
            }
        }

        // SECCIÓN II: Conocimiento Crítico (Campos 6 y 7)
        const tbodyProc = document.getElementById('tabla-procesos-criticos');
        if (tbodyProc) {
            tbodyProc.innerHTML = '';
            const procs = conCrit.ProcesosActividadesCriticas || [];
            if (Array.isArray(procs) && procs.length > 0) {
                procs.forEach((p, idx) => {
                    const tr = document.createElement('tr');
                    tr.className = "hover:bg-slate-50 transition-colors";
                    tr.innerHTML = `
                        <td class="py-3.5 px-4 text-center font-bold text-slate-800 border-r border-slate-100">${p.Numero || (idx + 1)}</td>
                        <td class="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-100">${p.ProcesoActividadCritica || ''}</td>
                        <td class="py-3.5 px-4 text-xs leading-relaxed text-slate-600">${p.AspectosRelevantesEjecucion || ''}</td>
                    `;
                    tbodyProc.appendChild(tr);
                });
            } else {
                tbodyProc.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-500">No hay procesos críticos especificados</td></tr>`;
            }
        }

        if(document.getElementById('desc-alertas-pendientes')) {
            document.getElementById('desc-alertas-pendientes').textContent = conCrit.AspectosPendientesAlertasRelevantes || 'No hay alertas pendientes registradas';
        }

        // SECCIÓN III: Conocimiento Tácito (Campos 8 y 9)
        const tbodyCas = document.getElementById('tabla-casuistica-frecuente');
        if (tbodyCas) {
            tbodyCas.innerHTML = '';
            const casuistica = conTac.CasuisticaFrecuente || [];
            if (Array.isArray(casuistica) && casuistica.length > 0) {
                casuistica.forEach((c, idx) => {
                    const tr = document.createElement('tr');
                    tr.className = "hover:bg-slate-50 transition-colors";
                    tr.innerHTML = `
                        <td class="py-3.5 px-4 text-center font-bold text-slate-800 border-r border-slate-100">${c.Numero || (idx + 1)}</td>
                        <td class="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-100">${c.Casuistica || ''}</td>
                        <td class="py-3.5 px-4 text-xs leading-relaxed text-slate-600 border-r border-slate-100">${c.CriterioAtencionAplicada || ''}</td>
                        <td class="py-3.5 px-4 text-xs leading-relaxed text-slate-600">${c.Recomendaciones || ''}</td>
                    `;
                    tbodyCas.appendChild(tr);
                });
            } else {
                tbodyCas.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-slate-500">No hay casuística frecuente registrada</td></tr>`;
            }
        }

        if(document.getElementById('desc-conocimiento-indispensable')) {
            document.getElementById('desc-conocimiento-indispensable').textContent = conTac.ConocimientoTecnicoIndispensableTransferir || 'No especificado';
        }

        // SECCIÓN IV: Buenas Prácticas y Lecciones (Campos 10 a 12)
        if(document.getElementById('desc-estrategia-estandarizar')) {
            document.getElementById('desc-estrategia-estandarizar').textContent = lecciones.EstrategiaEstandarizar || 'No especificada';
        }
        if(document.getElementById('desc-accion-evitar')) {
            document.getElementById('desc-accion-evitar').textContent = lecciones.AccionEvitarFuturo || 'No especificada';
        }
        if(document.getElementById('desc-curva-aprendizaje')) {
            document.getElementById('desc-curva-aprendizaje').textContent = lecciones.RecomendacionesCurvaAprendizajeSucesor || 'No especificadas';
        }

        // SECCIÓN V: Marco Normativo (Campo 13)
        const tbodyNorm = document.getElementById('tabla-marco-normativo');
        if (tbodyNorm) {
            tbodyNorm.innerHTML = '';
            const docsNorm = marcoNorm.DocumentosNormativos || [];
            if (Array.isArray(docsNorm) && docsNorm.length > 0) {
                docsNorm.forEach((d, idx) => {
                    const tr = document.createElement('tr');
                    tr.className = "hover:bg-slate-50 transition-colors";
                    tr.innerHTML = `
                        <td class="py-3.5 px-4 text-center font-bold text-slate-800 border-r border-slate-100">${d.Numero || (idx + 1)}</td>
                        <td class="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-100">${d.DocumentoNormativo || ''}</td>
                        <td class="py-3.5 px-4 text-xs leading-relaxed text-slate-600">${d.TramiteEvaluacionAplica || ''}</td>
                    `;
                    tbodyNorm.appendChild(tr);
                });
            } else {
                tbodyNorm.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-500">No hay documentos normativos registrados</td></tr>`;
            }
        }

        // SECCIÓN VI: Red de Coordinación (Campo 14)
        const tbodyRed = document.getElementById('tabla-red-coordinacion');
        if (tbodyRed) {
            tbodyRed.innerHTML = '';
            const contactos = redCoord.ContactosClave || [];
            if (Array.isArray(contactos) && contactos.length > 0) {
                contactos.forEach((c, idx) => {
                    const tr = document.createElement('tr');
                    tr.className = "hover:bg-slate-50 transition-colors";
                    tr.innerHTML = `
                        <td class="py-3.5 px-4 text-center font-bold text-slate-800 border-r border-slate-100">${c.Numero || (idx + 1)}</td>
                        <td class="py-3.5 px-4 font-semibold text-slate-900 border-r border-slate-100">${c.Entidad || ''}</td>
                        <td class="py-3.5 px-4 font-medium text-slate-800 border-r border-slate-100">${c.Nombre || ''}</td>
                        <td class="py-3.5 px-4 text-xs leading-relaxed text-slate-600 border-r border-slate-100">${c.FinalidadCoordinacion || ''}</td>
                        <td class="py-3.5 px-4 text-xs font-mono text-primary font-semibold">${c.CorreoInstitucional || ''}</td>
                    `;
                    tbodyRed.appendChild(tr);
                });
            } else {
                tbodyRed.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-500">No hay contactos de red de coordinación registrados</td></tr>`;
            }
        }

        // SECCIÓN VII: Formalización y Cierre (Campo 15)
        if (document.getElementById('cierre-lugar-fecha')) {
            const lugar = cierre.Lugar || 'Sede Central';
            const fecha = cierre.Fecha || '--/--/----';
            document.getElementById('cierre-lugar-fecha').textContent = `${lugar}, ${fecha}`;
        }

        if (document.getElementById('cierre-rrhh')) {
            document.getElementById('cierre-rrhh').textContent = cierre.RecepcionRecursosHumanos || 'Equipo de Recursos Humanos - Unidad de Administración';
        }

        if (document.getElementById('firma-servidor-nombre')) {
            document.getElementById('firma-servidor-nombre').textContent = cierre.FirmaServidor || `Firma: ${nombres}`;
        }

        if (document.getElementById('firma-jefe-nombre')) {
            document.getElementById('firma-jefe-nombre').textContent = cierre.FirmaJefeSupervisor || 'Firma: Jefe/Supervisor Directo';
        }

        // Estado Badge
        if (document.getElementById('estado-texto')) {
            document.getElementById('estado-texto').textContent = cierre.EstadoRegistro || '[ X ] APROBADO / ARCHIVADO EN REPOSITORIO';
        }

        // Re-inicializar iconos de Lucide
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
});
