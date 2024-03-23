const createChannel = require('./createChannel');
const joinChannel   = require('./joinChannel');
const startGame     = require('./startGame');
const getRoomInfo   = require('./getRoomInfo');

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
        socket.on('channel_info', (roomId, playerPosition, socketId) => getRoomInfo(io, roomId, playerPosition, socketId, channelsMap));
        socket.on('join_channel', (roomId, socketId, username, id, callback) => joinChannel(socket, roomId, socketId, username, id, channelsMap, callback));
        //socket.on('start_game', (roomId) => startGame(socket, io, roomId, channelsMap));
        

    });
}

module.exports = socketIoSetup;