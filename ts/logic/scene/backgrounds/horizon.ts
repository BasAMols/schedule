import { Div } from "../../../util/html/div";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";

export class Horizon extends Div {
    constructor(protected managers: Managers) {
        super({
            position: new Vector2(0, 1080-150-150),
            size: ['1920px', '150px'],
            background: {
                color: 'rgb(28 42 58 / 85%)',
            },
        });
        this.managers.renderer.add(this, 'bg', 40);
        this.managers.renderer.add(new Div({
            position: new Vector2(0, 1080-150),
            size: ['1920px', '150px'],
            background: {
                color: 'rgb(28 42 58 / 85%)',
            },
        }), 'overlay', 40);
    }
}