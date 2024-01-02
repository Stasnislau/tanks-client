import { Box3, Mesh, MeshStandardMaterial, Sphere, Vector3 } from "three";
import GameEntity from "./gameEntity";
import ResourceManager from "../utils/resourceManager";
import GameScene from "../scene/gameScene";
import ExplosionEffect from "../effects/explosionEffect";
import { options } from "./gameEntity";
import ShootEffect from "../effects/shootEffect";
import Bullet from "./bullet";

class AiTank extends GameEntity {
  private life = 3;
  private rotation: number;
  private moveSpeed = 1;
  private team: "green" | "red";

  public getTeam = () => this.team;

  constructor(position: Vector3, team: "green" | "red") {
    super(position, "ai");
    this.rotation = 0;
    this.team = team;
  }

  public load = async () => {
    const tankModel = ResourceManager.getInstance().getModel("tank");
    if (!tankModel) {
      throw new Error("tank model not found");
    }

    const tankSceneData = tankModel.scene.clone();

    const tankBodyMesh = tankSceneData.children.find(
      (child: { name: string }) => child.name === "Body"
    ) as Mesh;

    const tankTurretMesh = tankSceneData.children.find(
      (child: { name: string }) => child.name === "Turret"
    ) as Mesh;

    const tankBodyTexture =
      this.team === "green"
        ? ResourceManager.getInstance().getTexture("tankBody")
        : ResourceManager.getInstance().getTexture("tankBodyRed");
    const tankTurretTexture =
      this.team === "green"
        ? ResourceManager.getInstance().getTexture("tankTurret")
        : ResourceManager.getInstance().getTexture("tankTurretRed");
    if (
      !tankBodyMesh ||
      !tankTurretMesh ||
      !tankBodyTexture ||
      !tankTurretTexture
    ) {
      throw new Error("Unable to load model or texture");
    }

    const bodyMaterial = new MeshStandardMaterial({ map: tankBodyTexture });
    const turretMaterial = new MeshStandardMaterial({ map: tankTurretTexture });

    tankBodyMesh.material = bodyMaterial;
    tankTurretMesh.material = turretMaterial;

    this.mesh.add(tankBodyMesh);
    this.mesh.add(tankTurretMesh);

    const collider = new Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new Sphere(this.mesh.position.clone()));
    collider.radius *= 0.75;
    this.collider = collider;
  };

  public update = async (deltaT: number, options?: options) => {
    const action = options?.action;

    let computedMovement = new Vector3();
    if (options) {
      let computedRotation = this.rotation;
      switch (action) {
        case "up":
          computedMovement = new Vector3(
            this.moveSpeed * Math.sin(this.rotation) * deltaT,
            -this.moveSpeed * Math.cos(this.rotation) * deltaT,
            0
          );
          break;
        case "down":
          computedMovement = new Vector3(
            -this.moveSpeed * Math.sin(this.rotation) * deltaT,
            this.moveSpeed * Math.cos(this.rotation) * deltaT,
            0
          );
          break;
        case "rotateClockwise":
          computedRotation -= Math.PI * deltaT;
          break;
        case "rotateCounterClockwise":
          computedRotation += Math.PI * deltaT;
          break;
        case "shoot":
          this.shoot();
          break;
        default:
          computedMovement = new Vector3();
          break;
      }

      const fullCircle = Math.PI * 2;
      if (computedRotation > fullCircle) {
        computedRotation = fullCircle - computedRotation;
      } else if (computedRotation < 0) {
        computedRotation = fullCircle + computedRotation;
      }
      this.rotation = computedRotation;
      this.mesh.setRotationFromAxisAngle(
        new Vector3(0, 0, 1),
        computedRotation
      );
    } else {
      computedMovement = new Vector3(
        this.moveSpeed * Math.sin(this.rotation) * deltaT,
        -this.moveSpeed * Math.cos(this.rotation) * deltaT,
        0
      );
    }

    const testingSphere = this.collider?.clone() as Sphere;
    testingSphere.center.add(computedMovement);

    const colliders = GameScene.getInstance()
      .getGameEntities()
      .filter((entity) => {
        return (
          entity !== this &&
          entity.getCollider() &&
          entity.getEntityType() !== "bullet" &&
          entity.getCollider()!.intersectsSphere(testingSphere)
        );
      });

    if (colliders.length > 0) {
      if (!options) {
        this.rotation = Math.floor(Math.random() * Math.PI * 2);
      }
      return;
    }

    this.mesh.position.add(computedMovement);
    (this.collider as Sphere).center.add(computedMovement);
    this.mesh.setRotationFromAxisAngle(new Vector3(0, 0, 1), this.rotation);
  };

  public damage = (amount: number) => {
    this.life -= amount;
    if (this.life <= 0) {
      this.shouldRemove = true;
      const explosion = new ExplosionEffect(this.mesh.position, 1.4);
      explosion.load().then(() => {
        GameScene.getInstance().addToScene(explosion);
      });
    }
  };
  private shoot = async () => {
    const offset = new Vector3(
      Math.sin(this.rotation) * 0.45,
      -Math.cos(this.rotation) * 0.45,
      0.5
    );
    const bulletPosition = this.mesh.position.clone().add(offset);
    const bullet = new Bullet(bulletPosition, this.rotation, this.getId());
    await bullet.load();

    const shootEffect = new ShootEffect(
      bulletPosition,
      this.rotation + Math.PI
    );
    await shootEffect.load();

    GameScene.getInstance().addToScene(shootEffect);
    GameScene.getInstance().addToScene(bullet);
  };

  public remove = () => {
    this.mesh.children.forEach((child) => {
      (child as Mesh).geometry.dispose();
      ((child as Mesh).material as MeshStandardMaterial).dispose();
      this.mesh.remove(child);
    });
  };
}

export default AiTank;
