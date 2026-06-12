// ================================================================
// UPDATE POST — Maneja la edición de posts existentes
// ================================================================
import { loadCategoriesSelect } from './utils.js'
import { mostrarToast } from './toast.js'

// Referencias a elementos del HTML
const selectCategory = document.querySelector('select[name="category"]')
const formElPosts    = document.querySelector('.form_posts')
const token          = localStorage.getItem('token')

// Lee el slug guardado en localStorage por index.js
const slug = localStorage.getItem('slugEdit')

// Carga las categorías en el select de esta página
loadCategoriesSelect(selectCategory)

// ================================================================
// FORMULARIO DE EDICIÓN
// ================================================================
formElPosts.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Captura el botón y lo deshabilita inmediatamente
    const btnSubmit = formElPosts.querySelector('button[type="submit"]')
    btnSubmit.disabled = true
    btnSubmit.textContent = 'Guardando...'

    const formData = new FormData(formElPosts)
    const data     = Object.fromEntries(formData)

    const body = {}
    if (data.title)    body.title    = data.title
    if (data.content)  body.content  = data.content
    if (data.summary)  body.summary  = data.summary
    if (data.category) body.category = data.category

    try {
        const response = await fetch(
            `http://localhost:8000/api/my-posts/${slug}/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            }
        )

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            localStorage.removeItem('slugEdit')
            history.back()
            mostrarToast("Contenido Editado", "success")

        } else {
            const error = await response.json()
            console.log('Error:', error)

            // Reactiva el botón para que el usuario pueda reintentar
            btnSubmit.disabled = false
            btnSubmit.textContent = 'Guardar'
        }

    } catch (err) {
        // Error de red — también reactiva el botón
        console.log('Error de red:', err)
        btnSubmit.disabled = false
        btnSubmit.textContent = 'Guardar'
    }
})

// ================================================================
// BOTÓN CANCELAR
// ================================================================
document.querySelector('#btn-cancelar').addEventListener('click', () => {
    history.back()
})