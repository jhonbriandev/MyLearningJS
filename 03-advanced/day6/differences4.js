// DIFERENCIA 4 — Scope

// Python — scope de función y global
x = 10  # global

def funcion():
    x = 20  # variable local — no modifica la global
    print(x)  # 20

funcion()
print(x)  # 10 — la global no cambió

// Para modificar la global explícitamente
def funcion2():
    global x
    x = 20

// Python no tiene scope de bloque
if True:
    y = 5

print(y) // 5 — y existe fuera del if


// JavaScript — scope de función, bloque y global
let x = 10  // global

function funcion() {
    let x = 20  // local — no modifica la global
    console.log(x)  // 20
}

funcion()
console.log(x)  // 10

// JavaScript SÍ tiene scope de bloque con let y const
if (true) {
    let y = 5
    const z = 10
}

console.log(y)  // ReferenceError — y no existe aquí
console.log(z)  // ReferenceError — z no existe aquí

// Pero var no respeta el bloque — es el comportamiento de Python
if (true) {
    var w = 5
}
console.log(w)  // 5 — w existe fuera del if

/*Resumen de scope:
Python:          scope de función + global (no hay scope de bloque)
JavaScript var:  scope de función + global (igual que Python)
JavaScript let/const: scope de función + bloque + global
Por eso let y const son más predecibles que var — se comportan como esperas que se comporte una variable.*/