import { makeAutoObservable } from "mobx";

export class Store {
  time: number;
  kills: number;
  gameStarted: boolean;
  dimensionX: number;
  dimensionY: number;

  constructor() {
    makeAutoObservable(this);
    this.time = 0;
    this.kills = 0;
    this.gameStarted = false;
    this.dimensionX = 10;
    this.dimensionY = 10;
  }

  updateKills = (kills: number) => {
    this.kills = kills;
  };

  updateTimer = (time: number) => {
    this.time = time;
  };

  startGame = () => {
    this.gameStarted = true;
  };

  reset = () => {
    this.time = 0;
    this.kills = 0;
    this.gameStarted = false;
  };
}
