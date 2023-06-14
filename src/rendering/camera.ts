import * as THREE from "three";
import Sizes from "./sizes";

export default class Camera {
  private sizes: Sizes;
  private scene: THREE.Scene;
  private params: { fov: number; near: number; far: number };
  public instance: THREE.PerspectiveCamera;

  constructor(
    sizes: Sizes,
    scene: THREE.Scene,
    params: { fov: number; near: number; far: number }
  ) {
    this.sizes = sizes;
    this.scene = scene;
    this.params = params;
    this.setInstance();
  }

  setInstance() {
    const fov =
      this.params !== undefined && this.params.fov !== undefined
        ? this.params.fov
        : 30;
    const near =
      this.params !== undefined && this.params.near !== undefined
        ? this.params.near
        : 1;
    const far =
      this.params !== undefined && this.params.far !== undefined
        ? this.params.far
        : 1000;

    this.instance = new THREE.PerspectiveCamera(
      fov,
      this.sizes.width / this.sizes.height,
      near,
      far
    );
    this.instance.position.set(0, 3.5, 30);
    this.instance.lookAt(new THREE.Vector3(0, 3.5, 0));

    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
