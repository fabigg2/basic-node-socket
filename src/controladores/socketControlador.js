module.exports = {
    socketControlador: (socket, rooms)=>{ 
        //escucha el envento unirse espera los datos de la sala y del usuario
        socket.on('unirse', ({sala, user})=>{
            rooms.push({sala, user}); //agrega el usario al array
            socket.join(sala); //une el suario a una sala
            const peers = rooms.filter((peer)=>peer.sala === sala); // filtra todos los usuario de una sala
            socket.emit('unirse', peers); // retorna los usuario de la sala
            socket.to(sala).emit('unirse',peers);// retorna los usuario de la sala
        })

    }
}