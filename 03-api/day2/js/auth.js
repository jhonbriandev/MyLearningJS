/*El access token dura poco (típicamente 60 minutos). El refresh token dura más 
(días o semanas) y sirve solo para 
pedir un nuevo access token cuando el anterior expira. */

//  Hacer login y guardar los tokens

const BASE_URL = 'http://localhost:8000/api'

async function login(username, password) {
    // BASE_URL es la dirección base del servidor (como la dirección de un edificio)
    // /token/ es la "puerta específica" dentro de ese edificio donde se hace el login
    const response = await fetch(`${BASE_URL}/token/`,{
        // Le decimos que queremos ENVIAR datos (no solo leer)
        // POST = "toma esta información y procésala"
        method: 'POST',
        headers: {
            // Le avisamos al servidor en qué "idioma" vienen los datos
            // application/json = los datos vienen en formato JSON
            'Content-Type': 'application/json'
        },
        // El contenido real que enviamos: usuario y contraseña
        // JSON.stringify convierte el objeto JS a texto, porque internet solo entiende texto
        // { username, password } es shorthand de { username: username, password: password }
        body: JSON.stringify({ username, password })
        // igual a { username: username, password: password }, verificar documentacion swagger
    })
    
    if (response.status === 401){
        throw new Error("Usuario o contraseña invalidos")
    }
    if (!response.ok){
        throw new Error(`Error al iniciar sesion ${response.status}`)
    }
    // tokens = { access: "eyJ...", refresh: "eyJ..." }
    // access → dura ~60 min | refresh → dura días/semanas
    const tokens = await response.json()

    // Guarda en localstorage
    localStorage.setItem('accessToken',tokens.access)
    localStorage.setItem('refreshToken', tokens.refresh)

    return tokens
}

function logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = './login.html'
}

function getAccessToken(){
    return localStorage.getItem('accessToken')
}

function getRefreshToken(){
    return localStorage.getItem('refreshToken') 
}

function isAuthenticated(){
    return !!getAccessToken()
    // "¿Existe un token?" → true o false
}

export{login, logout, getAccessToken,getRefreshToken,isAuthenticated,BASE_URL}