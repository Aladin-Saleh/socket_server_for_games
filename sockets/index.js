const createChannel = require('./createChannel');
const joinChannel   = require('./joinChannel');
const startGame     = require('./startGame');
const getRoomInfo   = require('./getRoomInfo');

// Player
const getPlayerPosition = require('./getPlayerPosition');
const getPlayerState    = require('./getPlayerState');
const getPlayerRotation   = require('./getPlayerRotation');

const channelsMap   = new Map();


function socketIoSetup(server) {
    const io = require('socket.io')(server, {
        path: '/socket',
        cors: {
            origin: true,
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`[INFO] ${socket.id} connected`);

        // Création d'un salon de jeu
        socket.on('create_channel', (socketId, username, id, callback) => createChannel(socket, socketId, username, id, channelsMap, callback));
        
        socket.on('players_position', (roomId, playerPosition, socketId) => getPlayerPosition(io, roomId, playerPosition, socketId, channelsMap));
        socket.on('players_state', (roomId, playerState, socketId) => getPlayerState(io, roomId, playerState, socketId, channelsMap));
        socket.on('players_rotation', (roomId, playerRotation, socketId) => getPlayerRotation(io, roomId, playerRotation, socketId, channelsMap));

        socket.on('channel_info', (roomId, socketId) => getRoomInfo(io, roomId, socketId, channelsMap));
        socket.on('join_channel', (roomId, socketId, username, id, callback) => joinChannel(socket, roomId, socketId, username, id, channelsMap, callback));
        //socket.on('start_game', (roomId) => startGame(socket, io, roomId, channelsMap));
        

    });
}

module.exports = socketIoSetup;