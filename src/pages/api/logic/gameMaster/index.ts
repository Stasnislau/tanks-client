import {
  gameInterface,
  commandStackInterface,
  mapInterface,
  coordinatesInterface,
} from "../../interfaces";
import Player from "../player";
import Map from "../map";
import Bullet from "../bullet";
import Wall from "../wall";
export class GameMaster {
  state: gameInterface;
  constructor() {
    this.state = {
      kills: 0,
      gameStarted: false,
      isVictory: false,
      map: {} as Map,
      players: [] as Player[],
      bullets: [] as Bullet[],
      walls: [] as Wall[],
    };
  }
  startGame(commandStack: commandStackInterface) {
    this.state.gameStarted = true;
    this.generateMap(10, 10);
    this.initializePlayers(commandStack);
    this.initializeWalls();
  }
  endGame() {
    this.state.gameStarted = false;
  }
  generateMap(dimensionX: number, dimensionY: number) {
    const map = new Map(dimensionX, dimensionY);
    map.generateMap();
    this.state.map = map;
  }
  initializeWalls() {
    this.state.walls = [
      {
        id: 0,
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        id: 1,
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        id: 2,
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        id: 3,
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
      {
        id: 4,
        x: Math.floor(Math.random() * this.state.map.dimensionX),
        y: Math.floor(Math.random() * this.state.map.dimensionY),
        health: Infinity,
      },
    ];

    this.state.walls.forEach((wall) => {
      if (this.state.map.tiles[wall.x][wall.y].occupation === "empty") {
        this.state.map.tiles[wall.x][wall.y] = {
          occupation: "wall",
          direction: "none",
        };
      }
    });
  }

  initializePlayers(commandStack: commandStackInterface) {
    // TODO: use commandStack to initialize players
    this.state.players = [
      new Player(0, 0, 0, "right", true, true),
      new Player(1, this.state.map.dimensionX - 1, 0, "left", false, false),
      new Player(2, 0, this.state.map.dimensionY - 1, "right", false, false),
      new Player(
        3,
        this.state.map.dimensionX - 1,
        this.state.map.dimensionY - 1,
        "left",
        false,
        false
      ),
    ];

    this.state.players.forEach((player) => {
      if (this.state.map.tiles[player.x][player.y].occupation === "empty") {
        this.state.map.tiles[player.x][player.y] = {
          occupation: (player.isBlue ? "blue" : "red") + "-team",
          direction: player.direction,
        };

        this.state.players.push(player);
      }
    });
  }

  movePlayer(direction: string) {
    const player = this.state.players.find((player) => player.isHuman);
    if (!player) {
      return;
    }
    if (!player?.isDead) {
      player.movePlayer(this.state.map, direction);
    }
  }
  createIdForBullet() {
    let id = 0;
    if (this.state.bullets.length === 0) {
      return id;
    }
    this.state.bullets.forEach((bullet) => {
      if (bullet.id > id) {
        id = bullet.id;
      }
    });
    return id + 1;
  }
  getHumanPlayer() {
    const player = this.state.players.find((player) => player.isHuman);
    if (!player) {
      return undefined;
    }
    return {
      x: player.x,
      y: player.y,
    };
  }

  playerShoot(coordinates: coordinatesInterface) {
    const player = this.state.players.find(
      (player: Player) =>
        player.x === coordinates.x &&
        player.y === coordinates.y &&
        !player.isDead
    );
    if (!player || player.isDead) {
      return;
    }
    if (player.direction === "up") {
      coordinates.y -= 1;
    } else if (player.direction === "down") {
      coordinates.y += 1;
    } else if (player.direction === "left") {
      coordinates.x -= 1;
    } else if (player.direction === "right") {
      coordinates.x += 1;
    }
    if (
      coordinates.x < 0 ||
      coordinates.x >= this.state.map.dimensionX ||
      coordinates.y < 0 ||
      coordinates.y >= this.state.map.dimensionY
    ) {
      return;
    }
    const direction = player.direction;
    const bullet = new Bullet(
      this.createIdForBullet(),
      player.id,
      coordinates.x,
      coordinates.y,
      direction
    );
    const result = bullet.checkHit(
      this.state.map,
      this.state.players,
      this.state.walls
    );
    if (!result) {
      console.log("result is undefined");
      return;
    }
    this.state.bullets.push(bullet);
    if (result.type === "none") {
      this.state.map.tiles[bullet.x][bullet.y] = {
        occupation: "bullet",
        direction: bullet.direction,
      };
    } else if (result.type === "wall") {
      this.handleWallHit(result.bulletId, result.id);
    } else if (result.type === "player") {
      this.handlePlayerHit(result.bulletId, result.id, result.ownerId);
    }
  }

  getMap(): mapInterface {
    return this.state.map;
  }
  handleWallHit(bulletId: number, wallId: number) {
    const bullet = this.state.bullets.find((bullet) => bullet.id === bulletId);
    const wall = this.state.walls.find((wall) => wall.id === wallId);
    if (!bullet || !wall) {
      return;
    }
    wall.health -= 1;
    if (wall.health <= 0) {
      this.state.walls = this.state.walls.filter((wall) => wall.id !== wallId);
      this.state.map.tiles[wall.x][wall.y] = {
        occupation: "empty",
        direction: "none",
      };
    }
    this.state.bullets = this.state.bullets.filter(
      (bullet) => bullet.id !== bulletId
    );
  }
  handlePlayerHit(bulletId: number, playerId: number, ownerID: number) {
    const bullet = this.state.bullets.find((bullet) => bullet.id === bulletId);
    const player = this.state.players.find((player) => player.id === playerId);
    const owner = this.state.players.find((player) => player.id === ownerID);
    if (!bullet || !player || !owner) {
      return;
    }
    if (owner.id !== player.id) {
      player.isDead = true;
      this.state.map.tiles[player.x][player.y] = {
        occupation: "empty",
        direction: "none",
      };
      if (owner.isHuman) {
        this.state.kills += 1;
      }
    }
    this.state.bullets = this.state.bullets.filter(
      (bullet) => bullet.id !== bulletId
    );
  }
  updateBullets = () => {
    if (this.state.bullets.length === 0) {
      return;
    }
    this.state.bullets.forEach((bullet) => {
      if (bullet.fresh) {
        bullet.fresh = false;
        return;
      }
      const result = bullet.moveBullet(this.state.map);
      if (result) {
        if (result.type === "border") {
          this.state.bullets = this.state.bullets.filter(
            (bullet) => bullet.id !== result.id
          );
        } else if (result.type === "wall") {
          const wall = this.state.walls.find(
            (wall) => wall.x === result.x && wall.y === result.y
          ) as Wall;
          this.handleWallHit(result.id, wall.id);
        } else if (result.type === "blue-team" || result.type === "red-team") {
          const player = this.state.players.find(
            (player) =>
              player.x === result.x && player.y === result.y && !player.isDead
          ) as Player;
          const bullet = this.state.bullets.find(
            (bullet) => bullet.id === result.id
          ) as Bullet;
          this.handlePlayerHit(bullet.id, player.id, bullet.ownerID);
        }
      }
    });
  };
  checkIfGameOver() {
    let redTeamAlive = false;
    let blueTeamAlive = false;
    let playersAlive = this.state.players.length;
    const players = this.state.players;
    players.forEach((player) => {
      if (player.isDead) {
        playersAlive -= 1;
      } else {
        if (!player.isBlue) {
          redTeamAlive = true;
        } else if (player.isBlue) {
          blueTeamAlive = true;
        }
      }
    });
    if (playersAlive === 0) {
      return "draw";
    }
    if (!redTeamAlive) {
      return "blue";
    }
    if (!blueTeamAlive) {
      return "red";
    }
    return "none";
  }
}
