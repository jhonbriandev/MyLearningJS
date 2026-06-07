export function crearCardPost(posts) {
    const card = document.createElement('article')
    card.classList.add('post-card')
    card.dataset.slug = posts.slug
    
    card.innerHTML = `
        <h2 class="post-titulo">${posts.title}</h2>
        <div class="post-meta">
            <span class="post-autor">Por ${posts.author_name}</span>
            <span class="post-estado">${posts.count_views} Veces visitado</span>
        </div>
        <button class="btn-leer" data-slug="${posts.slug}">
            Leer más
        </button>
    `
    return card
}

// Muestra un spinner mientras se espera la respuesta
export function mostrarCargando(contenedor) {
    contenedor.innerHTML = `
        <div class="loading">
            <p>Cargando posts...</p>
        </div>
    `
}

// Muestra el error y un botón para reintentar
export function mostrarError(contenedor, mensaje) {
    contenedor.innerHTML = `
        <div class="error">
            <p>⚠️ ${mensaje}</p>
            <button id="btn-reintentar">Reintentar</button>
        </div>
    `
}

// Muestra un mensaje cuando no hay posts
export function mostrarVacio(contenedor) {
    contenedor.innerHTML = `
        <div class="vacio">
            <p>No hay posts publicados aún.</p>
        </div>
    `
}

// Para el botón "Cargar posts" en index.html
export function setEstadoBotonCargar(boton, cargando) {
    boton.disabled = cargando
    boton.textContent = cargando ? 'Cargando...' : 'Cargar posts'
    boton.classList.toggle('loading', cargando)
}

// Para el botón "Leer más" en cada card
export function setEstadoBotonLeer(boton, cargando) {
    boton.disabled = cargando
    boton.textContent = cargando ? 'Cargando...' : 'Leer más'
    boton.classList.toggle('loading', cargando)
}

// Muestra una notificación temporal en pantalla
// tipo puede ser: 'success', 'error', 'info'
export function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div')
    toast.classList.add('toast', `toast-${tipo}`)
    toast.textContent = mensaje

    document.body.appendChild(toast)

    // Pequeño delay para que la animación CSS funcione
    setTimeout(() => toast.classList.add('visible'), 10)

    // Lo quita después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('visible')
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}