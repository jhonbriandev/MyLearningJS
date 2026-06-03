// protect.js
// Pegar este script en CADA página que requiera login
// Ejemplo en dashboard.html: <script type="module" src="./protect.js"></script>

import { isAuthenticated } from './auth.js'

document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        // Guardar la página actual para redirigir después del login
        localStorage.setItem('redirectAfterLogin', window.location.href)
        window.location.href = './login.html'
        return
    }

    // Si llegó aquí, el usuario está autenticado — continuar normalmente
    initializePage()
})