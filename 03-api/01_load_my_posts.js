// METODO GET PARA OBTENER SOLO LOS POSTS DEL USUARIO AUTENTICADO


// Importa la lógica de autenticación y creación de posts
import {login} from './01_login_users.js'
import {formPost} from "./01_create_posts.js";


// Elementos del DOM
export const loadMyPosts = document.querySelector('#load_my_posts')

export const listMyPosts = document.querySelector('#list_my_posts')


// Obtiene los posts creados por el usuario autenticado
export function loadPost(){

    // Escucha el click del botón para cargar los posts
    loadMyPosts.addEventListener('click', async ()=>{

        // Obtiene el token JWT guardado en localStorage
        const token = localStorage.getItem('token')

        // Realiza la petición GET a la API protegida
        const response = await fetch(
            'http://127.0.0.1:8000/api/my-posts/',
            {
                method: 'GET',

                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        // Convierte la respuesta en JSON
        const data = await response.json()

        // Logs de depuración para verificar autenticación y respuesta
        console.log('status:', response.status)
        console.log('data:', data)
        console.log('token:', localStorage.getItem('token'))

        // Limpiamos la lista antes de volver a cargar posts
        listMyPosts.innerHTML = ''

        // Recorre los posts obtenidos desde data.results
        data.results.forEach(element =>{

            // Crea un elemento <li> para cada post
            const postCreated = document.createElement('li')

            // Inserta dinámicamente la información del post
            postCreated.innerHTML = `
                <div class="post-card">

                    <h3>${element.title}</h3>

                    <span class="category">
                        ${element.category_name.name}
                    </span>

                    <p>${element.content}</p>

                    <div class="actions">

                        <button 
                            class="btn-edit"
                            data-slug="${element.slug}"
                        >
                            ✏️ Editar
                        </button>

                        <button class="btn-delete"
                            data-slug = "${element.slug}"
                        >
                            🗑️ Eliminar
                        </button>

                    </div>

                </div>
            `

            // Agrega el post a la lista HTML
            listMyPosts.appendChild(postCreated)

            console.log(listMyPosts)
        })
    })
}


// Inicializa la carga de posts
loadPost()