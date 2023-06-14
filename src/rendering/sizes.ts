import EventEmitter from "../helpers/event-emitter";

export default class Sizes extends EventEmitter {
  private canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public pixelRatio: number;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;

    // Setup
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Resize event
    window.addEventListener("resize", () => {
      this.width = this.canvas.clientWidth;
      this.height = this.canvas.clientHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger("resize");
    });
  }
}
