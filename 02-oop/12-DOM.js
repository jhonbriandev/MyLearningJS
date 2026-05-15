// querySelector — devuelve el PRIMER elemento que coincide
const titulo = document.querySelector('h1')           // por etiqueta
const blog = document.querySelector('#blog')          // por ID
const cards = document.querySelector('.card')         // por clase
const boton = document.querySelector('button[type="submit"]')  // por atributo

// querySelectorAll — devuelve TODOS los que coinciden (NodeList)
const todosLosLi = document.querySelectorAll('li')
const todasLasCards = document.querySelectorAll('.card')

// NodeList no es un array — necesitas convertirlo para usar map/filter
const items = Array.from(document.querySelectorAll('li'))
items.map(item => item.textContent)

// O usar spread
const items2 = [...document.querySelectorAll('li')]