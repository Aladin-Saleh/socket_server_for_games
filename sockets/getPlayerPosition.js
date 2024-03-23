module.exports = (io, roomId, playerPosition, socketId, channels) =>
{
    try
    {
        const room = channels.get(roomId.toString());
        console.log(`[INFO] Player ${socketId} is at position `, playerPosition,` on room ${roomId}`);
        // Mise à jour de la position du joueur en prenant le socket.id du joueur
        const playerIndex                       = room._players.findIndex(player => player._socketId === socketId);
        room._players[playerIndex]._position    = playerPosition;

        console.log(room._players);
        io.to(roomId.toString()).emit('players_position', room._players);
    }
    catch (error)
    {
        console.error(`[ERROR] getPlayerPosition: ${error.message}`, error);
    }
}