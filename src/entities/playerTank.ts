import { Mesh, MeshStandardMaterial, Vector3 } from "three";
import GameEntity from "./gameEntity";
import ResourceManager from "../utils/resourceManager";

class PlayerTank extends GameEntity{

    constructor(position: Vector3) {
        super(position);
    }

    public load = async () => {
        const tankModel = await ResourceManager.getInstance().getModel("tank");
        if (!tankModel) {
            throw new Error("tank model not found");
        }

        const tankBodyMesh = tankModel.scene.children.find((child) => child.name === "Body") as Mesh;

        const tankTurretMesh = tankModel.scene.children.find((child) => child.name === "Turret") as Mesh;

        const tankBodyTexture = await ResourceManager.getInstance().getTexture("tankBody");

        const tankTurretTexture = await ResourceManager.getInstance().getTexture("tankTurret");

        if (!tankBodyMesh || !tankTurretMesh || !tankBodyTexture || !tankTurretTexture) {
            throw new Error("Unable to load model or texture");
        }

        const bodyMaterial = new MeshStandardMaterial({ map: tankBodyTexture });
        const turretMaterial = new MeshStandardMaterial({ map: tankTurretTexture });

        tankBodyMesh.material = bodyMaterial;
        tankTurretMesh.material = turretMaterial;

        this.mesh.add(tankBodyMesh);
        this.mesh.add(tankTurretMesh);
    };
    public update = () => {};

}

export default PlayerTank;