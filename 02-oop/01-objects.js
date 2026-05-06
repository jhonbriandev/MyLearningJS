// Object.entries() — muy útil para iterar objetos

// Object.entries() — convierte un objeto en una lista de pares [clave, valor]
// Nos permite no solo observar sino trabajar con condiciones en cada par clave : valor
// Útil para filtrar, transformar o mostrar datos dinámicamente
// console.log(obj) solo muestra — Object.entries() permite actuar

const dev = {nombre: "Jhon", ciudad : "Lima"}
//console.log(dev)
Object.entries(dev).forEach(([clave, valor]) => {
    console.log(`${clave} : ${valor}`)
} )

const precios = { manzana: 2, pan: 5, leche: 3 }

// Puedo aplicar lógica a cada valor
Object.entries(precios).forEach(([producto, precio]) => {
    if (precio > 3) {
        console.log(`${producto} es caro`)
    } else {
        console.log(`${producto} está bien de precio`)
    }
})


/* ---------------------------------------------------------------------------------- */

// OBJECT

const usuario = {
    nombre : "Paul",
    edad : 19, 
    saludar(){ // método shorthand ES6
        return `Hola soy, ${this.nombre}`
    },
    saludarArrow: () => { // arrow function — this NO funciona aquí
        return `Hola soy, ${this.nombre}` // undefined
    }
}
console.log(usuario.nombre);
console.log(usuario["nombre"]) // Ambos son validos

// Agregar o modificar propiedades dinámicamente

usuario.ciudad = "Lima"
usuario.edad = 29

// Eliminar una propiedad
delete usuario.edad

// Verificar si existe una propiedad
console.log("nombre" in usuario)  // true
console.log("celular" in usuario) // false


/* ---------------------------------------------------------------------------------- */

//Shorthand properties — ES6

const nombre = "Jhon"
const edad = 25

// Sin shorthand
const usuarioSinShorthand = { nombre: nombre, edad: edad }
console.log(usuarioSinShorthand)

// Con shorthand — cuando la key y la variable tienen el mismo nombre
const usuarioConShorthand = { nombre, edad }
console.log(usuarioConShorthand)
// { nombre: "Jhon", edad: 25 }



