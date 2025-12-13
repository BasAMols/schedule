import { Div } from "../util/html/div";
import { Dom } from "../util/html/dom";
import { El } from "../util/html/el";

export class RenderLayer extends Div {
    private _depth: number;
    public get depth(): number {
        return this._depth;
    }
    public set depth(value: number) {
        this._depth = value;
        this.style(`z-index: ${this._depth};`);
    }
    private _opacity: number = 1;
    public get opacity(): number {
        return this._opacity;
    }
    public set opacity(value: number) {
        if (value !== this._opacity) {
            this._opacity = value;
            this.style(`opacity: ${value}`);
        }
    }
    constructor(public element: Dom, depth: number, options: {
        transition?: number;
    } = {}) {
        super();
        this.append(element);
        this.opacity = 1;
        this.depth = depth;
        this.setOptions(options);
    }

    setOptions(options: {
        transition?: number;
    }) {
        if (options.transition) {
            this.style(`transition: opacity ${options.transition}s ease-in-out;`);
        }
    }
}