import "pixi-spine";
import { Reel } from "../components/Reel";
import { Events } from "../managers/DisplayManager";
import { Scene } from "../types/Scene";

//our main scene
export class Main extends Scene {

  public init() {
    const reel = new Reel(this.game, 1000, 100);
    reel.on(Events.SPIN_COMPLETED, () => {
      button.alpha = 1;
      button.interactive = true;
    })
    const button = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(0, 0, 200, 200).endFill();
    button.interactive = true;
    button.on(Events.POINTER_DOWN, () => {
      button.interactive = false;
      reel.startSpin();
      button.alpha = 0.5;
    })
    button.position.set(1500, 1000);
    this.addChild(reel, button);
  }

  public dispose() { }
}
