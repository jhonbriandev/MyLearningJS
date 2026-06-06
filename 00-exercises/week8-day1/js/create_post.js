import categoryService from './services/categoryService.js'
import postService from './services/postService.js'

const form           = document.querySelector('.form_posts')
const selectCategory = document.querySelector('select[name="category"]')

// Carga categorías en el select al abrir la página
const cargarCategorias = async () => {
    const data = await categoryService.getCategories()
    data.results.forEach(cat => {
        selectCategory.innerHTML += `<option value="${cat.id}">${cat.name}</option>`
    })
}

// Envía el form a Django
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await postService.createPosts({
        title:    form.title.value,
        category: form.category.value,
        content:  form.content.value,
        summary:  form.summary.value
    })
    console.log('Post creado:', data)
})

cargarCategorias()