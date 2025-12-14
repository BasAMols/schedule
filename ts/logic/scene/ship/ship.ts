import { RendererWrappers } from "../../../render/renderer";
import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Ease } from "../../../util/math/ease";
import { timeEaser } from "../../../util/math/timeEaser";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";
import { TimePeriod } from "../../tasks/time";

export type ShipThemeLayers = 'ext' | 'int0' | 'int1' | 'int2' | 'int3' | 'overlay';

export class ShipTheme {
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

        this.managers.renderer.add(this.layers.int0.renderLayer, layer, 0);
        this.managers.renderer.add(this.layers.int1.renderLayer, layer, 10);
        this.managers.renderer.add(this.layers.int2.renderLayer, layer, 20);
        this.managers.renderer.add(this.layers.int3.renderLayer, layer, 30);
        this.managers.renderer.add(this.layers.overlay.renderLayer, layer, 40);
        this.managers.renderer.add(this.layers.ext.renderLayer, layer, 100);

        this.setTime(0);
    }

    setTime(time: number) {
        let opacity = timeEaser(time % 24, this.time, 24);
        this.layers.ext.renderLayer.opacity = 0;
        this.layers.int1.renderLayer.opacity = opacity;
        this.layers.int2.renderLayer.opacity = opacity;
        this.layers.int3.renderLayer.opacity = opacity;
        this.layers.overlay.renderLayer.opacity = (1 - this.open) * opacity;
    }
    private _open: number = 0;
    public get open(): number {
        return this._open;
    }
    public set open(value: number) {
        this._open = value;
    }
}


export class Ship {
    day: ShipTheme;
    night: ShipTheme;
    morning: ShipTheme;
    constructor(protected managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        this.night = new ShipTheme(
            { int0: '1_int0', int1: '1_int1', int2: '1_int2', int3: '1_int3', overlay: '1_rail', ext: '1_ext', },
            [[6, 1], [7, 0], [17, 0], [18, 1]],
            this.managers, scale, layer
        );

        this.morning = new ShipTheme(
            { int0: '2_int0', int1: '2_int1', int2: '2_int2', int3: '2_int3', overlay: '2_rail', ext: '2_ext', },
            [[6, 0], [7, 1], [12, 1], [14, 0]],
            this.managers, scale, layer
        );

        this.day = new ShipTheme(
            { int0: '0_int0', int1: '0_int1', int2: '0_int2', int3: '0_int3', overlay: '0_rail', ext: '0_ext', },
            [[12, 0], [14, 1], [17, 1], [18, 0]],
            this.managers, scale, layer
        );
    }

    setTime(time: number) {
        this.night.setTime(time % 24);
        this.morning.setTime(time % 24);
        this.day.setTime(time % 24);

    }
    private _open: boolean = false;
    public get open(): boolean {
        return this._open;
    }
    public set open(value: boolean) {
        this._open = value;
        this.day.open = Number(value);
        this.night.open = Number(value);
        this.morning.open = Number(value);
    }

}