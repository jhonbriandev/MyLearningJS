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

// Limpia todos los elementos con clase "error-msg" a la vez
// Se llama al inicio del submit para partir desde cero sin errores anteriores
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
// VALIDACIÓN EN TIEMPO REAL — VALIDACIÓN DEL LADO DEL CLIENTE
// Ocurre en el navegador sin ninguna llamada al servidor
// ─────────────────────────────────────────

// "blur" se dispara cuando el usuario abandona el campo (hace clic en otro lado)
// Es el momento ideal para validar: no mientras escribe, porque sería molesto
document.querySelector('#username').addEventListener('blur', (event) => {
    const valor = event.target.value
    limpiarErrorCampo('error-username')  // Limpia error previo antes de re-validar

    if (!validarRequerido(valor)) {
        mostrarErrorCampo('error-username', 'El username es obligatorio')
    } else if (!validarLongitudMinima(valor, 3)) {
        mostrarErrorCampo('error-username', 'El username debe tener al menos 3 caracteres')
    }
})

// "input" se dispara con cada cambio en el campo
// Limpia el error mientras el usuario corrige, dando feedback positivo inmediato
document.querySelector('#username').addEventListener('input', () => {
    limpiarErrorCampo('error-username')
})

// Misma lógica de blur para el campo password
// El mínimo es 8 porque es el requisito de seguridad definido en el ejercicio
document.querySelector('#password').addEventListener('blur', (event) => {
    const valor = event.target.value
    limpiarErrorCampo('error-password')

    if (!validarRequerido(valor)) {
        mostrarErrorCampo('error-password', 'El password es obligatorio')
    } else if (!validarLongitudMinima(valor, 8)) {  // ← mínimo 8 para password
        mostrarErrorCampo('error-password', 'El password debe tener al menos 8 caracteres')
    }
})

// Limpia el error del password mientras el usuario escribe
document.querySelector('#password').addEventListener('input', () => {
    limpiarErrorCampo('error-password')
})


// ─────────────────────────────────────────
// VALIDACIÓN COMPLETA DEL FORMULARIO — VALIDACIÓN DEL LADO DEL CLIENTE
// Se ejecuta al hacer submit, antes de llamar al servidor
// Devuelve un objeto con los errores encontrados (vacío = sin errores = formulario válido)
// ─────────────────────────────────────────

function validarFormularioLogin(datos) {
    const errores = {}  // Acumulador: se le agregan propiedades por cada campo inválido

    if (!validarRequerido(datos.username)) {
        errores.username = "El nombre de usuario es obligatorio"
    } else if (!validarLongitudMinima(datos.username, 3)) {
        errores.username = "El nombre de usuario debe tener al menos 3 caracteres"
    }

    if (!validarRequerido(datos.password)) {
        errores.password = "La contraseña es obligatoria"
    } else if (!validarLongitudMinima(datos.password, 8)) {
        errores.password = "La contraseña debe tener al menos 8 caracteres"
    }

    return errores
    // Si el objeto está vacío → sin errores → el formulario puede continuar al servidor
}


// ─────────────────────────────────────────
// COMUNICACIÓN CON EL SERVIDOR — VALIDACIÓN DEL LADO DEL SERVIDOR
// A partir de aquí los datos viajan a Django y el servidor decide si son válidos
// ─────────────────────────────────────────

const BASE_URL = 'http://localhost:8000/api'

// Envía username y password al endpoint de tokens de Django
// Si el servidor responde con error, lanza una excepción para que el catch la capture
async function login(username, password) {

    const response = await fetch(`${BASE_URL}/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Le avisa a Django que el cuerpo es JSON
        },
        body: JSON.stringify({ username, password })  // Convierte el objeto a texto JSON
    })

    // 401 significa credenciales incorrectas — error conocido y esperado
    if (response.status === 401) {
        throw new Error('Usuario o contraseña incorrecta')
    }

    // Cualquier otro error del servidor (500, 503, etc.) — error inesperado
    if (!response.ok) {
        throw new Error(`Error al iniciar sesión ${response.status}`)
    }

    const tokens = await response.json()

    // Guarda los tokens en localStorage para usarlos en futuras peticiones autenticadas
    localStorage.setItem('accessToken', tokens.access)
    localStorage.setItem('refreshToken', tokens.refresh)

    return tokens
}


// ─────────────────────────────────────────
// EVENTO PRINCIPAL: SUBMIT DEL FORMULARIO
// Orquesta todo el flujo: validar cliente → enviar → manejar resultado del servidor
// ─────────────────────────────────────────

const form = document.querySelector('#form-login')

form.addEventListener('submit', async (event) => {
    event.preventDefault()  // Evita que el navegador recargue la página al enviar
    limpiarErrores()         // Borra errores anteriores antes de validar de nuevo

    // FormData captura todos los campos del form por su atributo "name"
    // fromEntries lo convierte en un objeto plano: { username: "...", password: "..." }
    const datos = Object.fromEntries(new FormData(form))

    // ── Validación del lado del cliente ──
    // Si hay errores, se muestran en sus spans y se detiene todo — no llega al fetch
    const errores = validarFormularioLogin(datos)

    if (Object.keys(errores).length > 0) {
        Object.entries(errores).forEach(([campo, mensaje]) => {
            mostrarErrorCampo(`error-${campo}`, mensaje)
        })
        return  // Sale de la función sin continuar al servidor
    }

    setEstadoCargando(true)  // Deshabilita el botón para evitar doble envío

    // ── Validación del lado del servidor ──
    // Si login() lanza un error, el catch lo captura y lo muestra en el div general
    try {
        const respuesta = await login(datos.username, datos.password)
        console.log("Ingreso exitoso", respuesta)
        mostrarExito("Ingreso exitoso. Redirigiendo...")
        // Redirige a la página principal después de 1.5 segundos
        setTimeout(() => window.location.href = './index.html', 1500)
    } catch (error) {
        // Muestra el mensaje del error directamente en el div de error general
        // No necesita parsear JSON porque login() ya lanza strings legibles
        console.error("Error del servidor:", error)
        mostrarErrorCampo('error-general', error.message)
    } finally {
        // Se ejecuta siempre, haya éxito o error
        // Garantiza que el botón se reactive pase lo que pase
        setEstadoCargando(false)
    }
})