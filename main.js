// DOM

// querySelector — devuelve el PRIMER elemento que coincide

const titulo = document.querySelector('h1')    // por etiqueta
console.log(titulo)

const blog = document.querySelector('#blog')   // por ID
console.log(blog)

const cards = document.querySelector('.card')         // por clase
console.log(cards)

const boton = document.querySelector('button[type="submit"]')  // por atributo
console.log(boton)

// querySelectorAll — devuelve TODOS los que coinciden (NodeList)

const todosLosLi = document.querySelectorAll('li')
console.log(todosLosLi)

const todosLosCards = document.querySelectorAll('.card')
console.log(todosLosCards)

// NodeList no es un array — necesitas convertirlo para usar map/filter

const items = Array.from(document.querySelectorAll('li'))
items.map(item => item.textContent)
console.log(items)

// O usar spread
const items2 = [...document.querySelectorAll('li')]
console.log(items2)

// Metodos antiguos

const antiguo = document.getElementById('blog')           // solo por ID
console.log(antiguo)
document.getElementsByClassName('card')   // por clase
document.getElementsByTagName('li')       // por etiqueta

/* ---------------------------------------------------------------------------------- */

const titulo2 = document.querySelector('h1')
// Leer contenido
console.log(titulo.textContent)   // texto sin HTML — "Mi Blog"
console.log(titulo.innerHTML)     // texto con HTML "<strong>Título</strong>"

// Modificar contenido
console.log(titulo.textContent = "Nuevo título")
console.log(titulo.innerHTML = "<strong>Título</strong> en negrita")
// innerHTML Permite leer o modificar mostrando las etiquetas HTML
// el textContent solo mostrara el contenido

// Leer y modificar atributos
const link = document.querySelector('a')
console.log(link.getAttribute('href'))  // leer atributo
link.setAttribute('href', '/li') // modificar atributo, devuelve undefined pero si se separa en dos lineas veremos lo que paso
console.log(link.href) // cambio el href por un li
console.log(link.removeAttribute('href'))     // eliminar atributo
 
// Acceso directo a atributos comunes
link.href     // equivalente a getAttribute('href')
link.id
link.className

// Modificar estilos
console.log(titulo2.style.color = 'blue')
console.log(titulo2.style.fontSize = '44px')
//console.log(titulo2.style.display = 'none')   // ocultar elemento

// Mejor práctica — usar clases en lugar de estilos inline
titulo.classList.add('activo')
titulo.classList.remove('oculto')
titulo.classList.toggle('destacado')   // agrega si no está, quita si está
titulo.classList.contains('activo')    // true o false

/* ---------------------------------------------------------------------------------- */

// CREAR Y AGREGAR ELEMENTOS — createElement

const nuevoPost = document.createElement('li') // Creamos un elemento <li>
nuevoPost.textContent = "Mi nuevo post"         // Le asignamos un texto
nuevoPost.classList.add('post-item')            // Le agregamos la clase 'post-item' al elemento
console.log(nuevoPost)

// Agregar al DOM
const lista = document.querySelector('#lista-posts') // Seleccionamos el <ul> con id="lista-posts"
                                                     // que ya existe en el HTML
lista.appendChild(nuevoPost)         // Agrega el <li> al FINAL de la lista
lista.prepend(nuevoPost)             // Agrega el <li> al INICIO de la lista
lista.insertBefore(nuevoPost, lista.firstChild)  // Agrega el <li> antes del primer hijo de la lista
console.log("Lista",lista)

// Forma moderna — más flexible
lista.insertAdjacentHTML('beforeend', '<li class="post-item">Post Viejo</li>')
// posiciones: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// Eliminar elementos
const itemObsoleto = document.querySelector('.obsoleto')
itemObsoleto.remove()                 // elimina el elemento
//lista.removeChild(itemObsoleto)       // el padre elimina un hijo específico, solo usar uno de los dos

// Clonar elementos
const clonNuevoPost = nuevoPost.cloneNode(true)  // true = copia profunda con hijos
lista.appendChild(clonNuevoPost)
console.log("Clon de Nuevo Post",clonNuevoPost)

/* ---------------------------------------------------------------------------------- */

//Crear elementos complejos 

function crearCardPost(post) {
    const card = document.createElement('div')
    card.classList.add('card', 'post-card')
    card.dataset.id = post.id  // atributo data-id="1"
    
    card.innerHTML = `
        <h2 class="card-titulo">${post.titulo}</h2>
        <p class="card-autor">Por ${post.autor}</p>
        <span class="card-estado ${post.estado}">${post.estado}</span>
        <button class="btn-editar" data-slug="${post.slug}">Editar</button>
    `
    
    return card
}

// Renderizar lista de posts desde la API
async function renderizarPosts() {
    const posts = await getPosts()
    const contenedor = document.querySelector('#posts-contenedor')
    
    contenedor.innerHTML = ''  // limpiar antes de renderizar
    
    posts.forEach(post => {
        const card = crearCardPost(post)
        contenedor.appendChild(card)
    })
}

/* ---------------------------------------------------------------------------------- */

/* EVENTOS — hacer que la página responda al usuario
Un evento es cualquier acción del usuario: click, tecla, scroll, hover, submit de formulario.*/

const boton2 = document.querySelector('#btn-crear')
// addEventListener — la forma correcta
boton2.addEventListener('click', function(event) {
    console.log("Click detectado")
    console.log(event)          // objeto con info del evento
    console.log(event.target)   // el elemento que fue clickeado
})

// Con arrow function — más común
boton2.addEventListener('click', (event) => {
    console.log("Click en:", event.target.textContent)
})

// Eventos comunes
//boton2.addEventListener('click', handler)        // click del mouse
boton2.addEventListener('dblclick',  function(event) {
    console.log("Doble Click detectado")
    })                                             // doble click
//boton2.addEventListener('mouseover', handler)    // mouse encima
//boton2.addEventListener('keydown', handler)      // tecla presionada
//boton2.addEventListener('keyup', handler)        // tecla soltada
//boton2.addEventListener('submit', handler)       // formulario enviado
//boton2.addEventListener('input', handler)        // input cambia
//boton2.addEventListener('change', handler)       // input pierde foco con cambio
//boton2.addEventListener('DOMContentLoaded', handler)  // DOM listo

// El objeto event — información del evento:
document.addEventListener('keydown', (event) => {
    console.log(event.key)        // "Enter", "a", "Escape"
    console.log(event.ctrlKey)    // true si Ctrl está presionado
    console.log(event.target)     // elemento que disparó el evento
})

// Prevenir comportamiento por defecto
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()  // evita que el form recargue la página
    // aquí manejas el submit con fetch a tu API
})

const link2 = document.querySelector('a')
link2.addEventListener('click', (event) => {
    event.preventDefault()  // evita la navegación
    event.stopPropagation() // evita que el evento suba al padre
})

/* ---------------------------------------------------------------------------------- */

// EVENT DELEGATION
// Optimizar los Eventos
// event delegation — poner un solo listener en el padre y dejar que los eventos "suban" (bubble) hasta él:


const lista2 = document.querySelector('#lista-posts')
lista2.addEventListener('click', (event) => {
    // event.target es el elemento exacto que fue clickeado
    const item = event.target.closest('.post-item')
    
    if (!item) return  // el click no fue en un post-item
    
    console.log("Post clickeado:", item.dataset.id)
})

/*¿Cómo funciona el bubbling?
Click en <button> dentro de <li> dentro de <ul>
→ El evento sube: button → li → ul → div → body → document
→ El listener en ul lo captura con event.target = button */

