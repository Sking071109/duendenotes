// ============================================================
//  DuendeNotes — nota-card.js
//  Web Component para renderizar tarjetas de notas
// ============================================================

// ── Función auxiliar para escapar HTML ──────────────────────
function escaparHTMLCard(texto) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(texto));
    return div.innerHTML;
}

// ── SVG Icons inline ────────────────────────────────────────
const CARD_SVG_STAR_EMPTY = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const CARD_SVG_STAR_FULL  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const CARD_SVG_TRASH      = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4h6v2"/></svg>`;


// ────────────────────────────────────────────────────────────
//  NotaCard — Web Component
//
//  Extiende HTMLElement para crear una tarjeta de nota personalizada
//  que recibe datos a través de atributos (data-*) y construye su
//  propio HTML internamente.
// ────────────────────────────────────────────────────────────
class NotaCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Leer los atributos data-* que pasó la aplicación
        let id        = this.dataset.id;
        let titulo    = this.dataset.titulo || '';
        let contenido = this.dataset.contenido || '';
        let fecha     = this.dataset.fecha || '';
        let favorita  = this.dataset.favorita === 'true';

        // Construir el HTML interno
        this.innerHTML = `
            <article class="nota-card${favorita ? ' nota-favorita' : ''}" data-id="${id}">
                <div class="nota-header">
                    <h2 class="nota-titulo">${escaparHTMLCard(titulo)}</h2>
                    <div class="nota-acciones">
                        <button
                            class="btn-fav${favorita ? ' activa' : ''}"
                            data-id="${id}"
                            title="${favorita ? 'Quitar favorita' : 'Favorita'}"
                            aria-label="${favorita ? 'Quitar de favoritos' : 'Marcar como favorita'}"
                        >${favorita ? CARD_SVG_STAR_FULL : CARD_SVG_STAR_EMPTY}</button>
                        <button
                            class="btn-eliminar"
                            data-id="${id}"
                            title="Eliminar nota"
                            aria-label="Eliminar nota"
                        >${CARD_SVG_TRASH}</button>
                    </div>
                </div>
                <p class="nota-contenido">${escaparHTMLCard(contenido)}</p>
                <time class="nota-fecha" datetime="${id}">${fecha}</time>
            </article>
        `;
    }
}

// Registrar el componente en el navegador
customElements.define('nota-card', NotaCard);
