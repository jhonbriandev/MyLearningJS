// METODO POST PARA CREAR POSTS

// El usuario debe estar autenticado para crear posts.
// El token JWT guardado después del login se enviará
// en el header Authorization en cada petición protegida.

import {login} from './01_login_users.js'


// Las categorías obtenidas desde la API se insertan
// dinámicamente dentro del select del formulario.


// Elementos del DOM
const formElPosts = document.querySelector('.form_posts')
const listPosts = document.querySelector('#list_posts')
const selectCategory = document.querySelector('select[name="category"]')


// Carga las categorías desde la API y llena el select automáticamente
async function loadCategoriesSelect() {

    const response = await fetch(
        "http://127.0.0.1:8000/api/categories/"
    )

    const data = await response.json()

    data.results.forEach(element => {

        const option = document.createElement('option')

        // Valor que se enviará a Django
        option.value = element.id

        // Texto visible para el usuario
        option.textContent = element.name

        selectCategory.appendChild(option)
    })
}


// Ejecuta automáticamente la carga de categorías
// al abrir la página
loadCategoriesSelect()


// Maneja el envío del formulario para crear posts
export function formPost(){

    formElPosts.addEventListener('submit', async event => {

        event.preventDefault()

        // Captura todos los campos del formulario
        const formData = new FormData(formElPosts)

        // Convierte FormData en un objeto JavaScript plano
        const data = Object.fromEntries(formData)

        // Obtiene el token del usuario autenticado
        const token = localStorage.getItem('token')

        // Envía el nuevo post a la API usando JWT
        const response = await fetch(
            'http://localhost:8000/api/posts/',
            {
                method : 'POST',

                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },

                body : JSON.stringify(data)
            }
        )

        // Post creado correctamente
        if (response.status === 201){

            console.log(response)

            const myPost = await response.json()
        }

        // Errores de validación enviados por el serializer
        if (response.status === 400){

            const errors = await response.json()

            console.log(errors)
        }
    })
}


// Inicializa el formulario de creación de posts
formPost()