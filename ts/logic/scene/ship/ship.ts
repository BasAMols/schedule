import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Ease } from "../../../util/math/ease";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";
import { TimePeriod } from "../../tasks/time";

export type ShipThemeLayers = 'back' | 'front';

export abstract class ShipTheme {
    private layers: Record<ShipThemeLayers, {
        div: Div;
        renderLayer: RenderLayer;
    }>;
    constructor(layers: Record<ShipThemeLayers, string>, protected time: {
        easeInStart: TimePeriod;
        easeInEnd: TimePeriod;
        easeOutStart: TimePeriod;
        easeOutEnd: TimePeriod;
    }, protected managers: Managers) {
        this.layers = Object.fromEntries(Object.entries(layers).map(([layer, image]) => {
            const div = new Div({
                background: {
                    image: `dist/images/ship/${image}.png`,
                    type: 'image',
                },
                scale: new Vector2(0.35, 0.35),
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

        this.managers.renderer.add(this.layers.back.renderLayer, 'ship', 40);
        this.managers.renderer.add(this.layers.front.renderLayer, 'ship', 60);
    }

    setTime(time: number) {
        let opacity = 0;

        if (this.time.easeInStart < this.time.easeOutStart) {
            if (time < this.time.easeInStart || time > this.time.easeOutEnd) {
                opacity = 0;
            } else if (time > this.time.easeInEnd && time < this.time.easeOutStart) {
                opacity = 1;
            }
            if (time >= this.time.easeInStart && time <= this.time.easeInEnd) {
                opacity = (time - this.time.easeInStart) / (this.time.easeInEnd - this.time.easeInStart);
            } else if (time >= this.time.easeOutStart && time <= this.time.easeOutEnd) {
                opacity = 1 - (time - this.time.easeOutStart) / (this.time.easeOutEnd - this.time.easeOutStart);
            }
        } else {
            if (time < this.time.easeOutStart || time > this.time.easeInEnd) {
                opacity = 1;
            } else if (time > this.time.easeOutEnd && time < this.time.easeInStart) {
                opacity = 0;
            }
            if (time >= this.time.easeInStart && time <= this.time.easeInEnd) {
                opacity = (time - this.time.easeInStart) / (this.time.easeInEnd - this.time.easeInStart);
            } else if (time >= this.time.easeOutStart && time <= this.time.easeOutEnd) {
                opacity = 1 - (time - this.time.easeOutStart) / (this.time.easeOutEnd - this.time.easeOutStart);
            }
        }

        this.layers.back.renderLayer.opacity = opacity;
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

export class ShipNight extends ShipTheme {
    constructor(managers: Managers) {
        super({
            back: 'night_back',
            front: 'night_front',
        }, {
            easeInStart: 16,
            easeInEnd: 20,
            easeOutStart: 5,
            easeOutEnd: 9,
        }, managers);
    }
}
export class ShipDay extends ShipTheme {
    constructor(managers: Managers) {
        super({
            back: 'back',
            front: 'front',
        }, {
            easeInStart: 5,
            easeInEnd: 9,
            easeOutStart: 16,
            easeOutEnd: 20,
        }, managers);
    }
}

export class Ship {
    day: ShipDay;
    night: ShipNight;
    constructor(protected managers: Managers) {
        this.night = new ShipNight(this.managers);
        this.day = new ShipDay(this.managers);
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