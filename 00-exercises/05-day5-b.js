// PARTE 4 — Consumir tu API real
// 6. Usando fetch real, consume tu API del blog:
//    GET http://localhost:8000/api/posts/
//    - Maneja el caso 200 (muestra los posts)
//    - Maneja el caso de error de red
//    - Muestra cuántos posts llegaron en la respuesta


async function obtenerApiReal(){
    try{
        const response = await fetch(
            "http://127.0.0.1:8000/api/posts/"     // petición GET a Django
        );
        const data = await response.json()          // convertimos la respuesta a objeto JS
        console.log(data)                           // → { count, next, previous, results[] }
        console.log(`Llegaron ${data.count} posts`) // total de posts en la base de datos
    }catch(error){
        console.log("Error de Red", error.message)  // captura fallos de red o Django caído
    }finally{
        console.log("Ahora estas consumiendo una API REAL") // se ejecuta siempre
    }
}

obtenerApiReal()
