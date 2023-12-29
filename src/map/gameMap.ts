import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three";
import GameEntity from "../entities/gameEntity";
import ResourceManager from "../utils/resourceManager";

class MapTile extends GameEntity {
    constructor(position: Vector3) {
        super(position);
    }
    
    public load = async () => {
        const tileTexture = await ResourceManager.getInstance().getRandGroundTexture();
        const geometry = new PlaneGeometry(1, 1);
        const material = new MeshBasicMaterial({ map: tileTexture });
        this.mesh = new Mesh(geometry, material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    };
    public update = () => {};
    }

class GameMap extends GameEntity {
  private size: number;
  private tiles: MapTile[] = [];
  constructor(position: Vector3, size: number) {
    super(position);
    this.size = size;
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            const tile = new MapTile(new Vector3(i, j, 0));
            this.tiles.push(tile);
        }
    }
  }

  public load = async () => {
    for (let i = 0; i < this.tiles.length; i++) {
        const element = this.tiles[i];
        await element.load();
        this.mesh.add(element.getMesh());
    }

  };
  public update = () => {};
}

export default GameMap;