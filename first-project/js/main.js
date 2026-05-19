// js/main.js
import { getPosts, getCategorias } from './api.js'
import { crearCardPost, mostrarCargando, mostrarError, mostrarVacio } from './ui.js'

const contenedor = document.querySelector('#posts-contenedor')
const contadorEl = document.querySelector('#contador-posts')
console.log(contenedor)

async function renderizarPosts() {
    mostrarCargando(contenedor)
    
    try {
        const data = await getPosts()
        const posts = data.results || data  // por si tiene paginación o no
        
        contenedor.innerHTML = ''
        
        if (posts.length === 0) {
            mostrarVacio(contenedor)
            return
        }
        
        // Actualizar contador
        contadorEl.textContent = `${posts.length} posts encontrados`
        
        // Renderizar cada post
        posts.forEach(post => {
            const card = crearCardPost(post)
            contenedor.appendChild(card)
        })
        
    } catch (error) {
        mostrarError(contenedor, error.message)
        
        // Reintentar
        document.querySelector('#btn-reintentar')
            ?.addEventListener('click', renderizarPosts)
    }
}

// Event delegation para todos los botones de posts
contenedor.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-ver')) {
        const slug = event.target.dataset.slug
        window.location.href = `post.html?slug=${slug}`
    }
})

// Iniciar al cargar el DOM
document.addEventListener('DOMContentLoaded', renderizarPosts)