const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const rutas = require('./rutas');
const { socketContolador } = require('./controladores/socketControlador');




const port = 4000;
const app = express();
const server = http.createServer(app, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
const io = new Server(server);

//conectarse a la db
mongoose.connect('mongodb://localhost:27017/salas', (error) => {
    if (error)
        return console.log('error al conectar la base de datos');
    console.log('base de datos conectada satisfatoriamente');
});



app.use(cors());
app.use(express.static('publicos'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const salas = [];
io.on('connection', (socket) => {
    console.log('new connection');
    socketContolador(socket, salas);
})



app.get('/', (req, res) => res.send('Bienvenido'));


app.use('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/login.html'))
})

app.use('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/registro.html'))
})

app.use('/sala', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/sala.html'))
})

app.use('/api', rutas);


server.listen(port, () => console.log('servidor iniciado en el perto: ' + port))

