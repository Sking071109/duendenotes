// ============================================================
//  DuendeNotes — storage.js
//  M5L1 · JavaScript Bootcamp 2026
// ============================================================
//  Este archivo es el escudo contra el duende.
//  Aquí viven las dos funciones que convierten nuestros objetos
//  en texto (para guardarlos) y el texto de vuelta en objetos
//  (para recuperarlos). Sin esto, el duende se lleva todo al recargar.
// ============================================================


// La clave que usamos para identificar nuestros datos en localStorage.
// Es como la etiqueta en una caja del cuarto de archivo — si la cambias,
// localStorage no encuentra los datos anteriores.
let CLAVE_NOTAS = "duendeNotes_notas";


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 1 — guardarNotas(notas)
//
//  Recibe el array completo de notas y lo persiste en localStorage.
//  JSON.stringify convierte el array de objetos en un string de texto,
//  porque localStorage solo sabe guardar texto — no objetos ni arrays.
//
//  Sin esta función: al recargar la página, el duende gana.
//  Con esta función: los datos sobreviven al reload.
//
//  Pista: localStorage.setItem(clave, valor)
//         JSON.stringify(array) → convierte el array en texto
// ────────────────────────────────────────────────────────────
function guardarNotas(notas) {
    // TODO — una sola línea:
    // guarda en localStorage bajo CLAVE_NOTAS el array convertido a texto
    localStorage.setItem(CLAVE_NOTAS, JSON.stringify(notas));
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 2 — cargarNotas()
//
//  Lee el string guardado en localStorage y lo convierte de vuelta
//  a un array de objetos usando JSON.parse. Si no existe nada
//  (primera vez que el usuario entra), retorna un array vacío
//  para que el resto de la app arranque sin errores.
//
//  Pista: localStorage.getItem(clave) → devuelve el texto o null
//         JSON.parse(texto)           → convierte el texto de vuelta a array
// ────────────────────────────────────────────────────────────
function cargarNotas() {
    // TODO — Paso 1: lee el valor guardado con localStorage.getItem
    let datos = localStorage.getItem(CLAVE_NOTAS);

    // TODO — Paso 2: si datos es null (nunca se guardó nada), retorna []
    //               el duende no llegó todavía — arrancamos con un array limpio
    if (datos === null) {
        return [];
    }

    // TODO — Paso 3: si hay datos, conviértelos con JSON.parse y retórnalos
    //                JSON.parse hace el proceso inverso al stringify:
    //                '[{"id":1}]'  →  [{id:1}]
    return JSON.parse(datos);
}


// ────────────────────────────────────────────────────────────
//  limpiarStorage() — DADA ✅
//
//  Borra completamente la entrada de localStorage.
//  A diferencia de guardar un array vacío, removeItem
//  elimina la clave por completo — como si nunca hubiera existido.
// ────────────────────────────────────────────────────────────
function limpiarStorage() {
    localStorage.removeItem(CLAVE_NOTAS);
}
