// PARTE 2 — Tabla de diferencias propia
// Crea un archivo comparacion.md con al menos 5 diferencias
// entre Python y JavaScript explicadas con tus propias palabras
// y un ejemplo de código para cada una
// Este archivo va a tu repositorio — es un apunte de portafolio

PYTHON 

1. Tipado dinamico fuerte, distingue tipos de datos con solo ==

    edad = 20  edad2 = "20"
    print(edad == edad2)  // false

2. El self es confiable, siempre que se use en la funcion apuntara a la funcion o clase propietaria
3. Es estructuralmente fiel a la determinacion de OOP, tal como en otros lenguajes, la clase manda, los objetos copian y escalan.

    class Persona:
        def __init__(raza):
        self.raza = raza
    individuo1 = Persona("asiatica")
    print("La raza del individuo1 es",individuo1)

4. No existe coercion, si algo no esta bien definido, python no intentara adivinar

    edad = 29
    edad + "1"  // error

5. La asincronia es opcional, con librerias podemos obtener este comportamiento.

    import asyncio

6. No existe variable en bloque, si definimos una funcion y dentro de ella un bloque condicional, la cual contengo la variable edad, esta variable no solo vivira en el condicional sino en toda la funcion.

    def prueba ():
        if edad > 19:
            edad = 20
            print("Mayor de edad)

JAVASCRIPT

1. Tipado dinamico debil, no distingue tipos de datos con solo ==

    const edad = 20  
    const edad2 = "20"
    console.log(edad == edad2)  // true

2. El this no es del todo confiable, en algunas funciones es obsoleta
3. No es fiel a OOP, aqui se usan Prototypes, no es lo mismo a una clase, puede fallar y no encontrarse propiedades
4. Existe coercion, si algo no esta bien definido, javascript intentara dar alguna solucion

    let edad = 20     
    console.log(edad + "1"  ) // 201

5. Al parecer javascript vive la asincronia dia a dia, es algo normal, y debemos de usarla en multiples tareas

    async await

6. Si existe las variables en bloque, si creamos una funcion, dentro de esta un bloque condicional e introducimos una variable edad, esta variable con let o const, vive solo alli, si queremos usarla fuera debemos definirla otra vez.

    function prueba(edad){
        
        if(edad > 17){
            const permisos = "Juegos de pelotas" // Variable que solo vive en el bloque
            console.log(`Puede ingresar y ademas tiene permiso para los ${permisos}`)
        }
        const permisos = "Juegos de instrumentos" // El nombre es identico pero no son las mismas variables, esta es de funcion
        console.log(permisos)
    }
    prueba(21)