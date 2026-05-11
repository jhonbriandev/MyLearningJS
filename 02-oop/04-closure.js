// CLOSURE ES 

/*❌ “La función sigue ejecutándose”

✅ “Las variables sobreviven porque otra función las referencia” */

function crearContador() {
    let cuenta = 0  // esta variable pertenence a mi funcion principal
    
    return function() { // esta es una funcion anonima que es el retorno de mi funcion principal
        cuenta++        // Suma 1 al valor ACTUAL de cuenta (no siempre desde 0)
                        // Ahora es muy importante entender que "cuenta" es una variable del principal
                        // Pero el closure la mantiene referenciada porque se necesita de ella en esta nueva funcion
        return cuenta   // Retorna el valor actual. "cuenta" sigue viva porque la funcion anonima la referencia
    }
}

const contador = crearContador() // llamo a crearContador y guardo la función que me devuelve
console.log(contador())  // 1
console.log(contador())  // 2
console.log(contador())  // 3

// La variable cuenta no es accesible desde afuera
//console.log(cuenta)  // ReferenceError

/* ---------------------------------------------------------------------------------- */

function crearCuenta(saldoInicial) {
    let saldo = saldoInicial  // privado — no accesible desde afuera
    
    return {
        depositar(monto) {
            saldo += monto
            return saldo
        },
        retirar(monto) {
            if (monto > saldo) throw new Error("Saldo insuficiente")
            saldo -= monto
            return saldo
        },
        verSaldo() {
            return saldo
        }
    }
}

const cuenta = crearCuenta(1000)
console.log(cuenta.verSaldo())    // 1000
console.log(cuenta.depositar(500)) // 1500
console.log(cuenta.retirar(200))   // 1300
console.log(cuenta.saldo)          // undefined — saldo es privado