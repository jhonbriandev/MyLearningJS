// SPREAD

const numbers = [1, 2, 3];
console.log(numbers);

// Spread nos permite "expandir" un array
// Aquí copiamos los elementos de numbers y añadimos más elementos al final

const moreNumbers = [...numbers, 4, 5];
console.log(moreNumbers);

const user = { name : "Jhon", age : 20};
console.log(user);
// Spread tambien nos sirve para objetos
// Ademas esto es una copia para ser mas especificos un Shallow copy
const userComplete = {...user, profession : "Engineer"};
console.log(userComplete);


// REST

// Definimos una función llamada "ammount"
// El parámetro (...realNumbers) usa REST:
// significa que todos los argumentos que pasemos
// se agrupan en un array llamado "realNumbers"

const ammount = (...realNumbers) => {

    // "realNumbers" será algo como: [1, 2, 3, 4]

    // Usamos reduce para sumar todos los valores del array
    // Solo usamos UN return (el de la función principal)

    return realNumbers.reduce((total, n) => 
        // "total" acumula la suma
        // "n" es cada número del array
        total + n
    , 0); // 0 es el valor inicial del total
}

// Ejecutamos la función pasando varios números
// REST los convierte en: [1, 2, 3, 4]

console.log(ammount(1,2,3,4)); // Resultado: 10
