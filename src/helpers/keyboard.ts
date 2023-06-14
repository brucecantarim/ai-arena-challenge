export default class Keyboard {
  pressed: { [key: string]: boolean };

  constructor() {
    this.pressed = {};

    document.addEventListener(
      "keydown",
      (event) => this.onKeyDown(event.code),
      false
    );
    document.addEventListener(
      "keyup",
      (event) => this.onKeyUp(event.code),
      false
    );
  }

  private onKeyDown(code: string) {
    this.pressed[code] = true;
  }

  private onKeyUp(code: string) {
    delete this.pressed[code];
  }

  public isDown(code: string) {
    return this.pressed[code];
  }
}
