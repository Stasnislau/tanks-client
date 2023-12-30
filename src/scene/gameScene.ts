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

class GameScene {
  private static instance = new GameScene();
  public static getInstance() {
    return this.instance;
  }

  private clock = new Clock();

  private mapSize: number = 15;

  private width: number;
  private height: number;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

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
    const targetElement = document.querySelector<HTMLDivElement>("#app");
    if (!targetElement) {
      throw new Error("target element not found");
    }
    targetElement.appendChild(this.renderer.domElement);
    const aspectRatio = this.width / this.height;
    this.camera = new PerspectiveCamera(45, aspectRatio, 1, 1000);
    this.camera.position.set(7, 7, 15);

    window.addEventListener("resize", this.resize, false);

    const gameMap = new GameMap(new Vector3(0, 0, 0), this.mapSize);
    this.gameEntities.push(gameMap);

    const playerTank = new PlayerTank(new Vector3(7, 7, 0));
    this.gameEntities.push(playerTank);

    this.createWalls();
  }

  private createWalls = () => {
    const edge = this.mapSize - 1;

    this.gameEntities.push(new Wall(new Vector3(0, 0, 0)));
    this.gameEntities.push(new Wall(new Vector3(edge, 0, 0)));
    this.gameEntities.push(new Wall(new Vector3(edge, edge, 0)));
    this.gameEntities.push(new Wall(new Vector3(0, edge, 0)));

    for (let i = 1; i < edge; i++) {
      this.gameEntities.push(new Wall(new Vector3(i, 0, 0)));
      this.gameEntities.push(new Wall(new Vector3(0, i, 0)));
      this.gameEntities.push(new Wall(new Vector3(edge, i, 0)));
      this.gameEntities.push(new Wall(new Vector3(i, edge, 0)));
    }
  };

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  };

  public load = async () => {
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
    requestAnimationFrame(this.render);
    this.removeEntities();
    const deltaT = this.clock.getDelta();
    for (let i = 0; i < this.gameEntities.length; i++) {
      const element = this.gameEntities[i];
      element.update(deltaT);
    }
    this.renderer.render(this.scene, this.camera);
  };

  public addToScene = (entity: GameEntity) => {
    this.gameEntities.push(entity);
    this.scene.add(entity.getMesh());
  }

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
}

export default GameScene;
