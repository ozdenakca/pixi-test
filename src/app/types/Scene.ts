import { Game } from "../Game";

export abstract class Scene extends PIXI.Container {
    protected game:  Game;
    constructor(game: Game, name: string = "Stage") {
        super();
        this.game = game;
    }
    public abstract init(...args: any[]): void;
    public abstract dispose(...args: any[]): void;
  }