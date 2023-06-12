const express = require("express");
//
//Route importation
const userRouter = require("./routes/user");
const messagesRouter = require("./routes/messenger");
const chatRoomRouter = require("./routes/chat_rooms");

//create an instance of express
const app = express();
//
// parses request with body content type json
app.use(express.json()); 
//
//Routes
app.get("/" , (req,res) => res.send('Hello World'));
app.use("/user", userRouter);
app.use("/messages", messagesRouter);
app.use("/chatroom", chatRoomRouter);

module.exports = app