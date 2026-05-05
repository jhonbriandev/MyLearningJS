const productos = [
    { id: 1, nombre: "Laptop", precio: 1200, categoria: "tech", stock: 5 },
    { id: 2, nombre: "Mouse", precio: 25, categoria: "tech", stock: 0 },
    { id: 3, nombre: "Libro JS", precio: 45, categoria: "libros", stock: 12 },
    { id: 4, nombre: "Monitor", precio: 350, categoria: "tech", stock: 3 },
    { id: 5, nombre: "Libro Python", precio: 40, categoria: "libros", stock: 8 },
    { id: 6, nombre: "Teclado", precio: 80, categoria: "tech", stock: 0 },
]

// 1. Array con solo los nombres de todos los productos

const nombreProductos = productos.map(n => n.nombre) 
// Extrae solo el campo "nombre" de cada producto

console.log(nombreProductos)


// 2. Array con solo los productos que tienen stock disponible (stock > 0)

const stockDisponible = productos.filter(s => s.stock > 0) 
// Filtra productos que tienen stock mayor a 0

console.log(stockDisponible)


// 3. Precio total de todos los productos en stock

const precioTotalProductos = productos
    .filter(p => p.stock > 0) 
    // Primero filtra productos disponibles

    .reduce((total, p) => total + p.precio, 0) 
    // Luego suma sus precios

console.log(precioTotalProductos)


// 4. ¿Existe algún producto que cueste más de 1000?

const precioMayor1000 = productos.some(p => p.precio > 1000) 
// Verifica si al menos uno cumple la condición

console.log(precioMayor1000)


// 5. ¿Todos los productos tech tienen stock?

const stockEnTodosTech = productos
    .filter(p => p.categoria === "tech") 
    // Selecciona solo productos tech

    .every(p => p.stock > 0); 
    // Verifica si todos tienen stock

console.log(stockEnTodosTech)


// 6. Encontrar el producto con id === 3

const productoId = productos.find(p => p.id === 3) 
// Busca el primer producto con ese id

console.log(productoId)


// 7. Array de objetos con nombre y precio — solo productos de categoria "tech"
//    y con stock disponible, ordenados de menor a mayor precio

const productosNombrePrecioTech = productos
    .filter(p => p.stock > 0 && p.categoria === "tech") 
    // Filtra por stock y categoría

    .sort((a, b) => a.precio - b.precio) 
    // Ordena por precio ascendente

    .map(p => ({
        nombre: p.nombre,
        precio: p.precio
    }));
    // Transforma a nuevo objeto con solo los campos necesarios

console.log(productosNombrePrecioTech)


// 8. Promedio de precio por categoría

const techProducts = productos.filter(p => p.categoria === "tech"); 
// Filtra productos tech

const librosProducts = productos.filter(p => p.categoria === "libros"); 
// Filtra productos libros


// promedio tech
const techAverage = techProducts.reduce((total, p) => total + p.precio, 0) / techProducts.length;
// Suma precios y divide entre cantidad


// promedio libros
const librosAverage = librosProducts.reduce((total, p) => total + p.precio, 0) / librosProducts.length;
// Igual lógica para libros


// resultado final
const result = {
    tech: techAverage,
    libros: librosAverage
};
// Objeto final con promedios por categoría