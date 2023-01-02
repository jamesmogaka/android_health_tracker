// importing the necessary modules
const server = require('./server');
// importation and creation of a server instance
const io = require('socket.io')(server);

//Event handling of a socket instance
io.on('connection', socket => {
  console.log(socket.id);
})

