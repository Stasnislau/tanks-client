import {
  bulletInterface,
  playerInterface,
  mapInterface,
  wallInterface,
} from "../../interfaces";
import Map from "../map";
import Player from "../player";
import Wall from "../wall";
class Bullet {
  id: number;
  ownerID: number;
  fresh: boolean;
  x: number;
  y: number;
  direction: string;
  constructor(
    id: number,
    ownerID: number,
    x: number,
    y: number,
    direction: string,
  ) {
    this.id = id;
    this.ownerID = ownerID;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.fresh = true;
  }
  //// move 3 tiles in the direction. Check all the tiles on the way if they are empty or not. If not, return the coordinates of the tile that is not empty and id of the bullet. If all tiles are empty, return null.
  moveBullet = (map: mapInterface) => {
    let x = this.x;
    let y = this.y;
    let i = 0;

    while (i < 3) {
      map.tiles[this.x][this.y].occupation = "empty";
      map.tiles[this.x][this.y].direction = "none";
      switch (this.direction) {
        case "up":
          y++;
          break;
        case "down":
          y--;
          break;
        case "left":
          x--;
          break;
        case "right":
          x++;
          break;
      }
      if (x < 0 || x >= map.dimensionX || y < 0 || y >= map.dimensionY) {
        return { type: "border", x: -1, y: -1, id: this.id };
      }
      if (
        map.tiles[x][y].occupation !== "empty" &&
        map.tiles[x][y].occupation !== "bullet"
      ) {
        return { type: map.tiles[x][y].occupation, x, y, id: this.id };
      }
      map.tiles[x][y].occupation = "bullet";
      map.tiles[x][y].direction = this.direction;
      this.x = x;
      this.y = y;
      i++;
    }
    return null;
  };

  checkHit = (map: Map, players: Player[], walls: Wall[]) => {
    const player = players.find(
      (player) => player.x === this.x && player.y === this.y && !player.isDead
    );
    if (player) {
      return {
        type: "player",
        id: player.id,
        bulletId: this.id,
        ownerId: this.ownerID,
      };
    }
    const wall = walls.find((wall) => wall.x === this.x && wall.y === this.y);
    if (wall) {
      return {
        type: "wall",
        id: wall.id,
        bulletId: this.id,
        ownerId: this.ownerID,
      };
    }
    return {
      type: "none",
      id: -1,
      bulletId: this.id,
      ownerId: this.ownerID,
    };
  };
}

export default Bullet;
