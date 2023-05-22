import {
  gameInterface,
  commandStackInterface,
  mapInterface,
} from "../../interfaces";
import Map from "../map";
class GameMaster {
  state: gameInterface;
  constructor(commandStack: commandStackInterface) {
    this.state = {
      kills: 0,
      gameStarted: false,
      isVictory: false,
      map: {} as mapInterface,
      players: [],
      bullets: [],
      walls: [],
    };
  }
  startGame() {
    this.state.gameStarted = true;
  }
  endGame() {
    this.state.gameStarted = false;
  }
  generateMap(dimensionX: number, dimensionY: number) {
    const map = new Map(dimensionX, dimensionY);
    map.generateMap({
      state: this.state,
      commandStack: {} as commandStackInterface,
    });
  }
  
}

export default GameMaster;
