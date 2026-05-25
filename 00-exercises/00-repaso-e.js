// 1. Crea un array que almacene cinco animales

let myAnimals = ["ave","vaca","pez","oso","aguila"]
console.log(myAnimals)

// 2. Añade dos más. Uno al principio y otro al final

myAnimals.push("sapo")
console.log(myAnimals)
myAnimals.unshift("caballo")
console.log(myAnimals)

// 3. Elimina el que se encuentra en tercera posición

myAnimals.splice(2,1)
console.log(myAnimals)


// 4. Crea un set que almacene cinco libros

let mySet = new Set(["exodos","mandamientos","coran","genesis","proverbios"])
console.log(mySet)

// 5. Añade dos más. Uno de ellos repetido

mySet.add("san mateo")
mySet.add("san mateo")
console.log(mySet)

// 6. Elimina uno concreto a tu elección

mySet.delete("san mateo")
console.log(mySet)

// 7. Crea un mapa que asocie el número del mes a su nombre

let meses = new Map([
    [1, "enero"],
    [2, "febrero"],
    [3, "marzo"]
])

console.log(meses)


// 8. Comprueba si el mes número 5 existe en el map e imprime su valor

console.log(meses.has(5))

// 9. Añade al mapa una clave con un array que almacene los meses de verano

meses.set(4,{verano : ["enero","febrero","marzo"]})
console.log(meses)

// 10. Crea un Array, transfórmalo a un Set y almacénalo en un Map

let myArray9 = ["pila"]
console.log(myArray9)

let mySet9 = new Set(myArray9)
console.log(mySet9)

let myMap9 = new Map([
    ["datos", mySet9]
])
console.log(myMap9)
