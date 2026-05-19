// Construye una mini app de lista de tareas (To-Do) que:

// ESTRUCTURA HTML mínima (créala tú):
// - Un input de texto para escribir la tarea
// - Un botón "Agregar"
// - Una lista <ul> donde aparecen las tareas
// - Un contador que muestre "X tareas pendientes"

// FUNCIONALIDADES obligatorias:

// 1. Al hacer click en "Agregar" (o presionar Enter):
//    - Crea un elemento <li> con el texto de la tarea
//    - Agrega un botón "Completar" y un botón "Eliminar" dentro del <li>
//    - Limpia el input
//    - Actualiza el contador

// 2. Usando EVENT DELEGATION en el <ul>:
//    - Click en "Completar" → agrega clase 'completada' al <li>
//      y cambia el texto del botón a "Deshacer"
//    - Click en "Eliminar" → elimina el <li> con animación (opcional)
//    - Actualiza el contador en ambos casos

// 3. El contador muestra solo tareas NO completadas

// 4. Si el input está vacío al agregar, muestra un mensaje de error
//    que desaparece después de 2 segundos (usa setTimeout)

const inputUser = document.querySelector('#input-usuario')     // Seleccionamos el input de ingreso
const inputTitle = document.querySelector('#input-titulo') 
const addText = document.querySelector('#btn-agregar')         // Seleccionamos el botón agregar
const listaTasks = document.querySelector('#lista-tareas')     // Seleccionamos la lista de tareas
const cleanText = document.querySelector('#btn-limpiar')       // Seleccionamos el botón limpiar
const loadText = document.querySelector('#btn-cargar')
const listCompleted = document.querySelector('#con-completo')  // Seleccionamos el contador de completadas
const listWait = document.querySelector('#con-faltante')       // Seleccionamos el contador de faltantes
const textVoid = document.querySelector('#txtvacio')



// Función para crear una tarea — evita repetir código en click y keydown
function crearTarea() {

    if (inputTitle.value === "" || inputUser.value === ""){   // Si el input esta vacio mandar el mensaje
        textVoid.textContent = "No puedes agregar tareas sin valor"
        setTimeout(() => {
            textVoid.textContent = ""; // Y despues de 2 segundos cambiar ese mensaje por uno vacio, sin nada, no se vera
        }, 2000);
        return 
    }
    
    // Creamos una fila <tr> — es la "fila nueva" de la tabla
    const fila = document.createElement('tr')

    // Celda 1 — Usuario
    const celdaUsuario = document.createElement('td')
    celdaUsuario.textContent = inputUser.value

    // Celda 2 — ID, usamos el número de filas actuales (la primera fila es el encabezado)
    const celdaId = document.createElement('td')
    celdaId.textContent = listaTasks.rows.length  // rows.length = cuántas filas hay ya

    // Celda 3 — Título
    const celdaTitulo = document.createElement('td')
    celdaTitulo.textContent = inputTitle.value

    // Celda 4 — Estado con botones
    const celdaEstado = document.createElement('td')               // Le asignamos el texto del input

    const btnComplete = document.createElement('button')  // Creamos el botón completar
    btnComplete.textContent = "Completar"

    const btnDelete = document.createElement('button')    // Creamos el botón eliminar
    btnDelete.textContent = "Eliminar"

    celdaEstado.appendChild(btnComplete)     // Agregamos el botón completar a la celda estado
    celdaEstado.appendChild(btnDelete)       // Agregamos el botón eliminar a la celda estado

    fila.appendChild(celdaUsuario)
    fila.appendChild(celdaId)
    fila.appendChild(celdaTitulo)
    fila.appendChild(celdaEstado)

    // Agregamos la fila completa a la tabla
    listaTasks.appendChild(fila)

    listWait.textContent = parseInt(listWait.textContent) + 1  // Suma 1 al contador de faltantes


    // Evento del botón completar — alterna entre completar y deshacer
    btnComplete.addEventListener('click', function(event) {
        const boton = event.target  // El botón que se clickeó

        if (boton.textContent === 'Completar') {
            if (parseInt(listWait.textContent) > 0) {       // Solo si hay faltantes
                listCompleted.textContent = parseInt(listCompleted.textContent) + 1  // Suma 1 a completadas
                listWait.textContent = parseInt(listWait.textContent) - 1            // Resta 1 a faltantes
                boton.textContent = 'Deshacer'              // Cambia el texto del botón
            }
        } else {
            // Si el botón dice "Deshacer" — vuelve a pendiente
            listCompleted.textContent = parseInt(listCompleted.textContent) - 1  // Resta 1 a completadas
            listWait.textContent = parseInt(listWait.textContent) + 1            // Suma 1 a faltantes
            boton.textContent = 'Completar'                 // Cambia el texto del botón
        }
    })


    // Evento del botón eliminar — verifica el estado antes de restar al contador
    btnDelete.addEventListener('click', function(event) {
        const boton = event.target
        const btnCompletarDeLaTarea = boton.parentElement.querySelector('button')  // Busca el btnComplete dentro de la celda

        if (btnCompletarDeLaTarea.textContent === 'Deshacer') {
            // La tarea estaba completada — resta de completadas
            listCompleted.textContent = parseInt(listCompleted.textContent) - 1
        } else {
            // La tarea estaba pendiente — resta de faltantes
            listWait.textContent = parseInt(listWait.textContent) - 1
        }
        // Eliminamos la fila completa <tr>
        // parentElement de boton → <td>
        // parentElement de <td>  → <tr> (la fila completa)
        boton.parentElement.parentElement.remove() 
    })
}


// Evento click del botón agregar
addText.addEventListener('click', crearTarea)


// Evento keydown del input — crea tarea al presionar Enter
inputTitle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()  // Evita el comportamiento por defecto del Enter
        crearTarea()
    }
})


// Evento click del botón limpiar — vacía el input
cleanText.addEventListener('click', function() {
    inputTitle.value = ""
    inputUser.value = ""
})

loadText.addEventListener('click', async function(event){
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await response.json();

    data.forEach(element => {

        const fila = document.createElement('tr')

        const celdaUsuario = document.createElement('td')
        const celdaId = document.createElement('td')
        const celdaTitulo = document.createElement('td')
        const celdaEstado = document.createElement('td')

        celdaUsuario.textContent = element.userId
        celdaId.textContent = element.id
        celdaTitulo.textContent = element.title
        celdaEstado.textContent = element.completed
        
        fila.appendChild(celdaUsuario)
        fila.appendChild(celdaId)
        fila.appendChild(celdaTitulo)
        fila.appendChild(celdaEstado)

        // Agregamos la fila completa a la tabla
        listaTasks.appendChild(fila)

    });
})


// 5. DESAFÍO: Al cargar la página, fetch a esta API pública
//    https://jsonplaceholder.typicode.com/todos?_limit=5
//    y renderiza las primeras 5 tareas con su estado (completada o no)