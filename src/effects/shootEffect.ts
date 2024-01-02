import { DodecahedronGeometry, Mesh, Vector3, MeshPhongMaterial } from "three";
import GameEntity from "../entities/gameEntity";
import { randomIntRange, randomSign } from "../utils/mathUtils";

class ShootEffect extends GameEntity {
  private angle: number;
  private fire = new Mesh();
  private smoke = new Mesh();
  private size = 0.1;
  private effectDuration = 1;

  constructor(position: Vector3, angle: number) {
    super(position);
    this.angle = angle;
  }

  public load = async () => {
    const particleGeometry = new DodecahedronGeometry(this.size, 0);
    const smokeMaterial = new MeshPhongMaterial({
      color: 0xfafafa,
      transparent: true,
    });

    const fireMaterial = new MeshPhongMaterial({
      color: 0xff4500,
      transparent: true,
    });

    const totalParticles = randomIntRange(4, 9);
    for (let i = 0; i < totalParticles; i++) {
      const angleOffset = Math.PI * 0.08 * randomSign();
      const particleSpeed = 1.75 * Math.random() * 3;
      const fireParticle = new Mesh(particleGeometry, fireMaterial);
      fireParticle.userData = {
        speed: particleSpeed,
        angle: this.angle + angleOffset,
      };
      this.fire.add(fireParticle);
      const smokePositionOffset = new Vector3(
        Math.random() * this.size * randomSign(),
        Math.random() * this.size * randomSign(),
        Math.random() * this.size * randomSign()
      );
      const smokeParticle = new Mesh(particleGeometry, smokeMaterial);
      smokeParticle.userData = {
        speed: particleSpeed,
        angle: this.angle + angleOffset,
      };
      smokeParticle.position.add(smokePositionOffset);
      this.smoke.add(smokeParticle);
    }

    this.mesh.add(this.fire);
    this.mesh.add(this.smoke);
  };

  public update = async (deltaT: number) => {
    this.effectDuration -= deltaT;
    if (this.effectDuration <= 0) {
      this.shouldRemove = true;
    }
    this.fire.children.forEach((element) => {
      const fireParticle = element as Mesh;
      const angle = fireParticle.userData["angle"] as number;
      const speed = fireParticle.userData["speed"] as number;

      const computedMovement = new Vector3(
        -speed * Math.sin(angle) * deltaT * this.effectDuration * 0.75,
        speed * Math.cos(angle) * deltaT * this.effectDuration * 0.75,
        0
      );
      fireParticle.position.add(computedMovement);
      fireParticle.scale.set(
        this.effectDuration,
        this.effectDuration,
        this.effectDuration
      );

      this.smoke.children.forEach((element) => {
        const smokeParticle = element as Mesh;
        (smokeParticle.material as MeshPhongMaterial).opacity =
          this.effectDuration;
        smokeParticle.position.add(new Vector3(0, 0, 1 * deltaT));
      });
    });
  };

  public remove = () => {
    this.fire.children.forEach((element) => {
      (element as Mesh).geometry.dispose();
      ((element as Mesh).material as MeshPhongMaterial).dispose();
      this.fire.remove(element);
    });
    this.smoke.children.forEach((element) => {
      (element as Mesh).geometry.dispose();
      ((element as Mesh).material as MeshPhongMaterial).dispose();
      this.smoke.remove(element);
    });
    this.mesh.remove(this.fire);
    this.mesh.remove(this.smoke);
  };
}

export default ShootEffect;
