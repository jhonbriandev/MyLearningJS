// Importa el objeto api desde apiClient
import api from '../apiClient.js'

// El servicio solo sabe QUÉ pedirle a la API
const categoryService = {

    getCategories() {
        return api.get('categories/')  // llama al apiClient con el endpoint
    }

}

export default categoryService