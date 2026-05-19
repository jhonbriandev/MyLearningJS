// js/api.js
const BASE_URL = 'http://localhost:8000/api'

async function request(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    return response.json()
}
export async function getPosts() {
    return request('/posts/')
}

export async function getPost(slug) {
    return request(`/posts/${slug}/`)
}

export async function getCategorias() {
    return request('/categories/')
}