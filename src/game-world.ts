import { DirectionalLight } from "three";
import Fighter from "./fighter";
import EventEmitter from "./helpers/event-emitter";
import Resources from "./helpers/resources";

export default class GameWorld extends EventEmitter {
  private scene: THREE.Scene;
  private resources: Resources;
  public fighters: Fighter[] = [];

  constructor(scene: THREE.Scene, resources: Resources) {
    super();

    this.scene = scene;
    this.resources = resources;

    this.createLight();
    this.createFighters();
  }

  createLight() {
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);

    this.scene.add(light);
  }

  createFighters() {
    this.fighters.push(new Fighter(this.scene, this.resources));
  }

  update(deltaTime: number) {
    for (const fighter of this.fighters) {
      fighter.update(deltaTime);
    }
  }

  fixedUpdate(deltaTimeFixed: number) {
    for (const fighter of this.fighters) {
      fighter.updateFixed(deltaTimeFixed);
    }
  }
}
