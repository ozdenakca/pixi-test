import { DisplayManager } from "./managers/DisplayManager";
import { SceneManager } from "./managers/SceneManager";
import { LoaderStage } from "./scenes/Loader";
import { ResourceLoader } from "./managers/ResourceLoader";

export class Game {
  private _display: DisplayManager;
  private _stage: SceneManager;
  private _resource: ResourceLoader;
  private _loader: LoaderStage;
  private static _instance: Game;

  constructor() {
    Game._instance = this;
    this.init();
  }

  private init() {
    this._stage = new SceneManager(this);
    this._display = new DisplayManager(this._stage.main);
    this._display.create();
    this._resource = new ResourceLoader();
    this._loader = new LoaderStage(this, "LoaderScene");
    this._resource.loadAsset();
    this._stage.createScene("LoaderStage", this._loader);
    this._stage.goToScene("LoaderStage", true);
  }

  public static get instance(): Game {
    return Game._instance;
  }

  public get stage(): any {
    return this._stage;
  }

  public get display(): any {
    return this._display;
  }
  public get resource(): any {
    return this._resource;
  }
}
