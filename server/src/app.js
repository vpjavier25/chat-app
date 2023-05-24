const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", async (socket) => {
  const users = [];

    const sockets = await io.fetchSockets();
    for (let socket of sockets){
      users.push({
        userId: socket.id, 
        username: socket.handshake.auth.username
      })
    }
  
  console.log(users)
 
  socket.emit("users connected", users);

  socket.broadcast.emit("user connected", {
    userId: socket.id, 
    username: socket.handshake.auth.username
  })

  socket.on("private message", ({content, to})=>{
    console.log(content)
    socket.to(to).emit("private message", {content, from: socket.id});
  })

});



module.exports = httpServer
