import {
  bulletInterface,
  playerInterface,
  mapInterface,
  wallInterface,
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
  moveBullet = (map: mapInterface,) => {
    let x = this.x;
    let y = this.y;
    let i = 0;
    while (i < 3) {
      switch (this.direction) {
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

  checkHit = (
    map: mapInterface,
    players: playerInterface[],
    walls: wallInterface[]
  ) => {
    if (map.tiles[this.y][this.x].occupation === "bullet") {
      return null;
    }
    const player = players.find(
      (player) => player.x === this.x && player.y === this.y
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
      return { type: "wall", id: wall.id, bulletId: this.id, ownerId: this.ownerID };
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
