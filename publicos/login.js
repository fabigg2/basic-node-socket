

fetch('http://localhost:4000/api/login',{
    method: 'POST',
    body: JSON.stringify({correo: 'a@gmail.com', clave: '1234'}),
})