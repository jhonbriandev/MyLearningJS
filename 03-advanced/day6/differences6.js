// DIFERENCIA 6 — Mutabilidad y referencias

// Python — listas son mutables, pero la asignación crea nueva referencia
lista_a = [1, 2, 3]
lista_b = lista_a        // misma referencia
lista_b.append(4)
print(lista_a)           // [1, 2, 3, 4] — ambas apuntan al mismo objeto

lista_c = lista_a.copy() // copia — referencia diferente
lista_c.append(5)
print(lista_a)           // [1, 2, 3, 4] — no cambió
javascript// JavaScript — igual comportamiento con objetos y arrays
const arrayA = [1, 2, 3]
const arrayB = arrayA        // misma referencia
arrayB.push(4)
console.log(arrayA)          // [1, 2, 3, 4]

const arrayC = [...arrayA]   // spread — copia superficial
arrayC.push(5)
console.log(arrayA)          // [1, 2, 3, 4] — no cambió

// Con objetos
const objA = { nombre: "Jhon" }
const objB = objA
objB.nombre = "Ana"
console.log(objA.nombre)     // "Ana" — misma referencia

const objC = { ...objA }     // spread — copia superficial
objC.nombre = "Luis"
console.log(objA.nombre)     // "Ana" — no cambió

// La diferencia importante — copia profunda:

// Spread solo copia un nivel — copia superficial

const original = { 
    nombre: "Jhon", 
    direccion: { ciudad: "Lima" }  // objeto anidado
}

const copia = { ...original }
copia.direccion.ciudad = "Cusco"

console.log(original.direccion.ciudad)  // "Cusco" — cambió el original
// Porque direccion es una referencia y spread no la copió profundamente

// Copia profunda — para objetos anidados
const copiaProfunda = JSON.parse(JSON.stringify(original))
// o con structuredClone (moderno)
const copiaProfunda2 = structuredClone(original)