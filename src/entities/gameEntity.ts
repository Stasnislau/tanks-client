import { Mesh, Vector3 } from "three";

abstract class GameEntity {
  protected position: Vector3;
  protected mesh: Mesh = new Mesh();
  public getMesh = () => this.mesh;

  constructor(position: Vector3) {
    this.position = position;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  public load = async () => {};
  public update = (deltaT: number) => {};
}

export default GameEntity;
