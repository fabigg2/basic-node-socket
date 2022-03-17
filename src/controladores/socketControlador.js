module.exports = {
    socketContolador: (socket, rooms)=>{
        socket.on('unirse', ({sala, user})=>{
            rooms.push({sala, user});
            socket.join(sala);
            const peers = rooms.filter((peer)=>peer.sala === sala);
            socket.emit('unirse', peers);
            socket.to(sala).emit('unirse',peers);
        })

    }
}