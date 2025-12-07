import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";
import { Managers } from "../managers";
import { Schedule, ScheduleType } from "../tasks/schedule";
import { Task, TaskType } from "../tasks/task";

export interface PersonType {
    name: string;
    tasks?: (TaskType | Task)[];
    speed?: number;
}

export type phase = 'idle' | 'travel' | 'task';
export class Person {
    readonly name: string;
    public readonly schedule: Schedule;
    scheduleDom: Div;
    activeTask: import("c:/Users/basm/Documents/workspace/logic/ts/logic/tasks/task").Task;
    characterDom: Div;
    speed: number = 500; // pixels per hour
    private _phase: phase = 'idle';
    public get phase(): phase {
        return this._phase;
    }
    public set phase(value: phase) {
        this._phase = value;
        // this.characterDom.background({
        //     idle: 'blue',
        //     travel: 'yellow',
        //     task: 'green',
        // }[value]);
    }
    public constructor(private managers: Managers, public readonly data: PersonType) {
        this.name = data.name;
        this.schedule = new Schedule(this.managers, this, {
            tasks: data.tasks,
        });
        this.speed = data.speed || 500;
    }

    build(): void {
        this.schedule.build();
        this.scheduleDom = new Div({
            position: new Vector2(0, 0),
            size: new Vector2(Schedule.TASK_WIDTH * 24, Schedule.TASK_HEIGHT),
            style: 'box-sizing: border-box; position: absolute;',
        });

        this.scheduleDom.append(new Div({
            position: new Vector2(0, 0),
            size: new Vector2(100, Schedule.TASK_HEIGHT),
            text: this.name,
            style: 'display: flex; align-items: center; justify-content: center; font-size: 15px; font-family: "Arial", sans-serif; box-sizing: border-box; position: absolute; ',
        }));
        this.scheduleDom.append(this.schedule.dom);

        this.characterDom = new Div({
            position: new Vector2(0, 0),
            size: new Vector2(20, 20),
            // background: { color: 'white' },
            style: 'box-sizing: border-box; position: absolute; border-radius: 50%; margin-left: -10px; margin-top: -10px; border: 2px solid black; box-sizing: border-box;',
        });

        this.characterDom.append(new Div({
            text: this.name,
            position: new Vector2(20, -1),
            style: 'font-size: 14px; font-family: "Arial", sans-serif; padding: 2px 4px; border-radius: 4px; background: white;',
        }));

    }

    setTime(time: number): void {
        const info = this.schedule.getInfoAtTime(time);
        this.phase = info.phase;
        this.activeTask = info.task;
        this.characterDom.transform.setPosition(info.position);
        this.schedule.setTime(time);
    }

}