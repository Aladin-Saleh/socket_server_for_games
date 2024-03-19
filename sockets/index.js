const createChannel = require('./createChannel');



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

    });
}

module.exports = socketIoSetup;