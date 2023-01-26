// Module importation
const server = require('../server');
const pool = require('../config/db_config');
//
// Create an instance of a chat server
const io = require('socket.io')(server);
//
//Event handling of a socket instance
io.on('connection', socket => {
    //
    //Get user id from socket handshake
    const user_id = socket.handshake.query.user_id;
    
    // store the connection info in the db
    pool.query(
      `INSERT INTO connections (socket_id, user_id) VALUES($1,$2)`,
      [socket_id, user_id]
    );
    //
    //re-establishing group connections
    pool.query(
      `SELECT `
    )
  });
  
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  app.get("/", (req, res) => {
    res.send("Hello");
  });