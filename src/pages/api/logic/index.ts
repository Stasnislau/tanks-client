import GameMaster from "./gameMaster";
const io = require("../server");
import { commandStackInterface } from "../interfaces";

let gameMaster = {} as GameMaster;
io.on("start-game", (commandStack: commandStackInterface) => {
    console.log("start game recieved", commandStack)
  if (!gameMaster) {
    gameMaster = new GameMaster();
    gameMaster.startGame(commandStack);
  }
});
io.on("disconnect", () => {
  console.log("user disconnected");
});
io.on("connection", () => {
  console.log("a user connected");
});
io.on("action-move", (direction: string) => {
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
