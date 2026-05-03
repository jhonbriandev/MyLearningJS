// Las variables podrian cambiar de valor al reasignarse, ej:

let name = "Jhon";
console.log(name);
name = "Karl";
console.log(name);

// Si necesitamos que no cambien, y siempre sean fijas usaremos CONST
// CONST para datos que no cambiaran, son constantes
const fruit = "apple";
console.log(fruit);
// Esta linea genera error, por que no podemos reasignar en un const
fruit = "orange";
console.log(name);