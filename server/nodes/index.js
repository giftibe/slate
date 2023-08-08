const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const http = require('http');
require('colors');
const cors = require('cors');
const { ORIGIN, PORT } = process.env;
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log("user id is ".green, socket.id);

    socket.on('disconnect', () => {
        console.log('user disconneted'.red, socket.id);
    });
});


server.listen(PORT, () => {
    console.log(`🚀 ${'Server up and running'.blue}`);
});
