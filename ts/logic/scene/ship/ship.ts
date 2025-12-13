import { Div } from "../../../util/html/div";
import { Ease } from "../../../util/math/ease";
import { Vector2 } from "../../../util/math/vector2";
import { TimePeriod } from "../../tasks/time";

export type ShipThemeLayers = 'back' | 'front';

export abstract class ShipTheme extends Div {
    private layers: Record<ShipThemeLayers, Div>;
    private _open: boolean = false;
    public get open(): boolean {
        return this._open;
    }
    public set open(value: boolean) {
        if (value !== this._open) {
            this.layers.front.style(`opacity: ${value ? 1 : 0}`);
            this._open = value;
        }
    }
    constructor(layers: Record<ShipThemeLayers, string>, protected time: {
        easeInStart: TimePeriod;
        easeInEnd: TimePeriod;
        easeOutStart: TimePeriod;
        easeOutEnd: TimePeriod;
    }) {
        super({
        });
        this.layers = Object.fromEntries(Object.entries(layers).map(([layer, image]) => {
            const div = new Div({
                background: {
                    image: `dist/images/ship/${image}.png`,
                    type: 'image',
                },
                style: 'opacity: 1; transition: opacity 0.1s ease-in-out;',
                size: new Vector2(3840, 3200),
            });
            this.append(div);
            return [layer, div];
        })) as Record<ShipThemeLayers, Div>;

        this.layers.back.style(`z-index: 10`);
        this.layers.front.style(`z-index: 40`);
        this.open = true;
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
        this.style(`opacity: ${opacity}`);
    }
}

export class ShipNight extends ShipTheme {
    constructor() {
        super({
            back: 'night_back',
            front: 'night_front',
        }, {
            easeInStart: 15,
            easeInEnd: 21,
            easeOutStart: 4,
            easeOutEnd: 10,
        });
    }
}
export class ShipDay extends ShipTheme {
    constructor() {
        super({
            back: 'back',
            front: 'front',
        }, {
            easeInStart: 2,
            easeInEnd: 7,
            easeOutStart: 18,
            easeOutEnd: 21,
        });
    }
}

export class Ship extends Div {
    day: ShipDay;
    night: ShipNight;
    constructor() {
        super({
            size: new Vector2(3840, 3200),
            scale: new Vector2(0.35, 0.35),
            position: new Vector2(0, -250),
        });

        this.append((this.night = new ShipNight()));
        this.append((this.day = new ShipDay()));
    }

    setTime(time: number) {
        this.day.setTime(time % 24);
        this.night.setTime(time % 24);

        this.night.open = time > 22 || time <= 9;
        this.day.open = time > 22 || time <= 9;
    }
}