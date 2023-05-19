export interface storeInterface {
  time: number;
  kills: number;
  gameStarted: boolean;
}

export interface gameInterface {
  map: tileInterface[][];
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
  occupation: string; // empty, blue-team, red-team, bullet, wall
}

export interface wallInterface {
  x: number;
  y: number;
  health: number;
}

export interface tankMoveInterface {
  id: number;
  xAfter: number;
  yAfter: number;
}

export interface bulletMoveInterface {
    id: number;
    xBefore: number;
    yBefore: number;
    direction: string;
}

export interface MoveValidatorProps {
  map: tileInterface[][];
  move: tankMoveInterface;
}

export interface shotInterface {
  id: number;
  x: number;
  y: number;
  direction: string;
  isPlayer: boolean;
}
