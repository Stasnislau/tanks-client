export interface gameInterface {
  kills: number;
  gameStarted: boolean;
  isVictory: boolean;
  map: mapInterface;
  players: playerInterface[];
  bullets: bulletInterface[];
  walls: wallInterface[];
}

export interface playerInterface {
  id: number;
  x: number;
  y: number;
  direction: string;
  isHuman: boolean;
  isDead: boolean;
  isBlue: boolean;
}

export interface mapInterface {
  tiles: tileInterface[][];
  dimensionX: number;
  dimensionY: number;
}

export interface tileInterface {
  occupation: string;
  direction: string;
}
export interface wallInterface {
  x: number;
  y: number;
  health: number;
}

export interface playerMoveInterface {
  id: number;
  xBefore: number;
  yBefore: number;
  direction: string;
}

export interface bulletMoveInterface {
  id: number;
  xBefore: number;
  yBefore: number;
  direction: string;
}

export interface bulletInterface {
  id: number;
  ownerID: number;
  x: number;
  y: number;
  direction: string;
}

export interface mapGeneratorProps {
  state: gameInterface;
  commandStack: {
    blueNumber: number;
    redNumber: number;
  };
}

export interface commandStackInterface {
  blueNumber: number;
  redNumber: number;
}
