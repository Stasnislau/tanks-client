import GameMaster from "./gameMaster";
const io = require("../server");
import { commandStackInterface } from "../interfaces";

console.log(io, "server started and imported");
let gameMaster = {} as GameMaster;
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});
socket.on("start-game", (commandStack: commandStackInterface) => {
  console.log("start game received", commandStack);
  if (!gameMaster) {
    gameMaster = new GameMaster();
    gameMaster.startGame(commandStack);
  }
});
socket.on("disconnect", () => {
  console.log("user disconnected");
});
socket.on("connection", () => {
  console.log("a user connected");
});
socket.on("action-move", (direction: string) => {
  gameMaster.movePlayer(direction);
});
while (true) {
  setInterval(() => {
    if (gameMaster.state.gameStarted) {
      console.log("sent map from where should be", gameMaster.getMap());
      io.emit("server-client-map", gameMaster.getMap());
    }
  }, 20);
}
