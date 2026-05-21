
// if/else/else if/ternaria

// 1. Imprime por consola tu nombre si una variable toma su valor

    let nombre = "Jhon"

    if (nombre === "Jhon"){
        console.log("Bienvenido estas validado",nombre)
    }

// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos

    let usuario = "fabi"
    let password = 1234

    if (usuario === "fabi" && password === 1234){
        console.log("Usuario autenticado, puede ingresar")
    }

// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje

    let number = 0

    if (number > 0){
        console.log("Este numero es positivo mayor a cero")
    }else if(number < 0){
        console.log("Este numero es negativo, menor a cero")
    }else{
        console.log("Este numero es 0")
    }

// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan

    let age = 19

    if ( age <= 120  && age >= 18){
        console.log("Usted puede votar")
    }else if(age > 0 && age < 18){
        console.log(`Te faltan ${18 - age} años para votar`)
    }else{
        console.log("Numero incorrecto")
    }

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad 

    let comparacion = age >= 19 ? "adulto": "menor"
    console.log(comparacion)

// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"

    let mes = "noviembre"

    if(mes === "marzo"|| mes === "abril"|| mes ==="mayo")
        console.log("Estamos en otoño")
    else if(mes === "junio"|| mes === "julio"|| mes ==="agosto")
        console.log("Estamos en invierno")
    else if(mes ==="setiembre"|| mes === "octubre"|| mes === "noviembre")
        console.log("Estas en primavera")
    else{
        console.log("Estas en verano")
    }

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior

    if(mes === "enero" || mes === "marzo"|| mes === "mayo"|| mes === "julio"|| mes === "agosto"|| mes === "octubre"|| mes === "diciembre")
        console.log("Tu mes tiene 31 dias")
    else if(mes === "abril"|| mes === "junio"|| mes === "setiembre"|| mes === "noviembre")
        console.log("Tu mes tiene 30 dias")
    else{
        console.log("Tu mes tiene solo 28 dias")
    }

// switch

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma

    let language = "espanol"

    switch(language){
        
        case "espanol":
            console.log("Hola")
            break;
        case "ingles":
            console.log("Hi")
    }

// 9. Usa un switch para hacer de nuevo el ejercicio 6

let mes2 = "febrero"

switch (mes2) {

    case "marzo":
    case "abril":
    case "mayo":
        console.log("Estas en otoño")
        break

    case "junio":
    case "julio":
    case "agosto":
        console.log("Estas en invierno")
        break

    case "setiembre":
    case "octubre":
    case "noviembre":
        console.log("Estamos en primavera")
        break

    case "diciembre":
    case "enero":
    case "febrero":
        console.log("Estamos en verano")
        break

    default:
        console.log("Mes no válido")
}
// 10. Usa un switch para hacer de nuevo el ejercicio 7

    switch(mes){

        case "enero":
        case  "marzo":
        case "mayo":
        case "julio":
        case "agosto":
        case "octubre":
        case "diciembre":
            console.log("Tu mes tiene 31 dias",mes)
            break;
        case "abril":
        case "junio":
        case "setiembre":
        case "noviembre":
            console.log("Tu mes tiene 30 dias",mes)
            break;
        case "febrero":
            console.log("Tu mes tiene 28 dias JJIJIJA",mes)
            break;
    }

    