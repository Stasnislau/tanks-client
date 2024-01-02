import { Box3, Mesh, MeshStandardMaterial, Sphere, Vector3 } from "three";
import GameEntity from "./gameEntity";
import ResourceManager from "../utils/resourceManager";
import GameScene from "../scene/gameScene";
import Bullet from "./bullet";
import ShootEffect from "../effects/shootEffect";
import ExplosionEffect from "../effects/explosionEffect";

type KeyboardState = {
  leftPressed: boolean;
  rightPressed: boolean;
  upPressed: boolean;
  downPressed: boolean;
};

class PlayerTank extends GameEntity {
  private keyboardState: KeyboardState = {
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
  };

  private rotation: number = 0;
  private life = 1; 

  constructor(position: Vector3) {
    super(position, "player");
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "a":
        this.keyboardState.leftPressed = true;
        break;
      case "d":
        this.keyboardState.rightPressed = true;
        break;
      case "w":
        this.keyboardState.upPressed = true;
        break;
      case "s":
        this.keyboardState.downPressed = true;
        break;
      default:
        break;
    }
  };

  private handleKeyUp = async (event: KeyboardEvent) => {
    switch (event.key) {
      case "a":
        this.keyboardState.leftPressed = false;
        break;
      case "d":
        this.keyboardState.rightPressed = false;
        break;
      case "w":
        this.keyboardState.upPressed = false;
        break;
      case "s":
        this.keyboardState.downPressed = false;
        break;
      case " ":
        await this.shoot();
        break;
      default:
        break;
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
      ResourceManager.getInstance().getTexture("tankBody");

    const tankTurretTexture =
      ResourceManager.getInstance().getTexture("tankTurret");

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

  public update = async (deltaT: number) => {
    let computedRotation = this.rotation;
    let computedMovement = new Vector3();
    const movementSpeed = 2;

    if (this.keyboardState.leftPressed) {
      computedRotation += Math.PI * deltaT;
    } else if (this.keyboardState.rightPressed) {
      computedRotation -= Math.PI * deltaT;
    }

    const fullCircle = Math.PI * 2;
    if (computedRotation > fullCircle) {
      computedRotation = fullCircle - computedRotation;
    } else if (computedRotation < 0) {
      computedRotation = fullCircle + computedRotation;
    }

    const xMovement = movementSpeed * deltaT * Math.sin(this.rotation);
    const yMovement = movementSpeed * deltaT * Math.cos(this.rotation);
    if (this.keyboardState.upPressed) {
      computedMovement = new Vector3(xMovement, -yMovement, 0);
    } else if (this.keyboardState.downPressed) {
      computedMovement = new Vector3(-xMovement, yMovement, 0);
    }

    this.rotation = computedRotation;
    this.mesh.setRotationFromAxisAngle(new Vector3(0, 0, 1), computedRotation);

    const testingSphere = this.collider?.clone() as Sphere;
    testingSphere.center.add(computedMovement);

    const colliders = GameScene.getInstance()
      .getGameEntities()
      .filter((entity) => {
        return (
          entity !== this &&
          entity.getEntityType() !== "bullet" &&
          entity.getCollider() &&
          entity!.getCollider()!.intersectsSphere(testingSphere)
        );
      });
    if (colliders.length > 0) {
      return;
    }

    this.mesh.position.add(computedMovement);
    (this.collider as Sphere).center.add(computedMovement);

    const cameraPositionZ =
      GameScene?.getInstance().getCamera()?.position.z || 15;

    GameScene?.getInstance()
      .getCamera()
      ?.position.set(
        this.mesh.position.x,
        this.mesh.position.y,
        cameraPositionZ
      );
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
      document.removeEventListener("keydown", this.handleKeyDown);
      document.removeEventListener("keyup", this.handleKeyUp);
      (child as Mesh).geometry.dispose();
      ((child as Mesh).material as MeshStandardMaterial).dispose();
      this.mesh.remove(child);
    });

    GameScene.getInstance().playerDied();
  };
}

export default PlayerTank;
