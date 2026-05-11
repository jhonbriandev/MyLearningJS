// JavaScript ES6
import { Usuario } from './usuarios/models.js' // Importancion de la clase Usuario del fichero mencionado
import os from 'os'  // Node.js

// archivo: utils.js

// Named export — puedes tener varios
export const PI = 3.14159

export function sumar(a, b) {
    return a + b
}

export const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-PE')
}

// Default export — solo uno por archivo
export default class Calculadora {
    sumar(a, b) { return a + b }
    restar(a, b) { return a - b }
}

/* ---------------------------------------------------------------------------------- */


// archivo: main.js

// Named imports — con llaves, nombre exacto
import { PI, sumar, formatearFecha } from './utils.js'

// Con alias
import { sumar as suma } from './utils.js'

// Default import — sin llaves, cualquier nombre
import Calculadora from './utils.js'

// Todo el módulo
import * as Utils from './utils.js'
Utils.sumar(1, 2)
Utils.PI