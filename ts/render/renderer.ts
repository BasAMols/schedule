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
        parralax: number;
    }>;
    constructor(wrappers: Record<RendererWrappers, [number, number]>) {
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
                depth: depth[0],
                parralax: depth[1],
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
            if (depth !== undefined) {
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

    screenToWorld(v:Vector2) {

        // Get the renderer's position and size on screen (after CSS transform)
        const rect = this.dom.getBoundingClientRect();
        
        // The CSS transform applies: scale(viewportScale * zoom) then translate(offset)
        // So: screenPos = worldPos * totalScale + offset
        // To reverse: worldPos = (screenPos - offset) / totalScale
        
        const viewportScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        const totalScale = viewportScale * this.zoomData.value;
        
        // Calculate offset (same as in setPanZoom)
        const topLeftWorldX = this.zoomData.position.x * 1920 * (this.zoomData.value - 1) / this.zoomData.value;
        const topLeftWorldY = this.zoomData.position.y * 1080 * (this.zoomData.value - 1) / this.zoomData.value;
        const offset = new Vector2(-topLeftWorldX * viewportScale * this.zoomData.value, -topLeftWorldY * viewportScale * this.zoomData.value);
        
        // Convert screen coordinates to coordinates relative to the renderer element
        // rect.left and rect.top are the screen position of the renderer after transform
        const screenRelativeX = v.x - rect.left;
        const screenRelativeY = v.y - rect.top;
        
        // Reverse the transform: world = (screen - offset) / totalScale
        const worldX = (screenRelativeX - offset.x) / totalScale;
        const worldY = (screenRelativeY - offset.y) / totalScale;
        
        return new Vector2(worldX, worldY);
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

        // Clamp pan values to [0, 1]
        x = MathUtil.clamp(x, 0, 1);
        y = MathUtil.clamp(y, 0, 1);

        const viewportScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
        const scale = viewportScale * zoom;
        
        // At zoom level z, visible world size is (1920/z, 1080/z)
        // Pan (0,0) should show world (0,0) at top-left
        // Pan (1,1) should show world (1920,1080) at bottom-right
        // So top-left world position for pan (x,y) is: (x * 1920 * (z-1)/z, y * 1080 * (z-1)/z)
        // The offset needs to move the world so this position appears at screen (0,0)
        // After scaling by (viewportScale * zoom), we need to offset by: -topLeftWorldPos * viewportScale * zoom
        const topLeftWorldX = x * 1920 * (zoom - 1) / zoom;
        const topLeftWorldY = y * 1080 * (zoom - 1) / zoom;
        const offset = new Vector2(-topLeftWorldX * viewportScale * zoom, -topLeftWorldY * viewportScale * zoom);
        
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