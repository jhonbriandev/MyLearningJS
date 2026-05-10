// SCOPE GLOBAL — accesible desde cualquier lugar
const appNombre = "Mi Blog"

function mostrarApp() {
    console.log(appNombre)  // accesible
}
mostrarApp()

// SCOPE DE FUNCIÓN — solo vive dentro de la función
function calcular() {
    const resultado = 42
    console.log(resultado)  // accesible
}
calcular()

// console.log(resultado)  // ReferenceError — no existe aquí

// SCOPE DE BLOQUE — solo vive dentro del bloque {} (con let y const)
if (true) {
    let mensaje = "hola"
    const saludo = "hey"
    var viejo = "soy var"  // var NO respeta el bloque
    console.log(mensaje)  // Si se llama aca si funcionan pero afuera no
    console.log(saludo)   // Si se llama aca si funcionan pero afuera no
}
// console.log(mensaje)  // ReferenceError
// console.log(saludo)   // ReferenceError
console.log(viejo)    // "soy var" — var se escapa del bloque

/* ---------------------------------------------------------------------------------- */

// HOISTING

// Hoisting significa que JavaScript "sube" las declaraciones al inicio de su scope 
// antes de ejecutar el código. No el valor, solo la declaración.
// Por lo cual no dara error sino undefined

console.log(miVar) // Var permite imprimir antes de declarar, aunque mostrara indefinido pero si existente
var miVar = "Caracol"
//console.log(miVar)

console.log(miConst) // Const no permite este comportamiento y lanzara error Temporal Dead Zone
const miConst = "Oso"

// Con funciones

// Esto funciona en JS
saludar()  //  Imprime "Hola" — la función completa sube

function saludar() {
    console.log("Hola")
}

// Pero esto NO funciona
despedir()  // TypeError — solo la declaración sube, no el valor
var despedir = () => console.log("Adios")

// Lo que sucede con este comportamiento es que si se elevara la funcion porque usamos var
// Esto dara el valor de undefined pero undefined(); NO ES ALGO VALIDO y entonces llega el error
