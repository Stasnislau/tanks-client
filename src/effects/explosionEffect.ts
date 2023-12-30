import { DodecahedronGeometry, Mesh, MeshPhongMaterial, Vector3 } from "three";
import GameEntity from "../entities/gameEntity";
import { randomIntRange, randomSign } from "../utils/mathUtils";

class ExplosionEffect extends GameEntity {
  private size: number;
  private effectDuration: number = 0.5;
  private currentDuration: number;
  private fireMesh: Mesh = new Mesh();

  constructor(position: Vector3, size: number) {
    super(position);
    this.size = size;
    this.currentDuration = this.effectDuration;
  }

  public load = async () => {
    const particleGeometry = new DodecahedronGeometry(this.size, 0);
    const totalParticles = randomIntRange(7, 13);
    const fireMaterial = new MeshPhongMaterial({
      color: 0xff4550,
    });

    for (let i = 0; i < totalParticles; i++) {
      const particleAngle = Math.PI * 2 * Math.random();
      const fireGeometry = particleGeometry.clone();
      const particleSize =
        0.7 * this.size * Math.random() * this.size  * randomSign();

      fireGeometry.scale(particleSize, particleSize, particleSize);
      fireGeometry.rotateX(Math.random() * Math.PI);
      fireGeometry.rotateY(Math.random() * Math.PI);
      fireGeometry.rotateZ(Math.random() * Math.PI);

      const fireParticle = new Mesh(fireGeometry, fireMaterial);
      fireParticle.userData = {
        speed: 0.5 * Math.random() * 2.5,
        angle: particleAngle,
      };
      this.fireMesh.add(fireParticle);
    }
    this.mesh.add(this.fireMesh);
  };

  public update = (deltaT: number) => {
    this.currentDuration -= deltaT;
    if (this.currentDuration <= 0) {
      this.shouldRemove = true;
      return;
    }
    const scale = this.currentDuration / this.effectDuration;
    this.fireMesh.children.forEach((particle) => {
      const fireParticle = particle as Mesh;
      const angle = fireParticle.userData["angle"];
      const speed = fireParticle.userData["speed"];
      const computedMovement = new Vector3(
        Math.sin(angle) * speed * deltaT,
        -Math.cos(angle) * speed * deltaT,
        0
      );
      fireParticle.scale.set(scale, scale, scale);
      fireParticle.position.add(computedMovement);
    });
  };

  public remove = () => {
    this.fireMesh.children.forEach((particle) => {
      const fireParticle = particle as Mesh;
      fireParticle.geometry.dispose();
      this.fireMesh.remove(fireParticle);
    });
    this.fireMesh.geometry.dispose();
  };
}

export default ExplosionEffect;
