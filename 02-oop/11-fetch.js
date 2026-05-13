// FETCH
// fetch() es una función moderna de JavaScript que permite hacer peticiones HTTP
// siempre devuelve una promesa, por eso se usa con .then() o async/await
// IMPORTANTE: antes simulamos promesas con setTimeout, aquí los datos vienen de internet
// ya no necesitamos crear la promesa manualmente, fetch la trae incluida

// ── forma clásica con .then ──────────────────────────────────────────

function obtenerPosts() {                                    // función que agrupa la petición
    fetch("http://127.0.0.1:8000/api/posts/")               // fetch devuelve una promesa
        .then(response => response.json())                   // abrimos la respuesta y la convertimos a objeto JS
                                                             // sin esto los datos llegan como texto crudo
        .then(data => {                                      // data recibe el objeto JS listo para usar
            console.log(data)                                // → array de posts
        })
        .catch(error => {                                    // capturamos cualquier error de red
            console.log(error.message)
        })
}

obtenerPosts()                                               // ejecutamos la función

// ── forma moderna con async/await ────────────────────────────────────

async function obtenerPostsBlog() {
    const response = await fetch("http://127.0.0.1:8000/api/posts/normas-comunitarias/") // esperamos que el servidor responda
                                                             // response = la respuesta cruda del servidor
    const data = await response.json()                       // esperamos convertir la respuesta a objeto JS
                                                             // data = array de posts listo para usar
    console.log(data)                                        // → array de posts
}

obtenerPostsBlog()                                           // ejecutamos la función


// IMPORTANCIA DEL USO CON TRY Y CATCH 

// Fetch SOLO entra en catch si:

// no hay internet, falla la red, servidor caído.
// Pero NO entra por:
// 404, 500, 403
// Entonces validamos con response.ok

async function obtenerCategories() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/categories/"
        );

        if (!response.ok) {                            // Gracias a esto podremos ver errores 404...
            throw new Error("Error al obtener Categorias");
        }

        const data = await response.json();

        console.log(data);

    } catch(error) {

        console.log("Ocurrió un error");
        console.log(error);

    }
}

obtenerCategories()