let cursosDataCache = null;

async function fetchCursosData() {
    if (cursosDataCache) return cursosDataCache;
    try {
        const response = await fetch('data/cursos.json');
        if (!response.ok) throw new Error("Error loading data");
        cursosDataCache = await response.json();
        return cursosDataCache;
    } catch (e) {
        console.error("No se pudo cargar data/cursos.json", e);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const openModalId = params.get('openModal');
    
    if (openModalId) {
        // Seleccionar la pestaña "Conocimiento" si existe
        const btnConocimiento = document.querySelector('.tab-link[data-target="conocimiento"]');
        if(btnConocimiento) {
            btnConocimiento.click();
            
            // Expandir el acordeón "Micro-Cursos"
            const acordeonMicroCursos = document.querySelector('#accordion-conocimiento .accordion-item:last-child button');
            if (acordeonMicroCursos) {
                const item = acordeonMicroCursos.closest('.accordion-item');
                if (!item.classList.contains('active')) {
                    toggleAccordion(acordeonMicroCursos);
                }
            }
        }
        
        // Abrir el modal correspondiente
        openMicroCursoModal(openModalId);
        
        // Limpiar la URL sin recargar la página
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    }
});


async function openMicroCursoModal(moduleId) {
    const data = await fetchCursosData();
    if (!data) return;

    const module = data.modulos.find(m => m.id === moduleId);
    if (!module) return;

    document.getElementById('mcModalEje').textContent = module.eje;
    document.getElementById('mcModalTitle').textContent = module.titulo;
    document.getElementById('mcModalDesc').textContent = module.descripcion;

    const container = document.getElementById('mcSubtemasContainer');
    container.innerHTML = '';

    module.subtemas.forEach((sub, index) => {
        const farMcId = resolverFarMcId(module.id, sub.id);
        const div = document.createElement('div');
        div.className = "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4";
        
        div.innerHTML = `
            <div class="flex items-start gap-3.5 flex-1">
                <div class="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center shrink-0 font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                    ${index + 1}
                </div>
                <div class="flex-1">
                    <h5 class="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">${sub.id}: ${sub.titulo}</h5>
                    <p class="text-xs text-slate-500 mt-1 line-clamp-2">${sub.descripcion}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <a href="ficha_microcurso.html?id=${encodeURIComponent(farMcId)}" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5" title="Ver documento técnico oficial">
                    <i data-lucide="file-text" class="w-3.5 h-3.5 text-primary"></i>
                    <span>Ficha</span>
                </a>
                <a href="microcurso.html?modulo=${encodeURIComponent(module.id)}&subtema=${encodeURIComponent(sub.id)}" class="bg-secondary/15 text-primary hover:bg-primary hover:text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5" title="Ingresar al Aula Virtual">
                    <i data-lucide="play" class="w-3.5 h-3.5"></i>
                    <span>Aula</span>
                </a>
            </div>
        `;
        container.appendChild(div);
    });

    // Reactivar iconos lucide si es necesario
    if (window.lucide) {
        lucide.createIcons();
    }

    const modal = document.getElementById('microCursoModal');
    const modalContent = modal.querySelector('div');
    
    modal.classList.remove('hidden');
    // Forzar reflow
    void modal.offsetWidth;
    
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
}

function closeMicroCursoModal() {
    const modal = document.getElementById('microCursoModal');
    const modalContent = modal.querySelector('div');
    
    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // duración de la transición
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
