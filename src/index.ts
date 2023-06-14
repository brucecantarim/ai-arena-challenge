import GameWorld from "./game-world";
import Resources from "./helpers/resources";
import createScene from "./helpers/scene-setup";
import Time from "./rendering/time";
import "./styles.css";

const resources = new Resources();
let started = false;
let world: GameWorld;

function init() {
  const time = new Time();

  const { scene, sizes, camera, renderer } = createScene({
    containerId: "app",
    camera: { fov: 25, near: 0.1, far: 1000 },
    drawBool: false
  });

  return { time, scene, sizes, camera, renderer };
}

const { time, scene, renderer } = init();

function destroy() {
  while (scene.children.length) {
    scene.remove(scene.children[0]);
  }
}

function stop() {
  console.log("stop");

  time.off("tick");
  time.off("tickFixed");

  started = false;
}

function update(deltaTime: number, world: GameWorld) {
  renderer.update();
  world.update(deltaTime);
}

function updateFixed(deltaTimeFixed: number, world: GameWorld) {
  world.fixedUpdate(deltaTimeFixed);
}

function start() {
  if (started) stop();

  console.log("start");

  time.on("tick", (deltaTime: number) => {
    update(deltaTime, world);
  });

  time.on("tickFixed", (deltaTimeFixed: number) => {
    updateFixed(deltaTimeFixed, world);
  });

  started = true;
}

function reset() {
  stop();
  destroy();

  world = new GameWorld(scene, resources);
  start();
}

resources.on("ready", () => {
  world = new GameWorld(scene, resources);

  Array.from(document.getElementsByTagName("button")).forEach(
    (button) => (button.style.visibility = "visible")
  );

  start();

  document.getElementById("start").onclick = () => start();
  document.getElementById("stop").onclick = () => stop();
  document.getElementById("reset").onclick = () => reset();
});
