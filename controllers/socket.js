// Module importation
const server = require('../server');
const pool = require('../config/db_config');

// Create an instance of a chat server
const io = require('socket.io')(server);

//Middleware
//Authentication
io.use((socket,next) => {
  //Get socket id and the corresponding user id
  //user id in jwt.
  const user_token = socket.handshake.query.user_token;
  const room_token = socket.handshake.query.firebase_token;
  if(!user_token && !room_token){
    return next(new Error("Tokens must be passed"));
  }else{
    //Check if the user is authenticated
    //
    
    return next();
  } 
  
  //
  //re-establishing room connections   
});

//Event handling of a socket instance
io.on('connection', socket => {
  //
  //
  socket.on("disconnect", () => {
    
  });
});