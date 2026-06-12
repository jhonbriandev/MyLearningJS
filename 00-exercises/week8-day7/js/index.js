// Importacion del TOAST

import { mostrarToast } from "./toast.js"
// ================================================================
// ESTADOS DE LA UI
// Un objeto constante que centraliza los nombres de cada estado.
// Usarlo así evita errores de tipeo — si escribes ESTADOS.LAODING
// JS te avisa, pero si escribes 'laoding' como string no te avisa.
// ================================================================
const ESTADOS = {
  IDLE:    'idle',
  LOADING: 'loading',
  ERROR:   'error',
  SUCCESS: 'success'
}

const API_URL    = 'http://localhost:8000/api/my-posts/'
const contenedor = document.querySelector('#posts-contenedor')
const myGrid     = document.querySelector('#posts-grid')

// ================================================================
// PETICIÓN GET A LA API
// ================================================================
async function getPosts() {
  const token = localStorage.getItem('token')
  const response = await fetch(
    'http://127.0.0.1:8000/api/my-posts/',
    {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
  if (!response.ok) throw new Error(`Error del servidor: ${response.status}`)
  return response.json()
}

// ================================================================
// CREAR CARD DE UN POST
// ================================================================
function crearCardPost(post) {
  const article = document.createElement('article')
  article.className = 'post-card'
  const fecha = new Date(post.created_at).toLocaleDateString('es-PE')
  article.innerHTML = `
    <h2 class="post-card-title">${post.title}</h2>
    <p  class="post-card-author">${post.author_name}</p>
    <p  class="post-card-content">${post.content.slice(0, 150)}...</p>
    <div class="actions">
      <button class="btn-edit" data-slug="${post.slug}">✏️ Editar</button>
      <button class="btn-delete" data-slug="${post.slug}">🗑️ Eliminar</button>
    </div>
    <time class="post-date">${fecha}</time>
  `
  return article
}

// ================================================================
// RENDERIZAR ESTADO VISUAL
// ================================================================
function renderizarEstado(contenedor, estado, datos = null) {
  myGrid.innerHTML = ''
  myGrid.className = 'posts-grid'
  myGrid.classList.add(estado)

  switch (estado) {
    case ESTADOS.IDLE:
      myGrid.innerHTML = `<p class="idle-msg">Presiona el botón para cargar.</p>`
      mostrarToast("Bienvenidos al Mini Blog", "success")
      break

    case ESTADOS.LOADING:
      myGrid.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>`
      break

    case ESTADOS.ERROR:
      myGrid.innerHTML = `
        <div class="error">
          <p>⚠️ ${datos?.mensaje || 'Ocurrió un error'}</p>
          <button id="btn-reintentar">Reintentar</button>
        </div>`
      mostrarToast("Página no encontrada", "error")
      break

    case ESTADOS.SUCCESS:
      if (!datos || datos.length === 0) {
        myGrid.innerHTML = `<p class="empty">No hay posts.</p>`
        return
      }
      datos.forEach(post => myGrid.appendChild(crearCardPost(post)))
      mostrarToast("Posts encontrados", "success")
      break
  }
}

// ================================================================
// CONTROLAR ESTADO DEL BOTÓN
// ================================================================
function setEstadoBoton(boton, cargando) {
  boton.disabled    = cargando
  boton.textContent = cargando ? 'Cargando...' : 'Cargar posts'
  boton.classList.toggle('loading', cargando)
}

// ================================================================
// ORQUESTADOR PRINCIPAL
// ================================================================
async function cargarPosts() {
  const boton = document.querySelector('#btn-cargar')
  setEstadoBoton(boton, true)
  renderizarEstado(contenedor, ESTADOS.LOADING)
  try {
    const data = await getPosts()
    renderizarEstado(contenedor, ESTADOS.SUCCESS, data.results || data)
  } catch (error) {
    renderizarEstado(contenedor, ESTADOS.ERROR, { mensaje: error.message })
    document.querySelector('#btn-reintentar')
      ?.addEventListener('click', cargarPosts)
  } finally {
    setEstadoBoton(boton, false)
  }
}


// ================================================================
// NAVEGACIÓN A EDITAR
// Guarda el slug en localStorage y navega a edit-post.html
// ================================================================
myGrid.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-edit')) return

  // Guarda el slug para que update-post.js lo lea
  localStorage.setItem('slugEdit', event.target.dataset.slug)
  window.location.href = './edit-post.html'
})

// ================================================================
// INICIALIZACIÓN
// ================================================================
renderizarEstado(contenedor, ESTADOS.IDLE)
document.querySelector('#btn-cargar')
  ?.addEventListener('click', cargarPosts)

export { myGrid }