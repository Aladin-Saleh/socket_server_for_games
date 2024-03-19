const dotenv            = require('dotenv').config({ path: './config/.env' });

const express           = require('express');
const app               = express();

const cors              = require('cors');

const http              = require('http');
const server            = http.createServer(app);

const socketIoSetup = require('./sockets/index');
const corsOption    = 
{
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE","PUT","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    preflightContinue: false,
};

// app.use(cors(corsOption));

// app.all('*',(req,res,next) => {
//     let origin = req.get('origin');
//     res.header('Access-Control-Allow-Origin',origin);    
//     res.header('Access-Control-Allow-Headers','X-Requested-With');    
//     res.header('Access-Control-Allow-Headers','Content-Type');    
//     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS,PATCH');
//     res.header('Access-Control-Allow-Credentials','true');
//     next();
// });


socketIoSetup(server);





server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}`);
    console.log(`Socket is running on port ${process.env.PORT} at http://localhost:${process.env.PORT}/socket`)
});