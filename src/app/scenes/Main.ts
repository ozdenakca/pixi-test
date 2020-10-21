import "pixi-spine";
import { Reel } from "../components/Reel";
import { Scene } from "../types/Scene";

//our main scene
export class Main extends Scene {
 
  public init() {
    const reel = new Reel(this.game, 0,0);
  }

  public dispose() {}
}
