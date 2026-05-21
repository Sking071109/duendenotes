// ============================================================
//  DuendeNotes — app.js
//  Controlador principal: conecta modelo (notas.js) y vista (ui.js)
// ============================================================

// ── Estado del controlador ───────────────────────────────────
let notaIdPendienteEliminar = null;
let terminoBusqueda         = '';


// ────────────────────────────────────────────────────────────
//  Boot al cargar la página — DADO ✅
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    inicializarNotas();   // carga notas desde localStorage
    refrescarVista();     // pinta la lista inicial
    registrarEventos();   // activa todos los botones
});


// ────────────────────────────────────────────────────────────
//  refrescarVista() — DADA ✅
//
//  Obtiene el array actualizado, renderiza la lista y actualiza el contador.
//  Se llama cada vez que los datos cambian.
// ────────────────────────────────────────────────────────────
function refrescarVista() {
    let filtradas = obtenerNotas(terminoBusqueda);
    renderizarNotas(filtradas);
    actualizarContador(totalNotas());
}


// ────────────────────────────────────────────────────────────
//  registrarEventos() — DADA ✅ (excepto TICKET 4)
// ────────────────────────────────────────────────────────────
function registrarEventos() {

    // ── FAB: abrir modal de creación ─────────────────────────
    document.getElementById('btnNuevaNota').addEventListener('click', function() {
        abrirModalCrear();
    });

    // ── Modal crear: cerrar con X y cancelar ─────────────────
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModalCrear);
    document.getElementById('btnCancelarCrear').addEventListener('click', cerrarModalCrear);

    document.getElementById('modalCrear').addEventListener('click', function(e) {
        if (e.target === this) cerrarModalCrear();
    });

    // ── Duende escritor: aparece al enfocar cualquier campo ──
    let inputTitulo    = document.getElementById('inputTitulo');
    let inputContenido = document.getElementById('inputContenido');

    inputTitulo.addEventListener('focus', mostrarDuendeEscritor);
    inputContenido.addEventListener('focus', mostrarDuendeEscritor);

    inputTitulo.addEventListener('blur', function() {
        setTimeout(function() {
            let activo = document.activeElement;
            if (activo !== inputTitulo && activo !== inputContenido) {
                ocultarDuendeEscritor();
            }
        }, 100);
    });

    inputContenido.addEventListener('blur', function() {
        setTimeout(function() {
            let activo = document.activeElement;
            if (activo !== inputTitulo && activo !== inputContenido) {
                ocultarDuendeEscritor();
            }
        }, 100);
    });


    // ────────────────────────────────────────────────────────
    //  🎫 TICKET 4 — Guardar nota al hacer clic en [ GUARDAR ]
    //
    //  Patrón a seguir (en este orden):
    //  1. Lee inputTitulo.value.trim() y inputContenido.value.trim()
    //  2. Si titulo está vacío → mostrarFeedback('ERROR: Se requiere un titulo.', 'error')
    //                            haz focus en inputTitulo y return
    //  3. Si contenido está vacío → mostrarFeedback('ERROR: La nota no puede estar vacia.', 'error')
    //                               haz focus en inputContenido y return
    //  4. Llama a crearNota(titulo, contenido)
    //  5. Llama a cerrarModalCrear()
    //  6. Llama a refrescarVista()
    // ────────────────────────────────────────────────────────
    document.getElementById('btnGuardar').addEventListener('click', function() {
        // TODO — completa los 6 pasos descritos arriba
        let titulo = inputTitulo.value.trim();
        let contenido = inputContenido.value.trim();

        if (titulo === '') {
            mostrarFeedback('ERROR: Se requiere un titulo.', 'error');
            inputTitulo.focus();
            return;
        }

        if (contenido === '') {
            mostrarFeedback('ERROR: La nota no puede estar vacia.', 'error');
            inputContenido.focus();
            return;
        }

        crearNota(titulo, contenido);
        cerrarModalCrear();
        refrescarVista();
    });

    // Guardar con Ctrl+Enter (atajo de teclado) — DADO ✅
    inputContenido.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            document.getElementById('btnGuardar').click();
        }
    });


    // ── Búsqueda en tiempo real — DADO ✅
    //    (el filtro real lo implementas en obtenerNotas() — HOMEWORK T3)
    document.getElementById('inputBuscar').addEventListener('input', function() {
        terminoBusqueda = this.value;
        refrescarVista();
    });


    // ── Botón Purgar (borrar todo) — DADO ✅
    //    (la lógica real la implementas en borrarTodasLasNotas() — HOMEWORK BONUS)
    document.getElementById('btnBorrarTodo').addEventListener('click', function() {
        if (totalNotas() === 0) return;
        notaIdPendienteEliminar = 'TODAS';
        abrirModalEliminar(null);
    });


    // ── Delegación de eventos en la lista — DADA ✅
    //    (los botones llaman a eliminarNota y toggleFavorita — HOMEWORK T1 y T2)
    document.getElementById('listaNotas').addEventListener('click', function(e) {
        let btnEliminar = e.target.closest('.btn-eliminar');
        let btnFav      = e.target.closest('.btn-fav');

        if (btnEliminar) {
            let id   = Number(btnEliminar.dataset.id);
            let nota = obtenerNotas('').find(function(n) { return n.id === id; });
            notaIdPendienteEliminar = id;
            abrirModalEliminar(nota ? nota.titulo : '');
        }

        if (btnFav) {
            let id    = Number(btnFav.dataset.id);
            let esFav = toggleFavorita(id);
            let card  = btnFav.closest('.nota-card');

            let svgEmpty = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            let svgFull  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            btnFav.innerHTML = esFav ? svgFull : svgEmpty;
            btnFav.classList.toggle('activa', esFav);
            btnFav.title = esFav ? 'Quitar favorita' : 'Favorita';
            card.classList.toggle('nota-favorita', esFav);
        }
    });


    // ── Modal eliminar: cancelar — DADO ✅
    document.getElementById('btnCancelarEliminar').addEventListener('click', function() {
        cerrarModalEliminar();
        notaIdPendienteEliminar = null;
    });

    document.getElementById('modalEliminar').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModalEliminar();
            notaIdPendienteEliminar = null;
        }
    });

    // ── Modal eliminar: confirmar → explosión — DADO ✅
    document.getElementById('btnConfirmarEliminar').addEventListener('click', function() {
        cerrarModalEliminar();

        mostrarExplosion(function() {
            if (notaIdPendienteEliminar === 'TODAS') {
                borrarTodasLasNotas();
            } else if (notaIdPendienteEliminar !== null) {
                eliminarNota(notaIdPendienteEliminar);
            }
            notaIdPendienteEliminar = null;
            terminoBusqueda = '';
            document.getElementById('inputBuscar').value = '';
            refrescarVista();
        });
    });

    // ── Cerrar modales con Escape — DADO ✅
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        let modalCrear    = document.getElementById('modalCrear');
        let modalEliminar = document.getElementById('modalEliminar');
        if (!modalCrear.hasAttribute('hidden'))    cerrarModalCrear();
        if (!modalEliminar.hasAttribute('hidden')) {
            cerrarModalEliminar();
            notaIdPendienteEliminar = null;
        }
    });
}
