import { MathUtil } from '../math/math';
import { Vector2 } from '../math/vector2';
import { Div } from './div';
import { ElOptions } from './el';

export type SpriteOptions = {
    image: string;
    size: Vector2;
    columns: number;
    rows: number;
    value?: number;
} & Exclude<ElOptions, 'background' | 'size'>;

export class Sprite extends Div {
    max: number;
    options: SpriteOptions;

    public constructor(options: SpriteOptions) {
        super({
            size: options.size,
            background: {
                type: 'image',
                image: options.image,
                size: `${options.size.x*options.columns}px ${options.size.y*options.rows}px`,
                repeat: 'no-repeat',
            },
            style: `transform-origin: ${options.size.x*options.columns/2}px ${options.size.y*options.rows/2}px;`,
            ...options,
        });
        this.max = options.columns * options.rows;
        this.options = options;
        this.value = options.value || 0;
    }

    public getSize(): Vector2 {
        return new Vector2(this.options.size.x * this.options.columns, this.options.size.y * this.options.rows);
    }

    private _value: number;

    public set value(value: number) {
        this._value = Math.floor(value % this.max);
        let column = this._value % (this.options.columns);
        let row = Math.floor(this._value / (this.options.columns));
        this.style(`background-position-x: -${this.options.size.x*column}px; background-position-y: -${this.options.size.y*row}px;`);
    }

    public set factor(factor: number) {
        this.value = MathUtil.clamp(factor, 0, 1) * (this.max-1);
    }
}