import { Div } from "../util/html/div";
import { Sprite } from "../util/html/sprite";
import { Vector2 } from "../util/math/vector2";

export interface CharacterType {
    skin: string;
    layers: string[]
}

export class Character extends Div {
    private layers: Sprite[] = [];
    public constructor(public data: CharacterType) {
        super({
            scale: new Vector2(0.75, 0.75),
        });
        const skin = new Sprite({
            image: `dist/images/Character_skin_colors/${data.skin}.png`,
            size: new Vector2(100, 64),
            columns: 10,
            rows: 7,
            value: 0,
            position: new Vector2(15, 19),
        });
        this.layers.push(skin);
        this.append(skin);
        this.data.layers.forEach(d => {
            const layer = new Sprite({
                image: `dist/images/${d}.png`,
                size: new Vector2(100, 64),
                columns: 10,
                rows: 7,
                value: 0,
                position: new Vector2(15, 19),
            });
            this.layers.push(layer);
            this.append(layer);
        });
    }
    public set value(value: number) {
        this.layers?.forEach(layer => {
            layer.value = value;
        });
    }
    public get value(): number {
        return this.layers[0].value;
    }
}