import {
  bulletInterface,
  playerInterface,
  mapInterface,
} from "../../interfaces";
class Bullet {
  id: number;
  ownerID: number;
  x: number;
  y: number;
  direction: string;
  constructor(
    id: number,
    ownerID: number,
    x: number,
    y: number,
    direction: string
  ) {
    this.id = id;
    this.ownerID = ownerID;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  //// move 3 tiles in the direction. Check all the tiles on the way if they are empty or not. If not, return the coordinates of the tile that is not empty and id of the bullet. If all tiles are empty, return null.
  moveBullet = (map: mapInterface, direction: string) => {
    let x = this.x;
    let y = this.y;
    let i = 0;
    while (i < 3) {
      switch (direction) {
        case "up":
          y--;
          break;
        case "down":
          y++;
          break;
        case "left":
          x--;
          break;
        case "right":
          x++;
          break;
      }
      if (
        map.tiles[y][x].occupation !== "empty" &&
        map.tiles[y][x].occupation !== "bullet"
      ) {
        return { x, y, id: this.id };
      }
      i++;
    }
    return null;
  };
}

export default Bullet;
