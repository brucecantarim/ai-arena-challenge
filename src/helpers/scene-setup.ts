import Camera from "../rendering/camera";
import Renderer from "../rendering/renderer";
import Sizes from "../rendering/sizes";
import { Scene } from "three";

export default function createScene(params: {
  containerId: string;
  camera: { fov: number; near: number; far: number };
  drawBool: boolean;
}) {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";

  document.getElementById(params.containerId).appendChild(canvas);

  //Setup scene, camera, and renderer
  const scene = new Scene();
  const sizes = new Sizes(canvas);
  const camera = new Camera(sizes, scene, params.camera);
  const renderer = new Renderer(canvas, sizes, scene, camera, params);

  sizes.on("resize", () => {
    camera.resize();
    renderer.resize();
  });

  return { scene, sizes, camera, renderer };
}
