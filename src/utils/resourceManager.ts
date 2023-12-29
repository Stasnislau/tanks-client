import { Texture, TextureLoader } from "three";

class ResourceManager {
  private static instance = new ResourceManager();
  public static getInstance() {
    return this.instance;
  }

  private constructor() {}

  private groundTexture: Texture[] = [];

  public load = async () => {
    const textureLoader = new TextureLoader();
    await this.loadGroundTexture(textureLoader);
  };

  private loadGroundTexture = async (textureLoader: TextureLoader) => {
    const textures = [
      "textures/tile.jpg",
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
