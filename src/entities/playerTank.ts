import { Mesh, MeshStandardMaterial, Vector3 } from "three";
import GameEntity from "./gameEntity";
import ResourceManager from "../utils/resourceManager";

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
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
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
    }
  };

  constructor(position: Vector3) {
    super(position);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public load = async () => {
    const tankModel = await ResourceManager.getInstance().getModel("tank");
    if (!tankModel) {
      throw new Error("tank model not found");
    }

    const tankBodyMesh = tankModel.scene.children.find(
      (child) => child.name === "Body"
    ) as Mesh;

    const tankTurretMesh = tankModel.scene.children.find(
      (child) => child.name === "Turret"
    ) as Mesh;

    const tankBodyTexture = await ResourceManager.getInstance().getTexture(
      "tankBody"
    );

    const tankTurretTexture = await ResourceManager.getInstance().getTexture(
      "tankTurret"
    );

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
  };
  public update = (deltaT: number) => {
    let computedRotation = this.rotation;
    let computedMovement = new Vector3();
    const movementSpeed = 2;

    if (this.keyboardState.leftPressed) {
      computedRotation += Math.PI * deltaT;
    } else if (this.keyboardState.rightPressed) {
      computedRotation -= Math.PI * deltaT;
    }

    const fullCircle = Math.PI * 2;
    if (this.rotation > fullCircle) {
      this.rotation = fullCircle - computedRotation;
    } else if (this.rotation < 0) {
      this.rotation = fullCircle + computedRotation;
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
    this.mesh.position.add(computedMovement);
  };
}

export default PlayerTank;
