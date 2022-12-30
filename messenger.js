//Module importation
// Express for sever routing 
const express = require('express');
//
//Web sockets for handling the chat 
const webSocket = require('ws');
//
//create an instance of express
const app = express();
//
//Setting up the routes 
app.get('/',(req, res) => {
    res.send("Hello World");
});
//
//Create a server listening at a specified port
const server = app.listen(8080, () => {
    console.log("Server started and listening at port 8080");
});
//
//Create a web socket server
const wss = new WebSocket.server({server});
//
//Setting up the event listener at connection 
wss.on('connection', (ws) => {
  // Set up event handlers for the client socket

  ws.on('message', (message) => {
    // Handle the message from the client
    console.log(`{message}`)
  });

  ws.on('close', () => {
    // connection closed
    console.log('connection ended!!')
  });

});



/* //how to implement web sockets to create a chat room?
const rooms = {};

wss.on("connection", socket => {
  const uuid = ...; // create here a uuid for this connection

  const leave = room => {
    // not present: do nothing
    if(! rooms[room][uuid]) return;

    // if the one exiting is the last one, destroy the room
    if(Object.keys(rooms[room]).length === 1) delete rooms[room];
    // otherwise simply leave the room
    else delete rooms[room][uuid];
  };

  socket.on("message", data => {
    const { message, meta, room } = data;

    if(meta === "join") {
      if(! rooms[room]) rooms[room] = {}; // create the room
      if(! rooms[room][uuid]) rooms[room][uuid] = socket; // join the room
    }
    else if(meta === "leave") {
      leave(room);
    }
    else if(! meta) {
      // send the message to all in the room
      Object.entries(rooms[room]).forEach(([, sock]) => sock.send({ message }));
    }
  });

  socket.on("close", () => {
    // for each room, remove the closed socket
    Object.keys(rooms).forEach(room => leave(room));
  });
});
 */

