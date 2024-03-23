class Player
{
    constructor(id, socketId, username, lifePoints = 100, isConnected = false, isPlaying = false, playerIndex = -1, playerPostion)
    {
        this._id            = id;
        this._playerIndex   = playerIndex;
        this._socketId      = socketId;
        this._username      = username;
        this._lifePoints    = lifePoints;
        this._isConnected   = isConnected;
        this._isPlaying     = isPlaying;
        this._position      = playerPostion;
    }


    // Getters
    get id() { return this._id; }
    get playerIndex() { return this._playerIndex; }
    get socketId() { return this._socketId; }
    get username() { return this._username; }
    get lifePoints() { return this._lifePoints; }
    get isConnected() { return this._isConnected; }
    get isPlaying() { return this._isPlaying; }
    get position() { return this._position; }

    // Setters
    set id(value) { this._id = value; }
    set playerIndex(value) { this._playerIndex = value; }
    set socketId(value) { this._socketId = value; }
    set username(value) { this._username = value; }
    set lifePoints(value) { this._lifePoints = value; }
    set isConnected(value) { this._isConnected = value; }
    set isPlaying(value) { this._isPlaying = value; }
    set position(value) { this._position = value; }




}

module.exports = Player;