// import { commandStackInterface } from "./interfaces";
const app = require("express")();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("start-game", (commandStack: any) => {
    console.log("received on server the start command", commandStack);
  });
});

module.exports = io;
