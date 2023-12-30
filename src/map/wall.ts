import { Box3, BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";
import GameEntity from "../entities/gameEntity";
import ResourceManager from "../utils/resourceManager";

class Wall extends GameEntity {
  constructor(position: Vector3) {
    super(position);
  }

  public load = async () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ map: ResourceManager.getInstance().getTexture("wall") });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    this.collider = new Box3().setFromObject(this.mesh);
  };
  public update = () => {};
}

export default Wall;
