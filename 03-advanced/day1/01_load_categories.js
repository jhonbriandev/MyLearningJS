// METODO GET PARA OBTENER CATEGORIAS


// Elementos del DOM
const loadCategories = document.querySelector('#load_categories')
const listCategories = document.querySelector('#list_categories')


// Escucha el click del botón para cargar las categorías
loadCategories.addEventListener('click', async event => {

    // Realiza la petición GET a la API
    const response = await fetch(
        "http://127.0.0.1:8000/api/categories/"
    )

    // La API de DRF devuelve un objeto paginado
    const data = await response.json()

    // Limpiamos la lista antes de volver a cargar categorias
    listCategories.innerHTML = ''

    // Recorre las categorías obtenidas desde data.results.
    // Usamos data.results porque DRF devuelve un objeto con
    // información de paginación y no una lista directa.
    data.results.forEach(element => {

        // Crea un elemento <li> para cada categoría
        const categories = document.createElement('li')

        // Muestra el nombre de la categoría
        categories.textContent = element.name

        // Agrega la categoría a la lista HTML
        listCategories.appendChild(categories)
    })

    console.log(data)
})