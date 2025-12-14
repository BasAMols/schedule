import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";
import { MapLocation } from "../map/mapLocation";
import { Schedule } from "./schedule";
import { TimePeriod } from "./time";

export interface TaskType {
    name: string;
    location: MapLocation;
    start: TimePeriod;
    end: TimePeriod;
    color?: string;
    priority?: number;
    depth?: number;
}

export class Task {
    dom: Div;
    public constructor(public data: TaskType) {
        this.data.priority = this.data.priority ?? 0.5;
        if (!this.data.depth) {
            this.data.depth = this.data.location.data.depth;
        }
    }
    build(): void {
        this.dom = new Div({
            size: new Vector2(Schedule.TASK_WIDTH * (this.data.end - this.data.start), Schedule.TASK_HEIGHT),
            background: { color: this.data.color || 'white' },
            style: 'display: flex; align-items: center; justify-content: center; font-size: 10px; font-family: "Arial", sans-serif; padding: 12.5px 3px; border: 1px solid black; overflow: hidden; box-sizing: border-box; position: absolute;',
            text: this.data.name,
        })
    }

    getLocation(): Vector2 {
        return this.data.location.data.position;
    }
    getDepth(): number {
        return this.data.depth;
    }
}