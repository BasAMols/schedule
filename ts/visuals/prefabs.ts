import { MapLocation } from "../logic/map/mapLocation";
import { TimePeriod } from "../logic/tasks/time";
import { Vector2 } from "../util/math/vector2";
import { VisualTask } from "./visualTask";


export class IdleTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: '', start, end, location, color: 'white', priority: 0 ,
            animationDuration: 5,
            animationStart: 0,
            animationSpeed: 300,
         });
    }
}
export class SleepTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Sleep', start, end, location, color: '#9f9f9f', priority: 0.1, 
            animationDuration: 2,
            animationStart: 68,
            animationOffset: new Vector2(20, 0),
            animationSpeed: 1000,
         });
    }
}
export class ShowerTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Wash', start, end, location, color: '#c7c7ff', priority: 1,
            animationDuration: 5,
            animationStart: 0,
            animationSpeed: 200,
         });
        
    }
}
export class EatTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Food', start, end, location, color: '#b5d5d8', priority: 1 ,
            animationDuration: 5,
            animationStart: 0,
            animationSpeed: 200,
         });
    }
}
export class EngineTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Helm', start, end, location, color: '#e1e1e1', 
            animationDuration: 4,
            animationStart: 30,
            animationSpeed: 1000,
         });
    }
}
export class WorkTask extends VisualTask {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Work', start, end, location, color: '#dcb1cd' });
    }
}
