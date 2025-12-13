import { Div } from "../util/html/div";
import { Dom } from "../util/html/dom";
import { El } from "../util/html/el";
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
            classNames: ['renderer'],
            style: 'overflow: hidden;width: 1920px; height: 1080px;',
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
    }
    getWrapper(wrapperName: RendererWrappers) {
        return this.wrappers[wrapperName].div;
    }

    resize() {
        super.resize();
        const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        this.transform.setScale(scale);
    }
}