import { Game } from "../Game";
import { Component } from "../types/Component";

export class Reel extends Component {

    constructor(game: Game, x: number, y: number ) {
        super(game, x,y);
        this.init();
    }

    private init() {
        console.log(this.game)
    }

    public dispose() {

    } 
}