import { Game } from "../Game";
import { Events } from "../Events";
import { Component } from "../types/Component";
import { Symbol } from "./Symbol";
import { gsap } from "gsap";

const ROW = 4
const S_HEIGHT = 300;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPEED = 0.05;
const MAX_PROGRESS = 3;
const MIN_DEC_SPEED_FACTOR = 0.04;
const BOUNCE_DURATION = 0.3;
const DISPLAY_SYMBOLS = [0, 1, 2, 3, 4]; // first 3 visible

export class Reel extends Component {
    private _progress: number;
    private _symbols: Symbol[] = [];
    private _stopping: boolean = false;
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.init();
    }

    private init() {
        const spinMask = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(0, 0, 300, 900).endFill();
        this.mask = spinMask;
        this.addChild(spinMask);
        for (let i = 0; i < 5; i++) {
            const symbol = new Symbol(1);
            symbol.position.y = i * (S_HEIGHT);
            this._symbols.push(symbol);
            this.addChild(symbol);
        }
        this._progress = 0;
    }

    public startSpin() {
        this.game.display.on(Events.UPDATE, this.spin.bind(this));
    }

    private spin() {
        if (this.progress > MAX_PROGRESS) {
            this.game.display.off(Events.UPDATE);
            this.decelerate(Math.ceil(this.progress) - this.progress);
        } else this.progress += SPEED;

    }

    private decelerate(rProgress: number) {
        this.emit(Events.SPIN_STOPPING);

        let dProgress = rProgress + 1 // delta progress
        const tProgress = dProgress + this.progress; // target progress
        let dFactor = 3.5; // decreasing factor can be adjusted by a function for slowing down or building up 
        let bounceFunc = function () {
            if (dProgress <= 1) // last tour lets set the display symbols
                this._stopping = true;
            let dSpeed = dProgress / dFactor; // decreasing speed
            (dSpeed = Math.max(dSpeed, MIN_DEC_SPEED_FACTOR)); // slow down but dont stop, there should be a min amount of speed left
            dProgress -= dSpeed;
            this.progress += dSpeed;
            if (this.progress >= tProgress + MIN_DEC_SPEED_FACTOR) { // we moved too much lets bounce back (target plus the min speed left)
                this.game.display.off(Events.UPDATE)
                gsap.to(this, BOUNCE_DURATION, {
                    progress: tProgress,
                    onComplete: () => {
                        this.emit(Events.SPIN_COMPLETED);
                        this._count -= 1;
                        this._stopping = false;
                        this._progress = 0;
                        for (let i = 0; i < 5; i++) { //sloppy but visually correct, setting the 0.00000001 pixels to 0.
                            this._symbols[i].position.y = i * (S_HEIGHT);
                        }
                    }
                });
            }
        }.bind(this);
        this.game.display.on(Events.UPDATE, bounceFunc), bounceFunc();
    }

    public dispose() {
        this.game.display.off(Events.UPDATE);
    }

    public get progress() {
        return this._progress;
    }

    public set progress(value: number) {
        let deltaY = (value - this._progress) * TOTAL_HEIGHT;
        this._progress = value;
        for (let i = 4; i >= 0; i--) {
            this._symbols[i].position.y += deltaY;
            if (this._symbols[i].position.y >= BORDER_Y - 2) {
                this._symbols[i].position.y = this._symbols[i].position.y - TOTAL_HEIGHT;
                if (this._stopping) {
                    this._symbols[i].index = DISPLAY_SYMBOLS[i];
                } else this._symbols[i].index = Math.floor(Math.random() * 13);

            }
        }
    }
}