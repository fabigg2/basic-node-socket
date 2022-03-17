const {Router} = require('express');
const { crearNuevoUsuario, login } = require('./controladores/controladorPersona');

const rutas = Router();


rutas.post('/persona', crearNuevoUsuario); // ruta para crear usuario
rutas.post('/login', login); //ruta para login


module.exports = rutas;