import { Schedule } from "../logic/tasks/schedule";
import { Task, TaskType } from "../logic/tasks/task";
import { Div } from "../util/html/div";
import { Vector2 } from "../util/math/vector2";

export interface VisualTaskType extends TaskType {
    animationStart?: number;
    animationDuration?: number;
    animationOffset?: Vector2;
    animationSpeed?: number;
}

export class VisualTask extends Task {
    public constructor(public data: VisualTaskType) {
        super(data);
        this.data.animationStart = this.data.animationStart ?? 50;
        this.data.animationDuration = this.data.animationDuration ?? 6;
        this.data.animationOffset = this.data.animationOffset ?? new Vector2(0, 0);
        this.data.animationSpeed = this.data.animationSpeed ?? 200;
    }
}