require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messages = [];

app.use(express.static('public'));

io.on('connection', (socket) => {

    console.log('User Connected');

    socket.emit('loadMessages', messages);

    socket.on('sendMessage', (data) => {

        messages.push(data);

        io.emit('newMessage', data);

    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
