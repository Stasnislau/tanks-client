import {
  mapInterface,
  mapGeneratorProps,
  tileInterface,
  gameInterface,
  commandStackInterface,
} from "../../interfaces";


class Map {
  dimensionX: number;
  dimensionY: number;
  tiles: tileInterface[][];
  constructor(dimensionX: number, dimensionY: number) {
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.tiles = [];
    console.log("map created");
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
  }
}

export default Map;
