// Agrega estados de UI a tu mini-blog del Día 7 de Semana 7

// 1. Estado LOADING:
//    - Muestra un spinner CSS mientras carga los posts
//    - El botón de cargar queda deshabilitado con texto "Cargando..."

// 2. Estado ERROR:
//    - Muestra un div con mensaje de error y botón "Reintentar"
//    - El botón Reintentar vuelve a llamar a cargarPosts()

// 3. Estado SUCCESS:
//    - Muestra los posts normalmente
//    - Si no hay posts, muestra "No hay posts disponibles"

// 4. Toast de confirmación:
//    - Cuando se hace click en "Leer más" de un post,
//      muestra un toast "Cargando post..." antes de navegar
//    - Usa los tres tipos: success, error, info en distintos momentos

// 5. Estado del botón:
//    - El botón de cargar siempre refleja el estado actual
//    - Nunca queda deshabilitado si la operación terminó

const BASE_URL = 'http://localhost:8000/api'

async function request(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    return response.json()
}
export async function getPosts() {
    return request('/posts/')
}

export async function getPost(slug) {
    return request(`/posts/${slug}/`)
}

export async function getCategorias() {
    return request('/categories/')
}