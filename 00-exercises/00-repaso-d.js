
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
        console.log("Usted no puede votar")
    }else{
        console.log("Numero incorrecto")
    }

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad 

    let comparacion = age >= 19 ? console.log("Es mayor de edad"): console.log("Es menor de edad")

// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"

    

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior

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

// 10. Usa un switch para hacer de nuevo el ejercicio 7