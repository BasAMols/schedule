import { Div } from "../../html/div";
import { TransitionIn, TransitionOut, TransitionSettings } from "./transitionBase";
import { TransitionInFade, TransitionOutFade } from "./transitionFade";
import { TransitionInInstant, TransitionOutInstant } from "./transitionInstant";
import { TransitionInWipeLeft, TransitionInWipeRight, TransitionOutWipeLeft, TransitionOutWipeRight } from "./transitionWipe";

export class Transitions extends Div {
    public readonly IN = {
        FADE: new TransitionInFade(),
        WIPELEFT: new TransitionInWipeLeft(),
        WIPERIGHT: new TransitionInWipeRight(),
        INSTANT: new TransitionInInstant(),
    };
    public readonly OUT = {
        FADE: new TransitionOutFade(),
        WIPELEFT: new TransitionOutWipeLeft(),
        WIPERIGHT: new TransitionOutWipeRight(),
        INSTANT: new TransitionOutInstant(),
    };

    public constructor() {
        super({
            classNames: ['transitions'],
            size: ['100%', '100%'],
            style: ' z-index: 100; pointer-events: none;',
        });
        [...Object.values(this.IN), ...Object.values(this.OUT)].forEach(transition => {
            this.append(transition);
            transition.active = false;
            transition.progress = 0;

        });
    }

    trigger<T1 extends TransitionIn, T2 extends TransitionOut>({
        from,
        to,
        inTransition,
        inSettings,
        outTransition,
        outSettings
    }: {
        from?: Div;
        to?: Div;
        inTransition: T1;
        inSettings?: (typeof inTransition)['data']['settings'];
        outTransition: T2;
        outSettings?: (typeof outTransition)['data']['settings'];
    }) {
        inTransition.trigger(from, to, outTransition, inSettings, outSettings);
    }
}