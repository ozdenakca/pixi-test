export class ResourceLoader extends PIXI.utils.EventEmitter {
  private _loader: PIXI.Loader;

  constructor() {
    super();
  }

  public loadAsset(): void {
    this._loader = new PIXI.Loader();
    this._loader.add("background", "assets/background.jpg");
    this._loader.add("symbols", "assets/slotSymbols.json");
    this.loader.onComplete.add(() => {
      this.emit("loadcomplete");
    });
    this._loader.load();
  }

  public get loader(): any {
    return this._loader;
  }
}
