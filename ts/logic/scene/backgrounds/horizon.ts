import { Div } from "../../../util/html/div";
import { timeEaser } from "../../../util/math/timeEaser";
import { Utils } from "../../../util/math/util";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";

export class Horizon extends Div {
    overlay: import("c:/Users/basm/Documents/workspace/schedule/ts/render/renderLayer").RenderLayer;
    constructor(protected managers: Managers) {
        super({
            position: new Vector2(0, 1080 - 150 - 150),
            size: ['3000px', '150px'],
            background: {
                color: 'rgb(28 42 58 / 85%)',
            },
        });
        this.managers.renderer.add(this, 'bg', 40);
        this.overlay = this.managers.renderer.add(new Div({
            position: new Vector2(0, 1080 - 150),
            size: ['3000px', '150px'],
            background: {
                color: 'rgb(28 42 58 / 85%)',
            },
        }), 'overlay', 40);
    }
    setTime(time: number) {
        this.overlay.element.background({
            color: Utils.easeColor(timeEaser(time % 24, [
                [7, 1],
                [12, 0],
                [15, 0],
                [20, 1],
            ], 24), [28, 42, 58, 1], [90, 130, 180, 1]),
        });
        this.background({
            color: Utils.easeColor(timeEaser(time % 24, [
                [7, 1],
                [12, 0],
                [15, 0],
                [20, 1],
            ], 24), [28, 42, 58, 1], [90, 130, 180, 1]),
        });
    }
}