export interface storeInterface {
  time: number;
  kills: number;
  gameStarted: boolean;
}

export interface mapInterface {
  tiles: tileInterface[][];
  dimensionX: number;
  dimensionY: number;
  player: playerInterface;
}

export interface playerInterface {
  x: number;
  y: number;
  health: number;
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

export interface MoveInterface {
  xBefore: number;
  yBefore: number;
  xAfter: number;
  yAfter: number;
}

export interface MoveValidatorProps {
  map: mapInterface;
  move: MoveInterface;
}
