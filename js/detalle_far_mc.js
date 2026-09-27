/**
 * Script de Carga Dinámica para Fichas de Aprendizaje Rápido de Micro-Cursos (FAR-MC V2.0)
 * Sistema de Gestión del Conocimiento y Modernización - AGROIDEAS
 */

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fichaId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contenido = document.getElementById('ficha-contenido');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (!fichaId) {
        showError("No se proporcionó un identificador de ficha en la URL (ejemplo: ?id=far-mc-1-m1).");
        return;
    }

    try {
        const cleanFichaId = fichaId.replace(/\.json$/i, '');
        const response = await fetch(`data/${cleanFichaId}.json`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - No se pudo encontrar el archivo data/${cleanFichaId}.json`);
        }

        const data = await response.json();
        if (!data) {
            throw new Error("El archivo JSON no contiene datos válidos.");
        }

        popularFichaFARMC(data, cleanFichaId);

        // Ocultar loader y mostrar contenido
        loader.classList.add('hidden');
        contenido.classList.remove('hidden');

        // Refrescar iconos Lucide
        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error("Error al cargar la ficha FAR-MC:", error);
        showError(error.message || "Ocurrió un error al cargar la información de la ficha técnica.");
    }

    function showError(message) {
        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = message;
        if (window.lucide) lucide.createIcons();
    }

    function popularFichaFARMC(ficha, cleanFichaId) {
        const nav = ficha.NavegacionYTrazabilidad || {};
        const meta = ficha.MetadatosFicha || {};
        const sintesis = ficha.SintesisEjecutiva || {};
        const nucleo = ficha.NucleoSaberYMarcoNormativo || {};
        const pilarLegal = nucleo.PilarLegalFundacional || [];
        const practica = nucleo.AplicacionPracticaAgroideas || {};
        const toque = ficha.ToqueDelExpertoYAlertasCampo || {};
        const cierre = ficha.CierreOperativoYAutoevaluacion || {};
        const quiz = cierre.PreguntaAutoevaluacion || {};

        // HERO Y CABECERA INSTITUCIONAL
        setText('ficha-codigo', meta.CodigoReferencia || 'FAR-MC');
        setText('ficha-version', (nav.EcosistemaDigital && nav.EcosistemaDigital.FormatoVersion) 
            ? `${nav.EcosistemaDigital.FormatoVersion} | UPP` 
            : 'Formato: FAR-MC V2.0 | UPP');
        setText('ficha-tiempo', `${meta.TiempoLecturaMinutos || 3} min`);
        setText('ficha-titulo', nav.SubtemaTitulo || 'Ficha de Aprendizaje Rápido');
        setText('hero-proceso', meta.ProcesoVinculado || 'Soporte / Estratégico: SAMGP');
        setText('hero-publico', meta.PublicoObjetivo || 'Personal Sede Central y 25 Unidades Regionales');

        // SECCIÓN I: NAVEGACIÓN Y TRAZABILIDAD (Requerimiento Clave: Valor)
        setText('trazabilidad-modulo-numero', nav.ModuloNumero !== undefined ? nav.ModuloNumero : '--');
        setText('trazabilidad-subtema-codigo', nav.SubtemaCodigo || '--');
        setText('trazabilidad-modulo-nombre', nav.ModuloNombre || '--');
        setText('trazabilidad-subtema-titulo', nav.SubtemaTitulo || '--');

        if (nav.PosicionEnModulo && nav.PosicionEnModulo.EtiquetaSecuencia) {
            setText('trazabilidad-secuencia', nav.PosicionEnModulo.EtiquetaSecuencia);
        }
        if (nav.EcosistemaDigital && nav.EcosistemaDigital.OrigenNormativo) {
            setText('trazabilidad-origen', nav.EcosistemaDigital.OrigenNormativo);
        }

        // SECCIÓN II: SÍNTESIS EJECUTIVA
        setText('sintesis-dolor', sintesis.ContextoYDolorInstitucional || 'Información no especificada.');

        // SECCIÓN III: NÚCLEO DEL SABER Y MARCO NORMATIVO
        // 3.1 Pilar Legal Fundacional
        const legalContainer = document.getElementById('pilar-legal-container');
        if (legalContainer) {
            legalContainer.innerHTML = '';
            if (Array.isArray(pilarLegal) && pilarLegal.length > 0) {
                pilarLegal.forEach(item => {
                    const card = document.createElement('div');
                    card.className = "p-4 bg-slate-50/90 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-all flex flex-col justify-between";
                    card.innerHTML = `
                        <div>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="px-2.5 py-0.5 bg-emerald-100/80 text-primary text-[11px] font-black rounded-md tracking-wider">
                                    ${escapeHTML(item.Norma || 'Norma')}
                                </span>
                            </div>
                            <h4 class="font-bold text-slate-800 text-xs sm:text-sm mb-1.5 leading-snug">
                                ${escapeHTML(item.Nombre || '')}
                            </h4>
                            <p class="text-xs text-slate-600 leading-relaxed">
                                ${escapeHTML(item.Descripcion || '')}
                            </p>
                        </div>
                    `;
                    legalContainer.appendChild(card);
                });
            } else {
                legalContainer.innerHTML = '<p class="text-xs text-slate-400 italic">No se registraron normas específicas.</p>';
            }
        }

        // 3.2 Aplicación Práctica AGROIDEAS
        if (practica['2.1_Objetivo']) {
            setText('pregunta-objetivo', practica['2.1_Objetivo'].Pregunta || '¿Qué es lo que se está desarrollando?');
            setText('respuesta-objetivo', practica['2.1_Objetivo'].Respuesta || '--');
        }
        if (practica['2.2_Finalidad']) {
            setText('pregunta-finalidad', practica['2.2_Finalidad'].Pregunta || '¿Para qué se está desarrollando?');
            setText('respuesta-finalidad', practica['2.2_Finalidad'].Respuesta || '--');
        }
        if (practica['2.3_Actores']) {
            const actores = practica['2.3_Actores'];
            setText('actores-lideres', actores.LideresEstrategicos || '--');
            setText('actores-ejecutores', actores.EjecutoresOperativos || '--');
            setText('actores-beneficiarios', actores.Beneficiarios || '--');
        }
        if (practica['2.4_MomentoFase']) {
            setText('pregunta-momento', practica['2.4_MomentoFase'].Pregunta || '¿Cuándo se debe desarrollar?');
            setText('respuesta-momento', practica['2.4_MomentoFase'].Respuesta || '--');
        }

        // SECCIÓN IV: TOQUE DEL EXPERTO Y ALERTAS DE CAMPO
        setText('alerta-roja', toque.AlertaRojaPeligroAEvitar || '--');
        setText('tip-experto', toque.TipPracticoDelExperto || '--');

        // SECCIÓN V: CIERRE OPERATIVO Y AUTOEVALUACIÓN
        setText('regla-oro', cierre.ReglaDeOroOperativa || '--');
        
        // Autoevaluación interactiva
        if (quiz.Pregunta) {
            setText('quiz-pregunta', quiz.Pregunta);
            setText('quiz-sustento', quiz.SustentoPedagogico || 'Respuesta validada por el Equipo Técnico de Mejora Continua.');

            const opcionesContainer = document.getElementById('quiz-opciones-container');
            const sustentoContainer = document.getElementById('sustento-container');
            if (opcionesContainer) {
                opcionesContainer.innerHTML = '';
                const opciones = quiz.Opciones || {};
                const respCorrecta = (quiz.RespuestaCorrecta || '').toLowerCase().trim();

                Object.keys(opciones).forEach(clave => {
                    const textoOpcion = opciones[clave];
                    const label = document.createElement('label');
                    label.className = "flex items-start gap-3 p-3.5 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors";
                    
                    label.innerHTML = `
                        <input type="radio" name="quiz_opt" value="${clave}" class="mt-0.5 text-primary focus:ring-primary h-4 w-4">
                        <span class="text-xs sm:text-sm text-slate-700 leading-snug">
                            <strong class="uppercase text-slate-900">${clave})</strong> ${escapeHTML(textoOpcion)}
                        </span>
                    `;

                    const radio = label.querySelector('input');
                    radio.addEventListener('change', () => {
                        sustentoContainer.classList.remove('hidden');
                        
                        // Quitar estilos previos de todas las opciones
                        opcionesContainer.querySelectorAll('label').forEach(l => {
                            l.classList.remove('border-emerald-500', 'bg-emerald-50/50', 'border-rose-400', 'bg-rose-50/50');
                        });

                        if (clave.toLowerCase().trim() === respCorrecta) {
                            label.classList.add('border-emerald-500', 'bg-emerald-50/50');
                        } else {
                            label.classList.add('border-rose-400', 'bg-rose-50/50');
                        }
                    });

                    opcionesContainer.appendChild(label);
                });
            }
        }

        // ACCIONES Y ENLACES
        const btnPrint = document.getElementById('btn-imprimir-pdf');
        if (btnPrint) {
            btnPrint.onclick = () => window.print();
        }

        const btnIrAula = document.getElementById('btn-ir-aula');
        if (btnIrAula) {
            const modId = nav.ModuloNumero ? `modulo${nav.ModuloNumero}` : 'modulo1';
            const subId = nav.SubtemaCodigo ? nav.SubtemaCodigo : '';
            btnIrAula.href = `microcurso.html?modulo=${encodeURIComponent(modId)}&subtema=${encodeURIComponent(subId)}`;
        }
    }

    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
});
