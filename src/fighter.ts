import { AnimationAction, AnimationMixer, Group, Vector3 } from "three";
import Keyboard from "./helpers/keyboard";
import Resources from "./helpers/resources";

export default class Fighter {
  private scene: THREE.Scene;
  private resources: Resources;
  private keyboard: Keyboard;
  private model: THREE.Group;
  private animation: {
    mixer: AnimationMixer;
    actions: { [key: string]: AnimationAction };
    play: (name: string) => void;
    update: (deltaTime: number) => void;
  };

  private position: Vector3;

  constructor(scene: THREE.Scene, resources: Resources) {
    this.scene = scene;
    this.resources = resources;
    this.keyboard = new Keyboard();

    this.model = resources.items.fighter as THREE.Group;
    this.animation = {
      mixer: new AnimationMixer(this.model),
      actions: {
        current: undefined
      },
      play: (name) => {
        const newAction = this.animation.actions[name];
        const oldAction = this.animation.actions.current;

        if (newAction === oldAction) return;

        newAction.reset();
        newAction.play();
        if (oldAction !== undefined) {
          newAction.crossFadeFrom(oldAction, 0.16, true);
        }

        this.animation.actions.current = newAction;
      },
      update: (deltaTime) => {
        this.animation.mixer.update(deltaTime * 0.001);
      }
    };

    this.position = new Vector3(0, 0, 0);

    this.addFighterToScene();
    this.attachFighterAnimations();
  }

  addFighterToScene() {
    this.model.scale.set(0.05, 0.05, 0.05);
    this.model.position.set(this.position.x, this.position.y, 0);
    this.model.rotation.y = Math.PI / 2;
    this.scene.add(this.model);
  }

  attachFighterAnimations() {
    //Available animations
    ["idle", "run", "jump", "punch"].forEach((action) => {
      const resource = this.resources.items[action] as Group;
      this.animation.actions[action] = this.animation.mixer.clipAction(
        resource.animations[0]
      );
    });
  }

  //TODO: Create function that updates the `position` of the fighter
  move(deltaTime: number) {}

  //Add visual updates here
  update(deltaTime: number) {
    this.animation.update(deltaTime);

    this.model.position.set(this.position.x, this.position.y, 0);
  }

  //TODO: Create function that inverts the direction the fighter faces
  flip() {}

  //Add physics updates here
  updateFixed(deltaTimeFixed: number) {
    //Add input/movement here
    if (this.keyboard.isDown("KeyA")) {
    }

    this.animation.play("idle");

    this.move(deltaTimeFixed);
  }
}
