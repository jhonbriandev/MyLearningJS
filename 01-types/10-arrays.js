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

// METODOS CON ARRAYS //

// MAP

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
console.log(userActive);

const userMajors = [15,22,23,14,31].filter( age => age >=18) // Arrow function: age es cada elemento 
                                                            // del array que se evalúa en la condición
console.log(userMajors)

//for (const u of userMajors){
//    if (u >=18){
//        console.log(`Numero Mayor ${u}`)}
//}
