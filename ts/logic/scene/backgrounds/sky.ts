import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { timeEaser } from "../../../util/math/timeEaser";
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
    overlay: Div;
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
        const color = Utils.easeColor((timeEaser(time % 24, [
            [5, 0],
            [9, 1],
            [15, 1],
            [19, 0],
        ], 24)), [173, 202, 251, 1], [10, 20, 30, 1]);
        this.background({
            color: color,
        });
        this.sun.setTime(time);
        this.moon.setTime(time);
        this.horizon.setTime(time);
    }
}