import GameEntity from "./gameEntity";
import {
  Box3,
  Material,
  Mesh,
  MeshPhongMaterial,
  Sphere,
  SphereGeometry,
  Vector3,
} from "three";
import GameScene from "../scene/gameScene";
import ExplosionEffect from "../effects/explosionEffect";
import AiTank from "./aiTank";

class Bullet extends GameEntity {
  private angle: number;
  constructor(position: Vector3, angle: number) {
    super(position, "bullet");
    this.angle = angle;
  }

  public load = async () => {
    const bulletGeometry = new SphereGeometry(0.075);
    const bulletMaterial = new MeshPhongMaterial({
      color: 0x262626,
    });
    this.mesh = new Mesh(bulletGeometry, bulletMaterial);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    this.collider = new Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new Sphere(this.mesh.position));
  };

  public update = (deltaT: number) => {
    const travelSpeed = 9;
    const computedMovement = new Vector3(
      travelSpeed * Math.sin(this.angle) * deltaT,
      -travelSpeed * Math.cos(this.angle) * deltaT,
      0
    );
    this.mesh.position.add(computedMovement);

    const colliders = GameScene.getInstance()
      .getGameEntities()
      .filter((entity) => {
        return (
          entity !== this &&
          entity.getCollider() &&
          entity.getEntityType() !== "player" &&
          entity.getCollider()!.intersectsSphere(this.collider as Sphere)
        );
      });

    if (colliders.length > 0) {
      this.shouldRemove = true;

      const explosion = new ExplosionEffect(this.mesh.position, 1);
      explosion.load().then(() => {
        GameScene.getInstance().addToScene(explosion);
      });

      const enemies = colliders.filter((entity) => {
        return entity.getEntityType() === "ai" || entity.getEntityType() === "wall";
      });
      if (enemies.length > 0) {
        (enemies[0] as AiTank).damage(1);
      }
    }
  };

  public remove = () => {
    (this.mesh.material as Material).dispose();
    this.mesh.geometry.dispose();
  };
}

export default Bullet;
