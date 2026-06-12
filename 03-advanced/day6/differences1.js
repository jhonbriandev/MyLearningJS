// DIFERENCIAS ENTRE JAVASCRIPT Y PYTHON

// Python — tipado dinámico y fuerte
edad = 25
edad = "veinticinco"  // válido — puedes cambiar el tipo
print(edad + 1)       // TypeError — no suma string con número
                      // Python no convierte automáticamente

// JavaScript — tipado dinámico y DÉBIL
let edad = 25
edad = "veinticinco"  // válido — igual que Python
console.log(edad + 1) // "veinticinco1" — JS convierte automáticamente
                      // concatenó en lugar de sumar

// Ejemplos de coerción en JS — algunos sorprendentes
//Esta diferencia se llama coerción de tipos — JavaScript intenta adivinar qué 
// queremos hacer cuando mezclamos tipos. 
// Python no lo hace, lanza un error directamente

"5" + 3         // "53"  — convierte 3 a string
"5" - 3         // 2     — convierte "5" a número
"5" * "3"       // 15    — convierte ambos a número
true + 1        // 2     — true es 1
false + 1       // 1     — false es 0
null + 1        // 1     — null es 0
undefined + 1   // NaN   — undefined no se puede convertir
[] + []         // ""    — dos arrays vacíos dan string vacío
[] + {}         // "[object Object]"
{} + []         // 0     — este es el más confuso de todos

//Por eso existe === en JavaScript — para comparar sin coerción. En Python el == siempre compara valor 
// y tipo, por eso no necesita ===.
 
// // La regla práctica
0 == false    // true  — con coerción
0 === false   // false — sin coerción, tipos distintos

// Siempre usar === en JavaScript

