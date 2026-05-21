
// 1. Concatena dos cadenas de texto

    let pais = "Peru"
    let ciudad = "Lima"

    console.log(pais + " " +ciudad)

// 2. Muestra la longitud de una cadena de texto

    console.log(pais.length)

// 3. Muestra el primer y último carácter de un string

    console.log(pais[0])
    console.log(pais[pais.length - 1]) // u

// 4. Convierte a mayúsculas y minúsculas un string

    console.log(pais.toUpperCase())
    console.log(pais.toLowerCase())

// 5. Crea una cadena de texto en varias líneas

    let variasLineas = (`No 
        molestar`)

    console.log(variasLineas)

// 6. Interpola el valor de una variable en un string

    let usuario = "Jhon"
    console.log(`Bienvenido al sistema ${usuario}`)

// 7. Reemplaza todos los espacios en blanco de un string por guiones

        let pruebas = "Cuanto tiempo"
        let pruebas2 = pruebas.replace(" ","")
        console.log(pruebas2)

// 8. Comprueba si una cadena de texto contiene una palabra concreta

        let mensaje = "Hola mensaje"
        console.log(mensaje.includes("Hola")) // true

// 9. Comprueba si dos strings son iguales

        let autor = "Javier"
        let productor = "Javier"

        console.log(autor === productor)

// 10. Comprueba si dos strings tienen la misma longitud

        productor = "Noel"
        console.log(autor.length === productor.length)