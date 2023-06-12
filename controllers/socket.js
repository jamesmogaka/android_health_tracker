// Module importation
const server = require('../server');
const admin = require('../config/firebase_config')
// Create an instance of a chat server
const io = require('socket.io')(server);
//
//Middleware
//Authentication

io.use((socket,next) => {
  //
  //Pass the firebase id which can be used to extract the phone no
  const room_token = socket.handshake.query.firebase_token;
  
  if(!room_token){
    return next(new Error("Tokens must be passed"));
  }else{
    //Use the room_token to get the contact and create a room with id of contact
    //
  admin.auth().getUser(room_token)
  .then((userRecord) => {
    console.log('Successfully fetched user data:', userRecord.toJSON());
    socket.userName = userRecord.phoneNumber;
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
    return next();
  } 
  //
  //re-establishing room connections   
});

//Event handling of a socket instance
io.on('connection', socket => {
  //
  //
  //Create a room for the user with the phone number as the room name
  const roomName = socket.userName;
  socket.join(roomName);
  //
  //Send the list of all clients in the socket
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.userName,
    });
  }
  socket.emit("users", users);
  //
  //Implementation of message persistance logic

  // ...
  //
  //Join group event
  
  //
  //Leave group event

  //
  //Send message to group
  
  //
  // Message event
  socket.on("private message", ({ content, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      content,
      from: socket.userID,
      to,
    });
  });
  //
  //Disconnection event
  socket.on("disconnect", () => {
    console.log("One of sockets disconnected from our server.")
  });
});