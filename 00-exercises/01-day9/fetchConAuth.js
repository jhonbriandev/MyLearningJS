// Usando tu API del blog, implementa estas 4 funciones
// en un archivo auth.js. Todo lo necesario está en la clase de hoy.

// 1. login(username, password)
//    - POST a /api/token/
//    - Guarda access y refresh en localStorage
//    - Lanza error si las credenciales son incorrectas

// 2. logout()
//    - Elimina ambos tokens de localStorage

// 3. estaAutenticado()
//    - Retorna true si hay accessToken, false si no

// 4. fetchConAuth(endpoint, options)
//    - Agrega el header Authorization automáticamente
//    - Si recibe 401, intenta refrescar el token una vez
//    - Si el refresh falla, llama a logout()

// Prueba en la consola del navegador:
// - login('tu_usuario', 'tu_password') → debe guardar tokens
// - estaAutenticado() → debe retornar true
// - fetchConAuth('/posts/') → debe traer posts
// - logout() → debe limpiar localStorage
// - estaAutenticado() → debe retornar false

const BASE_URL = 'http://localhost:8000/api'

async function login(username, password) {
    
    const response = await fetch(`${BASE_URL}/token/`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    if (response.status === 401){
        throw new Error('Usuario o contraseña incorrecta')
    }
    if (!response.ok){
        throw new Error(`Error al iniciar sesion ${response.status}`)
    }
    const tokens = await response.json()

    localStorage.setItem('accessToken',tokens.access)
    localStorage.setItem('refreshToken',tokens.refresh)

    return tokens
}

function logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.href = './index.html'
}

function getAccessToken(){
    return localStorage.getItem('accessToken')
}

function getRefreshToken(){
    return localStorage.getItem('refreshToken')
}

function isAuthenticated(){
    return !!getAccessToken()
}

async function refreshToken() {
    const token = getRefreshToken()

    if(!token){
        logout()
        return null
    }
    
    const response = await fetch(`${BASE_URL}/token/refresh/`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({refresh : token})
    
    })

    console.log('Refresh status:', response.status)

    if(!response.ok){
        logout()
        return null
    }

    const data = await response.json()
    console.log('Refresh response:', data)
    localStorage.setItem('accessToken', data.access)

    return data.access
}

async function fetchWithAuth(endpoint, options = {}) {
    const token = getAccessToken()
    const config = {
        ...options,
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
            ...options.headers
        }
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, config)
    console.log('Primer intento:', response.status)

    if(response.status === 401 || response.status === 403){

        let errorData = null

        try {
            errorData = await response.clone().json()
        }catch{

        }
        
        console.log('Respuesta de autenticación:', errorData)
        
        const tokenError = errorData?.code === 'token_not_valid'

        if (response.status === 401 || tokenError){

            console.log('Token expirado, intentando refresh...')
            
            const newToken = await refreshToken()

            console.log('Nuevo token:', newToken)

            if (!newToken) return null

            config.headers['Authorization'] =`Bearer ${newToken}`

            response = await fetch(`${BASE_URL}${endpoint}`, config)

            console.log('Segundo intento:', response.status)
        }
    }

    return response
}

export { login, logout, isAuthenticated, fetchWithAuth }