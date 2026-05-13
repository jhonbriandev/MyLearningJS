// MANEJO DE ERRORES con try/catch

// USANDO ASYNC
async function fetchDatos() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            reject("Error al obtener datos")

        }, 2000)

    })
}

async function cargarDatos() {

    try {

        console.log("Cargando datos...")

        const datos = await fetchDatos()

        console.log(datos)

    } catch(error) {

        console.log("Ocurrió un error:")
        console.log(error)

    }
}

cargarDatos()

// USANDO PROMISES
function fetchDatos() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            reject("Error al obtener datos")

        }, 2000)

    })
}

console.log("Iniciando...")

fetchDatos()

    .then((datos) => {

        console.log(datos)

    })

    .catch((error) => {

        console.log("Ocurrió un error:")
        console.log(error)

    })

/* ---------------------------------------------------------------------------------- */

async function obtenerUsuario() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("Usuario encontrado")

        }, 2000)

    })
}

async function mostrarUsuario() {

    try {

        console.log("Buscando SEGUNDO usuario...")

        const usuario = await obtenerUsuario()

        console.log("ÉXITO:")
        console.log(usuario)

    } catch(error) {

        console.log("ERROR:")
        console.log(error)

    }
}

mostrarUsuario()

/* ---------------------------------------------------------------------------------- */


async function verificarStock(producto) {

    // Creamos una promesa
    return new Promise((resolve, reject) => {

        const stockDisponible = false

        // Simulamos espera de 2 segundos
        setTimeout(() => {

            // Si hay stock
            if (stockDisponible) {
                resolve(`El producto ${producto} está disponible`)
            }

            // Si no hay stock
            else {
                reject(`El producto ${producto} está agotado`)
            }

        }, 2000)

    })
}

async function realizarCompra() {

    try {

        console.log("Verificando stock...")

        // Espera la respuesta
        const respuesta = await verificarStock("Laptop")

        // Se ejecuta si todo sale bien
        console.log(respuesta)

    } catch (error) {

        // Se ejecuta si ocurre un error
        console.log("No se pudo realizar la compra")
        console.log(error)

    }
}

// Ejecutamos la función
realizarCompra()