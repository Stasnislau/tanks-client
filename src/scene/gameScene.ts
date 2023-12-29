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

class GameScene {
  private static instance = new GameScene();
  public static getInstance() {
    return this.instance;
  }

  private clock = new Clock();

  private width: number;
  private height: number;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

  private readonly scene = new Scene();

  private gameEntities: GameEntity[] = [];
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

    const gameMap = new GameMap(new Vector3(0, 0, 0), 15);
    this.gameEntities.push(gameMap);

    const playerTank = new PlayerTank(new Vector3(7, 7, 0));
    this.gameEntities.push(playerTank);
  }

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
    const deltaT = this.clock.getDelta();
    for (let i = 0; i < this.gameEntities.length; i++) {
        const element = this.gameEntities[i];
        element.update(deltaT);
    }
    this.renderer.render(this.scene, this.camera);
    
  };
}

export default GameScene;
