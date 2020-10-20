import { Scene } from "../managers/StageManager";
import { ResourceLoader } from "../managers/ResourceLoader";
import { Main } from "../scenes/Main";
import { gsap } from "gsap";

import { Game } from "../Game";

// the stage we see when the resources are loaded. loading bar can be added.
export class LoaderStage extends Scene {
  private _game: Game;
  constructor() {
    super();
    this._game = Game.instance;
  }
  public init() {
    this._game.resource.once("loadcomplete", this.onLoadComplete, this);
  }

  private onLoadComplete(): void {
    this._game.stage.createScene("Main", new Main());
    this._game.stage.goToScene("Main", true);
  }

  public dispose() {
    this._game.resource.off("loadcomplete");
  }
}
