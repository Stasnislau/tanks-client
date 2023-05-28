import  Map  from "../../api/logic/map";
import Player from "../../api/logic/player";
import Bullet from "../../api/logic/bullet";
import Wall from "../../api/logic/wall";
export interface gameInterface {
  kills: number;
  gameStarted: boolean;
  isVictory: boolean;
  map: Map;
  players: Player[];
  bullets: Bullet[];
  walls: Wall[];
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
  id: number;
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

export interface sizesInterface {
  width: number;
  height: number;
}

export interface mapComponentProps {
  map: mapInterface;
  sizes: sizesInterface;
}

export interface headerInterface {
  secondsElapsed: number;
  kills: number;
}

export interface coordinatesInterface {
  x: number;
  y: number;
}