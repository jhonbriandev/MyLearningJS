import { getPosts } from './api.js'
import { crearCardPost, mostrarCargando, mostrarError, mostrarVacio, setEstadoBotonCargar,setEstadoBotonLeer, mostrarToast } from './ui.js'

const contenedor = document.querySelector('#lista-contenedor')
const contadorEl = document.querySelector('#contador-posts')

async function cargarPosts() {

    // Estado LOADING: spinner + botón deshabilitado
    mostrarCargando(contenedor)

    try {
        const data = await getPosts()
        const posts = data.results || data

        contenedor.innerHTML = ''

        // Estado SUCCESS vacío
        if (posts.length === 0) {
            mostrarVacio(contenedor)
            return
        }

        // Estado SUCCESS con posts
        contadorEl.textContent = `${posts.length} posts encontrados`
        posts.forEach(post => contenedor.appendChild(crearCardPost(post)))

        mostrarToast('Posts cargados correctamente', 'success')

    } catch (error) {

        // Estado ERROR: mensaje + botón reintentar
        mostrarError(contenedor, error.message)
        mostrarToast('Error al cargar los posts', 'error')

        document.querySelector('#btn-reintentar')
            ?.addEventListener('click', cargarPosts)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPosts()

    // Delegación: escucha clicks en el contenedor padre
    // así funciona aunque los botones se creen después
    contenedor.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-leer')) {
            const boton = event.target

            // Deshabilita el botón y cambia su texto
            setEstadoBotonLeer(boton, true)

            // Toast informativo antes de navegar
            mostrarToast('Cargando post...', 'info')

            // Delay para que el toast se vea antes de cambiar de página
            setTimeout(() => {
                window.location.href = `view-post.html?slug=${boton.dataset.slug}`
            }, 800)
        }
    })
})