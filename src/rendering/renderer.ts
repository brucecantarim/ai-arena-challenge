import * as THREE from "three";
import Camera from "./camera";
import Sizes from "./sizes";

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private sizes: Sizes;
  private scene: THREE.Scene;
  private camera: Camera;
  private drawBool: boolean;
  public instance: THREE.WebGLRenderer;

  constructor(
    canvas: HTMLCanvasElement,
    sizes: Sizes,
    scene: THREE.Scene,
    camera: Camera,
    params: { drawBool: boolean }
  ) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.scene = scene;
    this.camera = camera;
    this.drawBool = params.drawBool;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      preserveDrawingBuffer: this.drawBool
    });
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor(0x000000, 0.0);
    this.instance.setSize(this.sizes.width, this.sizes.height, false);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.instance.autoClear = this.drawBool;
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height, false);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
