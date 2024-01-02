import { Box3, Mesh, Sphere, Vector3 } from "three";

type EntityType = "general" | "player" | "bullet" | "ai" | "wall";
export type options ={
  id: string;
  action: "up" | "down" | "rotateClockwise" | "rotateCounterClockwise" | "shoot"; 
}
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

  private id: string;
  public getId = () => this.id;

  constructor(position: Vector3, entityType: EntityType = "general") {
    this.position = position;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.entityType = entityType;
    this.id = Math.random().toString(36).substr(2, 12);
  }

  public load = async () => {};
  public update = async (deltaT: number, options?: options ) => {};
  public remove = () => {};
}

export default GameEntity;
