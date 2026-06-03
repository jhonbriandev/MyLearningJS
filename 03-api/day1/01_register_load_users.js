// FETCH API PARA GET, POST, UPDATE Y DELETE

// METODO POST PARA REGISTRAR USUARIO

// Seleccionamos el formulario de registro
const formEl = document.querySelector('.form_users')

// Escuchamos el submit del formulario
formEl.addEventListener('submit', async event => {
    event.preventDefault() // evita que la página se recargue

    const formData = new FormData(formEl)      // captura los campos del form
    const data = Object.fromEntries(formData)  // convierte a objeto plano

    // Enviamos los datos a la API
    const response = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data) // convierte el objeto a JSON
    })

    const result = await response.json() // convertimos la respuesta a objeto
    console.log(result)
})

/* ---------------------------------------------------------------------------------- */

// METODO GET PARA OBTENER USUARIOS

// Seleccionamos el botón y la lista donde mostraremos usuarios
const loadUsers = document.querySelector('#load_users')
const listUsers = document.querySelector('#list_users')

// Escuchamos el click del botón
loadUsers.addEventListener('click', async event => {

    const response = await fetch("http://127.0.0.1:8000/api/users/")
    const data = await response.json() // la API devuelve un objeto paginado

    // Limpiamos la lista antes de volver a cargar usuarios
    listUsers.innerHTML = ''
    
    // Recorremos los usuarios y creamos un <li> por cada uno
    data.results.forEach(element => { // Usamos data.results y no data.forEach porque 
                                      // DRF nos devuelve un objeto y no una lista, esto es por la paginacion de DRF
        const users = document.createElement('li')
        users.textContent = element.username // mostramos solo el username
        listUsers.appendChild(users)         // lo agregamos a la lista
    })
})




