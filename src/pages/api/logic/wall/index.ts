class Wall {
    x: number;
    y: number;
    health: number;
  constructor( x: number, y: number, health?: number) {
    this.x = x;
    this.y = y;
    this.health = health || 3;
  }
}

export default Wall;
