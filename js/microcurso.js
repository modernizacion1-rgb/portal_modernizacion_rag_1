document.addEventListener('DOMContentLoaded', async () => {
    // 1. Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const moduleId = params.get('modulo');
    const subtemaId = params.get('subtema');

    if (!moduleId || !subtemaId) {
        alert("Faltan parámetros de curso.");
        return;
    }

    // 2. Cargar datos
    try {
        const response = await fetch('data/cursos.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        const module = data.modulos.find(m => m.id === moduleId);
        if (!module) throw new Error("Módulo no encontrado");

        const subtema = module.subtemas.find(s => s.id === subtemaId);
        if (!subtema) throw new Error("Subtema no encontrado");

        // 3. Pintar datos en la UI
        document.getElementById('moduloEjeLabel').textContent = module.eje;
        document.getElementById('moduloTituloLabel').textContent = module.titulo;
        
        document.getElementById('subtemaIdBadge').textContent = `Subtema ${subtema.id}`;
        document.getElementById('subtemaTitulo').textContent = subtema.titulo;
        document.getElementById('subtemaDesc').textContent = subtema.descripcion;
        
        document.getElementById('videoUrlPreview').textContent = subtema.video_url;

        // Configurar botón de retroceso
        const backBtn = document.getElementById('backButton');
        if (backBtn) {
            backBtn.href = `repositorio.html?openModal=${module.id}`;
        }

        // Configurar botón a la Ficha Oficial FAR-MC
        const btnFicha = document.getElementById('btnDescargarFicha');
        if (btnFicha) {
            const farMcId = resolverFarMcId(module.id, subtema.id);
            btnFicha.href = `ficha_microcurso.html?id=${encodeURIComponent(farMcId)}`;
        }

        // Renderizar Cuestionario
        renderQuiz(subtema.preguntas);

    } catch (e) {
        console.error("Error al cargar el curso:", e);
        document.getElementById('subtemaTitulo').textContent = "Error al cargar el curso";
        document.getElementById('subtemaDesc').textContent = e.message;
    }
});

function renderQuiz(preguntas) {
    const container = document.getElementById('quizContainer');
    
    if (!preguntas || preguntas.length === 0) {
        container.innerHTML = `<div class="p-4 bg-amber-50 text-amber-700 text-sm rounded-xl">Este subtema no tiene cuestionario asociado.</div>`;
        // Habilitar botón de finalizar automáticamente
        const btn = document.getElementById('btnFinalizar');
        btn.disabled = false;
        btn.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        btn.classList.add('bg-primary', 'text-white', 'hover:bg-secondary');
        return;
    }

    container.innerHTML = '';
    
    preguntas.forEach((q, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = "mb-4";
        
        let html = `<p class="text-sm font-bold text-slate-800 mb-2">${index + 1}. ${q.pregunta}</p><div class="space-y-2">`;
        
        q.opciones.forEach((opcion, i) => {
            html += `
                <label class="flex items-start gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="radio" name="pregunta_${index}" value="${i}" class="mt-0.5 text-primary focus:ring-primary">
                    <span class="text-sm text-slate-600">${opcion}</span>
                </label>
            `;
        });
        
        html += `</div>`;
        qDiv.innerHTML = html;
        container.appendChild(qDiv);
    });

    // Añadir listener para validar cuando todos los radios estén marcados
    const inputs = container.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            checkQuizCompletion(preguntas.length);
        });
    });
}

function checkQuizCompletion(totalQuestions) {
    let answered = 0;
    for (let i = 0; i < totalQuestions; i++) {
        const selected = document.querySelector(`input[name="pregunta_${i}"]:checked`);
        if (selected) answered++;
    }

    // Progreso
    const percentage = (answered / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${percentage}%`;

    // Habilitar botón si terminó
    if (answered === totalQuestions) {
        const btn = document.getElementById('btnFinalizar');
        btn.disabled = false;
        btn.classList.remove('bg-slate-200', 'text-slate-400', 'cursor-not-allowed');
        btn.classList.add('bg-primary', 'text-white', 'hover:bg-secondary');
    }
}

function resolverFarMcId(moduleId, subtemaId) {
    const mapa = {
        'modulo1-M1.1': 'far-mc-1-m1',
        'modulo1-M1.2': 'far-mc-1-m2',
        'modulo1-M1.3': 'far-mc-1-m3',
        'modulo2-A.1': 'far-mc-2-a1',
        'modulo2-A.2': 'far-mc-2-a2',
        'modulo2-A.3': 'far-mc-2-a3',
        'modulo3-B.1': 'far-mc-3-b1',
        'modulo3-B.2': 'far-mc-3-b2',
        'modulo3-B.3': 'far-mc-3-b3',
        'modulo4-C.1': 'far-mc-4-c1',
        'modulo4-C.2': 'far-mc-4-c2',
        'modulo4-C.3': 'far-mc-4-c3',
        'modulo5-E.1': 'far-mc-5-e1',
        'modulo5-E.2': 'far-mc-5-e2',
        'modulo5-E.3': 'far-mc-5-e3',
        'modulo6-D.1': 'far-mc-6-d1',
        'modulo6-D.2': 'far-mc-6-d2',
        'modulo6-D.3': 'far-mc-6-d3'
    };
    const key = `${moduleId}-${subtemaId}`;
    if (mapa[key]) return mapa[key];

    const num = moduleId.replace(/\D/g, '') || '1';
    const cleanSub = subtemaId.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `far-mc-${num}-${cleanSub}`;
}
