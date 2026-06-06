// login.js
import api from './apiClient.js'

// Credenciales fijas para probar
const credentials = {
    username: 'mrapi',
    password: 'carloncho123'
}

// Hace el login y guarda el token
const data = await api.post('token/', credentials)
localStorage.setItem('token', data.access)

console.log('token guardado:', data.access)