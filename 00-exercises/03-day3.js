// Array de posts simulando datos de una base o API
const posts = [
    { id: 1, titulo: "Intro a Python", autor: "jhon", estado: "publicado", vistas: 1200, categoria: "tech" },
    { id: 2, titulo: "Django REST", autor: "ana", estado: "borrador", vistas: 0, categoria: "tech" },
    { id: 3, titulo: "Aprende SQL", autor: "jhon", estado: "publicado", vistas: 850, categoria: "database" },
    { id: 4, titulo: "React Hooks", autor: "luis", estado: "publicado", vistas: 2300, categoria: "tech" },
    { id: 5, titulo: "PostgreSQL avanzado", autor: "jhon", estado: "borrador", vistas: 0, categoria: "database" },
]

// Recorremos los posts para mostrar información formateada
// (Aquí filtras solo publicados, aunque el ejercicio pedía todos)
for (const post of posts ){
    if (post.estado === "publicado")
    console.log(`Post #${post.id}: ${post.titulo} (${post.estado})`)
}


// Objeto de configuración típico (ej: preferencias de usuario)
const config = { idioma: "es", tema: "oscuro", notificaciones: true }

// Recorremos cada propiedad del objeto (clave → valor)
// usando for...in, útil para objetos simples
for (const clave in config){
    console.log(`${clave}: ${config[clave]}`)
}


// Clase que representa un Post con estado y comportamiento
class Post{

    constructor(titulo,autor,categoria){
        // Datos que vienen desde fuera (entrada del usuario o API)
        this.titulo = titulo
        this.autor = autor
        this.categoria = categoria

        // Estado interno controlado por la clase
        // (no se recibe como parámetro para mantener consistencia)
        this.estado = "borrador"
        this.vistas = 0
    }

    publicar(){
        // Cambia el estado del post a publicado
        // simulando una acción de negocio (no solo visual)
        this.estado = "publicado"

        // Retornamos un mensaje en lugar de imprimir directamente
        // para mantener la función reutilizable
        return `El post ${this.titulo} está ${this.estado}`
    }

    get resumen(){
        // Getter que construye una representación legible del post
        // combinando varias propiedades sin modificar el objeto
        return `Este post se titula ${this.titulo}, es del autor ${this.autor} y está en estado ${this.estado}`
    }

    static fromObject(obj){
        // Método fábrica: convierte un objeto plano en una instancia de Post
        // útil cuando los datos vienen de una API o JSON
        return new Post (obj.titulo,obj.autor,obj.categoria)
    }
}


// Creamos una instancia manualmente (forma tradicional)
const mypost = new Post("Dala","Ogren","novela")

// Ejecutamos lógica del objeto (cambio de estado)
console.log(mypost.publicar())

// Accedemos al getter (se usa como propiedad, no como función)
console.log(mypost.resumen)


// Simulamos datos externos (ej: respuesta de API)
const data = {
    titulo: "Mi post",
    autor: "Juan",
    categoria: "Tech"
}

// Convertimos objeto plano a instancia de clase
const randomPost  = Post.fromObject(data)
console.log(randomPost)


// Creamos dos instancias para probar comportamiento independiente
const mypost2 = new Post("300","Augusto","novela")
console.log(mypost2.publicar()) // este cambia a publicado
console.log(mypost2.resumen)

const mypost3 = new Post("Odisea","Odin","drama")
// este sigue en borrador (no se llamó publicar)
console.log(mypost3.resumen)


// Función segura para obtener ciudad
// Maneja casos donde el usuario puede ser null o incompleto
const getCiudad = (usuario) => usuario?.ciudad ?? "Lima"

// Pruebas de distintos escenarios posibles
console.log(getCiudad(null))              // usuario inexistente
console.log(getCiudad({}))                // objeto sin ciudad
console.log(getCiudad({ ciudad: "Cusco" })) // caso válido