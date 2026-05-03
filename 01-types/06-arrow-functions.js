// Las arrow functions son el equivalente moderno de lambda en Python pero más potentes

// Función flecha simple:
// - Recibe un nombre
// - Retorna un saludo usando template string
// - No usa {} porque tiene retorno implícito
const saludar = (name) => `Hola ${name}`;

// Ejecuta la función y muestra el resultado en consola
console.log(saludar("Pedro"));


// Función flecha con múltiples pasos:
// - Recibe nombre y apellido
// - Construye el nombre completo
// - Retorna un mensaje de despedida
const despedir = (nombre, apellido) => {
    // Une nombre y apellido en un solo string
    const completo = `${nombre} ${apellido}`;

    // Retorna el mensaje final
    return `Adios ${completo}`;
};

// Ejecuta la función y muestra el resultado en consola
console.log(despedir("Juan","Victorio"));