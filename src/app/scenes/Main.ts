import "pixi-spine";
import { Reel } from "../components/Reel";
import { Scene } from "../types/Scene";

//our main scene
export class Main extends Scene {

  public init() {
    const reel = new Reel(this.game, 1000, 100);
    const background = new PIXI.Sprite(PIXI.Texture.from("background"));

    this.addChild(reel)
  }

  public dispose() { }
}
