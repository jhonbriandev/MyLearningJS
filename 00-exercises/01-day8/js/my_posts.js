// Importa el servicio que sabe qué pedirle a la API
import postService from './services/postService.js'

// Elementos del HTML
const btnPost = document.querySelector('#load_my_posts')
const listPost = document.querySelector('#list_my_posts')

btnPost.addEventListener('click', async () => {

    // El servicio hace todo el trabajo, ahora solo recibimos los datos
    const data = await postService.getMyPosts()

    // Limpia la lista antes de dibujar
    listPost.innerHTML = ''

    // Recorre los posts y los dibuja
    data.results.forEach(post => {
        const item = document.createElement('li')
        item.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`
        listPost.appendChild(item)
    })

})