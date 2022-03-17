const form = document.getElementById('form'); 
const altr = document.getElementById('alert');

//metodo se ejecuta al hacer submit en el formulario
form.onsubmit = (e) => {
    const correo = document.getElementById('correo'); //obtiene el correo 
    const clave = document.getElementById('clave'); //obtiene la contraseña
    e.preventDefault();
    altr.style.display='none'
    // console.log('correo', correo.value, 'clave', clave.value);

    //envia los datos al sevidor 
    fetch('http://localhost:4000/api/login', {
        method: 'POST',
        body: JSON.stringify({ correo:correo.value, clave:clave.value}),
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(!data.status){
            altr.style.display='block'
        }else{
            localStorage.setItem('usuario', JSON.stringify(data.usuario))
            document.location.href ='http://localhost:4000/sala' //envia a la sala
        }
    })
    
}

