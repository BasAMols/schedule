import { Dom, DomOptions } from './dom';

export interface ElOptions extends DomOptions {

}
export class El<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> extends Dom {
    public dom: HTMLElementTagNameMap[T];

    public constructor(type: T, options: ElOptions) {
        super();
        this.dom = document.createElement(type);
        this.build(options);
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
