export enum Events {
  RESIZE = "resize",
  UPDATE = "update"
}

const SIZE = [2000, 1500];
const RATIO = SIZE[0] / SIZE[1];
export class DisplayManager extends PIXI.utils.EventEmitter {
  private _app: PIXI.Application;
  private _mainContainer: PIXI.Container;
  private resolution: number = 1;
  constructor(mainContainer: PIXI.Container) {
    super();
    this._mainContainer = mainContainer;
  }

  public create() {
    this._app = new PIXI.Application({
      backgroundColor: 0x000,
      sharedTicker: false,
    });
    this._app.ticker.maxFPS = 60;
    this._app.ticker.add((delta) => {
      this.emit(Events.UPDATE, delta);
    })
    document.body.appendChild(this._app.view);
    window.addEventListener(Events.RESIZE, this.onResize.bind(this), false);
    this.onResize();
    this._mainContainer.name = "MainContainer";
    this._app.stage.addChild(this._mainContainer);
  }

  private onResize(): void {
    const design = { width: 2048, height: 1536 };

    const scaleXa = window.innerWidth / design.width;
    const scaleYa = window.innerHeight / design.height;

    const scale = Math.min(scaleXa, scaleYa);

    this._app.view.width = window.innerWidth;
    this._app.view.height = window.innerHeight;

    const posX = window.innerWidth - design.width * scale;
    const posY = window.innerHeight - design.height * scale;

    this._mainContainer.scale.set(scale / this.resolution);
    this._mainContainer.position.set(posX * 0.5, posY * 0.5);
  }
}
