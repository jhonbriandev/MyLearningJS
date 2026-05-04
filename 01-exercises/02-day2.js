const productos = [
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "tech", stock: 5 },
    { id: 2, nombre: "Mouse", precio: 25, categoria: "tech", stock: 0 },
    { id: 3, nombre: "Libro JS", precio: 45, categoria: "libros", stock: 12 },
    { id: 4, nombre: "Monitor", precio: 350, categoria: "tech", stock: 3 },
    { id: 5, nombre: "Libro Python", precio: 40, categoria: "libros", stock: 8 },
    { id: 6, nombre: "Teclado", precio: 80, categoria: "tech", stock: 0 },
]

// 1. Array con solo los nombres de todos los productos

    nombreProductos = productos.map(n => n.nombre)
    console.log(nombreProductos)

// 2. Array con solo los productos que tienen stock disponible (stock > 0)

    stockDisponible = productos.filter(s => s.stock > 0)
    console.log(stockDisponible)

// 3. Precio total de todos los productos en stock

 
// 4. ¿Existe algún producto que cueste más de 1000?

    precioMayor1000 = productos.some(p => p.precio>1000)
    console.log(precioMayor1000)
// 5. ¿Todos los productos tech tienen stock?

    stockEnTodosTech = productos.every(p => p.stock)
    console.log(stockEnTodosTech)

// 6. Encontrar el producto con id === 3

// 7. Array de objetos con nombre y precio — solo productos de categoria "tech"
//    y con stock disponible, ordenados de menor a mayor precio
//    Resultado esperado:
//    [{ nombre: "Monitor", precio: 350 }, { nombre: "Laptop", precio: 1200 }]

// 8. DESAFÍO: usando reduce, construye un objeto que muestre
//    el precio promedio por categoría
//    Resultado esperado: { tech: ..., libros: ... }