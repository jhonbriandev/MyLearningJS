// DIFERENCIA 3 — Prototype vs Clases

// Esta es la diferencia más profunda en cómo cada lenguaje maneja la orientación a objetos.
// Python — clases basadas en herencia clásica
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def hablar(self):
        return f"{self.nombre} hace un sonido"

class Perro(Animal):
    def hablar(self):
        return f"{self.nombre} dice guau"

perro = Perro("Max")
perro.hablar()  // "Max dice guau"


// JavaScript — herencia basada en prototype
// Las clases ES6 son sintaxis sobre el sistema de prototypes

// Lo que parece una clase...
class Animal {
    constructor(nombre) {
        this.nombre = nombre
    }
    hablar() {
        return `${this.nombre} hace un sonido`
    }
}

// ...internamente es esto:
function Animal(nombre) {
    this.nombre = nombre
}
Animal.prototype.hablar = function() {
    return `${this.nombre} hace un sonido`
}
/*¿Qué es un prototype?
En JavaScript cada objeto tiene una referencia a otro objeto llamado su prototipo. Cuando buscas una propiedad en un objeto y no la encuentra, sube al prototipo a buscarla. Eso forma una cadena:
javascriptconst perro = new Animal("Max")*/

// Cuando llamas perro.hablar():
// 1. ¿perro tiene hablar? No
// 2. ¿Animal.prototype tiene hablar? Sí → lo usa

// Puedes ver el prototype
console.log(Object.getPrototypeOf(perro) === Animal.prototype) // true

// Incluso puedes agregar métodos después de crear la clase
Animal.prototype.correr = function() {
    return `${this.nombre} corre`
}

perro.correr()  // "Max corre" — funciona aunque se agregó después

/*Analogía: el prototype es como un libro de recetas compartido. Cada cocinero (objeto) tiene su propio
delantal (propiedades propias) pero todos comparten el mismo libro de recetas (prototype). 
Si agregas una receta al libro, todos los cocineros la pueden usar.
En la práctica con ES6 no necesitas escribir prototypes directamente — las clases los manejan internamente.
Pero cuando veas errores como TypeError: undefined is not a function o cuando debuggees en las herramientas
del navegador, vas a ver la cadena de prototypes y necesitas entenderla.*/