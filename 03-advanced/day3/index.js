// ─────────────────────────────────────────
// FUNCIONES DE VALIDACIÓN
// Cada una recibe un valor y devuelve true o false
// ─────────────────────────────────────────

// Verifica que el campo no esté vacío ni tenga solo espacios
function validarRequerido(valor) {
    return valor.trim().length > 0
}

// Verifica que el texto tenga formato de email usando una expresión regular
// La regex comprueba que haya texto, luego @, luego texto, luego punto, luego texto
function validarEmail(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(valor)
}

// Verifica que el texto tenga al menos una cantidad mínima de caracteres
function validarLongitudMinima(valor, minimo) {
    return valor.trim().length >= minimo
}


// ─────────────────────────────────────────
// FUNCIONES DE MANEJO DEL DOM
// Muestran, limpian o actualizan elementos en la pantalla
// ─────────────────────────────────────────

// Busca el span de error por su ID, escribe el mensaje y lo hace visible
function mostrarErrorCampo(idError, mensaje) {
    const errorEl = document.querySelector(`#${idError}`)
    errorEl.textContent = mensaje
    errorEl.classList.add('visible')
}

// Busca el span de error por su ID, borra el mensaje y lo oculta
function limpiarErrorCampo(idError) {
    const errorEl = document.querySelector(`#${idError}`)
    errorEl.textContent = ''
    errorEl.classList.remove('visible')
}

// Limpia todos los spans de error a la vez usando la clase compartida "error-msg"
// Se usa al inicio del submit para partir desde cero
function limpiarErrores() {
    document.querySelectorAll('.error-msg').forEach(el => {
        el.textContent = ''
        el.classList.remove('visible')
    })
}

// Muestra el mensaje de éxito y lo oculta automáticamente después de 3 segundos
function mostrarExito(mensaje) {
    const exitoEl = document.querySelector('#mensaje-exito')
    exitoEl.textContent = mensaje
    exitoEl.classList.add('visible')

    setTimeout(() => {
        exitoEl.textContent = ''
        exitoEl.classList.remove('visible')
    }, 3000)
}

// ─────────────────────────────────────────
// ESTADO DEL BOTÓN
// Deshabilita el botón mientras se espera respuesta del servidor
// para evitar que el usuario envíe el formulario dos veces
// ─────────────────────────────────────────

const btnSubmit = document.querySelector('#btn-submit')

function setEstadoCargando(cargando) {
    if (cargando) {
        btnSubmit.disabled = true
        btnSubmit.textContent = "Enviando..."
        btnSubmit.classList.add('loading')
    } else {
        btnSubmit.disabled = false
        btnSubmit.textContent = "Registrarse"
        btnSubmit.classList.remove('loading')
    }
}


// ─────────────────────────────────────────
// VALIDACIÓN EN TIEMPO REAL DEL EMAIL
// Validación del lado del cliente que ocurre sin tocar el servidor
// ─────────────────────────────────────────

// "blur" se dispara cuando el usuario sale del campo (hace clic en otro lado)
// Es mejor que validar con cada tecla, que sería molesto
document.querySelector('#email').addEventListener('blur', (event) => {
    const valor = event.target.value
    limpiarErrorCampo('error-email')

    if (!validarRequerido(valor)) {
        mostrarErrorCampo('error-email', 'El email es obligatorio')
    } else if (!validarEmail(valor)) {
        mostrarErrorCampo('error-email', 'Email no válido')
    }
})

// "input" se dispara con cada cambio en el campo
// Limpia el error mientras el usuario corrige, dando feedback inmediato
document.querySelector('#email').addEventListener('input', () => {
    limpiarErrorCampo('error-email')
})


// ─────────────────────────────────────────
// VALIDACIÓN COMPLETA DEL FORMULARIO
// Se ejecuta al hacer submit, antes de llamar al servidor
// Devuelve un objeto con los errores encontrados (vacío = sin errores)
// ─────────────────────────────────────────

function validarFormularioRegistro(datos) {
    const errores = {}  // Acumulador de errores

    if (!validarRequerido(datos.username)) {
        errores.username = "El nombre de usuario es obligatorio"
    } else if (!validarLongitudMinima(datos.username, 3)) {
        errores.username = "El nombre de usuario debe tener al menos 3 caracteres"
    }

    if (!validarRequerido(datos.email)) {
        errores.email = "El email es obligatorio"
    } else if (!validarEmail(datos.email)) {
        errores.email = "El email no tiene un formato válido"
    }

    if (!validarRequerido(datos["first_name"])) {
        errores["first_name"] = "El nombre es obligatorio"
    } else if (!validarLongitudMinima(datos["first_name"], 3)) {
        errores["first_name"] = "El nombre debe tener al menos 3 caracteres"
    }

    if (!validarRequerido(datos["last_name"])) {
        errores["last_name"] = "El apellido es obligatorio"
    } else if (!validarLongitudMinima(datos["last_name"], 3)) {
        errores["last_name"] = "El apellido debe tener al menos 3 caracteres"
    }

    if (!validarRequerido(datos.password)) {
        errores.password = "La contraseña es obligatoria"
    } else if (!validarLongitudMinima(datos.password, 8)) {
        errores.password = "La contraseña debe tener al menos 8 caracteres"
    }

    // Esta validación compara dos campos entre sí, no usa las funciones de arriba
    if (datos.password !== datos.password2) {
        errores.password2 = "Las contraseñas no coinciden"
    }

    return errores
    // Si el objeto está vacío → sin errores → formulario válido
}


// ─────────────────────────────────────────
// COMUNICACIÓN CON EL SERVIDOR
// Aquí empieza la validación del lado del servidor
// ─────────────────────────────────────────

// Envía los datos al backend de Django via fetch
// Si el servidor responde con error, lanza una excepción para que el catch la capture
async function registrarUsuario(datos) {
    const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Le avisa a Django que el cuerpo es JSON
        },
        body: JSON.stringify(datos)  // Convierte el objeto JS a texto JSON
    })

    if (!response.ok) {  // response.ok es false cuando el status es 400, 401, 500, etc.
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))  // Lanza el error para que lo atrape el catch
    }

    return await response.json()  // Si todo fue bien, devuelve la respuesta del servidor
}

// Procesa los errores que devuelve Django REST Framework
// Django los devuelve así: { "username": ["Ya existe un usuario con ese nombre"] }
function manejarErroresBackend(mensajeError) {
    try {
        const errores = JSON.parse(mensajeError)  // Convierte el string de vuelta a objeto

        // Recorre cada campo con error y muestra su mensaje en el span correspondiente
        Object.entries(errores).forEach(([campo, mensajes]) => {
            mostrarErrorCampo(`error-${campo}`, mensajes[0])  // mensajes[0] = primer error del campo
        })
    } catch {
        // Si el error no es JSON (ej: caída total del servidor), muestra mensaje genérico
        mostrarErrorCampo('error-general', 'Error inesperado. Intenta de nuevo.')
    }
}


// ─────────────────────────────────────────
// EVENTO PRINCIPAL: SUBMIT DEL FORMULARIO
// Orquesta todo el flujo: validar → enviar → manejar resultado
// ─────────────────────────────────────────

const form = document.querySelector('#form-login')

form.addEventListener('submit', async (event) => {
    event.preventDefault()  // Evita que el navegador recargue la página al enviar
    limpiarErrores()         // Borra errores anteriores antes de validar de nuevo

    // FormData captura todos los campos del form; fromEntries lo convierte en objeto plano
    const datos = Object.fromEntries(new FormData(form))

    // Validación del lado del cliente — si hay errores, muéstralos y detén todo
    const errores = validarFormularioRegistro(datos)

    if (Object.keys(errores).length > 0) {
        Object.entries(errores).forEach(([campo, mensaje]) => {
            mostrarErrorCampo(`error-${campo}`, mensaje)
        })
        return  // Sale de la función: no llega al fetch
    }

    setEstadoCargando(true)  // Deshabilita el botón mientras espera al servidor

    try {
        const respuesta = await registrarUsuario(datos)  // Llama al servidor
        console.log("Registro exitoso", respuesta)
        mostrarExito("Registro exitoso. Redirigiendo...")
        // setTimeout(() => window.location.href = '/login.html', 2000)  // Descomentar en producción
    } catch (error) {
        // El servidor respondió con un error (400, 500, etc.)
        console.error("Error del servidor:", error)
        manejarErroresBackend(error.message)
    } finally {
        // "finally" se ejecuta siempre, haya error o no
        // Garantiza que el botón se reactive pase lo que pase
        setEstadoCargando(false)
    }
})