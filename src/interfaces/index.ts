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
  occupation: string; // empty, player, ai, player-bullet, ai-bullet, wall
}

export interface MapComponentProps {
  map: mapInterface;
  sizes: sizeInterface;
}

export interface sizeInterface {
  width: number;
  height: number;
}