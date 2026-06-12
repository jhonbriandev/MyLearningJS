// DIFERENCIA 5 — this vs self

// Python — self es explícito y predecible
class Contador:
    def __init__(self):
        self.cuenta = 0
    
    def incrementar(self):
        self.cuenta += 1  // self siempre es la instancia
    
    def incrementar_tarde(self):
        // self siempre es correcto — Python lo garantiza
        return lambda: self.cuenta + 1


// JavaScript — this depende de CÓMO se llama la función
class Contador {
    constructor() {
        this.cuenta = 0
    }
    
    incrementar() {
        this.cuenta++  // this es la instancia — correcto
    }
    
    incrementarTarde() {
        // Problema clásico con callbacks
        setTimeout(function() {
            this.cuenta++  // this NO es la instancia aquí
            // this es window (en el navegador) o undefined (strict mode)
        }, 1000)
        
        // Solución con arrow function — hereda this del contexto externo
        setTimeout(() => {
            this.cuenta++  // this SÍ es la instancia
        }, 1000)
    }
}

// Las cuatro reglas de this en JavaScript:

// Regla 1 — Llamada simple: this es window o undefined
function mostrar() { console.log(this) }
mostrar()  // window en navegador, undefined en strict mode

// Regla 2 — Método de objeto: this es el objeto
const obj = {
    nombre: "Jhon",
    saludar() { console.log(this.nombre) }
}
obj.saludar()  // "Jhon" — this es obj

// Regla 3 — Constructor con new: this es la nueva instancia
function Persona(nombre) { this.nombre = nombre }
const p = new Persona("Jhon")  // this es p

// Regla 4 — Arrow function: this del contexto externo
const obj2 = {
    nombre: "Jhon",
    saludar: () => console.log(this.nombre)  // this NO es obj2
}
obj2.saludar()  // undefined — arrow heredó this del contexto externo

// La regla práctica: en métodos de clase usa funciones normales. 
// En callbacks dentro de métodos usa arrow functions.