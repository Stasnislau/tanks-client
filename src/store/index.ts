import { mapInterface } from "@/interfaces";
import { makeAutoObservable } from "mobx";
import validateMove from "@/logic/MoveValidator";

export class Store {
  time: number;
  kills: number;
  gameStarted: boolean;
  map: mapInterface;

  constructor() {
    this.time = 0;
    this.kills = 0;
    this.gameStarted = false;
    this.map = {
      tiles: [],
      dimensionX: 0,
      dimensionY: 0,
      player: {
        x: 0,
        y: 0,
        health: 100,
      },
    };
    makeAutoObservable(this);
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
  setMap = (map: mapInterface) => {
    this.map = map;
  };
  reset = () => {
    this.time = 0;
    this.kills = 0;
    this.gameStarted = false;
  };

  movePlayer = (direction: string) => {
    const xToMove = direction === "left" ? -1 : direction === "right" ? 1 : 0;
    const yToMove = direction === "up" ? -1 : direction === "down" ? 1 : 0;
    const xAfter = this.map.player.x + xToMove;
    const yAfter = this.map.player.y + yToMove;
    if (
      validateMove({
        map: this.map,
        move: {
          xBefore: this.map.player.x,
          yBefore: this.map.player.y,
          xAfter,
          yAfter,
        },
      }) === false
    ) {
      return;
    }
    this.map.tiles[this.map.player.x][this.map.player.y].occupation = "empty";
    this.map.player.x = xAfter;
    this.map.player.y = yAfter;
    console.log("Moved from ", this.map.player.x, this.map.player.y, " to ", xAfter, yAfter);
    this.map.tiles[xAfter][yAfter].occupation = "player";
  };
}
