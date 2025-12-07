import { Div } from "../../html/div";
import { TransitionIn, TransitionOut, TransitionSettings } from "./transitionBase";

export interface TransitionInInstantSettings extends TransitionSettings {
    color?: string;
}
export class TransitionInInstant extends TransitionIn<TransitionInInstantSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`opacity: ${value>=1 ? 0 : 1};`);
    }
    public constructor() {
        super({ duration: 0, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionInInstantSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}

export interface TransitionOutInstantSettings extends TransitionSettings {
    color?: string;
}
export class TransitionOutInstant extends TransitionOut<TransitionInInstantSettings> {
    private cover: Div;
    public set progress(value: number) {
        this.cover.style(`opacity: ${value>=1 ? 0 : 1};`);
    }
    public constructor() {
        super({ duration: 0, color: 'black' });
        this.cover = new Div({
            size: ['100%', '100%'],
            background: this.defaultSettings.color,
        });
        this.append(this.cover);
    }
    applySettings(settings?: TransitionOutInstantSettings) {
        super.applySettings(settings);
        this.cover.style(`background: ${settings?.color || this.defaultSettings.color};`);
    }
}