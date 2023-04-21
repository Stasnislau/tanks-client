import { makeAutoObservable } from "mobx";

export interface storeInterface {
  time: number;
  kills: number;
}

export class Store {
  time: number;
  kills: number;

  constructor() {
    makeAutoObservable(this);
    this.time = 0;
    this.kills = 0;
  }

  updateKills = (kills: number) => {
    this.kills = kills;
  };

    updateTimer = (time: number) => {
    this.time = time;
    };

    reset = () => {
    this.time = 0;
    this.kills = 0;
    };
}
