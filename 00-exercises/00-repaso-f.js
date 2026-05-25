// 1. Crea un bucle que imprima los números del 1 al 20

let i = 0
    while(i < 20){
        i++
        console.log(i)
    }
 
// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado

console.log("Ejercicio 2")

let contador = 0
let f = 0

    while(f < 100){
        f++
        contador = contador + f
    }

console.log(contador)
// 3. Crea un bucle que imprima todos los números pares entre 1 y 50

console.log("Ejercicio 3")
let pares = 0

    while(pares < 50){
        pares = pares +2
        console.log(pares)

    }
// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola

let myArray = ["Jhon","Carla","Sofia"]
 
for (let k of myArray){
    console.log(k)
}

// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto

let cadena = "Hola amigos"

for (let v of cadena){
    if (cadena.includes("a,e,i,o,u")){
        console.log(cadena)
}
}

// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto

// 7. Escribe un bucle que imprima la tabla de multiplicar del 5

// 8. Usa un bucle para invertir una cadena de texto

// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci

// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10