const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/public', express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  socket.on('chat message', (client) => {
    console.log(`${client.userName}: ${client.msg}`);
    io.emit('chat message', client);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
