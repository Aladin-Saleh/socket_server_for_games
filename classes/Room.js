const Player = require("./Player");


class Room
{
    constructor(id)
    {
        this._id = id;
        this._players = [];
        this._isFull = false;
        this._started = false;
        this._admin = null;
    }

    addPlayer(player)
    {
        if (!this._isFull && !this._started)
        {
            player._playerIndex = this._players.length;
            this._players.push(player);

            this.checkRoomStatus();
        }
        else
        {
            throw new Error('Cannot add user: Room is full or has already started.');
        }
    }

    isEmpty()
    {
        return this._players.length === 0;
    }

    removePlayer(socketId)
    {
        if (this._admin.socketId === socketId)
        {
            this._admin = null;
        }

        this._players = this._players.filter(user => user.socketId !== socketId);

        if (this._players.length > 0)
        {
            this._admin = this._players[0];
        }
        this.checkRoomStatus();
    }

    checkRoomStatus()
    {
        this._isFull = this._players.length >= 4;
    }

    startGame()
    {
        if (this._players.length > 1 && !this._isFull) 
        {
            this._hasStarted = true;
            this._players[0]._isPlaying = true;
        }
        else 
        {
            throw new Error('Cannot start game: Not enough users or room is full.');
        }        
    }

    setAdmin(socketId)
    {
        this._admin = this._players.find(player => player.socketId === socketId);
    }

}

module.exports = Room;