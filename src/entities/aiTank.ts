import { Box3, Mesh, MeshStandardMaterial, Sphere, Vector3 } from "three";
import GameEntity from "./gameEntity";
import ResourceManager from "../utils/resourceManager";
import GameScene from "../scene/gameScene";
import ExplosionEffect from "../effects/explosionEffect";

class AiTank extends GameEntity {
  private life = 3;
  private rotation: number;
  private moveSpeed = 1;
  private team: "green" | "red";

  public getTeam = () => this.team;

  constructor(position: Vector3, team: "green" | "red") {
    super(position, "ai");
    this.rotation = Math.floor(Math.random() * Math.PI * 2);
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

  public update = (deltaT: number) => {
    const computedMovement = new Vector3(
      this.moveSpeed * Math.sin(this.rotation) * deltaT,
      -this.moveSpeed * Math.cos(this.rotation) * deltaT,
      0
    );

    const testingSphere = new Sphere(
      (this.collider as Sphere).clone().center,
      (this.collider as Sphere).clone().radius
    );

    testingSphere.translate(computedMovement);

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
      this.rotation = Math.floor(Math.random() * Math.PI * 2);
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

  public remove = () => {
    this.mesh.children.forEach((child) => {
      (child as Mesh).geometry.dispose();
      ((child as Mesh).material as MeshStandardMaterial).dispose();
      this.mesh.remove(child);
    });
  };
}

export default AiTank;
