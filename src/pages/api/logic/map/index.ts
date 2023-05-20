import {
  mapInterface,
  mapGeneratorProps,
  tileInterface,
  gameInterface,
  commandStackInterface,
} from "../../interfaces";

import Player from "../player";

class Map {
  dimensionX: number;
  dimensionY: number;
  tiles: tileInterface[][];
  constructor(dimensionX: number, dimensionY: number) {
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.tiles = [];
  }
  generateMap({ state, commandStack }: mapGeneratorProps) {
    const map: mapInterface = {
      tiles: [],
      dimensionX: this.dimensionX,
      dimensionY: this.dimensionY,
    };
    for (let i = 0; i < this.dimensionX; i++) {
      map.tiles[i] = [];
      for (let j = 0; j < this.dimensionY; j++) {
        map.tiles[i][j] = {
          occupation: "empty",
          direction: "none",
        };
      }
    }
    // generate players on corners. for the test purposes blue number will be 1 and red number will be 3
    const players = [
      new Player(0, 0, 0, "right", true, true),
      new Player(1, this.dimensionX - 1, 0, "left", false, false),
      new Player(2, 0, this.dimensionY - 1, "right", false, false),
      new Player(
        3,
        this.dimensionX - 1,
        this.dimensionY - 1,
        "left",
        false,
        false
      ),
    ];

    players.forEach((player) => {
      if (map.tiles[player.x][player.y].occupation === "empty") {
        map.tiles[player.x][player.y].occupation = "player";
        map.tiles[player.x][player.y].direction = player.direction;
        state.players.push(player);
      }
    });

    const walls = [
      {
        x: Math.random() * this.dimensionX,
        y: Math.random() * this.dimensionY,
        health: Infinity,
      },
      {
        x: Math.random() * this.dimensionX,
        y: Math.random() * this.dimensionY,
        health: Infinity,
      },
      {
        x: Math.random() * this.dimensionX,
        y: Math.random() * this.dimensionY,
        health: Infinity,
      },
      {
        x: Math.random() * this.dimensionX,
        y: Math.random() * this.dimensionY,
        health: Infinity,
      },
      {
        x: Math.random() * this.dimensionX,
        y: Math.random() * this.dimensionY,
        health: Infinity,
      },
    ];
    walls.forEach((wall) => {
      if (map.tiles[wall.x][wall.y].occupation === "empty") {
        map.tiles[wall.x][wall.y].occupation = "wall";
        map.tiles[wall.x][wall.y].direction = "none";
      }
    });
  }
}

export default Map;
