// CALLBACK

// Existe para controlar cuándo ejecutar algo

function procesar(callback) { // recibe una función como parámetro, la llamamos "callback"

    console.log("Procesando...");

    callback(); // ejecutamos la función que nos pasaron como parámetro
    // en este punto ya corrió el console.log de arriba
}

procesar(function () {  // le pasamos una función anónima como argumento
    // adentro de procesar, esta función será el "callback"
    // esta función anónima se convierte en el callback. 
    // El nombre callback es solo el alias que usa la función procesar internamente.
    console.log("Terminó");
});



// Simulación de operación asíncrona con setTimeout
function obtenerUsuario(id, callback) {  
    setTimeout(() => {                          // Recordar que (() => {} , 100)
                                                // el primer parámetro es la funcion anonima y el segundo es el numero
        const usuario = { id, nombre: "Jhon" }
        callback(usuario)
    }, 1000)
}
// forma larga — guardas la función en una variable
// function obtenerUsuario(id, callback) {       // función principal, recibe un dato y una función
//     setTimeout(function () {                   // función anónima que se ejecutará después de 1 segundo
//         const usuario = { id, nombre: "Jhon" } // creamos el objeto con los datos del usuario
//         callback(usuario)                     // le entregamos el objeto al callback
//     }, 1000)                                  // espera 1000ms (1 segundo) antes de ejecutar lo de arriba
// }

// obtenerUsuario(5, function (usuario) {         // llamamos la función, le pasamos el id y el callback
//     console.log(usuario)                      // cuando callback se ejecute, mostramos el resultado
//     // → { id: 5, nombre: "Jhon" }
// })

obtenerUsuario(1, (usuario) => {
    console.log(usuario.nombre," Respuesta del callback no confundir")  // "Jhon" después de 1 segundo
})

// El problema de callbacks  aparece cuando necesitas encadenar operaciones asíncronas,
// Esto se llama callback hell o "pyramid of doom". Las Promises resuelven exactamente este problema.

/* ---------------------------------------------------------------------------------- */

// PROMISES 
// Una Promise es un objeto que representa una operación asíncrona que puede terminar en el futuro. Tiene tres estados posibles:
// PENDING   → la operación está en curso
// FULFILLED → la operación terminó con éxito (resolve)
// REJECTED  → la operación falló (reject)

const miPromesa = new Promise((resolve, reject) => {   // Promise recibe una función con dos parámetros:
                                                        // resolve (salió bien) y reject (salió mal)
                                                        // No son parametros que esperan datos sino propios de JS
    setTimeout(() => {                                  // esperamos 2 segundos antes de ejecutar
        const exito = true                              // simulamos si la operación fue exitosa o no
        
        if (exito) {
            resolve({ id: 1, nombre: "Paul" })          // enviamos el objeto hacia el .then
        } else {
            reject(new Error("No se encontró el usuario")) // enviamos el error hacia el .catch
        }
    }, 2000)                                            // 2000ms = 2 segundos de espera
})

miPromesa
    .then((usuario) => {                                // usuario recibe lo que resolve() envió
                                                        // usuario = { id: 1, nombre: "Paul" }
        console.log(`Usuario encontrado: ${usuario.nombre}`) // accedemos a la propiedad nombre
        return usuario.id                               // retornamos el id para el siguiente .then
    })
    .then((id) => {                                     // id recibe el valor retornado del .then anterior
                                                        // id = 1
        console.log(`ID del usuario: ${id}`)            // imprimimos el id
    })
    .catch((error) => {                                 // se ejecuta si reject() fue llamado
                                                        // error recibe lo que reject() envió
        console.log(`Error: ${error.message}`)          // .message extrae el texto del Error
    })
    .finally(() => {                                    // se ejecuta siempre, haya éxito o error
        console.log("Operación terminada")
    })




const verificarEdad = new Promise((resolve, reject) => {  // Promise recibe resolve y reject
    const edad = 20                                        // dato que vamos a verificar

    if (edad >= 18) {
        resolve("Acceso permitido")                        // enviamos un mensaje hacia el .then
    } else {
        reject(new Error("Eres menor de edad"))            // enviamos el error hacia el .catch
    }
})

verificarEdad
    .then((mensaje) => {                                   // mensaje recibe lo que resolve() envió
                                                           // mensaje = "Acceso permitido"
        console.log(mensaje)                               // → "Acceso permitido"
        return "Bienvenido al sistema"                     // retornamos para el siguiente .then
    })
    .then((bienvenida) => {                                // bienvenida recibe el return anterior
        console.log(bienvenida)                            // → "Bienvenido al sistema"
    })
    .catch((error) => {                                    // se ejecuta si reject() fue llamado
        console.log(error.message)                         // → "Eres menor de edad"
    })
    .finally(() => {                                       // se ejecuta siempre
        console.log("Verificación terminada")              // → "Verificación terminada"
    })

//     ¿Por qué esto es mejor que callbacks?

// Porque:

// evita anidación extrema
// código más limpio
// errores centralizados
// mejor mantenimiento