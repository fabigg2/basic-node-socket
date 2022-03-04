const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
const path =require('path');

const rutas = require('./rutas');




const port = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static('publicos'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());




app.use('/api', rutas);
app.use('/login', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../vistas/login.html'))
})



server.listen(port, ()=>console.log('servidor iniciado en el perto: '+ port))

