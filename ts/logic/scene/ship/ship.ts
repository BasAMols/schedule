import { RendererWrappers } from "../../../render/renderer";
import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Ease } from "../../../util/math/ease";
import { timeEaser } from "../../../util/math/timeEaser";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";
import { TimePeriod } from "../../tasks/time";

export type ShipThemeLayers = 'back' | 'front' | 'rail';

export abstract class ShipTheme {
    private layers: Record<ShipThemeLayers, {
        div: Div;
        renderLayer: RenderLayer;
    }>;
    constructor(layers: Record<ShipThemeLayers, string>, protected time: [number, number][], protected managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        this.layers = Object.fromEntries(Object.entries(layers).map(([layer, image]) => {
            const div = new Div({
                background: {
                    image: `dist/images/ship/${image}.png`,
                    type: 'image',
                },
                scale: new Vector2(scale, scale),
                style: 'opacity: 1; transition: opacity 0.1s ease-in-out;',
                size: new Vector2(3840, 3200),
                position: new Vector2(300, -120),
            });
            return [layer, {
                div,
                renderLayer: new RenderLayer(div, 40),
            }];
        })) as Record<ShipThemeLayers, {
            div: Div;
            renderLayer: RenderLayer;
        }>;

        this.managers.renderer.add(this.layers.back.renderLayer, layer, 40);
        this.managers.renderer.add(this.layers.front.renderLayer, layer, 60);
        this.managers.renderer.add(this.layers.rail.renderLayer, layer, 65);
    }

    setTime(time: number) {
        let opacity = timeEaser(time % 24, this.time, 24);
        this.layers.back.renderLayer.opacity = opacity;
        this.layers.front.renderLayer.opacity = (1 - this.open) * opacity;
        this.layers.rail.renderLayer.opacity = (1 - this.open) * opacity;
    }
    private _open: number = 0;
    public get open(): number {
        return this._open;
    }
    public set open(value: number) {
        this._open = value;
    }
}

export class ShipNight extends ShipTheme {
    constructor(managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        super({
            back: 'night_back',
            front: 'night_front',
            rail: 'night_rail',
        }, [
            [6, 1],
            [7, 0],
            [18, 0],
            [19, 1],
        ], managers, scale, layer);
    }
}
export class ShipDay extends ShipTheme {
    constructor(managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        super({
            back: 'back',
            front: 'front',
            rail: 'rail',
        }, [
            [6, 0],
            [7, 1],
            [18, 1],
            [19, 0],
        ], managers, scale, layer);
    }
}

export class Ship {
    day: ShipDay;
    night: ShipNight;
    constructor(protected managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        this.night = new ShipNight(this.managers, scale, layer);
        this.day = new ShipDay(this.managers, scale, layer);
    }

    setTime(time: number) {
        this.day.setTime(time % 24);
        this.night.setTime(time % 24);

        // let open = (time < 9 || time > 19) ? 1 : 0;

        // if (time >= 9 && time <= 10) open = 1-(time - 9) / 1;
        // if (time >= 18 && time <= 19) open = (time - 18) / 1;

        // this.day.open = open;
        // this.night.open = open;




    }
    private _open: boolean = false;
    public get open(): boolean {
        return this._open;
    }
    public set open(value: boolean) {
        this._open = value;
        this.day.open = Number(value);
        this.night.open = Number(value);
    }

}