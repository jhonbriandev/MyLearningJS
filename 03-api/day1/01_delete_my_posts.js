// METODO PARA ELIMINAR MIS POSTS

import { listMyPosts } from './01_load_my_posts.js';

// Escucha los clicks realizados dentro de la lista de posts.
// Se utiliza delegación de eventos porque los botones Editar
// son creados dinámicamente después de cargar los posts.
listMyPosts.addEventListener('click', async (event)=>{

    // Verifica que el click provenga del botón Eliminar
    if (!event.target.classList.contains('btn-delete')) return


    // Obtiene el slug del post desde el atributo data-slug.
    // El slug identifica de forma única el post en la API.
    const slug = event.target.dataset.slug


    // Obtiene el token JWT almacenado en localStorage
    const token = localStorage.getItem('token')

    const response = await fetch (
        `http://localhost:8000/api/my-posts/${slug}/`,
        {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',

                // Envía el token JWT para autenticar al usuario
                'Authorization' : `Bearer ${token}`,
            },
        }
    )

    console.log(response.status)

    if(response.status === 204){
        // Busca el <li> que contiene el botón y lo elimina del DOM
        event.target.closest('li').remove()
        return
    }
    if (response.status === 403){
        // Muestra alerta visible en vez de throw silencioso
        alert("No tienes permiso para eliminar este post")
        return
    }
    alert(`Error al eliminar: ${response.status}`)
})