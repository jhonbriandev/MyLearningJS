// Importa el servicio que sabe qué pedirle a la API
import categoryService from './services/categoryService.js'
import postService from './services/postService.js'

// Elementos del HTML
const btnCategory = document.querySelector('#load_categories')
const listCategory = document.querySelector('#list_categories')
const btnCrearPost = document.querySelector('#crear_post')

btnCategory.addEventListener('click', async () => {

    // El servicio hace todo el trabajo, ahora solo recibimos los datos
    const data = await categoryService.getCategories()

    // Limpia la lista antes de dibujar
    listCategory.innerHTML = ''

    // Recorre los posts y los dibuja
    data.results.forEach(category => {
        const item = document.createElement('li')
        item.innerHTML = `<h3>${category.name}</h3>`
        listCategory.appendChild(item)
    })

})

