import { Vector2 } from '../math/vector2';
import { Dom, DomOptions } from './dom';

export interface SvgOptions extends DomOptions {
    points?: string;
    d?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeMiterlimit?: number;
    strokeDasharray?: string;
    strokeDashoffset?: number;
    strokeOpacity?: number;
    cx?: number;
    cy?: number;
    r?: number;
    x?: number;
    y?: number;
}
export class Svg extends Dom {
    getPointAtLength(length: number): Vector2 {
        const point = (this.dom as SVGPathElement).getPointAtLength(length);
        return new Vector2(point.x, point.y);
    }
    public dom: SVGElement;
    public children: Svg[] = [];

    public constructor(type: keyof SVGElementTagNameMap, options: SvgOptions) {
        super();
        this.dom = document.createElementNS('http://www.w3.org/2000/svg', type);
        this.build(options);
    }
    build(options: SvgOptions): void {
        super.build(options);
        if (options.points) {
            this.dom.setAttribute('points', options.points);
        }
        if (options.d) {
            this.dom.setAttribute('d', options.d);
        }
        if (options.fill) {
            this.dom.setAttribute('fill', options.fill);
        }
        if (options.stroke) {
            this.dom.setAttribute('stroke', options.stroke);
        }
        if (options.strokeWidth) {
            this.dom.setAttribute('stroke-width', options.strokeWidth.toString());
        }
        if (options.strokeLinecap) {
            this.dom.setAttribute('stroke-linecap', options.strokeLinecap);
        }
        if (options.strokeLinejoin) {
            this.dom.setAttribute('stroke-linejoin', options.strokeLinejoin);
        }
        if (options.strokeMiterlimit) {
            this.dom.setAttribute('stroke-miterlimit', options.strokeMiterlimit.toString());
        }
        if (options.strokeDasharray) {
            this.dom.setAttribute('stroke-dasharray', options.strokeDasharray);
        }
        if (options.strokeDashoffset) {
            this.dom.setAttribute('stroke-dashoffset', options.strokeDashoffset.toString());
        }
        if (options.strokeOpacity) {
            this.dom.setAttribute('stroke-opacity', options.strokeOpacity.toString());
        }
        if (options.cx) {
            this.dom.setAttribute('cx', options.cx.toString());
        }
        if (options.cy) {
            this.dom.setAttribute('cy', options.cy.toString());
        }
        if (options.r) {
            this.dom.setAttribute('r', options.r.toString());
        }
        if (options.x) {
            this.dom.setAttribute('x', options.x.toString());
        }
        if (options.y) {
            this.dom.setAttribute('y', options.y.toString());
        }
    }

    append(child: Svg) {
        this.dom.appendChild(child.dom);
        this.children.push(child);
        return child;
    }

    removeChild(child: Svg) {
        this.dom.removeChild(child.dom);
        this.children = this.children.filter(c => c !== child);
    }
}
