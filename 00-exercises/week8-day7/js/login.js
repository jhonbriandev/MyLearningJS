// METODO LOGIN PARA TRABAJAR CON LOS POSTS

export async function login() {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: "mrapi", password: "carloncho123" })
    })
    const data = await response.json()
    
    console.log(data)
    // Guardamos el token en localStorage — persiste aunque recargues la página
    localStorage.setItem('token', data.access)
}

login()