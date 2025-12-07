import { Div } from "../../html/div";
import { Ease } from "../../math/ease";
import { TransitionIn, TransitionOut, TransitionSettings } from "./transitionBase";

export interface TransitionInWipeSettings extends TransitionSettings {
    color?: string;
}
export class TransitionInWipeLeft extends TransitionIn<TransitionInWipeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`transform: translateX(${(1-Ease.easeIn(value))*100}%);`);
    }
    public constructor() {
        super({ duration: 800, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionInWipeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}
export interface TransitionOutWipeSettings extends TransitionSettings {
    color?: string;
}
export class TransitionOutWipeLeft extends TransitionOut<TransitionOutWipeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`transform: translateX(${(Ease.easeOut(value))*-100}%);`);
    }
    public constructor() {
        super({ duration: 800, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: 'black',
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionOutWipeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}

export class TransitionInWipeRight extends TransitionIn<TransitionInWipeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`transform: translateX(${(1-Ease.easeIn(value))*-100}%);`);
    }
    public constructor() {
        super({ duration: 800, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionInWipeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}

export class TransitionOutWipeRight extends TransitionOut<TransitionOutWipeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`transform: translateX(${Ease.easeOut(value)*100}%);`);
    }
    public constructor() {
        super({ duration: 800, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: 'black',
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionOutWipeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || 'black'};`);
    }
}