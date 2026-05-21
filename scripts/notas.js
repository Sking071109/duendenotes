// ============================================================
//  DuendeNotes — notas.js
//  Modelo de datos: lógica pura de notas (sin DOM)
// ============================================================

// Array en memoria — fuente de verdad durante la sesión
let notas = [];


// ────────────────────────────────────────────────────────────
//  inicializarNotas() — DADA ✅
//
//  Al arrancar, rescatamos del localStorage lo que sobrevivió.
//  Si nunca se guardó nada, cargarNotas() devuelve [] y empezamos limpio.
// ────────────────────────────────────────────────────────────
function inicializarNotas() {
    notas = cargarNotas();
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 3 — crearNota(titulo, contenido)
//
//  Construye el objeto nota, lo agrega al array y lo persiste.
//  Este es el patrón de tres pasos que usará toda la app:
//    1. Actualizar el array en memoria
//    2. Persistir con guardarNotas()
//    3. (El re-render lo dispara quien llamó a crearNota, en app.js)
//
//  Pista: usa Date.now() como id — devuelve milisegundos únicos
//         usa unshift() para agregar la nota al INICIO del array
// ────────────────────────────────────────────────────────────
function crearNota(titulo, contenido) {
    // TODO — Paso 1: construye el objeto nota con estas propiedades:
    //   id:        Date.now()
    //   titulo:    titulo.trim()
    //   contenido: contenido.trim()
    //   fecha:     new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    //   favorita:  false
    let nota = {
        id: Date.now(),
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        favorita: false
    };

    // TODO — Paso 2: agrega la nota al INICIO del array con unshift()
    //                (unshift agrega al frente, push agrega al final)
    notas.unshift(nota);

    // TODO — Paso 3: llama a guardarNotas(notas) para persistir en localStorage
    guardarNotas(notas);

    // TODO — Paso 4: retorna la nota creada
    return nota;
}


// ────────────────────────────────────────────────────────────
//  eliminarNota(id) — TODO HOMEWORK TICKET 1
// ────────────────────────────────────────────────────────────
function eliminarNota(id) {
    // TODO — HOMEWORK TICKET 1
    // Pista: usa filter para reconstruir el array sin la nota con ese id
    //        notas = notas.filter(...)
    //        recuerda llamar a guardarNotas(notas) al terminar
    notas = notas.filter(function(nota) { return nota.id !== id; });
    guardarNotas(notas);
}


// ────────────────────────────────────────────────────────────
//  toggleFavorita(id) — TODO HOMEWORK TICKET 2
// ────────────────────────────────────────────────────────────
function toggleFavorita(id) {
    // TODO — HOMEWORK TICKET 2
    // Pista: usa find para encontrar la nota por id
    //        invierte nota.favorita con el operador !  →  nota.favorita = !nota.favorita
    //        llama a guardarNotas(notas) y retorna el nuevo valor de favorita
    let nota = notas.find(function(n) { return n.id === id; });
    if (nota) {
        nota.favorita = !nota.favorita;
        guardarNotas(notas);
        return nota.favorita;
    }
    return false; // ← mantener este return para que el botón no rompa mientras es TODO
}


// ────────────────────────────────────────────────────────────
//  obtenerNotas(filtro) — DADA ✅ (el filtro es HOMEWORK TICKET 3)
//
//  Por ahora retorna todas las notas sin filtrar.
//  En el homework implementarás la búsqueda por título y contenido.
// ────────────────────────────────────────────────────────────
function obtenerNotas(filtro) {
    // TODO — HOMEWORK TICKET 3: implementar búsqueda
    // Pista: filtra las notas cuyo titulo o contenido incluyan el texto del filtro
    //        (recuerda usar .toLowerCase() para que no distinga mayúsculas)
    if (filtro === '') {
        return notas;
    }
    
    let filtroLower = filtro.toLowerCase();
    return notas.filter(function(nota) {
        return nota.titulo.toLowerCase().includes(filtroLower) || 
               nota.contenido.toLowerCase().includes(filtroLower);
    });
}


// ────────────────────────────────────────────────────────────
//  borrarTodasLasNotas() — TODO HOMEWORK BONUS
// ────────────────────────────────────────────────────────────
function borrarTodasLasNotas() {
    // TODO — HOMEWORK BONUS
    // Vacía el array: notas = []
    // Llama a limpiarStorage() para borrar también de localStorage
    notas = [];
    limpiarStorage();
}


// ────────────────────────────────────────────────────────────
//  totalNotas() — DADA ✅
// ────────────────────────────────────────────────────────────
function totalNotas() {
    return notas.length;
}
