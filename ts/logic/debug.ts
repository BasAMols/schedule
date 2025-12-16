import { Div } from "../util/html/div";
import { Vector2 } from "../util/math/vector2";
import { Managers } from "./managers";

export class Debug extends Div{
    constructor(protected managers: Managers) {
        super({
            size: new Vector2(200, 50),
            background: {
                color: 'white',
            },
            style: 'color: black; font-size: 25px; font-family: Arial, sans-serif; padding: 10px;',
        });

        document.body.addEventListener('mousemove', (e) => {
            const world = this.managers.renderer.screenToWorld(new Vector2(e.clientX, e.clientY));
            this.dom.innerText = `X: ${Math.round(world.x)}, Y: ${Math.round(world.y)}`;
        });

    }

    private _enabled: boolean = false;
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(value: boolean) {
        this._enabled = value;
        this.managers.mapManager.mapSvg.visible = value;
        this.visible = value;
    }

}