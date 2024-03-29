import { Texture, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ResourceManager {
  private static instance = new ResourceManager();
  public static getInstance() {
    return this.instance;
  }

  private constructor() {}

  private groundTexture: Texture[] = [];
  private models = new Map<string, GLTF>();
  private textures = new Map<string, Texture>();

  public load = async () => {
    const textureLoader = new TextureLoader();
    await this.loadGroundTexture(textureLoader);
    await this.loadTextures(textureLoader);
    await this.loadModel();
  };

  public getModel = (name: string) => {
    return this.models.get(name);
  }

    public getTexture = (name: string) => {
        return this.textures.get(name);
    }

  private loadTextures = async (textureLoader: TextureLoader) => {
    const tankBodyTexture = await textureLoader.loadAsync("textures/tank-body.png");
    const tankTurretTexture = await textureLoader.loadAsync("textures/tank-turret.png");
    const tankBodyRedTexture = await textureLoader.loadAsync("textures/tank-body-red.png");
    const tankTurretRedTexture = await textureLoader.loadAsync("textures/tank-turret-red.png");
    const wallTexture = await textureLoader.loadAsync("textures/wall.jpg");

    this.textures.set("tankBody", tankBodyTexture);
    this.textures.set("tankTurret", tankTurretTexture);
    this.textures.set("tankBodyRed", tankBodyRedTexture);
    this.textures.set("tankTurretRed", tankTurretRedTexture);
    this.textures.set("wall", wallTexture);

  }

  private loadModel = async () => {
    const modelLoader = new GLTFLoader();
    const playerTank = await modelLoader.loadAsync("models/tank.glb");
    this.models.set("tank", playerTank);
  }

  private loadGroundTexture = async (textureLoader: TextureLoader) => {
    const textures = [
      "textures/tile1.jpg",
      "textures/tile2.jpg",
      // add more when found
    ];
    for (let i = 0; i < textures.length; i++) {
      const texture = await textureLoader.loadAsync(textures[i]);
      this.groundTexture.push(texture);
    }
  };

  public getRandGroundTexture = async () => {
    return this.groundTexture[
      Math.floor(Math.random() * this.groundTexture.length)
    ];
  };
}

export default ResourceManager;
