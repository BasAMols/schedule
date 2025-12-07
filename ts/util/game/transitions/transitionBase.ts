import { Div } from "../../html/div";
import { Main } from "../main";

export interface TransitionSettings {
    duration?: number;
}

export abstract class TransitionIn<T extends TransitionSettings = TransitionSettings> extends Div {
    
    private _active: boolean;
    private startTime: number;
    duration: number;
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
        this.visible = value;
    }
    public data: {
        from: Div;
        to: Div;
        via: TransitionOut;
        settings?: T;
        settingsOut?: TransitionSettings;
    }
    public constructor(protected defaultSettings: Required<T>) {
        super({
            classNames: ['transition-in'],
            size: ['100%', '100%'], 
        });
        this.active = false;
    }
    public abstract set progress(value: number) 
    trigger(from?: Div, to?: Div, via?: TransitionOut, settings?: T, settingsOut?: typeof via['data']['settings']) {
        this.startTime = $.time;
        this.data = {
            from,
            to,
            via,
            settings,
            settingsOut,
        };
        this.applySettings(settings);
        this.active = true;
    }
    applySettings(settings?: T) {
        this.duration = settings?.duration || this.defaultSettings.duration;
    }
    tick() {
        if (this.active) {
            const p = ($.time - this.startTime) / this.duration;
            this.progress = Math.min(p, 1);
            if (p >= 1) {
                this.active = false;
                this.progress = 0;
                if (this.data.from) {
                    this.data.from.visible = false;
                }
      
                if (this.data.via){
                    this.data.via.trigger(this.data.to, this.data.settingsOut);
                }
            }
        }
    }
}


export abstract class TransitionOut<T extends TransitionSettings = TransitionSettings> extends Div {
    private _active: boolean;
    private startTime: number;
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
        this.visible = value;
    }

    public data: {
        to: Div;
        settings: T;
    };

    public duration: number;

    public constructor(protected defaultSettings: Required<T>) {
        super({
            classNames: ['transition-out'],
            size: ['100%', '100%'],
        });
        this.active = false;
    }

    public abstract set progress(value: number) 
    trigger(to?: Div, settings?: T) {
        this.startTime = $.time;
        this.data = {
            to,
            settings,
        };

        this.applySettings(settings);

        this.active = true;
        if (to) {
            to.visible = true;
        }
    }
    applySettings(settings?: T) {
        this.duration = settings?.duration || this.defaultSettings.duration;
    }
    tick() {
        if (this.active) {
            const p = ($.time - this.startTime) / this.duration;
            this.progress = Math.min(p, 1);
            if (p >= 1) {
                this.active = false;
                this.progress = 0;
            }
        }
    }
}