/*Cuando el access token expira, Django devuelve 401. 
En lugar de forzar al usuario a loguearse de nuevo, 
puedes pedir un nuevo access token automáticamente usando el refresh token */

import { getRefreshToken, BASE_URL, logout } from "./auth.js"
// getAccessToken no se usa en este archivo — se quitó del import

async function refreshToken() {
    const token = getRefreshToken()
    // Busca el refresh token guardado en localStorage

    if (!token){
        // No hay refresh token — sesión completamente expirada
        logout()
        return null // Detiene la función aquí, no sigue ejecutando
    }

    const response = await fetch(`${BASE_URL}/token/refresh/`,{
        method : 'POST',
        // POST porque estamos enviando el refresh token al servidor
        headers: {
            'Content-Type': 'application/json'
            // Le avisamos al servidor que los datos vienen en formato JSON
        },
        body: JSON.stringify({ refresh: token })
        // Enviamos el refresh token al servidor para que nos dé un nuevo access token
    })

    console.log('Refresh status:', response.status)

    if (!response.ok){
        // Refresh token también expiró — hay que loguearse de nuevo
        logout()
        return null
    }

    const data = await response.json()
    // data = { access: "eyJ..." } — el servidor devuelve solo el nuevo access token

    console.log('Refresh response:', data)
    
    localStorage.setItem('accessToken', data.access)
    // Reemplaza el access token viejo por el nuevo

    return data.access
    // Devuelve el nuevo token por si quien llamó esta función lo necesita usar de inmediato
}

export { refreshToken }