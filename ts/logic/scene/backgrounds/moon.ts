import { Div } from "../../../util/html/div";
import { Dom } from "../../../util/html/dom";
import { Vector2 } from "../../../util/math/vector2";
import { Managers } from "../../managers";

export class Moon extends Div {
    moon: Dom;
    reflection: Div;
    reflectionWrap: Div;
    constructor(protected managers: Managers) {
        super({
            size: ['1920px', '800px'],
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
            size: ['1920px', '300px'],
            position: new Vector2(0, 1080-300),
            style: 'overflow: hidden;',
        });
        this.reflection = new Div({
            size: ['180px', '180px'],
            background: {
                color: 'rgba(255, 255, 255, 0.36)',
            },
            anchor: new Vector2(90, 90),
            style: 'position: absolute; border-radius: 50%; filter: drop-shadow(0 0 50px rgb(255, 255, 255)) blur(100px) ; margin-top: -90px; margin-left: -90px; ' ,
        });
        this.reflectionWrap.append(this.reflection);
        this.managers.renderer.add(this.reflectionWrap, 'overlay', 50);
    }
    setTime(time: number) {
        const p = new Vector2(0, -1000).rotate(time * 360 / 24).add(new Vector2(1920, 1080).divide(2)).add(new Vector2(0, 300));
        this.moon.transform.setPosition(p);
        const p2 = p.multiply(new Vector2(1, -1)).add(new Vector2(0, 700));
        let o = 1- (p2.y - 300) / 400;
        this.reflection.transform.setPosition(p2);
        this.reflection.style(`opacity: ${o};`);
    }
}