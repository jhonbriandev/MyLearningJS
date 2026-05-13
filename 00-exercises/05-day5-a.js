// PARTE 3 — Promise.all
// 5. Simula cargar el dashboard de tu blog en paralelo:
//    - fetchPosts() → espera 800ms, retorna array de 3 posts
//    - fetchCategorias() → espera 600ms, retorna array de 2 categorías  
//    - fetchUsuarioActual() → espera 400ms, retorna objeto usuario
//    
//    Usa Promise.all para cargarlos todos en paralelo
//    Muestra cuánto tiempo tomó en total (usa Date.now())
//    Resultado esperado: ~800ms (el más lento), no 1800ms (suma)


// simula una petición que tarda 800ms (la más lenta, marca el tiempo total de Promise.all)
function obtenerPosts(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {                                          // espera 800ms antes de hacer el fetch
            fetch("http://127.0.0.1:8000/api/posts?limit=5")       // petición real a Django
                .then(response => response.json())                  // convertimos la respuesta a objeto JS
                .then(data => resolve({
                    data: data.results.slice(0, 3),                 // tomamos solo los primeros 3 posts
                    tiempo: Date.now()                              // timestamp de cuando llegaron
                }))
                .catch(error => reject(error))                      // si fetch falla, rechazamos la promesa
        }, 800)
    })
}

// simula una petición que tarda 600ms
function obtenerCategories(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {                                          // espera 600ms antes de hacer el fetch
            fetch("http://127.0.0.1:8000/api/categories/")
                .then(response => response.json())
                .then(data => resolve({
                    data: data.results.slice(0, 2),                 // tomamos solo las primeras 2 categorías
                    tiempo: Date.now()
                }))
                .catch(error => reject(error))
        }, 600)
    })
}

// simula una petición que tarda 400ms (la más rápida)
function obtenerMyUser(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {                                          // espera 400ms antes de hacer el fetch
            fetch("http://127.0.0.1:8000/api/commentaries/")
                .then(response => response.json())
                .then(data => resolve({
                    data: data.results.slice(0, 1),                 // tomamos solo el primer comentario
                    tiempo: Date.now()
                }))
                .catch(error => reject(error))
        }, 400)
    })
}

async function cargarBlog() {
    const inicio = Date.now()                                       // marcamos el inicio del cronómetro

    // Promise.all lanza las 3 peticiones al mismo tiempo
    // no espera que una termine para empezar la siguiente
    // el tiempo total será ~800ms (la más lenta) no 800+600+400=1800ms
    const [posts, categories, myUser] = await Promise.all([
        obtenerPosts(),       // 800ms
        obtenerCategories(),  // 600ms
        obtenerMyUser()       // 400ms
    ])

    console.log(`Tardó ${Date.now() - inicio}ms`)                   // → ~800ms + tiempo real del fetch
    console.log(posts.data)                                         // → array de 3 posts
    console.log(categories.data)                                    // → array de 2 categorías
    console.log(myUser.data)                                        // → array de 1 comentario
}

cargarBlog()



