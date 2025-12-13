import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Utils } from "../../../util/math/util";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";
import { Horizon } from "./horizon";
import { Moon } from "./moon";
import { Sun } from "./sun";

export class Sky extends Div {
    sun: Sun;
    moon: any;
    horizon: Horizon;
    constructor(protected managers: Managers) {
        super({
            size: ['1920px', '1080px'],
            background: {
                color: 'blue',
            },
        });
        this.managers.renderer.add(this, 'bg', 25);
        this.sun = new Sun(this.managers);
        this.moon = new Moon(this.managers);
        this.horizon = new Horizon(this.managers);

        this.setTime(15);
        
    }
    setTime(time: number) {
        const wave = Math.pow(Math.sin(((time+17)%24)*Math.PI/12)*0.5+0.5, 2);
        const color = Utils.easeColor(wave, [173, 202, 251, 1], [10, 20, 30, 1]);
        this.background({
            color: color,
        });
        this.sun.setTime(time);
        this.moon.setTime(time);
    }
}