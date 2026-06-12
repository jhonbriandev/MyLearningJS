// utils.js — Solo funciones reutilizables, sin código automático

export async function loadCategoriesSelect(select) {
    const response = await fetch("http://127.0.0.1:8000/api/categories/")
    const data = await response.json()

    select.innerHTML = ''
    data.results.forEach(element => {
        const option = document.createElement('option')
        option.value = element.id
        option.textContent = element.name
        select.appendChild(option)
    })
}