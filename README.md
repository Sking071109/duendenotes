# 🧙 DuendeNotes — Ejercicio en Clase
### M5L1 · JSON y Memoria Persistente

---

## El cliente tiene un problema

**GoblinSoft Studios** nos contrató para salvar su app de notas interna.
El equipo de diseño dejó todo listo: el HTML, el CSS, los modales, la explosión.
Pero nadie implementó la lógica de guardado — y cada vez que alguien recarga la página, el duende se lleva todas las notas.

El Tech Lead dejó cuatro tickets abiertos. Son tuyos.

---

## Tickets

### 🎫 TICKET 1 — `guardarNotas(notas)` · `storage.js`

Convierte el array en texto y guárdalo en `localStorage`.

```
localStorage.setItem(clave, valor)
JSON.stringify(array)  →  "[{...}, {...}]"
```

> Después de implementarlo: abre DevTools → Application → Local Storage y comprueba que el texto aparece cada vez que guardas una nota.

---

### 🎫 TICKET 2 — `cargarNotas()` · `storage.js`

Lee el texto guardado y conviértelo de vuelta a un array. Si no existe nada todavía, retorna `[]`.

```
localStorage.getItem(clave)  →  texto guardado o null
JSON.parse(texto)            →  array de objetos
```

> `getItem` devuelve `null` cuando la clave no existe. Verifica eso antes de llamar a `JSON.parse` — parsear `null` no da un array vacío.

---

### 🎫 TICKET 3 — `crearNota(titulo, contenido)` · `notas.js`

Construye el objeto nota, agrégalo al array y persístelo. Sigue este orden:

1. Crea el objeto con `id`, `titulo`, `contenido`, `fecha` y `favorita: false`
2. Agrega al inicio del array con `notas.unshift(nota)`
3. Llama a `guardarNotas(notas)`
4. Retorna la nota

```
Date.now()  →  número único de milisegundos, perfecto como id
```

---

### 🎫 TICKET 4 — Handler del botón `[ GUARDAR ]` · `app.js`

Conecta el formulario del modal con la lógica. Seis pasos en orden:

1. Lee `inputTitulo.value.trim()` y `inputContenido.value.trim()`
2. Si `titulo` está vacío → `mostrarFeedback(...)` + `return`
3. Si `contenido` está vacío → `mostrarFeedback(...)` + `return`
4. Llama a `crearNota(titulo, contenido)`
5. Llama a `cerrarModalCrear()`
6. Llama a `refrescarVista()`

---

### 🔥 BONUS — Estado vacío del duende · `ui.js`

Cuando no hay notas, la pantalla queda en blanco. Poco goblin.

Dentro del `if (notasFiltradas.length === 0)` en `renderizarNotas`:

1. Crea un `div` con `document.createElement('div')`
2. Asígnale la clase `"estado-vacio"`
3. Pon dentro la imagen `duende_duerme.webp`, el título `SIN_NOTAS.txt` y el subtítulo
4. Agrégalo al contenedor con `appendChild`

> El `return` ya está puesto — no lo borres.

---

## Estado esperado al terminar

Creas una nota → aparece en pantalla → recargas → sigue ahí. El duende perdió.
