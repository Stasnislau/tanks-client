import { mapInterface } from "../../interfaces";

class Player {
  id: number;
  x: number;
  y: number;
  direction: string;
  isHuman: boolean;
  isDead: boolean;
  isBlue: boolean;
  constructor(
    id: number,
    x: number,
    y: number,
    direction: string,
    isHuman: boolean,
    isBlue: boolean
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.isHuman = isHuman;
    this.isDead = false;
    this.isBlue = isBlue;
  }

  movePlayer = (map: mapInterface, direction: string) => {
    const xAfter =
      this.x + (direction === "right" ? 1 : direction === "left" ? -1 : 0);
    const yAfter =
      this.y + (direction === "down" ? 1 : direction === "up" ? -1 : 0);
    if (
      xAfter < 0 ||
      xAfter >= map.dimensionX ||
      yAfter < 0 ||
      yAfter >= map.dimensionY
    ) {
      return;
    }
    if (
      map.tiles[xAfter][yAfter].occupation === "empty" ||
      map.tiles[xAfter][yAfter].occupation === "bullet"
    ) {
      map.tiles[xAfter][yAfter].occupation = "blue-team";
      map.tiles[xAfter][yAfter].direction = direction;
      map.tiles[this.x][this.y].occupation = "empty";
      map.tiles[this.x][this.y].direction = "none";
      this.x = xAfter;
      this.y = yAfter;
    }
  };
}
export default Player;

