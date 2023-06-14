import EventEmitter from "../helpers/event-emitter";
import { TICK_TIME } from "../helpers/constants";

export default class Time extends EventEmitter {
  private time: number;
  private delta: number;
  private currentTime?: number;
  private accumulator: number;
  public id: number;

  constructor() {
    super();

    // Setup
    this.time = 0;
    this.delta = TICK_TIME;
    this.currentTime = undefined;
    this.accumulator = 0;

    this.id = window.requestAnimationFrame((newTime) => {
      this.tick(newTime);
    });
  }

  tick(newTime: number) {
    this.id = window.requestAnimationFrame((newTime) => {
      this.tick(newTime);
    });

    if (this.currentTime) {
      let frameTime = newTime - this.currentTime;
      if (frameTime > 250) frameTime = 250;
      this.accumulator += frameTime;

      while (this.accumulator >= this.delta) {
        this.trigger("tickFixed", [this.delta]);
        this.time += this.delta;
        this.accumulator -= this.delta;
      }

      this.trigger("tick", [frameTime, this.accumulator / this.delta]);
    }

    this.currentTime = newTime;
  }

  stop() {
    window.cancelAnimationFrame(this.id);
  }
}
