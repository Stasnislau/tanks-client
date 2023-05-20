export interface storeInterface {
  time: number;
  kills: number;
  gameStarted: boolean;
}

export interface mapInterface {
  tiles: tileInterface[][];
  dimensionX: number;
  dimensionY: number;
  players: playerInterface[];
  bullets: shotInterface[];
  walls: wallInterface[];
}

export interface playerInterface {
  x: number;
  y: number;
  direction: string;
  isHuman: boolean;
  isDead: boolean;
  isBlue: boolean;
}

export interface tileInterface {
  x: number;
  y: number;
  occupation: string; // empty, blue-team, red-team, bullet, wall
}

export interface wallInterface {
  x: number;
  y: number;
}

export interface MapComponentProps {
  map: mapInterface;
  sizes: sizesInterface;
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

export interface sizesInterface {
  width: number;
  height: number;
}

export interface shotInterface {
  x: number;
  y: number;
  direction: string;
  isPlayer: boolean;
}
