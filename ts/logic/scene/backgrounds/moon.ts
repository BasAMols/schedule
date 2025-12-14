import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { Dom } from "../../../util/html/dom";
import { timeEaser } from "../../../util/math/timeEaser";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";

export class Moon extends Div {
    moon: Dom;
    reflection: Div;
    reflectionWrap: Div;
    overlay: RenderLayer;
    constructor(protected managers: Managers) {
        super({
            size: ['3000px', '800px'],
            style: 'overflow: hidden;',
        });
        this.moon = new Div({
            size: ['90px', '90px'],
            background: {
                color: 'rgb(255, 255, 255)',
            },
            anchor: new Vector2(45, 45),
            style: 'position: absolute; border-radius: 50%; filter: drop-shadow(0 0 50px rgb(255, 255, 255)) blur(1px); margin-top: -45px; margin-left: -45px; ',
        });
        this.managers.renderer.add(this, 'bg', 35);
        this.append(this.moon);

        this.reflectionWrap = new Div({
            size: ['3000px', '300px'],
            position: new Vector2(0, 1080 - 300),
            style: 'overflow: hidden;',
        });
        this.reflection = new Div({
            size: ['180px', '180px'],
            background: {
                color: 'rgba(255, 255, 255, 0.36)',
            },
            anchor: new Vector2(90, 90),
            style: 'position: absolute; border-radius: 50%; filter: drop-shadow(0 0 300px rgb(255, 255, 255)) blur(200px) ; margin-top: -90px; margin-left: -90px; ',
        });
        this.reflectionWrap.append(this.reflection);
        this.managers.renderer.add(this.reflectionWrap, 'overlay', 50);

        this.overlay = this.managers.renderer.add(new Div({
            size: new Vector2(3000, 3000),
            position: new Vector2(-1080 / 2, -1920 / 2),
            background: {
                type: 'linear',
                colors: [
                    { color: 'rgba(255, 255, 255, 0.4)', position: '20%' },
                    { color: 'rgba(255, 255, 255, 0)', position: '80%' },
                ],
                direction: 'to right',
            },
            anchor: new Vector2(1500, 1500),
        }), 'overlay', 60);

    }
    setTime(time: number) {
        const p = new Vector2(0, -1000).rotate(time * 360 / 24).add(new Vector2(1920, 1080).divide(2)).add(new Vector2(0, 300));
        this.moon.transform.setPosition(p);
        const p2 = p.multiply(new Vector2(1, -1)).add(new Vector2(0, 700));
        let o = 1 - (p2.y - 300) / 600;
        this.reflection.transform.setPosition(p2);
        this.reflection.style(`opacity: ${o};`);

        this.overlay.element.transform.setRotation(time / 24 * 360 + 90);

        const opacity = timeEaser(time % 24, [
            [0, 0.7],
            [5, 1],
            [6, 0],
            [18, 0],
            [19, 1],
            [24, 0.7],
        ], 24);
        this.overlay.opacity = opacity;


    }
}