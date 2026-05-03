// In python, [] es una lista
// In Javascript, [] es un objeto para ser mas especifico es un ARRAY

console.log(typeof([]));  // Objeto en JS

// In python, == es una igualdad comparativa, diferencia entre tipos, ej:
// 19 == age, donde previamente se ha definido a age = 100
// In Javascript  == es una igualdad comparativa pero no diferencia entre tipos, ej:
0 == "0"
console.log(0 == "0") // Nos indicara True

// EN EL CASO QUE SI QUEREMOS SER ESTRICTOS CON LAS IGUALDADES
// USEMOS ===

0 === "0"
console.log(0 ==="0") // Nos indicara FALSE

1 === 1
console.log(1 === 1) // Nos indicara TRUE

// Y ADEMAS PARA LAS DESIGUALDADES
// USAMOS !==, TAMBIEN ES ESTRICTO

0 !== "0"
console.log(0 !=="0") // Nos indicara TRUE

// ASI QUE EN JAVASCRIPT SE RECOMIENDA USAR ===  Y  !==