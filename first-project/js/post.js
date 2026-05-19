// js/post.js
import { getPost } from './api.js'

async function renderizarPost() {
    // Obtener el slug de la URL: post.html?slug=mi-primer-post
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('slug')
    
    if (!slug) {
        window.location.href = 'index.html'
        return
    }
    
    const contenedor = document.querySelector('#post-contenedor')
    contenedor.innerHTML = '<p>Cargando...</p>'
    
    try {
        const posts = await getPost(slug)
        
        contenedor.innerHTML = `
            <article class="post-completo">
                <h1>${posts.title}</h1>
                <div class="post-meta">
                    <span>Por ${posts.author_name}</span>
                    <span>${posts.published_at}</span>
                </div>
                <div class="post-contenido">
                    ${posts.summary}
                </div>
                <a href="index.html" class="btn-volver">← Volver</a>
            </article>
        `
    } catch (error) {
        contenedor.innerHTML = `
            <p>Error al cargar el post: ${error.message}</p>
            <a href="index.html">← Volver al inicio</a>
        `
    }
}

document.addEventListener('DOMContentLoaded', renderizarPost)