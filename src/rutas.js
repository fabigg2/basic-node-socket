const {Router} = require('express');
const { crearNuevoUsuario, login } = require('./controladores/controladorPersona');

const rutas = Router();


rutas.post('/persona', crearNuevoUsuario);
rutas.post('/login', login);


module.exports = rutas;