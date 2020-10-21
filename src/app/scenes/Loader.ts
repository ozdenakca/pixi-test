import { ResourceLoader } from "../managers/ResourceLoader";
import { Main } from "../scenes/Main";
import { gsap } from "gsap";

import { Game } from "../Game";
import { Scene } from "../types/Scene";

// the stage we see when the resources are loaded. loading bar can be added.
export class LoaderStage extends Scene {
 
  public init() {
    this.game.resource.once("loadcomplete", this.onLoadComplete, this);
  }

  private onLoadComplete(): void {
    this.game.stage.createScene("Main", new Main(this.game, "MainGame"));
    this.game.stage.goToScene("Main", true);
  }

  public dispose() {
    this.game.resource.off("loadcomplete");
  }
}
