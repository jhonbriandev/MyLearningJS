/*DIFERENCIA 2 — Asincronía
Esta es la diferencia más profunda entre los dos lenguajes */

// Python — síncrono por defecto
// Cada línea espera a que la anterior termine

//import requests
respuesta = requests.get('https://api.example.com/posts')
// El programa se BLOQUEA aquí hasta recibir la respuesta
datos = respuesta.json()
print(datos)  // esto ejecuta después de recibir todo



// JavaScript — asíncrono por naturaleza
// El programa no se bloquea esperando

fetch('https://api.example.com/posts')
    .then(r => r.json())
    .then(datos => console.log(datos))

console.log("esto se ejecuta ANTES de recibir los datos")
// Orden real: primero el console.log, luego los datos