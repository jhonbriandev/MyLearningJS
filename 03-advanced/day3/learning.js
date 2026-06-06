// VALIDACIONES EN FRONTEND

// Sin preventDefault cualquier submit recarga la página y pierdes los datos, 
// el estado y la sesión visible

const form = document.querySelector('#form-login')

form.addEventListener('submit', (event) => {
    event.preventDefault()  // detiene la recarga
    // ahora puedes manejar el submit con fetch
    console.log("Formulario enviado sin recargar")

    // PARA LEER LOS DATOS DEL FORMULARIO, EXISTEN HASTA 3 METODOS


    // Opción 1 — querySelector por cada campo
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    
    // Opción 2 — FormData (más práctico con muchos campos)
    const formData = new FormData(form)
    const username2 = formData.get('username')
    const password2 = formData.get('password')
    
    // Opción 3 — Convertir FormData a objeto plano
    const datos = Object.fromEntries(new FormData(form))
    // datos = { username: "jhon", password: "1234" }
    
    // IMPORTANTE : FormData requiere que cada input tenga el atributo name en el HTML:
    // <input type="password" id="password" name="password" />
    console.log(datos)
})

// Funciones de validación — una por regla
function validateRequired(value) {
    return value.trim().length > 0
}

function validateEmail(value) {
    // Expresión regular básica para email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value)
}

function ValidateMinLength(value, min) {
    return value.trim().length >= min
}

// Función para mostrar error en un campo específico
function ShowErrorField(idError, message) {
    const errorEl = document.querySelector(`#${idError}`)
    errorEl.textContent = message
    errorEl.classList.add('visible')
}

// Función para limpiar error de un campo
function cleanErrorField(idError) {
    const errorEl = document.querySelector(`#${idError}`)
    errorEl.textContent = ''
    errorEl.classList.remove('visible')
}

// Función para limpiar todos los errores
function CleanErrors() {
    document.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = ''
        el.classList.remove('visible')
    })
}