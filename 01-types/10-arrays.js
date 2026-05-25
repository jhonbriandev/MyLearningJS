// ARRAYS

const myArray = [0,1,2,3,4];
console.log(myArray);

const myArray2 = ["Jhon","Piero","Luis"];
console.log(myArray2);

const myArray3 = ["Jhon",10,"Piero",12.2,"Luis",true]; // Array compuesto por varios tipos de datos
console.log(myArray3);

// Podemos usar un array dentro de otro array
const myArray4 = ["Jhon",10,"Piero",12.2,"Luis",true,["Ingeniero","Profesor","Locutor"]];
console.log(myArray4);
// Luego mostrarlo por indice
console.log(myArray4[6]);

// PARA EXTENDER O SUMAR
// esto convertiria los elementos en strings
// NO RECOMENDADO
myArray5 = myArray2 + myArray;
console.log(myArray5)

// ES MEJOR USAR SPREAD

myArray5 = [...myArray,...myArray2] // Los ... sirven para desarmar el array y poder unir con mas elementos
                                    // Por lo cual desarmamos el primer array y el segundo
                                    // Si solo desarmamos el primero quedaria asi:
                                    // [0,1,2,3,4,[myarray2]]
                                    // Por eso debemos desarmar ambos
                                    // Quedara asi: [0,1,2,3,4,"Jhon","Piero","Luis"]
console.log(myArray5)
console.log("Metodos")

// PUSH
const numbers = [1, 2, 3];
// Modificamos el contenido del array (esto sí está permitido con const)
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]

// POP
const numbers8 = [19,29,39];
numbers8.pop()
console.log(numbers)

// UNSHIFT
const numbers2 = [2, 3];
// Agrega al inicio
numbers2.unshift(1);
console.log(numbers2); // [1, 2, 3]

// SHIFT
const numbers3 = [1, 2, 3];
// Elimina el primer elemento
numbers3.shift();
console.log(numbers3); // [2, 3]

// SLICE
// Obtiene los elementos que estan entre las cordenadas pero no cuenta el ultimo
const numbers9 = [1,2,3,4,5,6]
let numbers99 = numbers9.slice(1,3)
console.log(numbers99)

// SPLICE
// Elimina por indice o reemplaza

let numbers98 = numbers9.splice(2,1, "Reemplazo") // el string reemplaza a la casilla 2, en un elemento
console.log(numbers9) // Para ver como se ha modificado la lista

// FOREACH
const numbers4 = [1, 2, 3];
// Recorre el array
numbers4.forEach(function(number) {
    console.log(number);
});

/* ---------------------------------------------------------------------------------- */

// METODOS CON ARRAYS //

// MAP
//Recorre el array y aplica una función a cada elemento, devolviendo un array nuevo del mismo tamaño.
const number = [10,20,30];
const double = number.map(n => n*2);
console.log(double);

// Usado para objetos
const users = [
    {id : 1, name : "Jhon", active : true},
    {id : 2, name : "Paula", active : true},
    {id : 3, name : "Jesus", active : false}
]
// Vamos a extraer del campo name y guardarlo en el array names
const names = users.map( u => u.name);
console.log(names);

const usersConRol = users.map( u =>({...u, rol:"User"}));
console.log(usersConRol);


// FILTER

const userActive = users.filter( u => u.active);
console.log(userActive); // Referenciar u con users y traer su campo activo


const userMajors = [15,22,23,14,31].filter( age => age >=18) // Arrow function: age es cada elemento 
                                                            // del array que se evalúa en la condición
console.log(userMajors)

//for (const u of userMajors){
//    if (u >=18){
//        console.log(`Numero Mayor ${u}`)}
//}

const pairs = [10,19,20,30,43,4].filter(pair => pair %2==0)
// Usaremos el array pairs para filtrarlo por pares, usamos pair%2 == 0(residuo)
console.log(pairs)


// MAP + FILTER

const namesActive = users.filter(u => u.active).map(u=>u.name.toUpperCase())
console.log(namesActive) // Nombres de usuarios activos, en mayúsculas

const games =  [{name:"Overwatch", year: 2020},
                {name:"Call of Duty", year :2022},
                {name:"Alien Shooter", year:2013}]
const longNamesGamesPlusYear = games.filter(g => g.name.length>10).map(g =>g.name +` Released at:  ${g.year}`)
console.log(longNamesGamesPlusYear) // Nombres de juegos con longitud mayor a 10 caracteres (filter)
                                    // Y ademas unidos cada uno a su fecha de lanzamiento (map)

// REDUCE

const primes = [11, 13, 5, 7]
const plusPrimes = primes.reduce((total,n) => total+n, 0)
console.log(plusPrimes)

// con objetos

const totalActives = users.reduce((contador, u) => {
//     return contador + u.active},0)
// console.log(totalActives)

    return u.active ? contador + 1 : contador
}, 0)
console.log(totalActives)  // sumar los activos y reducir a un resultado

const cart = [
    {name : "Laptop", price: 1000},
    {name : "Mouse", price: 50},
    {name : "Keyboard", price: 100}
]
// Sumamos los precios
const totalPriceCart = cart.reduce((total,cart) =>{
    return total + cart.price;
},0);
console.log(`El precio final de la compra es: ${totalPriceCart}`) // Sumar el total de un carrito 

// Construir un objeto desde un array

const usersForid = users.reduce((obj,u)=>{
    obj[u.id] = u
    return obj
},{})
console.log(usersForid) // Listar por ID, modo profesional

// FIND
// encontrar el primero que cumple la condición

const userFind = users.find(u => u.id ===2)
console.log(userFind) // Usuario encontrado

const userNoExist = users.find(u => u.id ===22)
console.log(userNoExist) // Usuario no existe

const activeFind = users.find(u => u.active === true)
console.log(activeFind) // A dif de Filter, este solo devuelve el primer elemento encontrado no todos

// SOME Y EVERY

const someActives = users.some(u => u.active)
console.log(someActives) // Si existe alguno, indicara true

const everyActives = users.every(u => u.active)
console.log(everyActives) // Solo true cuando todos cumplan la condicion

// FLAT Y FLATMAP

const nested = [1, [2, 3], [4, [5, 6]]]

console.log(nested.flat()) // Aplanamos un nivel
console.log(nested.flat(2)) // Aplanamos dos niveles
console.log(nested.flat(Infinity)) // Aplanamos todos los niveles

//flatMap —> map + flat en un paso
const sentence = ["hola mundo", "como estas"]
const words = sentence.flatMap(s => s.split(" "))
console.log(words)
