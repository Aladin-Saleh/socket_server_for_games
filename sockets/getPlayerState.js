module.exports = (io, roomId, playerState, socketId, channels) =>
{
    try
    {
        const room = channels.get(roomId.toString());
        console.log(`[INFO] Player ${socketId} is at state `, playerState,` on room ${roomId}`);

        const playerIndex                                  = room._players.findIndex(player => player._socketId === socketId);
        room._players[playerIndex]._playerState._isRunning = playerState._isRunning;
        room._players[playerIndex]._playerState._isWalking = playerState._isWalking;

        console.log(room._players);
        io.to(roomId.toString()).emit('players_state', room._players);
    }
    catch (error)
    {
        console.error(`[ERROR] getPlayerState: ${error.message}`, error);
    }
}