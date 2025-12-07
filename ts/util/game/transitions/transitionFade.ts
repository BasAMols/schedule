import { Div } from "../../html/div";
import { TransitionIn, TransitionOut, TransitionSettings } from "./transitionBase";

export interface TransitionInFadeSettings extends TransitionSettings {
    color?: string;
}
export class TransitionInFade extends TransitionIn<TransitionInFadeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`opacity: ${value};`);
    }
    public constructor() {
        super({ duration: 400, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionInFadeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}

export interface TransitionOutFadeSettings extends TransitionSettings {
    color?: string;
}
export class TransitionOutFade extends TransitionOut<TransitionInFadeSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`opacity: ${1-value};`);
    }
    public constructor() {
        super({ duration: 400, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionOutFadeSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}