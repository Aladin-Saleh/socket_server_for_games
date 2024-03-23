const Player = require('../classes/Player');

module.exports = (socket, roomId, socketId, username, id, channels, callback) =>
{
    try
    {
        const room = channels.get(roomId);
        const user = new Player(id, socketId, username, 100, true, false, room._players.length, 0, {}, {});

        if (room === undefined)
        {
            throw new Error(`Room ${roomId} does not exist.`);
        }

        if (socketId === undefined || username === undefined || id === undefined)
        {
            throw new Error('Cannot join channel: Missing parameters.');
        }
        
        if (room.isFull)
        {
            callback({error: 'Room is full.'});
            return;
        }

        if (room.hasStarted)
        {
            callback({error: 'Game has already started.'});
            return;
        }

        room.addPlayer(user);
        socket.join(roomId.toString());
        socket.emit('channel_info', roomId.toString());
        callback({roomId: roomId, room: room});

    }
    catch(error)
    {
        console.error(`[ERROR] ${error} in handleJoinChannel.js`);
    }

};