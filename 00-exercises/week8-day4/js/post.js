import { getPost } from './api.js'
import { mostrarCargando, mostrarError, mostrarToast } from './ui.js'

const contenedor = document.querySelector('#post-contenedor')

async function renderizarPost() {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('slug')

    if (!slug) {
        window.location.href = 'index.html'
        return
    }

    // Estado LOADING mientras llega el post
    mostrarCargando(contenedor)


    try {
        const post = await getPost(slug)

        // Estado SUCCESS: renderiza el post completo
        contenedor.innerHTML = `
            <article class="post-completo">
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <span>Por ${post.author_name}</span>
                    <span>${post.published_at}</span>
                </div>
                <div class="post-contenido">
                    ${post.summary}
                </div>
                <a href="index.html" class="btn-volver">← Volver</a>
            </article>
        `
        mostrarToast('Post cargado', 'success')

    } catch (error) {
        
        // Estado ERROR: mensaje + link para volver
        mostrarError(contenedor, error.message)
        mostrarToast('Error al cargar el post', 'error')
    }
}

document.addEventListener('DOMContentLoaded', renderizarPost)