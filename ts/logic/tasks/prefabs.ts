import { MapLocation } from "../map/mapLocation";
import { Task } from "./task";
import { TimePeriod } from "./time";


export class IdleTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
      super({ name: '', start, end, location, color: 'white', priority: 0 });
    }
  }
export class SleepTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Sleep', start, end, location, color: '#9f9f9f', priority: 0.1 });
    }
}
export class ShowerTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Wash', start, end, location, color: '#c7c7ff', priority: 1 });
    }
}
export class EatTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Food', start, end, location, color: '#b5d5d8', priority: 1 });
    }
}
export class EngineTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Office', start, end, location, color: '#e1e1e1' });
    }
}
export class WorkTask extends Task {
    public constructor({ start, end, location }: { start: TimePeriod; end: TimePeriod; location: MapLocation; }) {
        super({ name: 'Work', start, end, location, color: '#dcb1cd' });
    }
}
