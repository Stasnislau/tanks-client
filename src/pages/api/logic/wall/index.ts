class Wall {
  id: number;
  x: number;
  y: number;
  health: number;
  constructor(id: number, x: number, y: number, health?: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health || 3;
  }
}

export default Wall;
