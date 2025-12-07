import { El, ElOptions } from './el';

export class Div extends El<'div'> {
    public constructor(options: ElOptions = {}) {
        super('div', options);
    }
}