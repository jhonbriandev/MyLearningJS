// CLASES

// Una clase es una forma de crear objetos usando una plantilla.

// ANTES SIN ES6

function User(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

// AHORA CON ES6 

class Usuario {
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    saludar(){
        return `Hola soy, ${this.nombre}`;
    }
}

// creacion de objeto
const user1 = new Usuario("Juan", 25); // Pasando los atributos que haran ref a nombre y edad
console.log(user1.saludar())



class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    vender(cantidad) {
        if (cantidad > this.stock) {
            return "Stock insuficiente";
        }

        this.stock -= cantidad; // igual a  this.stock = this.stock - cantidad
        return `Venta realizada. Stock restante: ${this.stock}`;
    }
}

const primeraVenta = new Producto("Detergente",4, 12) // Creamos el objeto con sus parametros
console.log(primeraVenta.vender(7)) // Simulamos la venta con el metodo vender
                                    // Es importante que entendamos que el stock no puede ser menor a la 
                                    // orden de venta, sino sera insuficiente
                                    // Vender es metodo por eso lleva parentesis, y alli ubicamos 
                                    // la cantidad de la venta simulada

/* ---------------------------------------------------------------------------------- */

class Animal {
    // constructor es equivalente a __init__ en Python
    constructor(nombre, especie) {
        this.nombre = nombre      // this equivale a self
        this.especie = especie
    }

    // Método normal
    describir() {
        return `${this.nombre} es un ${this.especie}`
    }

    // Método estático — no necesita instancia
    static crearDesconocido() {
        return new Animal("Desconocido", "sin clasificar")
    }

    // Getter — equivalente a @property en Python
    get nombreMayusculas() {
        return this.nombre.toUpperCase()
    }
    // Setter
    set nombreNuevo(valor) {
        if (valor.length < 2) throw new Error("Nombre muy corto")
        this.nombre = valor
    }
}

// Herencia
class Perro extends Animal {
    constructor(nombre, raza) {
        super(nombre, "perro")  // llama al constructor del padre, indicando que la especie sera "perro"
        this.raza = raza
    }

    describir() {
        return `${super.describir()} de raza ${this.raza}`
    }
}

const perro1 = new Perro("Rambo","canina") // crear objeto, pasarle sus atributos
console.log(perro1.describir())            // imprimir objeto, con su metodo

const desconocido = Animal.crearDesconocido() 
// Llama al método estático de la clase Animal.
// No necesitas crear una instancia antes.
// El método internamente hace: new Animal("Desconocido", "sin clasificar")
// y devuelve ese objeto, que se guarda en la variable "desconocido".

console.log(desconocido.describir()) 
// Llama al método "describir" del objeto creado.
// Como "desconocido" es una instancia de Animal,
// puede usar sus métodos normales.
// Imprime: "Desconocido es un sin clasificar"

console.log(perro1.nombreMayusculas) // LLamar el objeto de mayusculas

