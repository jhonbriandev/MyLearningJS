// ================================================================
// CREATE POST — Maneja la creación de nuevos posts
// ================================================================
import { login } from './login.js'
import { loadCategoriesSelect } from './utils.js'

const API_URL = 'http://localhost:8000/api/posts/'

// Referencias a elementos del HTML
const formElPosts    = document.querySelector('.form_posts')
const selectCategory = document.querySelector('select[name="category"]')

// Si no hay token el usuario no está autenticado
// login() lo redirige o genera uno automáticamente
if (!localStorage.getItem('token')) {
    await login()
}

// Carga las categorías en el select de esta página
// Se importa de utils.js para no duplicar código entre páginas
loadCategoriesSelect(selectCategory)

// ================================================================
// FORMULARIO DE CREACIÓN
// Escucha el submit y envía todos los campos usando POST
// POST crea un recurso nuevo — a diferencia de PATCH que modifica uno existente
// ================================================================
async function formPost() {

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
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    // Token JWT para identificar al usuario autenticado
                    'Authorization': `Bearer ${token}`,
                },

                // Envía todos los campos — POST requiere el recurso completo
                body: JSON.stringify(data)
            }
        )

        // 201 Created — el post fue creado correctamente
        if (response.status === 201) {
            console.log(response)
            const myPost = await response.json()
        }

        // 400 Bad Request — errores de validación enviados por el serializer
        // Por ejemplo: campos vacíos, formato incorrecto, etc.
        if (response.status === 400) {
            const errors = await response.json()
            console.log(errors)
        }
    })
}

// Inicializa el formulario de creación de posts
formPost()

export { formPost }