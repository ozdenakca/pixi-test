import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import { Game } from "./app/Game";
const game: Game = new Game();
declare global {
  interface Window {
    Game: any;
  }
}
window.Game = game;
