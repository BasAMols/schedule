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
    stars: Div;
    constructor(protected managers: Managers) {
        super({
            size: ['3000px', '1080px'],
            background: {
                color: 'blue',
            },
        });
        this.managers.renderer.add(this, 'bg', 1);
        this.sun = new Sun(this.managers);
        this.moon = new Moon(this, this.managers);
        this.horizon = new Horizon(this.managers);

        this.stars = new Div({
            position: new Vector2(-400, -1500),
            size: new Vector2(4000, 4000),
        });

        for (let i = 0; i < 400; i++) {
            const star = new Div({
                position: new Vector2(Math.random() * 4000, Math.random() * 4000),
                size: Math.random() < 0.03 ? new Vector2(3, 3) : new Vector2(1 + Math.random(), 1 + Math.random()),
                background: {
                    color: 'white',
                },
            });
            this.stars.append(star);
        }
        this.append(this.stars);

        this.stars.append(new Div({
            position: new Vector2(2000, 1800),
            size: new Vector2(3, 3),
            background: {
                color: 'white',
            },
        }));

        this.setTime(15);

    }

    getSkyBrightness(time: number, day: number = 0, moonContribution: number = 0.5): number {
        const sun = this.sun.getSunPeriod(time);
        const moon = this.moon.getMoonPeriod(time, day);
        const phase = this.moon.getMoonPhase(time, day);
    
        // Sun visibility: 1 at noon, 0 at night
        const sunAngle = (sun - 0.5) * 2 * Math.PI;
        let sunBrightness = Math.max(0, Math.cos(sunAngle));
    
        // Moon visibility: similar curve, scaled by phase and contribution
        const moonAngle = (moon - 0.5) * 2 * Math.PI;
        let moonBrightness =
            Math.max(0, Math.cos(moonAngle)) *
            phase *
            moonContribution;
    
        // Angular separation for eclipse handling
        const separation = Math.abs(((moon - sun + 0.5) % 1) - 0.5);
    
        // Abstract eclipse zone
        const ECLIPSE_THRESHOLD = 0.02;
    
        if (separation < ECLIPSE_THRESHOLD) {
            // Solar eclipse (near new moon)
            if (phase < 0.1) {
                sunBrightness *= separation / ECLIPSE_THRESHOLD;
            }
    
            // Lunar eclipse (near full moon)
            if (phase > 0.9) {
                moonBrightness *= separation / ECLIPSE_THRESHOLD;
            }
        }
    
        return Math.max(0, sunBrightness + moonBrightness);
    }
    setTime(time: number, day: number = 0) {
        
        const color = Utils.easeColor((timeEaser(time % 24, [
            [5, 0],
            [9, 1],
            [15, 1],
            [19, 0],
        ], 24)), [173, 202, 251, 1], [10, 20, 30, 1]);
        this.background({
            color: color,
        });
        window.document.body.style.backgroundColor = color;
        this.sun.setTime(time);
        this.moon.setTime(time, day);
        this.horizon.setTime(time);

        this.stars.style(`opacity: ${timeEaser(time % 24, [
            [6, 1],
            [7, 0],
            [18, 0],
            [19, 1],
        ], 24)};`);
    }
}