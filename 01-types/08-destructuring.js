// SIN DESTRUCTURING

// Objeto con datos del usuario (similar a un dict en Python)
const user = { name: "Paul", age: 19, city: "Lima" };

// Se crean nuevas variables a partir del objeto:
// - NO se modifican las propiedades del objeto
// - Se copian sus valores en variables independientes
let name = user.name; // Usamos let para mostrar el ejemplo del cambio
const age = user.age;

// Acceso directo a las propiedades del objeto
// No necesitas variables adicionales si solo quieres mostrar el valor
console.log(user.name);
console.log(user.age);
console.log(user.city);

// Por lo cual podemos mostrar y hasta cambiar las nuevas variables
name = "Jamon";
console.log(name)
// const user = {} crea una variable constante que referencia un objeto
// let name = user.name crea una variable let que puede cambiar y no afectar al objeto user

// CON DESTRUCTURING
// Se declara de la misma manera
const otheruser = { othername: "Pedro", otherage: 15, othercity: "Junin" }; 

// Extrae la propiedad directamente (el nombre coincide)
const { othername } = otheruser;
// othername debe coincidir EXACTAMENTE con el nombre de la propiedad en el objeto
console.log(othername); // Pedro
//othername = "Nombre cambiado a partir del atributo y no objeto";
//console.log(othername);

// CON ALIAS — Para usar otro nombre
// toma la propiedad name del objeto principal creado en otheruser y guárdala en una variable llamada nombreUsuario
const { othername: nombreUsuario } = otheruser
console.log(nombreUsuario)  // "Pedro"

// EN ARRAYS, POR POSICIONAMIENTO
// Sirve para asignar los elementos por posiciones.
// Si pedimos más variables de las que hay en el array, obtendremos undefined.

const colors = ["red", "blue", "yellow"];

// Desestructuración del array
const [first, second, third, fourth] = colors; // Usar variables, no valores, no usar ""

console.log(third);   // "yellow"
console.log(fourth);  // undefined

/*En el lado izquierdo de la desestructuración solo podemos usar:

✔ nombres de variables
✔ estructuras que contengan variables (arrays u objetos)

Pero no valores fijos, como:

números (0, 1, 0.0)
strings ("hola")
booleanos (true */