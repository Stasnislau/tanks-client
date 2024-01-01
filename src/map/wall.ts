import { Box3, BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";
import GameEntity from "../entities/gameEntity";
import ResourceManager from "../utils/resourceManager";
import GameScene from "../scene/gameScene";
import ExplosionEffect from "../effects/explosionEffect";

class Wall extends GameEntity {
  private life = 3;
  constructor(position: Vector3, life: number = 3) {
    super(position, "wall");
    this.life = life;
  }

  public load = async () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ map: ResourceManager.getInstance().getTexture("wall") });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    this.collider = new Box3().setFromObject(this.mesh);
  };

  public damage = (amount: number) => {
    this.life -= amount;
    if (this.life <= 0) {
      this.shouldRemove = true;
      const explosion = new ExplosionEffect(this.mesh.position, 1);
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

export default Wall;
