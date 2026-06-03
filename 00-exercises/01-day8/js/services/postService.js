// Importa el objeto api desde apiClient
import api from '../apiClient.js'


// El servicio solo sabe QUÉ pedirle a la API
const postService = {

    getMyPosts() {
        return api.get('my-posts/')  // llama al apiClient con el endpoint
    },
    createPosts(data){
        return api.post('posts/',data)  // llama al apiClient con el endpoint
    }

}


export default postService
