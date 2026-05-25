// SETS

// Para crear usar new set()

let mySet = new Set()
console.log(mySet)

//Pero para crear y declarar usar ademas los corchetes

let mySet2 = new Set(["Jhon","Developer",22])
console.log(mySet2)

// Metodos comunes

// Add -> agrega elementos al final

mySet2.add("Bienvenido a los set")
console.log(mySet2)

// Delete -> Borra elementos, pero darle el valor, no indice

mySet2.delete("Jhon")
console.log(mySet2)

console.log("No se puede indexar [2] como las listas o arrays")

// Has
// Indica si tiene o no el elemento
console.log(mySet2.has(22))
console.log(mySet2.has("Jhon")) // No porque ya lo borramos

// Convertir Set a Array

let myNewArray = Array.from(mySet2)
console.log(myNewArray)

// Convertir Array a Set

let myNewSet = new Set(myNewArray)
console.log(myNewSet)

// No admite duplicidad

//Solo puede existir un elemento unico

mySet2.add("Jhon")
mySet2.add("Jhon")
mySet2.add("Jhon")
mySet2.add("Jhon")
console.log(mySet2)

