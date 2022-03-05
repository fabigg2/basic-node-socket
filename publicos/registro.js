const form = document.getElementById('form');
const altr = document.getElementById('alert');
const altrs = document.getElementById('alert1');


form.onsubmit = (e) => {
    const correo = document.getElementById('correo');
    const clave = document.getElementById('clave');
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    e.preventDefault();
    altr.style.display = 'none';
    // console.log('correo', correo.value, 'clave', clave.value);

    fetch('http://localhost:4000/api/persona', {
        method: 'POST',
        body: JSON.stringify({ correo: correo.value, clave: clave.value, nombre: nombre.value, telefono: telefono.value }),
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (!data.status) {
                altr.style.display = 'block';
            }else{
                altrs.style.display = 'block';

            }
        })

}

