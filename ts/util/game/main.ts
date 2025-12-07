
import { Container } from './container';
import { Div } from '../html/div';
import { Vector2 } from '../math/vector2';

export class Main extends Div {
    public constructor(container: Container) {
        super({
            classNames: ['main'],
            size: ['100%', '100%'],
        });

        window['$'] = {
            get size(): Vector2 {
                return new Vector2(window.innerWidth, window.innerHeight);
            },
            main: this,
            frame: 0,
            time: 0,
            get intervalMultiplier(): number {
                return container.ticker.currentFPS / 60;
            },
            transitions: container.transitions,
        };
    }
}
