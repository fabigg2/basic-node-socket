const {Schema, model} = require('mongoose');


const modeloPersona = new Schema({
    nombre: String,
    correo: String,
    telefono: String,
    clave: String
})


module.exports = model('persona', modeloPersona);