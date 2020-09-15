const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const formatMessage = require('./utils/messages');
const {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const botName = 'ChatBot';

//run when a client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit('botMessage', formatMessage(botName, 'Welcome to ChatCord!'));

    //broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'botMessage',
        formatMessage(botName, `${user.name} has joined the chat!`)
      );

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // listen for chat message
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.name, msg));
  });

  // runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'botMessage',
        formatMessage(botName, `${user.name} has left the chat!`)
      );

      // send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// start server
const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
