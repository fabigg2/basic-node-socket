const express = require('express');
const {Server} = require('socket.io');
const http = require('http');




const port = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);



server.listen(port, ()=>console.log('servidor iniciado en el perto: '+ port))

