import { Div } from "../util/html/div";
import { Dom } from "../util/html/dom";
import { El } from "../util/html/el";
import { MathUtil } from "../util/math/math";
import { Utils } from "../util/math/util";
import { Vector2 } from "../util/math/vector2";
import { RenderLayer } from "./renderLayer";

export type RendererWrappers = 'bg' | 'world' | 'shipBG' | 'ship' | 'overlay' | 'ui';
export class Renderer extends Div {
    private wrappers: Record<RendererWrappers, {
        div: Div;
        depth: number;
    }>;
    constructor(wrappers: Record<RendererWrappers, number>) {
        super({
            size: new Vector2(1920, 1080),
            classNames: ['renderer'],
            style: 'transition: transform 0.05s ease-in-out;',
        });
        this.wrappers = {} as typeof this.wrappers;
        Object.entries(wrappers).forEach(([name, depth]) => {
            const div = new Div({
                classNames: [name],
                style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
            });
            this.wrappers[name as RendererWrappers] = {
                div: div,
                depth: depth,
            };
            div.style(`z-index: ${depth};`);
            this.append(this.wrappers[name as RendererWrappers].div);
        });
    }
    add(element: RenderLayer | Dom, wrapperName: RendererWrappers, depth?: number, options?: {
        transition?: number;
    }) {
        let layer: RenderLayer;
        if (element instanceof RenderLayer) {
            layer = element;
            if (depth) {
                layer.depth = depth;
            }
            if (options) {
                layer.setOptions(options);
            }
        } else {
            layer = new RenderLayer(element, depth ?? 0, options);
        }
        this.wrappers[wrapperName].div.append(layer);
        return layer;
    }
    getWrapper(wrapperName: RendererWrappers) {
        return this.wrappers[wrapperName].div;
    }

    resize() {
        super.resize();
        this.setPanZoom(undefined, undefined, undefined, true);
    }

    private zoomData: {
        value: number;
        position: Vector2;
    } = {
        value: 1,
        position: new Vector2(0.5, 0.5),
    };

    setPanZoom(x: number = this.zoomData.position.x, y: number = this.zoomData.position.y, zoom: number = this.zoomData.value, force: boolean = false) {

        if (!force && x === this.zoomData.position.x && y === this.zoomData.position.y && zoom === this.zoomData.value) {
            return;
        }

        const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)*zoom;
        const offset = new Vector2(1920*(zoom-1), 1080*(zoom-1)).multiply(new Vector2(x, y).multiply(-1));
        this.transform.setScale(scale);
        this.transform.setPosition(offset);

        this.zoomData.value = zoom;
        this.zoomData.position = new Vector2(x, y);
    }

    pan(x: number = 0, y: number = 0) {
        if (x === 0 && y === 0) {
            return;
        }
        this.setPanZoom(this.zoomData.position.x + x, this.zoomData.position.y + y);
    }
    zoom(v: number) {
        this.setPanZoom(undefined, undefined, MathUtil.clamp(this.zoomData.value + v, 1, 5));
    }
}