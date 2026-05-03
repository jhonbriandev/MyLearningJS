// Funcion simple, solo se ejecuta cuando llamo a la funcion: saludar()
// Sin parametros por el momento

function saludar(){
    console.log("Hola, buen dia")
}
saludar()

// Funcion con parametros, usando el parametro dentro del return con backticks
function despedir(name){
    return `Adios ${name}`; // No son comillas simples son backticks (`)
}
console.log(despedir("Andrea")); // console.log similar a un print

//EQUIVALENTE A :
// const mensaje = despedir("Andrea");
//console.log(despedir);

const elegir = function(name){
    return  `Te elijo ${name}`;
}
console.log(elegir("pikachu"));

// LA DIFERENCIA ENTRE ESTAS DOS TIPOS DE FUNCIONES ES:
// function saludar puede usarse antes de la declaracion
// const elegir = function no puede usarse antes

//ej:
console.log(despedir("Jael"));  // PUEDO LLAMAR A LA FUNCION ANTES DE LA DECLARACION
function despedir(name){
    return `Adios ${name}`; 
}

console.log(elegir("pikachu")); // NO PUEDO LLAMAR A LA FUNCION ANTES DE LA DECLARACION, SALTARA UN ERROR
const elegir = function(name){
    return  `Te elijo ${name}`;
}
