import {
  gameInterface,
  commandStackInterface,
  mapInterface,
} from "../../interfaces";
import Player from "../player";
import Map from "../map";
import Bullet from "../bullet";
import Wall from "../wall";
export class GameMaster {
  state: gameInterface;
  constructor() {
    this.state = {
      kills: 0,
      gameStarted: false,
      isVictory: false,
      map: {} as Map,
      players: [] as Player[],
      bullets: [] as Bullet[],
      walls: [] as Wall[],
    };
  }
  startGame(commandStack: commandStackInterface) {
    this.state.gameStarted = true;
    this.generateMap(10, 10);
    this.initializeWalls();
    this.initializePlayers(commandStack);
  }
  endGame() {
    this.state.gameStarted = false;
  }
  generateMap(dimensionX: number, dimensionY: number) {
    const map = new Map(dimensionX, dimensionY);
    map.generateMap();
    this.state.map = map;
  }
  initializeWalls() {
    const walls = [
      {
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
    ];
    walls.forEach((wall) => {
      if (this.state.map.tiles[wall.x][wall.y].occupation === "empty") {
        this.state.map.tiles[wall.x][wall.y] = {
          occupation: "wall",
          direction: "none",
        };
      }
    });
  }

  initializePlayers(commandStack: commandStackInterface) {
    // TODO: use commandStack to initialize players
    this.state.players = [
      new Player(0, 0, 0, "right", true, true),
      new Player(1, this.state.map.dimensionX - 1, 0, "left", false, false),
      new Player(2, 0, this.state.map.dimensionY - 1, "right", false, false),
      new Player(
        3,
        this.state.map.dimensionX - 1,
        this.state.map.dimensionY - 1,
        "left",
        false,
        false
      ),
    ];

    this.state.players.forEach((player) => {
      if (this.state.map.tiles[player.x][player.y].occupation === "empty") {
        this.state.map.tiles[player.x][player.y] = {
          occupation: (player.isBlue ? "blue" : "red") + "-team",
          direction: player.direction,
        };

        this.state.players.push(player);
      }
    });
  }

  movePlayer(direction: string) {
    const player = this.state.players.find((player) => player.isHuman);
    if (!player) {
      return;
    }
    if (!player?.isDead) {
      player.movePlayer(this.state.map, direction);
    }
  }

  getMap(): mapInterface {
    return this.state.map;
  }
}
