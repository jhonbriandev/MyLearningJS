// login.js
// Maneja el formulario de login.html.
// Se enlaza solo en login.html:
// <script type="module" src="./js/login.js"></script>

import { login } from './auth.js'
// login() → hace POST a /api/token/ con usuario y contraseña,
//           guarda los tokens en localStorage si las credenciales son correctas,
//           y lanza un Error si no lo son.

// "event" es el objeto que el navegador crea automáticamente
// cada vez que ocurre una acción, en este caso el submit del formulario.
async function handlerLogin(event) {

    // Cancela el comportamiento por defecto del formulario,
    // que sería recargar la página y enviar los datos por la URL.
    // Con esto se toma control total del envío desde JavaScript.
    event.preventDefault()

    // Se leen los valores que el usuario escribió en los campos.
    // document.querySelector busca el elemento por su id en el HTML.
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value

    try {
        // Se llama a login() de auth.js.
        // "await" detiene la ejecución aquí hasta que el servidor responda.
        // Si las credenciales son incorrectas, login() lanza un Error
        // y la ejecución salta directamente al bloque catch.
        await login(username, password)

        // Si llegó hasta aquí, el login fue exitoso y los tokens ya están guardados.

        // Se revisa si protect.js guardó una URL pendiente antes de redirigir al login.
        // Ejemplo: el usuario intentó ir a dashboard.html sin sesión →
        // protect.js guardó esa URL → ahora se le lleva ahí directamente.
        // Si no hay URL pendiente, se va al dashboard por defecto.
        const redirect = localStorage.getItem('redirectAfterLogin') || './dashboard.html'

        // Se limpia la entrada del localStorage para no reutilizarla
        // en futuros logins.
        localStorage.removeItem('redirectAfterLogin')

        // Se redirige al usuario a la página que corresponde.
        window.location.href = redirect

    } catch (error) {
        // Si login() lanzó un error (credenciales incorrectas o fallo del servidor),
        // se muestra el mensaje en el elemento #error-msg del HTML.
        // El CSS de login.html lo hace visible automáticamente cuando tiene texto.
        document.querySelector('#error-msg').textContent = error.message
    }
}

// Se conecta la función handlerLogin al evento submit del formulario.
// Cada vez que el usuario presione "Iniciar sesión" o Enter,
// el navegador llama a handlerLogin automáticamente.
document.querySelector('#form-login')
    .addEventListener('submit', handlerLogin)