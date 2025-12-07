import { Transform } from 'stream';
import { Vector2 } from '../math/vector2';
import { Background, BackgroundOptions } from './css/background';
import { Size } from './css/size';
import { Transform2d } from '../math/transform';

export interface DomOptions {
    classNames?: string[];
    id?: string;
    style?: string;
    attributes?: { [key: string]: string };
    background?: BackgroundOptions;
    size?: Vector2 | [string, string];
    visible?: boolean;
    text?: string;
    html?: string;
    position?: Vector2;
    rotation?: number;
    scale?: Vector2;
    anchor?: Vector2;
}
export abstract class Dom{
    public abstract dom: HTMLElement | SVGElement;
    public children: Dom[] = [];
    protected _lastDisplay: string = 'block';

    protected _visible: boolean = true;
    transform: Transform2d;
    public get visible(): boolean {
        return this._visible;
    }
    public set visible(value: boolean) {
        this._visible = value;
        this.dom.style.display = value ? this._lastDisplay : 'none';
    }

    public constructor() {
    }

    protected build(options: DomOptions): void {
        this._visible = options.visible || true;
        if (options.classNames) {
            this.dom.classList.add(...options.classNames);
        }
        if (options.id) {
            this.dom.id = options.id;
        }
        if (options.style) {
            this.style(options.style);
        }
        if (options.background) {
            this.style(Background.getStyle(options.background));
        }
        if (options.size) {
            this.size(options.size);
        }
        if (options.attributes) {
            for (const [key, value] of Object.entries(options.attributes)) {
                this.dom.setAttribute(key, value);
            }
        }
        if (options.text) {
            this.dom.textContent = options.text;
        }
        if (options.html) {
            this.dom.innerHTML = options.html;
        }

        this.transform = new Transform2d(this)
            .setPosition(options.position || new Vector2(0, 0))
            .setRotation(options.rotation || 0)
            .setScale(options.scale || new Vector2(1, 1))
            .setAnchor(options.anchor || new Vector2(0, 0));
    }

    size(size: Vector2 | [string, string]) {
        if (typeof size === 'object') {
            this.dom.style.cssText += Size.getStyle(size);
        } else {
            this.dom.style.cssText += Size.getStyle([size[0], size[1]]);
        }
    }

    style(style: string) {
        this.dom.style.cssText += style;
        if (this.dom.style.display !== 'none') {
            this._lastDisplay = this.dom.style.display || 'block';
        }
    }
    background(background: BackgroundOptions) {
        this.dom.style.cssText += Background.getStyle(background);
    }

    tick() {
        for (const child of this.children) {
            child.tick();
        }
    }

    resize() {
        for (const child of this.children) {
            child.resize();
        }
    }

    append(child: Dom) {
        this.dom.appendChild(child.dom);
        this.children.push(child);
        return child;
    }

    removeChild(child: Dom) {
        this.dom.removeChild(child.dom);
        this.children = this.children.filter(c => c !== child);
    }
}
