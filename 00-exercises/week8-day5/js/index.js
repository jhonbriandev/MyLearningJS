/* Cuando hacemos un fetch() a la API, no obtenemos la respuesta instantáneamente. 
El navegador sale al servidor, espera, y regresa. Eso toma tiempo — a veces medio segundo, a veces cinco.
Durante ese tiempo, el usuario está mirando la pantalla sin saber qué pasa. 
Si no mostramos nada, va a pensar que la app está rota o va a hacer clic múltiples veces.
Es como un semáforo: sin estados, no hay semáforo — todos los autos avanzan al mismo tiempo 
y hay caos. Los estados son el semáforo. */

// ─── 1. Definir estados ─────────────
const ESTADOS = {
  IDLE: 'idle', LOADING: 'loading',
  ERROR: 'error', SUCCESS: 'success'
}
// ─── 3. Peticion GET ─────────────
const API_URL = 'http://localhost:8000/api/posts/'

// Elemento principal donde se renderizan los estados y los posts.
const contenedor = document.querySelector('#posts-contenedor')
const myGrid = document.querySelector('#posts-grid')
contenedor.appendChild(myGrid)
/*Este es el error más común con fetch(). Si el servidor responde con un 404 o un 500,
fetch() considera que hizo su trabajo — la conexión funcionó. No lanza ningún error.
Para evitar eso usamos response.ok */

async function getPosts() {

  // fetch() hace el GET — await pausa hasta que el servidor responda
  const response = await fetch(API_URL)

  // response.ok es true solo si el status está entre 200-299
  // Si no, lanzamos el error nosotros para que lo capture el catch
  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`)
  }

  // .json() convierte el texto de la respuesta a objeto JS
  // También es async, necesita await
  return response.json()
}

/*La API devuelve datos en JSON — un objeto con campos como title, body, author. 
Eso no es visible en pantalla por sí solo. 
Esta función toma ese objeto y construye el elemento HTML que el usuario ve.
Es como tener una plantilla de tarjeta en blanco y rellenarla con los datos de cada post*/

// ─── 4. Crear card de un post ─────────────
function crearCardPost(post) {
    
  // Crear el elemento — no innerHTML, un elemento real del DOM
  const article = document.createElement('article')
  article.className = 'post-card'

  // Formatear la fecha si existe
  // ?. evita error si post.created_at es undefined
  const fecha = post.created_at
    ? new Date(post.created_at).toLocaleDateString('es-PE')
    : ''

  // Template literal
  // Ajusta los nombres de campo según tu modelo Django
  article.innerHTML = `
    <h2 class="post-card-title">${post.title}</h2>
    <p class="post-card-author">${post.author_name}</p>
    <p class="post-card-content">${post.content.slice(0, 150)}...</p>
    <time class="post-date">${fecha}</time>
    `

  // Devolver el elemento — quien llame a esta función lo agrega al DOM
  return article
}

/*La función que controla la pantalla
renderizarEstado() — un solo lugar que decide qué se ve*/

// ─── 2. Renderizar estado visual ──────────
function renderizarEstado(contenedor, estado, datos = null) {

  // Paso 1: limpiar antes de dibujar
  myGrid.innerHTML = ''

  // Mantiene posts-grid y agrega el estado encima
  myGrid.className = 'posts-grid'
  myGrid.classList.add(estado)

  // Paso 3: mostrar el HTML correcto según el estado
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
        mostrarToast("Pagina no Encontrada", "error")
      break

    case ESTADOS.SUCCESS:
      if (!datos || datos.length === 0) {
        myGrid.innerHTML = `<p class="empty">No hay posts.</p>`
        return
      }
      datos.forEach(post =>
        myGrid.appendChild(crearCardPost(post)),
      )
      mostrarToast("Posts Encontrados", "success")
      break
  }
}

// ─── 5. Controlar estado del botón ────────
function setEstadoBoton(boton, cargando) {
  boton.disabled = cargando
  boton.textContent = cargando ? 'Cargando...' : 'Cargar posts'
  boton.classList.toggle('loading', cargando)
}

/* Esta función no hace el trabajo pesado — llama a las que sí lo hacen. 
Su único trabajo es coordinar los estados en el orden correcto y manejar lo que salga mal*/

// ─── 6. Orquestador principal (una sola vez) ──
async function cargarPosts() {
  const boton = document.querySelector('#btn-cargar')

  // Antes de la petición: deshabilitar botón + mostrar spinner
  setEstadoBoton(boton, true)
  renderizarEstado(contenedor, ESTADOS.LOADING)

  try {
    // Intentar: hacer la petición
    const data = await getPosts()

    // Django paginado → data.results / sin paginación → data
    renderizarEstado(contenedor, ESTADOS.SUCCESS, data.results || data)

  } catch (error) {
    // Si algo falló: mostrar estado error con el mensaje
    renderizarEstado(contenedor, ESTADOS.ERROR, { mensaje: error.message })

    // Conectar el botón "reintentar" que se acaba de crear
    document.querySelector('#btn-reintentar')
      ?.addEventListener('click', cargarPosts)

  } finally {
    // Siempre ejecuta — haya éxito o error — restaurar el botón
    setEstadoBoton(boton, false)
  }
}

// ─── Inicializar ──────────────────────────
renderizarEstado(contenedor, ESTADOS.IDLE)
document.querySelector('#btn-cargar')
  ?.addEventListener('click', cargarPosts)


// FUNCIONES ADICIONALES A IMPLEMENTAR 

// ─── Toats ──────────────────────────
function mostrarToast(mensaje, tipo = 'success') {
    // Crear el elemento
    const toast = document.createElement('div')
    toast.classList.add('toast', `toast-${tipo}`)
    toast.textContent = mensaje
    
    // Agregar al body
    document.body.appendChild(toast)
    
    // Hacer visible con pequeño delay para que la animación funcione
    setTimeout(() => toast.classList.add('visible'), 10)
    
    // Desaparecer después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('visible')
        // Eliminar del DOM después de la animación
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

// Uso
 //mostrarToast("Post creado exitosamente")
 //mostrarToast("Error al eliminar el post", "error")
 