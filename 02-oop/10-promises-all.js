// PROMISE.ALL — ejecutar múltiples Promises en paralelo
// Cuando necesitas varios datos independientes, no tiene sentido esperarlos uno por uno:

// MAL — secuencial, espera cada uno antes del siguiente
async function cargarDashboard() {
    const usuario = await fetchUsuario()      // espera 1 seg
    const posts = await fetchPosts()          // espera 1 seg más
    const comentarios = await fetchComentarios()  // espera 1 seg más
    // Total: 3 segundos
}

// BIEN — paralelo, todos empiezan al mismo tiempo

function obtenerUsuario(){
    return new Promise((resolve => {
        setTimeout(() =>{
            resolve("Usuarios")
        },2000)
    }))
}

function obtenerPosts(){
    return new Promise((resolve => {
        setTimeout(() =>{
            resolve("Posts")
        },2000)
    }))
}

function obtenerComentarios(){
    return new Promise((resolve => {
        setTimeout(() =>{
            resolve("Comentarios")
        },2000)
    }))
}

async function cargarDashboard() {
    const [usuario, posts, comentarios] = await Promise.all([
        obtenerUsuario(),
        obtenerPosts(),
        obtenerComentarios()
    ])
    console.log(usuario)
    console.log(posts)
    console.log(comentarios)

    // Total 2 segundos, no 6
}
cargarDashboard()