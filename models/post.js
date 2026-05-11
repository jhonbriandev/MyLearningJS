// archivo: models/Post.js
// - Clase Post con constructor(titulo, autor, categoria)
// - estado inicial: "borrador", vistas: 0
// - método publicar()
// - getter resumen
// - Export default


export default class Post{
    constructor(titulo, autor, categoria){
        this.titulo = titulo
        this.autor = autor
        this.categoria = categoria
        this.estado = "borrador"
        this.vistas = 0
    }
    // Getter:
    // Se usa para consultar información
    // como si fuera una propiedad normal
    // NO necesita paréntesis
    get resumen() {
        return `Este post esta titulado ${this.titulo} es del autor ${this.autor} y de la categoria ${this.categoria} y su estado es ${this.estado}`
    }
    publicar(){
        this.estado = "publicado"
        return `El post ${this.titulo} esta publicado`

    }
}
