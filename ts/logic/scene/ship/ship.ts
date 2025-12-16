import { RendererWrappers } from "../../../render/renderer";
import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Ease } from "../../../util/math/ease";
import { timeEaser } from "../../../util/math/timeEaser";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";
import { TimePeriod } from "../../tasks/time";

export type ShipThemeLayers = 'ext' | 'back' | 'mid' | 'front';

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
                size: new Vector2(3840, 2800),
                position: new Vector2(300, -120 + 150),
            });
            return [layer, {
                div,
                renderLayer: new RenderLayer(div, 40),
            }];
        })) as Record<ShipThemeLayers, {
            div: Div;
            renderLayer: RenderLayer;
        }>;

        this.managers.renderer.add(this.layers.back.renderLayer, layer, 0);
        this.managers.renderer.add(this.layers.mid.renderLayer, layer, 20);
        this.managers.renderer.add(this.layers.front.renderLayer, layer, 40);
        this.managers.renderer.add(this.layers.ext.renderLayer, layer, 100);

        this.setTime(0);
    }

    setTime(time: number) {
        let opacity = timeEaser(time % 24, this.time, 24);
        this.layers.ext.renderLayer.opacity = 0;
        this.layers.back.renderLayer.opacity = opacity;
        this.layers.mid.renderLayer.opacity = opacity;
        this.layers.front.renderLayer.opacity = (1 - this.open) * opacity;
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
    evening: ShipTheme;
    constructor(protected managers: Managers, scale: number = 0.35, layer: RendererWrappers = 'ship') {
        this.night = new ShipTheme(
            { back: '/animationNight/0001', mid: '/animationNight/0002', front: '/animationNight/0003', ext: '/animationNight/0000', },
            [[6, 1], [7, 0], [17, 0], [18, 1]],
            this.managers, scale, layer
        );

        this.morning = new ShipTheme(
            { back: '/animationSunRise/0001', mid: '/animationSunRise/0002', front: '/animationSunRise/0003', ext: '/animationSunRise/0000', },
            [[6, 0], [7, 1], [9, 1], [11, 0]],
            this.managers, scale, layer
        );

        this.day = new ShipTheme(
            { back: '/animationDay/0001', mid: '/animationDay/0002', front: '/animationDay/0003', ext: '/animationDay/0000', },
            [[9, 0], [11, 1], [14, 1], [16, 0]],
            this.managers, scale, layer
        );

        this.evening = new ShipTheme(
            { back: '/animationSunSet/0001', mid: '/animationSunSet/0002', front: '/animationSunSet/0003', ext: '/animationSunSet/0000', },
            [[14, 0], [16, 1], [17, 1], [18, 0]],
            this.managers, scale, layer
        );
    }

    setTime(time: number) {
        this.night.setTime(time % 24);
        this.morning.setTime(time % 24);
        this.day.setTime(time % 24);
        this.evening.setTime(time % 24);

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
        this.evening.open = Number(value);
    }

}