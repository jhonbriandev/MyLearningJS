// CONDICIONALES

// IF - ELSE IF - ELSE

const edad = 20

if (edad >= 18) {
    console.log("Mayor de edad")
} else if (edad >= 13) {
    console.log("Adolescente")
} else {
    console.log("Niño")
}

const nota = 15;

if (nota >= 18){
    console.log("Excelente");
}else if(nota >= 13){
    console.log("Aprobado");
}else if(nota >= 10){
    console.log("Regular")
}else{
    console.log("Desaprobado")
}

const usuario = "admin";
const password = "1234";

if(usuario === "admin" && password === "1234"){
    console.log("Acceso permitido");
}else if(usuario !== "admin"){
    console.log("Usuario incorrecto");
}else{
    console.log("Contraseña incorrecta");
}

// USO DEL OPERADOR TERNARIO ?
// se entiende como si a ?(¿es verdad que...?) b :(...o si no..) es c

usuarioternario = {nombre : "Jhon", activo : "true"}

const estado = usuarioternario.activo ? "activo" : "inactivo"
console.log(estado)

// SWITCH

const dia = "sabado";

switch (dia) {

  case "lunes":
    console.log("Inicio de semana");
    break;

  case "viernes":
    console.log("¡Por fin viernes!");
    break;

  case "sábado":
    // Es sábado? Sí → bajo al siguiente case → ejecuto el console"
    // ¿Es domingo? Sí → ejecuto el console directamente"
    // Ambos terminan ejecutando lo mismo.
    // Pero tambien puede no coincidir que sabado sea fin de semana
    // Entonces siempre es mejor que cada uno use su propio break
  case "domingo":
    console.log("Es fin de semana");
    break;

  default:
    console.log("Un día normal de semana");
}


// Nullish coalescing ?? y Optional chaining ?. — ES6 moderno

usuarioPrueba = {
  nombre: null,
  direccion: {          // ← direccion es un objeto
    calle: "Casa Verde 12",
    ciudad: "Lima"      // ← ciudad vive dentro de direccion
  }
}
//usuarioPrueba = {nombre : "Jesus"}
// Si quito el comentario de arriba el usuario tendria un nombre
// Asi que dejaria de ser nulo, por lo tanto no se cumpliria la condicion y no imprime el anonimo

// ?? devuelve el lado derecho solo si el izquierdo es null o undefined
const nombre2 = usuarioPrueba.nombre ?? "Anónimo"
// Si usuario.nombre es null o undefined → "Anónimo"
// Si usuario.nombre es "" (string vacío) → "" (lo respeta)
console.log(` Nullish, ${nombre2}`)

// || también funciona pero es diferente
const nombre3 = usuarioPrueba.nombre2 || "Anónimo"
// Si usuario.nombre es "" → "Anónimo" (trata vacío como falsy)
console.log(` Or Logico, ${nombre3}`)

// ?. accede a propiedades sin romper si el objeto es null
const ciudad2 = usuarioPrueba?.direccion?.ciudad
// Si usuario es null → undefined (no lanza error)
// Sin ?. → TypeError: Cannot read property 'ciudad' of undefined
console.log(ciudad2)