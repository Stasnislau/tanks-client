import {
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Clock,
} from "three";
import GameEntity from "../entities/gameEntity";
import GameMap from "../map/gameMap";
import ResourceManager from "../utils/resourceManager";
import PlayerTank from "../entities/playerTank";
import Wall from "../map/wall";
import AiTank from "../entities/aiTank";

class GameScene {
  private static instance = new GameScene();
  public static getInstance() {
    return this.instance;
  }

  private clock = new Clock();

  private mapSize: number = 25;

  private width: number;
  private height: number;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera | undefined;

  private isGameOver = false;
  private isCallbackCalled = false;
  private winner: "red" | "green" | "draw" = "draw";

  private callback: (outcome: "red" | "green" | "draw") => void = (outcome) => {};

  private readonly scene = new Scene();

  public getCamera = () => this.camera;

  private gameEntities: GameEntity[] = [];

  public getGameEntities() {
    return this.gameEntities;
  }

  private constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  private createWalls = () => {
    const edge = this.mapSize - 1;

    this.gameEntities.push(new Wall(new Vector3(0, 0, 0), Infinity));
    this.gameEntities.push(new Wall(new Vector3(edge, 0, 0), Infinity));
    this.gameEntities.push(new Wall(new Vector3(edge, edge, 0), Infinity));
    this.gameEntities.push(new Wall(new Vector3(0, edge, 0), Infinity));

    for (let i = 1; i < edge; i++) {
      this.gameEntities.push(new Wall(new Vector3(i, 0, 0), Infinity));
      this.gameEntities.push(new Wall(new Vector3(0, i, 0), Infinity));
      this.gameEntities.push(new Wall(new Vector3(edge, i, 0), Infinity));
      this.gameEntities.push(new Wall(new Vector3(i, edge, 0), Infinity));
    }
  };

  private createTanks = (
    numberOfRedTanks: number,
    numberOfGreenTanks: number,
    isAutonomous: boolean
  ) => {
    let redTanksLeft = numberOfRedTanks;
    let greenTanksLeft = numberOfGreenTanks;
    if (!isAutonomous && numberOfGreenTanks > 0) {
      const playerTank = new PlayerTank(
        new Vector3(
          Math.floor(this.mapSize / 2),
          Math.floor(this.mapSize / 2),
          0
        )
      );
      this.gameEntities.push(playerTank);
      greenTanksLeft--;
    }

    for (let i = 0; i < greenTanksLeft; i++) {
      const aiTank = new AiTank(new Vector3(21, 21, 0), "green");
      this.gameEntities.push(aiTank);
    }

    for (let i = 0; i < redTanksLeft; i++) {
      const aiTank = new AiTank(new Vector3(3, 3, 0), "red");
      this.gameEntities.push(aiTank);
    }
  };

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    if (!this.camera) {
      return;
    }
    this.camera.aspect = this.width / this.height;
    this.camera?.updateProjectionMatrix();
  };

  public load = async (
    callback: (outcome: "red" | "green" | "draw") => void,
    numberOfRedTanks = 1,
    numberOfGreenTanks = 1,
    isAutonomous = false
  ) => {
    const targetElement = document.getElementById("game-canvas");
    if (!targetElement) {
      throw new Error("target element not found");
    }
    targetElement.appendChild(this.renderer.domElement);
    const aspectRatio = this.width / this.height;
    this.camera = new PerspectiveCamera(45, aspectRatio, 1, 1000);
    this.camera.position.set(
      Math.floor(this.mapSize / 2),
      Math.floor(this.mapSize / 2),
      isAutonomous ? this.mapSize : Math.ceil(this.mapSize / 2)
    );

    window.addEventListener("resize", this.resize, false);
    this.callback = callback;

    const gameMap = new GameMap(new Vector3(0, 0, 0), this.mapSize);
    this.gameEntities.push(gameMap);

    this.createWalls();
    this.createTanks(numberOfRedTanks, numberOfGreenTanks, isAutonomous);

    await ResourceManager.getInstance().load();
    for (let i = 0; i < this.gameEntities.length; i++) {
      const element = this.gameEntities[i];
      await element.load();
      this.scene.add(element.getMesh());
    }

    const light = new HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(light);
  };

  public render = () => {
    if (this.isCallbackCalled) {
      return;
    }
    if (this.isGameOver) {
      setTimeout(() => {
        if (this.isCallbackCalled) return;
        this.isCallbackCalled = true;
        this.callback(this.winner);
      }, 500);
    }
    requestAnimationFrame(this.render);
    this.removeEntities();
    let redTeamLeft = 0;
    let greenTeamLeft = 0;
    const deltaT = this.clock.getDelta();
    for (let i = 0; i < this.gameEntities.length; i++) {
      const element = this.gameEntities[i];
      const getRandomAction = () => {
        // TODO: change this function to use the neural network to get the action
        const actions = [
          "rotateClockwise",
          "down",
          "rotateClockwise",
          "rotateCounterClockwise",
          "shoot",
        ];
        return actions[Math.floor(Math.random() * actions.length)] as
          | "up"
          | "down"
          | "rotateClockwise"
          | "rotateCounterClockwise"
          | "shoot";
      };
      if (element.getEntityType() === "ai")
        element.update(deltaT, {
          id: element.getId(),
          action: getRandomAction(),
        });
      else element.update(deltaT);
      if (element instanceof AiTank) {
        if (element.getTeam() === "red") {
          redTeamLeft++;
        } else {
          greenTeamLeft++;
        }
      }
      if (element instanceof PlayerTank) {
        greenTeamLeft++;
      }
    }
    if (redTeamLeft === 0 && greenTeamLeft === 0 && !this.isGameOver) {
      this.winner = "draw";
      this.isGameOver = true;
    } else if (redTeamLeft === 0 && !this.isGameOver) {
      this.winner = "green";
      this.isGameOver = true;
    } else if (greenTeamLeft === 0 && !this.isGameOver) {
      this.winner = "red";
      this.isGameOver = true;
    }
    if (this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  public addToScene = (entity: GameEntity) => {
    this.gameEntities.push(entity);
    this.scene.add(entity.getMesh());
  };

  private removeEntities = () => {
    const entitiesToRemove = this.gameEntities.filter((entity) => {
      return entity.getShouldRemove();
    });
    entitiesToRemove.forEach((entity) => {
      this.scene.remove(entity.getMesh());
      entity.remove();
    });
    this.gameEntities = this.gameEntities.filter((entity) => {
      return !entity.getShouldRemove();
    });
  };

  public playerDied = () => {
    if (this.camera) {
      this.camera.position.set(
        Math.floor(this.mapSize / 2),
        Math.floor(this.mapSize / 2),
        this.mapSize
      );
    }
  };
}

export default GameScene;
