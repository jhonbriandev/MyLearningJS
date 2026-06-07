import { ESTADOS } from './state.js'

const contenedor = document.querySelector('#inicio-contenedor')
const boton = document.querySelector('#btn-cargar')

document.addEventListener('DOMContentLoaded', () => {

    // Muestra el mensaje inicial
    contenedor.innerHTML = `<p class="idle-msg">Presiona el botón para cargar.</p>`

    // Al hacer click navega a lista.html
    boton?.addEventListener('click', () => {
        window.location.href = './list-post.html'
    })
})