typeof "Hola"
typeof 'Alo'
typeof 12
typeof 12.2
typeof 1222-1
typeof true
typeof undefined
typeof null
typeof {}     
typeof []           
typeof function(){}

// Imprimir

console.log(typeof("Hola")); // String
console.log(typeof('Alo')); // String
console.log(typeof(12)); // Entero es number en JS
console.log(typeof(12.2)); // Float tambien es number en JS
console.log(typeof(1222-1)); // Number
console.log(typeof(true)); // Boolean
console.log(typeof(undefined));  // No definido, existe pero no tenemos su definicion
console.log(typeof(null)); // Deberia ser nulo pero en JS es objeto
console.log(typeof({})); // Tambien son objetos
console.log(typeof([])); // "object"  ← los arrays también son objects
console.log(typeof(function(){})); // ESTO ES UNA FUNCION

// EJEMPLO UNDEFINED

let pencil; // No hay asignacion, simplemente hay declaracion
console.log(pencil);