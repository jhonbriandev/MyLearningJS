// js/ui.js

export function crearCardPost(posts) {
    const card = document.createElement('article')
    card.classList.add('post-card')
    card.dataset.slug = posts.slug
    
    card.innerHTML = `
        <h2 class="post-titulo">${posts.title}</h2>
        <div class="post-meta">
            <span class="post-autor">Por ${posts.author_name}</span>
            <span class="post-estado ${posts.count_views}">${posts.count_views} Veces visitado</span>
        </div>
        <button class="btn-ver" data-slug="${posts.slug}">
            Leer más
        </button>
    `
    
    return card
}

export function mostrarCargando(contenedor) {
    contenedor.innerHTML = `
        <div class="loading">
            <p>Cargando posts...</p>
        </div>
    `
}

export function mostrarError(contenedor, mensaje) {
    contenedor.innerHTML = `
        <div class="error">
            <p>⚠️ ${mensaje}</p>
            <button id="btn-reintentar">Reintentar</button>
        </div>
    `
}

export function mostrarVacio(contenedor) {
    contenedor.innerHTML = `
        <div class="vacio">
            <p>No hay posts publicados aún.</p>
        </div>
    `
}