import { Game } from "../Game";
import { Events } from "../managers/DisplayManager";
import { Component } from "../types/Component";
import { Symbol } from "./Symbol";
import { gsap } from "gsap";

const ROW = 4
const S_HEIGHT = 400;
const BORDER_Y = (ROW / 2 + 1) * S_HEIGHT;
const TOTAL_HEIGHT = (ROW + 1) * S_HEIGHT;
const SPEED = 0.05;
const DEC_FACTOR = 3.5;

export class Reel extends Component {
    private _progress: number;
    private _symbol: Symbol[] = [];
    constructor(game: Game, x: number, y: number) {
        super(game, x, y);
        this.init();
        console.log(this);
    }

    private init() {
        const spinMask = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(0, 0, 2000, 1200).endFill();
        spinMask.name = "SpinMask";
        this.mask = spinMask;
        this.addChild(spinMask);
        for (let i = 0; i < 5; i++) {
            const symbol = new Symbol(1);
            symbol.position.y = i * (S_HEIGHT);
            this._symbol.push(symbol);
            this.addChild(symbol);
        }
        this._progress = 0;
        this.startSpin();
    }

    public startSpin() {
        this.game.display.on(Events.UPDATE, this.spin.bind(this));
    }

    private spin(delta) {
        if (this.progress > 5) {
            this.game.display.off(Events.UPDATE);
            this.decelerate(Math.ceil(this.progress) - this.progress);
        } else {
            this.progress += SPEED;
        }
    }

    private decelerate(d) {
        var n = d + 1,
            i = 0.04,
            o = 0.3,
            s = n + this.progress,
            a = 3.5,
            h = function () {
                var t =
                    n /
                    a;
                (t = Math.max(t, 0.04)),
                    (n -= t),
                    (this.progress += t),
                    this.progress >= s + i &&
                    (this.game.display.off(Events.UPDATE, h),
                        gsap.to(this, o, {
                            progress: s,
                            onComplete: () => {
                                this._progress = 0;
                            }
                        }));
            }.bind(this);
        this.game.display.on(Events.UPDATE, h), h();
    }

    public dispose() {

    }

    public get progress() {
        return this._progress;
    }

    public set progress(value: number) {
        let deltaProgress = (value - this._progress) * TOTAL_HEIGHT;
        // console.log(deltaProgress);
        this._progress = value;
        this._symbol.forEach((item) => {
            item.position.y += deltaProgress;
            if (item.position.y >= BORDER_Y - 1) {
                item.position.y = item.position.y - TOTAL_HEIGHT;
                item.index = Math.floor(Math.random() * 13);
            }
        });
    }
}