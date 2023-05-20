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

  moveBullet = (map: mapInterface, direction: string) => {
    const xAfter =
      this.x + (direction === "right" ? 3 : direction === "left" ? -3 : 0);
    const yAfter =
      this.y + (direction === "down" ? 3 : direction === "up" ? -3 : 0);
  };
} 

export default Bullet;
