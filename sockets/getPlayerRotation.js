module.exports = (io, roomId, playerRotation, socketId, channels) =>
{
    try
    {
        const room = channels.get(roomId.toString());
        console.log(`[INFO] Player ${socketId} rotation `, playerRotation,` on room ${roomId}`);

        const playerIndex                                  = room._players.findIndex(player => player._socketId === socketId);
        room._players[playerIndex]._playerRotation         = playerRotation;

        console.log(room._players);
        io.to(roomId.toString()).emit('players_rotation', room._players);
    }
    catch (error)
    {
        console.error(`[ERROR] getPlayerRotation: ${error.message}`, error);
    }
}