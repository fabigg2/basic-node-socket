const form = document.getElementById('form');
const altr = document.getElementById('alert');


form.onsubmit = (e) => {
    const correo = document.getElementById('correo');
    const clave = document.getElementById('clave');
    e.preventDefault();
    altr.style.display='none'
    // console.log('correo', correo.value, 'clave', clave.value);

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
            document.location.href ='http://localhost:4000/sala'
        }
    })
    
}

