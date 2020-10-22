import "pixi-spine";
import { Reel } from "../components/Reel";
import { Events } from "../Events";
import { Scene } from "../types/Scene";
import particles = require('pixi-particles');
import { config } from "../config/Particle"
import { gsap } from "gsap";


//our main scene
export class Main extends Scene {

  public init() {
    const reel = new Reel(this.game, 1000, 100);
    reel.on(Events.SPIN_COMPLETED, () => {
      button.alpha = 1;
      button.interactive = true;
    });
    reel.on(Events.SPIN_STOPPING, () => {
      emitter.emit = true;
      gsap.to(container.position, 0.2, {
        y: 100,
        onComplete: () => {
          emitter.emit = false;
        }
      })
    })
    const button = new PIXI.Graphics().beginFill(0xffffff, 1).drawRect(0, 0, 200, 200).endFill();
    button.interactive = true;
    button.on(Events.POINTER_DOWN, () => {
      container.position.y = 940;
      button.interactive = false;
      reel.startSpin();
      button.alpha = 0.5;
    });
    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff'],
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: 'round'
    });
    let fpsNow = new PIXI.Text('', style);
    button.position.set(1500, 940);
    let count = 0;
    this.game.display.on(Events.FPS, (delta) => {
      count += delta;
      if (count > 10) {
        fpsNow.text = this.game.display.app.ticker.FPS;
        count = 0
      }
    });
    let container = new PIXI.ParticleContainer();
    container.position.set(1200, 940);
    let emitter = new particles.Emitter(container, PIXI.Texture.from("coin"), config);
    emitter.emit = false;
    this.game.display.app.ticker.add((delta) => {
      emitter.update(delta * 0.01);
    });
    this.addChild(button, fpsNow, container, reel);
  }

  public dispose() { }
}
