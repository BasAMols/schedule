import { Div } from '../html/div';
import { Ticker } from './ticker';
import { Transitions } from './transitions/transitionLibrary';

export class Container extends Div{
    ticker: Ticker;
    transitions: Transitions;
   
    public constructor() {
        super({
            classNames: ['container'],
            style: 'width: 100%; height: 100%; overflow: hidden;',
        });

        this.ticker = new Ticker();
        this.ticker.addCallback(this.tick.bind(this));

        this.append(this.transitions = new Transitions());

        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        super.resize();
    }

    tick() {
        $.frame++;
        $.time = this.ticker.elapsedTime;
        super.tick();
    }

    start() {
        this.ticker.start();
        this.resize();
    }
 
}


