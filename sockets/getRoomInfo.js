module.exports = (io, roomId, playerPosition, socketId, channels) => 
{
    try
    {
        // console.log(`[INFO] Sending channel info to room ${roomId}`, socketId, playerPosition);
        // console.log(`[INFO] Socket ID ${socketId} send position :`, playerPosition);
        // console.log(`[INFO] Room ${roomId}`);
        const room = channels.get(roomId.toString());

        // Mise à jour de la position du joueur en prenant le socket.id du joueur
        const playerIndex = room._players.findIndex(player => player._socketId === socketId);
        room._players[playerIndex]._position = playerPosition;
        console.log(`[INFO] Room ${roomId} updated `, room);
        
        io.to(roomId.toString()).emit('channel_info', room);
    }
    catch(error)
    {
        console.error(`[ERROR] ${error} in handleGetRoomInfo.js`);
    }
};