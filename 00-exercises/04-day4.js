// PARTE 1 — Closures
// 1. Crea una función crearMultiplicador(factor) que devuelva
//    una función que multiplique cualquier número por ese factor
//    Uso esperado:
//    const doble = crearMultiplicador(2)
//    const triple = crearMultiplicador(3)
//    doble(5)   // 10
//    triple(5)  // 15

 
const crearMultiplicador = function(factor) {
    // "factor" es el parámetro de la función exterior.
    // Cuando alguien llame crearMultiplicador(2), aquí adentro factor = 2.
    // Este valor queda "atrapado" en memoria para que la función interior lo recuerde.

    // En vez de hacer una operación directamente, devolvemos OTRA función.
    // Esta función interior es lo que se conoce como clausura (closure).
    return function(numero) {
        // "numero" es el parámetro de la función interior.
        // Llegará cuando alguien llame doble(5) → aquí numero = 5.

        // Multiplicamos el valor recibido (numero) por el valor recordado (factor).
        // "factor" no está definido aquí adentro, pero JavaScript lo busca
        // en la función exterior y lo encuentra: sigue siendo 2.
        return numero * factor
    }
    // En este momento crearMultiplicador termina su trabajo.
    // Pero la función interior que devolvió sigue viva, cargando factor consigo.
}

// Llamamos a crearMultiplicador con el valor 2.
// factor = 2 queda guardado dentro de la función interior.
// Esa función interior se guarda en la variable "doble".
// Ahora "doble" ES la función interior, lista para usarse.
const doble = crearMultiplicador(2)

// Llamamos a "doble" pasándole el número 5.
// Eso activa la función interior: numero = 5, factor = 2 (lo recuerda).
// Ejecuta: return 5 * 2 → devuelve 10.
// console.log muestra ese resultado en consola.
console.log(doble(5)) // → 10

/* ---------------------------------------------------------------------------------- */


// 2. Crea una función crearPila() que devuelva un objeto con
//    tres métodos: push(item), pop() y verTodo()
//    La pila interna no debe ser accesible desde afuera
//    Uso esperado:
//    const pila = crearPila()
//    pila.push("Python")
//    pila.push("Django")
//    pila.pop()      // "Django"
//    pila.verTodo()  // ["Python"]

// Creamos la función que va a fabricar nuestra pila
function crearPila() {

    // Este array vive DENTRO de crearPila, por eso nadie
    // de afuera puede tocarlo directamente. Es el "dato privado".
    const elementos = []

    // Devolvemos un objeto con tres métodos.
    // Cada método es una función que recuerda "elementos"
    // gracias al closure — igual que crearMultiplicador recordaba "factor".
    return {

        // Agrega un item al final del array interno
        push: function(item) {
            elementos.push(item)
        },

        // Saca y devuelve el último item del array interno
        // (pop() de los arrays ya hace esto solo)
        pop: function() {
            return elementos.pop()
        },

        // Devuelve una copia del array para que puedas verlo,
        // pero sin exponer el original
        verTodo: function() {
            return [...elementos]
        }
    }
}

const pila = crearPila()

pila.push("Python")
pila.push("Django")

console.log(pila.pop())     // → "Django"
console.log(pila.verTodo()) // → ["Python"]

// Intentar acceder a elementos directamente no funciona:
console.log(pila.elementos) // → undefined  ✓ está protegido

/* ---------------------------------------------------------------------------------- */

// PARTE 2 — Módulos
// Crea estos tres archivos y conéctalos:

// archivo: models/Post.js
// - Clase Post con constructor(titulo, autor, categoria)
// - estado inicial: "borrador", vistas: 0
// - método publicar()
// - getter resumen
// - Export default

// archivo: utils/posts.js
// - Función filtrarPublicados(posts) — recibe array, devuelve solo publicados
// - Función ordenarPorVistas(posts) — devuelve ordenados de mayor a menor
// - Función calcularTotalVistas(posts) — devuelve número total
// - Named exports

// archivo: main.js
// - Importa Post y las tres utilidades
// - Crea 4 posts, publica 2 de ellos
// - Usa las tres utilidades y muestra los resultados en consola

console.log("SE HIZO EL EJERCICIO EN MODULES/MAIN.JS")

// PARTE 3 — Identificar hoisting
// ¿Qué imprime cada uno? Razona antes de ejecutar:

// Caso A:
console.log(x)
var x = 5
// esto es hoisting imprimira undefined

// Caso B:
console.log(y)
let y = 5
// let SÍ hace hoisting, pero cae en la "zona muerta temporal".
// No se puede acceder antes de su declaración → ReferenceError

// Caso C:
saludar()
function saludar() { console.log("Hola") }
// Esto si se puede realizar, hoisting con fuciones es posible

// Caso D:
despedir()
const despedir = () => console.log("Adiós")
// Esto no es posible, arrow functions no pueden realizar hoisting