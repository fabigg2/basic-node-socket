const express = require('express'); 
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const rutas = require('./rutas'); // impotacion del archivo rutas
const { socketControlador } = require('./controladores/socketControlador'); // importacion del archivo controlador




const port = 4000; //puerto de ejecucion
const app = express(); // iniciar express

//crear un servidor con http requerido para socket.i0
const server = http.createServer(app);

//configurar socket io, para comunicacion bidiercional
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

//conectarse a la db
mongoose.connect('mongodb://localhost:27017/salas', (error) => {
    if (error)
        return console.log('error al conectar la base de datos');
    console.log('base de datos conectada satisfatoriamente');
});



app.use(cors()); //permios para los navegoadores
app.use(express.static('publicos')) //servir los archivos publicos

//convertir datos de las peticiones a json
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

const salas = []; // almacenar las conexiones de cada sala

//escucha cuando un usuario se conecta a traves de sockets
io.on('connection', (socket) => {
    socketControlador(socket, salas); //acciones para ejecutar cuando un usuario se connecta
})



app.get('/', (req, res) => res.send('Bienvenido'));

//envia archivo de login.html
app.use('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/login.html'))
})

//envia archivo de registro.html
app.use('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/registro.html'))
})

//envia archivo sala.html
app.use('/sala', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/sala.html'))
})

//rutas del para registro e inicio de sesion
app.use('/api', rutas);

//poner servidor a escuchar
server.listen(port, () => console.log('servidor iniciado en el perto: ' + port))

