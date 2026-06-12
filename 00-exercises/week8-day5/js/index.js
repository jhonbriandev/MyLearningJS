// ================================================================
// ESTADOS DE LA UI
// Un objeto constante que centraliza los nombres de cada estado.
// Usarlo así evita errores de tipeo — si escribes ESTADOS.LAODING
// JS te avisa, pero si escribes 'laoding' como string no te avisa.
// ================================================================
const ESTADOS = {
  IDLE:    'idle',     // inicio — sin acción todavía
  LOADING: 'loading',  // esperando respuesta del servidor
  ERROR:   'error',    // algo salió mal
  SUCCESS: 'success'   // datos cargados correctamente
}

// URL base de la API — se define una vez y se reutiliza en todo el archivo
const API_URL = 'http://localhost:8000/api/posts/'

// Referencias a los elementos del HTML que JS va a manipular
const contenedor = document.querySelector('#posts-contenedor')
const myGrid     = document.querySelector('#posts-grid')

// ================================================================
// PETICIÓN GET A LA API
// async/await pausa la ejecución hasta recibir la respuesta.
// fetch() NO lanza error en respuestas 404/500 — response.ok lo detecta.
// ================================================================
async function getPosts() {
  const response = await fetch(API_URL)

  // response.ok es true solo si el status está entre 200-299
  // Si no, lanzamos el error manualmente para que lo capture el catch
  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`)
  }

  // .json() convierte la respuesta de texto plano a objeto JS
  return response.json()
}

// ================================================================
// CREAR CARD DE UN POST
// Recibe un objeto post con sus datos y devuelve un elemento HTML.
// Se usa createElement en lugar de innerHTML para mayor seguridad
// y control sobre el elemento creado.
// ================================================================
function crearCardPost(post) {
  const article = document.createElement('article')
  article.className = 'post-card'

  // Si post.created_at existe lo formatea, si no devuelve vacío
  // El ?. (optional chaining) evita error si el campo es undefined
  const fecha = post.created_at
    ? new Date(post.created_at).toLocaleDateString('es-PE')
    : ''

  // Template literal — inserta los datos del post en el HTML
  article.innerHTML = `
    <h2 class="post-card-title">${post.title}</h2>
    <p  class="post-card-author">${post.author_name}</p>
    <p  class="post-card-content">${post.content.slice(0, 150)}...</p>
    <time class="post-date">${fecha}</time>
  `
  return article
}

// ================================================================
// RENDERIZAR ESTADO VISUAL
//
// Esta es la función más importante del archivo.
// Un solo lugar controla todo lo que el usuario ve en pantalla.
//
// ¿Por qué className + classList.add en lugar de solo className?
//
//   Si usáramos solo:  myGrid.className = `posts-grid ${estado}`
//   Estaríamos bien, PERO si luego hacemos otro setState, el estado
//   anterior quedaría acumulado: "posts-grid loading success"
//
//   La solución en dos pasos:
//   1. myGrid.className = 'posts-grid'
//      → Resetea SIEMPRE a la clase base, borrando cualquier estado anterior
//   2. myGrid.classList.add(estado)
//      → Agrega SOLO el estado actual encima de la clase base
//
//   Resultado limpio en cada llamada:
//   IDLE    → class="posts-grid idle"
//   LOADING → class="posts-grid loading"
//   ERROR   → class="posts-grid error"
//   SUCCESS → class="posts-grid success"
// ================================================================
function renderizarEstado(contenedor, estado, datos = null) {

  // Limpia el contenido anterior antes de dibujar el nuevo
  myGrid.innerHTML = ''

  // Paso 1: resetea a clase base (borra estado anterior)
  myGrid.className = 'posts-grid'
  // Paso 2: agrega solo el estado actual
  myGrid.classList.add(estado)

  switch (estado) {

    case ESTADOS.IDLE:
      // Estado inicial — invita al usuario a interactuar
      myGrid.innerHTML = `<p class="idle-msg">Presiona el botón para cargar.</p>`
      mostrarToast("Bienvenidos al Mini Blog", "success")
      break

    case ESTADOS.LOADING:
      // Muestra spinner mientras espera la API
      myGrid.innerHTML = `
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>`
      break

    case ESTADOS.ERROR:
      // datos?.mensaje usa optional chaining — si datos es null no explota
      myGrid.innerHTML = `
        <div class="error">
          <p>⚠️ ${datos?.mensaje || 'Ocurrió un error'}</p>
          <button id="btn-reintentar">Reintentar</button>
        </div>`
      mostrarToast("Página no encontrada", "error")
      break

    case ESTADOS.SUCCESS:
      // Si no hay posts muestra mensaje vacío y sale con return
      if (!datos || datos.length === 0) {
        myGrid.innerHTML = `<p class="empty">No hay posts.</p>`
        return
      }
      // forEach recorre cada post y agrega su card al grid
      datos.forEach(post => myGrid.appendChild(crearCardPost(post)))
      // El toast va FUERA del forEach — debe mostrarse una sola vez
      mostrarToast("Posts encontrados", "success")
      break
  }
}

// ================================================================
// CONTROLAR ESTADO DEL BOTÓN
// Deshabilita el botón mientras carga para evitar clics múltiples.
// classList.toggle agrega o quita la clase según el valor booleano.
// ================================================================
function setEstadoBoton(boton, cargando) {
  boton.disabled     = cargando
  boton.textContent  = cargando ? 'Cargando...' : 'Cargar posts'
  boton.classList.toggle('loading', cargando)
}

// ================================================================
// ORQUESTADOR PRINCIPAL
// Coordina el orden correcto: loading → petición → success/error.
// try/catch/finally garantiza que el botón siempre se restaure,
// haya éxito o error.
// ================================================================
async function cargarPosts() {
  const boton = document.querySelector('#btn-cargar')

  // 1. Prepara la UI antes de la petición
  setEstadoBoton(boton, true)
  renderizarEstado(contenedor, ESTADOS.LOADING)

  try {
    const data = await getPosts()
    // Django paginado devuelve data.results — sin paginación devuelve data directamente
    renderizarEstado(contenedor, ESTADOS.SUCCESS, data.results || data)

  } catch (error) {
    renderizarEstado(contenedor, ESTADOS.ERROR, { mensaje: error.message })
    // El botón reintentar se crea dentro del ERROR — se conecta aquí
    // ?. evita error si el botón no existe en el DOM
    document.querySelector('#btn-reintentar')
      ?.addEventListener('click', cargarPosts)

  } finally {
    // finally siempre se ejecuta — restaura el botón pase lo que pase
    setEstadoBoton(boton, false)
  }
}

// ================================================================
// INICIALIZACIÓN
// Se ejecuta al cargar la página.
// ?. en el addEventListener evita error si el botón no existe.
// ================================================================
renderizarEstado(contenedor, ESTADOS.IDLE)
document.querySelector('#btn-cargar')
  ?.addEventListener('click', cargarPosts)

// ================================================================
// TOAST — NOTIFICACIÓN FLOTANTE
// Crea un elemento div, lo hace visible con animación CSS,
// y lo elimina del DOM automáticamente después de 3 segundos.
// ================================================================
function mostrarToast(mensaje, tipo = 'success') {
  const toast = document.createElement('div')
  toast.classList.add('toast', `toast-${tipo}`)
  toast.textContent = mensaje

  document.body.appendChild(toast)

  // Pequeño delay necesario para que la animación CSS funcione
  // Sin el timeout, el navegador no detecta el cambio de clase
  setTimeout(() => toast.classList.add('visible'), 10)

  // A los 3 segundos inicia la animación de salida
  setTimeout(() => {
    toast.classList.remove('visible')
    // Espera 300ms a que termine la animación antes de eliminar del DOM
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}