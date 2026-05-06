// 1. Declara estas variables con const o let según corresponda
//    - Tu nombre (no cambiará)
//    - Un contador que empieza en 0 (cambiará)
//    - Tu stack de tecnologías como array

const name = "Jhon Brian";
let count = 0;
const mySkill = ["java","python","php","javascript"];
console.log(name);
console.log(count);
console.log(mySkill);

// 2. Escribe una arrow function que reciba nombre y stack (array)
//    y devuelva un template literal así:
//    "Hola, soy Jhon y domino: Python, Django, JavaScript"

const myNewSkill =(name,mySkill) => (`Hola soy ${name} y domino : ${mySkill}`)
console.log(myNewSkill(name,mySkill))

// 3. Dado este objeto:
const dev = {
    nombre: "Jhon",
    ciudad: "Lima",
    stack: ["Python", "Django", "JavaScript"],
    experiencia: { meses: 3, proyectos: 3 }
}
//    Usa destructuring para extraer nombre, ciudad y experiencia
//    en variables separadas con una sola línea

const {nombre,ciudad,experiencia} = dev; // Buscaremos el atributo tal cual esta en el objeto principal, usar {} ya que el objeto usa lo mismo
console.log(nombre,ciudad,experiencia); 
 
// 4. Crea un nuevo objeto devCompleto que tenga todo lo de dev
//    más un campo "disponible: true" usando spread

const devCompleto = {...dev,disponible:true}
console.log(devCompleto);