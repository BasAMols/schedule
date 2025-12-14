import { RenderLayer } from "../../render/renderLayer";
import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";
import { Character } from "../../visuals/character";
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
    public readonly schedule: Schedule;
    scheduleDom: Div;
    activeTask: Task;
    characterDom: Div;
    speed: number = 1000; // pixels per hour
    protected _phase: phase = 'idle';
    renderLayer: RenderLayer;
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
    public constructor(private managers: Managers<Person>, public readonly data: PersonType, scheduleClass: new (managers: Managers<Person>, person: Person, data: ScheduleType) => Schedule) {
        this.schedule = new scheduleClass(this.managers, this, {
            tasks: data.tasks,
        });
        this.speed = data.speed || 1000;
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
            text: this.data.name,
            style: 'display: flex; align-items: center; justify-content: center; font-size: 15px; font-family: "Arial", sans-serif; box-sizing: border-box; position: absolute; ',
        }));
        this.scheduleDom.append(this.schedule.dom);

        this.characterDom = new Div({
            position: new Vector2(0, 0),
            // background: { color: 'white' },
            // style: 'box-sizing: border-box; position: absolute; border-radius: 50%; margin-left: -10px; margin-top: -10px; border: 2px solid black; box-sizing: border-box;',
        });
        this.renderLayer = this.managers.renderer.add(this.characterDom, 'ship', 35);

        // this.characterDom.append(new Div({
        //     text: this.name,
        //     position: new Vector2(20, -1),
        //     style: 'font-size: 14px; font-family: "Arial", sans-serif; padding: 2px 4px; border-radius: 4px; background: white;',
        // }));

    }

    direction: Vector2;

    setTime(time: number): void {
        const info = this.schedule.getInfoAtTime(time);
        this.phase = info.phase;
        this.activeTask = info.task;
        const lastPosition = this.characterDom.transform.position;
        if (lastPosition.subtract(info.position).magnitude() > 0) {
            this.direction = info.position.subtract(lastPosition).normalise();
        } else {
            this.direction = undefined;
        }
        this.characterDom.transform.setPosition(info.position);
        this.renderLayer.depth = info.depth;
        this.schedule.setTime(time);
        this.tick();
    }

    tick(): void {

    }

}