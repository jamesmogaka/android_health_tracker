//Module importation
const express = require("express");
const userRouter = require("./routes/user");
const messagesRouter = require("./routes/messenger");
const chatRoomRouter = require("./routes/chat_rooms");
//
//create an instance of express
const app = express();
//
//
const port = process.env.PORT || 8080;
//
//Middleware 
app.use(express.urlencoded({ extended: false }));   // enables passage of data between front and back end through html
app.use(express.json()); // parses request with body content type json

//creation of the routes and how to handle them
app.get("/" , (req,res) => res.send('Hello World'));
app.use("/user", userRouter);
app.use("/messages", messagesRouter);
app.use("/chatroom", chatRoomRouter);

//Start the app at a given port
const server = app.listen(port, () => {
  console.log(`server listening http://localhost:${port}/`);
});

module.exports = server;
