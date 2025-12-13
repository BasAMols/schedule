import { Div } from "../../../util/html/div";
import { Utils } from "../../../util/math/util";
import { Vector2 } from "../../../util/math/vector2";

export class Sky extends Div {
    constructor() {
        super({
            size: ['100%', '100%'],
            background: {
                color: 'blue',
            },
        });
        this.setTime(15);
    }
    setTime(time: number) {
        const wave = Math.pow(Math.sin(((time+17)%24)*Math.PI/12)*0.5+0.5, 2);

        const color = Utils.easeColor(wave, [173, 202, 251, 1], [1, 2, 3, 1]);

        this.background({
            color: color,
        });
    }
}