//  LOOPS

// FOR

// Le damos el valor de 1 a i, y si este es menor de 5 se aumentara en 1
for (let i = 1; i <= 5; i++) {
    console.log("Número:", i);
}
// foreach

const numeros = [1, 2, 3, 4, 5]

numeros.forEach(numero => {
    if (numero === 3) {
        break  // ERROR — forEach no acepta break
    }
    console.log(numero)
})



const tecnologias = ["Python", "Django", "JavaScript", "React"]

// for clásico — control total sobre índice
for (let i = 0; i < tecnologias.length; i++) {
    console.log(`${i}: ${tecnologias[i]}`)
}

// for...of — el más parecido al for de Python, para valores
for (const tech of tecnologias) {
    console.log(tech)
}

// GRAN DIFERENCIA CON FOREACH
const numeros = [1, 2, 3, 4, 5]

for (const numero of numeros) {
    if (numero === 3) {
        break  // para el loop aquí
    }
    console.log(numero)
}
// → 1
// → 2

// for...in — para keys de objetos (no usar en arrays)
const dev = { nombre: "Jhon", ciudad: "Lima", stack: "Python" }
for (const clave in dev) {
    console.log(`${clave}: ${dev[clave]}`)
}

// FOR + IF

const usuariosPrimarios = [
    { nombre: "Juan", activo: true },
    { nombre: "Ana", activo: false },
    { nombre: "Luis", activo: true }
];

for (let i = 0; i < usuariosPrimarios.length; i++) {
    if (usuariosPrimarios[i].activo) {
        console.log(usuariosPrimarios[i].nombre, "está activo");
    }
}

// WHILE

// Le damos el valor de 0 a i y mientras que sea menor de 5 se aumentara en 1 en un bucle
let i = 0;

while (i < 5) {
    console.log(i);
    i++;
}

// while — igual que Python
let contador = 0
while (contador < 3) {
    console.log(contador)
    contador++  // equivalente a contador += 1
}



