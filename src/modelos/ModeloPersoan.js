const {Schema, model} = require('mongoose');

// esquema para modelo de persona 
const modeloPersona = new Schema({
    nombre: String,
    correo: String,
    telefono: String,
    clave: String
})

// exportar modelo persona
module.exports = model('persona', modeloPersona);