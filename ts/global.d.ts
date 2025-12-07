import { Vector2 } from './util/math/vector2';
import { Main } from './util/game/main';
import { Transitions } from './util/game/transitions/transitionLibrary';

declare global {
  interface DollarGlobal {
    get size(): Vector2;
    readonly main: Main;
    frame: number;
    time: number;
    get intervalMultiplier(): number;
    transitions: Transitions;
  }

  var $: DollarGlobal;
}

export {};