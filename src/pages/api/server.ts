import { commandStackInterface } from "./interfaces";
import { GameMaster } from "./logic/gameMaster";
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

const master = new GameMaster();
io.on("connection", (socket: any) => {
  console.log("connected");
  socket.on("start-game", (commandStack: commandStackInterface) => {
    master.startGame(commandStack);
    setInterval(() => {
      socket.emit("server-client-map", master.getMap());
    }, 500);
  });
  socket.on("direction", (direction: string) => {
    console.log(`received direction: ${direction}`);
    master.movePlayer(direction);
  });
});
