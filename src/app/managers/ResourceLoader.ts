export class ResourceLoader extends PIXI.utils.EventEmitter {
  private _loader: PIXI.Loader;

  constructor() {
    super();
  }

  public loadAsset(): void {
    this._loader = new PIXI.Loader();
    this._loader.add("background", "assets/goblins_background.jpg");
    this._loader.add("reel_background", "assets/goblins_reels.png");
    this._loader.add("symbols", "assets/slotSymbols.json");
    this._loader.add("ui", "assets/ui.png");
    this._loader.add("goblin", "assets/goblin_hp2.json");
    this._loader.add("spinButton", "assets/spin_button.png");
    this.loader.onComplete.add(() => {
      this.emit("loadcomplete");
    });
    this._loader.load();
  }

  public get loader(): any {
    return this._loader;
  }
}
