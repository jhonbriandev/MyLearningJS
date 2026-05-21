// 1. Variables para operaciones aritméticas

let a = 2
let b = 4

let suma = a + b
let resta = a - b
let multiplicar = a * b
let dividir = a / b
let modulo = a % b
let exponente = a ** b


// 2. Operaciones de asignación y comparación

const resultado2 = "6"
const resultado3 = 6

console.log(resultado2 == suma)   // true
console.log(resultado3 === suma)  // true

const resultado4 = ++suma // suma ahora vale 7
const resultado5 = --suma // suma vuelve a 6

console.log(resultado4)
console.log(resultado5)


// 3. Comparaciones verdaderas

console.log(a < b)          // true
console.log(b > a)          // true
console.log(a == "2")       // true
console.log(a === 2)        // true
console.log(a < b || a > b) // true


// 4. Comparaciones falsas

console.log(a > b)          // false
console.log(b < a)          // false
console.log(a === "2")      // false
console.log(a != 2)         // false
console.log(!(a < b))       // false


// 5. Operador AND

console.log(a > 1 && b > 2) // true


// 6. Operador OR

console.log(a > 1 || b == 2) // true


// 7. Combinar operadores lógicos

console.log((a > 1 || b == 2) && (a == 2)) // true


// 8. Negación lógica

console.log((a > 1 || b == 2) && !(a == 3)) // true


// 9. Operador ternario

const ternario = a === 2
    ? "La variable A vale 2"
    : "La variable A no vale 2"

console.log(ternario)


// 10. Combinar aritméticos, comparación y lógica

const granOperacion = suma + resta // 6 + (-2) = 4

let granNegacion = !(granOperacion == 4) // false

let granComparacion = b > a // true

console.log(
    "Resultado:",
    (granOperacion == granComparacion) || (granNegacion == false)
)
    // false || true = true
    // la primera comparacion es F pero la segunda es V, porque grannegacion es F,
    // Por logica entonces V OR F, resulta en V, que es TRUE