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
  socket.on("start-game", (commandStack: commandStackInterface) => {
    master.startGame(commandStack);
    setInterval(() => {
      master.updateBullets();
      if (!master.state.isVictory) {
        const status = master.checkIfGameOver();
        if (status !== "none") {
          socket.emit("server-client-game-over", status);
          master.state.isVictory = true;
        }
      }
      socket.emit("server-client-map", master.getMap());
    }, 500);
  });
  socket.on("direction", (direction: string) => {
    master.movePlayer(direction);
  });
  socket.on("shoot", () => {
    const player = master.getHumanPlayer();
    if (!player) {
      return;
    }
    master.playerShoot(player);
  });
});
