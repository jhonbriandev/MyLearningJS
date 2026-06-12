// PARTE 1 — Predice el resultado antes de ejecutar
// Luego ejecútalo y verifica si tenías razón

// Caso 1
console.log(1 + "2")  //12
console.log("3" - 1)  //2
console.log(true + true) //2
console.log(null + undefined) // NAN

// Caso 2
const obj = { valor: 10 }
function modificar(o) {
    o.valor = 20
}
modificar(obj)
console.log(obj.valor)  // ¿10 o 20?
//20

// Caso 3
const persona = {
    nombre: "Jhon",
    saludar: function() {
        return `Hola soy ${this.nombre}`
    },
    saludarArrow: () => {
        return `Hola soy ${this.nombre}`
    }
}
console.log(persona.saludar()) // Hola soy jhon
//console.log(persona.saludarArrow()) // Esta funcion no es compatible con this, el this no apuntara a la funcion arrow


 