export interface storeInterface {
  time: number;
  kills: number;
  gameStarted: boolean;
}

export interface mapInterface {
  tiles: tileInterface[][];
  dimensionX: number;
  dimensionY: number;
}

export interface tileInterface {
  x: number;
  y: number;
  occupation: number; // 0 - empty, 1 - player, 2 - ai, 3 - bullet (player), 4 - bullet (ai), 5 - wall
}
