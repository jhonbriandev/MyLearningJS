// METODO PATCH PARA ACTUALIZAR POSTS


// Importa la lógica relacionada con creación y carga de posts
import {formPost} from './01_create_posts.js'
import {loadPost, listMyPosts} from  './01_load_my_posts.js'


// Escucha los clicks realizados dentro de la lista de posts.
// Se utiliza delegación de eventos porque los botones Editar
// son creados dinámicamente después de cargar los posts.
listMyPosts.addEventListener('click', async (event)=>{

    // Verifica que el click provenga del botón Editar
    if (!event.target.classList.contains('btn-edit')) return


    // Obtiene el slug del post desde el atributo data-slug.
    // El slug identifica de forma única el post en la API.
    const slug = event.target.dataset.slug


    // Obtiene el token JWT almacenado en localStorage
    const token = localStorage.getItem('token')


    // Realiza una petición PATCH para actualizar parcialmente el post.
    // PATCH modifica solo los campos enviados y no reemplaza
    // completamente el objeto como lo haría PUT.
    const response = await fetch(
        `http://localhost:8000/api/my-posts/${slug}/`,
        {
            method : 'PATCH',

            headers : {
                'Content-Type' : 'application/json',

                // Envía el token JWT para autenticar al usuario
                'Authorization' : `Bearer ${token}`,
            },

            // Convierte el objeto JavaScript en JSON
            // antes de enviarlo a la API
            body : JSON.stringify({
                title: 'Nuevo título'
            })
        }
    )


    // Convierte la respuesta de la API en JSON
    const data = await response.json()


    // Muestra la respuesta en consola para depuración
    console.log(data)
})