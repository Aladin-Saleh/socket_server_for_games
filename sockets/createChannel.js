const Player    = require('../classes/Player');
const Room   = require('../classes/Room');


module.exports = (socket, socketId, username, id, channels, callback) => 
{
    try
    {
        const roomId = Math.floor(Math.random() * 9000000) + 1000000;
        const room = new Room(roomId.toString());

        if (socketId === undefined || username === undefined || id === undefined)
        {
            throw new Error('Cannot create channel: Missing parameters.');
        }
        
        const player = new Player(id, socketId, username, 100, true, false, room._players.length, 0, {}, {});
        
        room.addPlayer(player); // On ajoute le créateur de la room à la room
        room.setAdmin(player.socketId); // L'admin est le créateur de la room
        
        // On ajoute la room à la map
        channels.set(roomId.toString(), room); 
        
        socket.join(roomId.toString()); // On fait rejoindre le créateur de la room à la room (socket.io)

        // Acquittement
        callback(roomId);

    }
    catch (error)
    {
        console.error(`[ERROR] createChannel: ${error.message}`, error);
    }

    
};