const formEl  = document.querySelector('.form')

formEl.addEventListener('submit', async event =>{
    event.preventDefault();
 
    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData)
    
        const response = await fetch(
        "http://127.0.0.1:8000/api/users/",
        {
        method : "POST",

        headers: {"Content-Type" : "application/json"
        },

        body : JSON.stringify(data)
        })
        
    const result = await response.json()
    console.log(result)
})
