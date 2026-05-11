// IIFE — Immediately Invoked Function Expression

// Una IIFE es una función que se define y se ejecuta al mismo tiempo

// Funcion regular

function saludar(){
    console.log("Buen dia")
}
const primerSaludo = saludar();

// Funcion IIFE
//(funcion){}() --> Encerrar la funcion en parentesis y al final invocarla con () sin necesidad
// de llamarla en otra linea

(function contestar (){
    console.log("¿En que puedo ayudarte?")
})();

// Funcion IIFE con arrow 

(() => {
    console.log("Hola desde IIFE moderna con arrow")
})();

// Funcion IIFE con parametros

((nombre) =>{
    console.log(`${nombre} Buenos dias`)
})("Juan");

// Con arrow pero con previa variable
const para = ((nick) =>{
    console.log( `${nick} Buenas tardes`)
})("alvion");