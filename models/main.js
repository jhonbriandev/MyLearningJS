// archivo: main.js
// - Importa Post y las tres utilidades
// - Crea 4 posts, publica 2 de ellos
// - Usa las tres utilidades y muestra los resultados en consola

import Post from "/models/post.js"

const myPost = new Post("Bienvenidos a todos","Hector","Social"); // creamos el objeto
console.log(myPost.resumen) // Mostramos el resumen inicial del post
                            // Accedemos al getter "resumen"
                            // Los getters NO usan paréntesis
console.log(myPost.publicar()) // Llamamos al método publicar()
                                // Los métodos sí usan paréntesis
console.log(myPost.resumen) // Para verlo despues de publicar