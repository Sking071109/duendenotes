// ============================================================
//  DuendeNotes — ui.js
//  Capa de presentación: renderiza el DOM, gestiona modales e imágenes
//  Todo este archivo está DADO ✅ — excepto el BONUS marcado abajo
// ============================================================

// ── SVG Icons inline ────────────────────────────────────────
const SVG_STAR_EMPTY = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_STAR_FULL  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_TRASH      = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4h6v2"/></svg>`;


// ────────────────────────────────────────────────────────────
//  renderizarNotas(notasFiltradas) — DADA ✅ (excepto el BONUS)
//
//  Recibe el array de notas a mostrar y reconstruye la lista completa.
//  Siempre pinta desde cero — borra el contenedor y reconstruye.
// ────────────────────────────────────────────────────────────
function renderizarNotas(notasFiltradas) {
    let lista = document.getElementById('listaNotas');
    lista.innerHTML = '';

    // ─────────────────────────────────────────────────────────
    //  🔥 BONUS EN CLASE — mostrar estado vacío del duende
    //
    //  Si no hay notas, queremos mostrar al duende durmiendo
    //  en lugar de dejar la pantalla en blanco.
    //
    //  TODO:
    //  1. Crea un div: let vacio = document.createElement('div')
    //  2. Asígnale la clase "estado-vacio"
    //  3. Usa innerHTML para agregarle:
    //       <img src="images/duende_duerme.webp" class="duende-duerme-img" />
    //       <p class="vacio-titulo">SIN_NOTAS.txt</p>
    //       <p class="vacio-sub">El duende duerme. Pulsa [+] para crear una nota.</p>
    //  4. Agrégalo al contenedor con lista.appendChild(vacio)
    //  5. El return ya está — no lo borres, evita que el forEach corra con array vacío
    // ─────────────────────────────────────────────────────────
    if (notasFiltradas.length === 0) {
        // TODO — completa los pasos del BONUS aquí
        let vacio = document.createElement('div');
        vacio.className = 'estado-vacio';
        vacio.innerHTML = `
            <img src="images/duende_duerme.webp" class="duende-duerme-img" />
            <p class="vacio-titulo">SIN_NOTAS.txt</p>
            <p class="vacio-sub">El duende duerme. Pulsa [+] para crear una nota.</p>
        `;
        lista.appendChild(vacio);

        return;
    }

    notasFiltradas.forEach(function(nota) {
        let card = document.createElement('nota-card');
        card.dataset.id        = nota.id;
        card.dataset.titulo    = nota.titulo;
        card.dataset.contenido = nota.contenido;
        card.dataset.fecha     = nota.fecha;
        card.dataset.favorita  = nota.favorita;
        lista.appendChild(card);
    });
}


// ────────────────────────────────────────────────────────────
//  Las funciones de abajo están todas DADAS ✅
//  No las modifiques — son infraestructura de UI
// ────────────────────────────────────────────────────────────

function actualizarContador(total) {
    document.getElementById('contadorNotas').textContent = total;
}

function mostrarFeedback(mensaje, tipo) {
    let el = document.getElementById('feedbackMsg');
    el.textContent = '> ' + mensaje;
    el.className = 'pixel-feedback ' + tipo;
    el.style.display = 'block';
    clearTimeout(el._timer);
    el._timer = setTimeout(function() {
        el.style.display = 'none';
        el.className = 'pixel-feedback';
    }, 3000);
}

function abrirModalCrear() {
    let modal = document.getElementById('modalCrear');
    modal.removeAttribute('hidden');
    document.getElementById('inputTitulo').focus();
}

function cerrarModalCrear() {
    document.getElementById('modalCrear').setAttribute('hidden', '');
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('inputTitulo').value    = '';
    document.getElementById('inputContenido').value = '';
    let fb = document.getElementById('feedbackMsg');
    fb.style.display = 'none';
    fb.className = 'pixel-feedback';
    ocultarDuendeEscritor();
}

function mostrarDuendeEscritor() {
    document.getElementById('duendeEscritor').classList.add('visible');
}

function ocultarDuendeEscritor() {
    document.getElementById('duendeEscritor').classList.remove('visible');
}

function abrirModalEliminar(titulo) {
    let modal    = document.getElementById('modalEliminar');
    let tituloEl = document.getElementById('modalEliminarTitulo');
    tituloEl.textContent = titulo
        ? '[ BORRAR: ' + titulo.substring(0, 18) + ' ]'
        : '[ BORRAR TODO ]';
    modal.removeAttribute('hidden');
    document.getElementById('btnConfirmarEliminar').focus();
}

function cerrarModalEliminar() {
    document.getElementById('modalEliminar').setAttribute('hidden', '');
}

function mostrarExplosion(callback) {
    let overlay = document.getElementById('overlayExplosion');
    overlay.removeAttribute('hidden');
    setTimeout(function() {
        overlay.setAttribute('hidden', '');
        if (typeof callback === 'function') callback();
    }, 1500);
}

function escaparHTML(texto) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(texto));
    return div.innerHTML;
}
