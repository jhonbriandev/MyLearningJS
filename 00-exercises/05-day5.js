// PARTE 1 — Promises básicas
// 1. Crea una función esperar(ms) que retorne una Promise
//    que se resuelva después de ms milisegundos
//    Uso: await esperar(1000) — pausa 1 segundo

function promisesBasica(){
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            const aceptar = true
            if(aceptar == true){
                resolve("Bienvenido")
            }else{
                reject(new Error("Rechazado"))
            }
        },1000) 
    })
}

async function mostrarBasica(params) {
    try{
        const estado = await promisesBasica()
        console.log(estado)
    }catch(error){
        console.log(error)
        console.log(error.message) // Para ver solo el mensaje del error
    }
    
}

mostrarBasica()

// 2. Crea una función fetchSimulado(url) que:
//    - Espere 500ms (usa tu función esperar)
//    - Si url incluye "error", rechace con Error("URL inválida")
//    - Si no, resuelva con { url, data: "datos de prueba", timestamp: Date.now() }

function esperar(ms){
    return new Promise ((resolve,reject) => {
        setTimeout(resolve,ms);
    })
}
// reject no va en setTimeout porque esperar es una función que siempre sale bien — no hay razón para rechazarla
async function fetchSimulado(url) {                    // recibe la url como parámetro
    await esperar(500)                                 // espera 500ms antes de continuar

    if (url.includes("error")) {                       // verificamos si la url contiene "error"
        throw new Error("URL inválida")                // rechazamos con un error
    }

    return {                                           // si no hay error, devolvemos el objeto
        url,                                           // la url que nos pasaron
        data: "datos de prueba",                       // dato simulado
        timestamp: Date.now()                          // fecha/hora actual
    }
}

// prueba con url válida
fetchSimulado("http://exito/api/posts")
    .then((resultado) => {
        console.log(resultado)                         // → { url, data: "datos de prueba", timestamp: ... }
    })
    .catch((error) => {
        console.log(error.message)
    })

// prueba con url inválida
fetchSimulado("http://error/api/posts")
    .then((resultado) => {
        console.log(resultado)
    })
    .catch((error) => {
        console.log(error.message)                     // → "URL inválida"
    })


// PARTE 2 — async/await con manejo de errores
// 3. Crea una función cargarRecurso(url) con async/await que:
//    - Use fetchSimulado
//    - Maneje el error correctamente con try/catch
//    - En el finally muestre "Petición a [url] completada"
//    - Retorne los datos o null si hubo error

async function cargarCategorias(url) {
    try {
        console.log("Cargando las Categorias")
        const data = await fetchSimulado(url)      // esperamos la respuesta de fetchSimulado
        console.log(data)
        return data                                // retornamos los datos hacia quien nos llame

    } catch(error) {
        console.log(error.message)                 // mostramos el mensaje del error
        return null                                // retornamos null si hubo error

    } finally {
        console.log(`Petición a ${url} completada`) // se ejecuta siempre, haya éxito o error
    }
}

async function main() {   
    // igual que Python: resultado = obtener_datos() → print(resultado)
    // en JS:            resultado = await obtenerDatos() → console.log(resultado)
    // await espera que la promesa termine y guarda el return en la variable                        
    const resultadoExito = await cargarCategorias("http://exito/api/categories/")
    console.log(resultadoExito)                    // → { url, data, timestamp }

    const resultadoError = await cargarCategorias("http://error/api/categories/")
    console.log(resultadoError)                    // → null
}

main()                                             // ejecutamos la función principal

// 4. Prueba con:
//    cargarRecurso("/api/posts/")    // debe funcionar
//    cargarRecurso("/api/error/")    // debe manejar el error

