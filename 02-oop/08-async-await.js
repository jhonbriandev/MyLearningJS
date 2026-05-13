// ASYNC/AWAIT — la forma moderna y más clara de manejar promesas
// está construido sobre promesas, no es algo completamente nuevo

// "await" pausa la ejecución de la función donde está escrito
// hasta que la promesa termine (resolve o reject)

// mientras espera, JavaScript NO se bloquea
// puede seguir ejecutando otras cosas fuera de esta función

function obtenerDatos() {                        // función que devuelve una promesa
    return new Promise((resolve) => {            // solo usamos resolve, no hay error posible en este ej.
        setTimeout(() => {                       // esperamos 3 segundos antes de ejecutar
            resolve("Datos recibidos")           // enviamos el mensaje hacia quien nos consuma
        }, 3000)                                 // 3000ms = 3 segundos de espera
    })
}

// USANDO ASYNC AWAIT
async function mostrarDatos() {                  // async indica que esta función maneja promesas
    const datos = await obtenerDatos()           // await pausa esta función hasta que la promesa termine
                                                 // datos = "Datos recibidos"
    console.log(datos)                           // → "Datos recibidos"
}

mostrarDatos()                                   // ejecutamos la versión async/await

// USANDO PROMISES
function mostrarDatosPromises() {                // misma lógica pero con sintaxis de promesas
    obtenerDatos()                               // llamamos la función, nos devuelve una promesa
        .then((datos) => {                       // datos recibe lo que resolve() envió
                                                 // datos = "Datos recibidos"
            console.log(datos)                   // → "Datos recibidos"
        })
}

mostrarDatosPromises()                           // ejecutamos la versión con promesas

/* ---------------------------------------------------------------------------------- */

// 1. async convierte la función en una que siempre retorna una Promise
//    aunque adentro retornes un valor normal como "Hola"
async function saludar() {
    return "Hola"
}
// saludar() no retorna "Hola" directamente
// retorna una promesa que CONTIENE "Hola"
// para obtener "Hola" necesitas: await saludar() o .then()

// 2. await solo funciona DENTRO de una función marcada con async
//    si lo usas afuera, JavaScript lanza un error de sintaxis
async function obtenerUsuario() {
    const usuario = await fetchUsuario()  // ✅ dentro de async, funciona
    return usuario
}
//const usuario = await fetchUsuario()  // ❌ fuera de async, error de sintaxis

// 3. await pausa SOLO la función donde está escrito
//    el resto del programa sigue ejecutándose normalmente
async function fetchDatos() {
    // Simulamos una petición que tarda 4 segundos
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Datos obtenidos correctamente")
        }, 4000)
    })
}

async function cargarDatos() {
    console.log("Iniciando...")
    const datos = await fetchDatos()  // pausa aquí dentro, pero afuera el programa sigue
    console.log("Datos recibidos desde el fetchDatos")    // esto se ejecuta cuando la promesa termina
    return datos
    
}
cargarDatos()
console.log("Esto se ejecuta ANTES de que los datos lleguen") // ← el programa no esperó

