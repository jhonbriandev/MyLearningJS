// ================================================================
// DELETE POST — Maneja la eliminación de posts existentes
// ================================================================
import { myGrid } from "./index.js"
import { mostrarToast } from "./toast.js"

// Escucha clicks en el grid de posts
// Se usa delegación de eventos: un solo listener en el padre
// en vez de un listener por cada botón Eliminar
myGrid.addEventListener('click', async (event) => {

    // Verifica que el click provenga del botón Eliminar
    // Si no, ignora el click y no hace nada
    if (!event.target.classList.contains('btn-delete')) return

    // Obtiene el slug del post desde el atributo data-slug
    // El slug identifica de forma única el post en la API
    const slug = event.target.dataset.slug

    // Obtiene el token JWT almacenado en localStorage
    const token = localStorage.getItem('token')

    // Envía la petición DELETE a la API
    // DELETE elimina el recurso completo — no necesita body
    const response = await fetch(
        `http://localhost:8000/api/my-posts/${slug}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',

                // Token JWT para identificar y autenticar al usuario
                'Authorization': `Bearer ${token}`,
            },
        }
    )

    console.log(response.status)

    // 204 No Content — el post fue eliminado correctamente
    // La API no devuelve body en este caso, solo el status
    if (response.status === 204) {
        // Busca el <article> que contiene el botón y lo elimina del DOM
        // closest() sube por el árbol HTML hasta encontrar el article padre
        event.target.closest('article').remove()
        mostrarToast("Contenido Eliminado", "error")
        return
    }

    // 403 Forbidden — el usuario no es dueño del post
    if (response.status === 403) {
        // Muestra alerta visible en vez de throw silencioso
        alert("No tienes permiso para eliminar este post")
        return
    }

    // Cualquier otro error inesperado del servidor
    alert(`Error al eliminar: ${response.status}`)
})