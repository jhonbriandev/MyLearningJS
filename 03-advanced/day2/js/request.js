// request.js
// Interceptor de peticiones autenticadas.
// Cualquier llamada a la API que requiera token debe pasar por fetchWithAuth()
// en lugar de usar fetch() directamente.

import { BASE_URL, getAccessToken } from "./auth.js"
// BASE_URL      → dirección base del servidor, ej: "http://localhost:8000/api"
// getAccessToken → lee el access token guardado en localStorage

import { refreshToken } from "./tokens.js"
// refreshToken  → pide un nuevo access token usando el refresh token
//                 si el refresh también expiró, llama a logout() automáticamente

// endpoint → la parte de la URL después de BASE_URL, ej: "/posts/"
// options  → configuración extra de fetch (method, body, headers adicionales)
//            si no se pasa nada, por defecto es un objeto vacío {}
async function fetchWithAuth(endpoint, options = {}) {

    const token = getAccessToken()
    // Se lee el token actual antes de armar la petición.
    // Si no hay sesión activa, token será null.

    const config = {
        // Se copian todas las opciones que llegaron como parámetro
        // (method, body, etc.) para no perderlas.
        // El operador "..." (spread) es como decir "trae todo lo que hay aquí".
        ...options,
        headers: {
            // Toda petición le avisa al servidor que los datos vienen en JSON
            'Content-Type': 'application/json',

            // El token se adjunta en cada petición automáticamente.
            // El desarrollador que llama a fetchWithAuth() no tiene que
            // preocuparse por esto — el interceptor lo hace solo.
            'Authorization': `Bearer ${token}`,

            // Si quien llamó a fetchWithAuth() pasó headers adicionales,
            // se agregan aquí sin pisar los de arriba.
            ...options.headers
        }
    }

    // Primera petición al servidor con el token actual.
    // "let" en lugar de "const" porque si el token expira,
    // se necesita reasignar response con la segunda petición.
    let response = await fetch(`${BASE_URL}${endpoint}`, config)

    console.log('Primer intento:', response.status)

    // 401 casi siempre significa token inválido o expirado.
    // Algunos proyectos con SimpleJWT pueden devolver 403 para token_not_valid.
    if (response.status === 401 || response.status === 403) {

        let errorData = null

        try {
            errorData = await response.clone().json()
        } catch {
            // Algunas respuestas pueden no venir en JSON.
        }

        console.log('Respuesta de autenticación:', errorData)

        const tokenError =
            errorData?.code === 'token_not_valid'

        // Solo intentamos refrescar si realmente el problema es el JWT.
        if (response.status === 401 || tokenError) {

            console.log('Token expirado, intentando refresh...')

            // Se pide un nuevo access token usando el refresh token.
            // Si el refresh también expiró, refreshToken() llama a logout()
            // internamente y devuelve null.
            const newToken = await refreshToken()

            console.log('Nuevo token:', newToken)

            // Si newToken es null, el logout ya fue ejecutado dentro de refreshToken().
            // Se retorna null para que quien llamó a fetchWithAuth() sepa que falló.
            if (!newToken) return null

            // Se reemplaza el token viejo por el nuevo en los headers
            // y se repite exactamente la misma petición original.
            // El usuario no nota nada — la petición se completó de forma transparente.
            config.headers['Authorization'] = `Bearer ${newToken}`

            response = await fetch(`${BASE_URL}${endpoint}`, config)

            console.log('Segundo intento:', response.status)
        }
    }

    // Se devuelve la respuesta final — ya sea la primera (si el token era válido)
    // o la segunda (si se tuvo que renovar).
    // Quien llama a fetchWithAuth() recibe la respuesta y decide qué hacer con ella.
    return response
}

export { fetchWithAuth }