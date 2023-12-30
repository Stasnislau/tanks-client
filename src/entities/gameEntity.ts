import { Box3, Mesh, Sphere, Vector3 } from "three";

type EntityType = "general" | "player" | "bullet" | "enemy";
abstract class GameEntity {
  protected position: Vector3;
  protected mesh: Mesh = new Mesh();
  public getMesh = () => this.mesh;

  protected collider?: Box3 | Sphere;
  public getCollider = () => {
    return this.collider;
  };

  protected entityType: EntityType;
  public getEntityType = () => this.entityType;

  protected shouldRemove: boolean = false;
  public getShouldRemove = () => this.shouldRemove;

  constructor(position: Vector3, entityType: EntityType = "general") {
    this.position = position;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.entityType = entityType;
  }

  public load = async () => {};
  public update = (deltaT: number) => {};
  public remove = () => {};
}

export default GameEntity;
