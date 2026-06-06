// apiClient.js
// Objeto central que sabe cómo hablar con la API
const api = {

    // URL base, se junta con el endpoint en cada petición
    baseURL: 'http://127.0.0.1:8000/api/',

    // Arma los headers para cada petición
    // Si hay token en localStorage lo agrega, si no, solo envía Content-Type
    getHeaders() {
        const headers = { 'Content-Type': 'application/json' }
        const token = localStorage.getItem('token')
        if (token) headers['Authorization'] = `Bearer ${token}`
        return headers
    },

    // Método base que todos los demás usan
    // endpoint: la parte final de la URL, ejemplo: 'my-posts/'
    // options: configuración extra como method, body, etc.
    async request(endpoint, options = {}) {

        const response = await fetch(this.baseURL + endpoint, {
            headers: this.getHeaders(), // agrega los headers en cada petición
            ...options                  // agrega method, body, etc según el verbo
        })

        // Si Django responde con error (400, 401, 404...) lanza un error
        if (!response.ok) throw new Error(`Error ${response.status}`)

        // 204 significa "ok pero sin contenido", no se puede parsear como JSON
        if (response.status === 204) return null

        // Convierte la respuesta a objeto JavaScript y la devuelve
        return response.json()
    },

    // Métodos por verbo HTTP, cada uno llama a request() con su configuración
    get(endpoint)          { return this.request(endpoint) },
    post(endpoint, data)  { return this.request(endpoint, { method: 'POST',  body: JSON.stringify(data) }) },
    patch(endpoint, data) { return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }) },
    delete(endpoint)       { return this.request(endpoint, { method: 'DELETE' }) }

}

export default api