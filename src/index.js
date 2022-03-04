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
const server = http.createServer(app);
const io = new Server(server);


mongoose.connect('mongodb://localhost:27017/test', (error) => {
    if (error)
        return console.log('error al conectar la base de datos');
    console.log('base de datos conectada satisfatoriamente');
});



app.use(cors());
app.use(express.static('publicos'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

io.on('connection', (socket)=>{
    socketContolador(socket);
})


app.use('/api', rutas);
app.use('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../vistas/login.html'))
})



server.listen(port, () => console.log('servidor iniciado en el perto: ' + port))

