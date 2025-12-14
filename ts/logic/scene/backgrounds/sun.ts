import { RenderLayer } from "../../../render/renderLayer";
import { Div } from "../../../util/html/div";
import { timeEaser } from "../../../util/math/timeEaser";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";

export class Sun extends Div {
    sun: Div;
    reflectionWrap: Div;
    reflection: Div;
    overlay: RenderLayer;
    constructor(protected managers: Managers) {
        super({
            size: ['3000px', '800px'],
            style: 'overflow: hidden;',
        });
        this.sun = new Div({
            size: ['200px', '200px'],
            background: {
                color: 'rgba(244, 244, 73, 0.3)',
            },
            anchor: new Vector2(100, 100),
            style: 'position: absolute; border-radius: 50%; filter: drop-shadow(0 0 100px rgba(244, 244, 73, 1)) blur(10px); margin-top: -100px; margin-left: -100px; ',
        });
        this.managers.renderer.add(this, 'bg', 30);
        this.append(this.sun);


        this.reflectionWrap = new Div({
            size: ['3000px', '300px'],
            position: new Vector2(0, 1080 - 300),
            style: 'overflow: hidden;',
        });
        this.reflection = new Div({
            size: ['500px', '500px'],
            background: {
                color: 'rgba(244, 244, 73, 0.36)',
            },
            anchor: new Vector2(90, 90),
            style: 'position: absolute; border-radius: 50%; filter: blur(300px) ; margin-top: -250px; margin-left: -250px; ',
        });
        this.reflectionWrap.append(this.reflection);
        this.managers.renderer.add(this.reflectionWrap, 'overlay', 50);

        this.overlay = this.managers.renderer.add(new Div({
            size: new Vector2(3000, 3000),
            position: new Vector2(-1080 / 2, -1920 / 2),
            background: {
                type: 'linear',
                colors: [
                    { color: 'rgba(246, 234, 68, 0.2)', position: '0%' },
                    { color: 'rgba(245, 239, 64, 0)', position: '100%' },
                ],
                direction: 'to right',
            },
            anchor: new Vector2(1500, 1500),
        }), 'overlay', 59);
    }
    setTime(time: number) {

        const p = new Vector2(0, 1000).rotate(time * 360 / 24).add(new Vector2(1920, 1080).divide(2)).add(new Vector2(0, 300));
        this.sun.transform.setPosition(p);
        const p2 = p.multiply(new Vector2(1, -1)).add(new Vector2(0, 700));
        let o = 1 - (p2.y - 100) / 400;
        this.reflection.transform.setPosition(p2);
        this.reflection.style(`opacity: ${o};`);

        this.overlay.element.transform.setRotation(time / 24 * 360 - 90);

        const opacity = timeEaser(time % 24, [
            [6, 0],
            [7, 1],
            [12.5, 0.3],
            [17, 1],
            [18, 0],
        ], 24);
        this.overlay.opacity = opacity;

    }
}