import { Game } from "../Game";
import { Scene } from "../types/Scene";


export class SceneManager extends PIXI.utils.EventEmitter {
  protected game: Game;
  private _mainContainer: PIXI.Container = new PIXI.Container();
  private _scenes: any = {};
  private _currentStage!: Scene;
  constructor(game: Game) {
    super();
    this.game = game;
    this._mainContainer = new PIXI.Container();
    this._mainContainer.name = "RootContainer";
  }

  public createScene(id: string, TScene: Scene): Scene | any {
    if (this._scenes[id]) return undefined;
    var scene = TScene;
    this._scenes[id] = scene;
    this._mainContainer.addChild(this._scenes[id]);
    return scene;
  }

  public goToScene(id: string, reset: boolean): boolean {
    if (this._scenes[id]) {
      if (this._currentStage) {
        if (reset) {
          this._currentStage.removeChildren();
          this._mainContainer.removeChildren();
        } else {
          this._currentStage.visible = false;
          this._scenes[id].visible = true;
        }
        this._currentStage.dispose();
      }
      this._mainContainer.addChild(this._scenes[id]);
      this._currentStage = this._scenes[id];
      this._currentStage.init();
      return true;
    }
    return false;
  }

  public get scenes(): any {
    return this._scenes;
  }

  public get main(): PIXI.Container {
    return this._mainContainer;
  }
}
