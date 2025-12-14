import { Div } from "../../util/html/div";
import { Vector2 } from "../../util/math/vector2";
import { MapLocation } from "../map/mapLocation";
import { Task, TaskType } from "./task";
import { TimePeriod } from "./time";
import { IdleTask } from "./prefabs";
import { Person, phase } from "../people/person";
import { Managers } from "../managers";
import { Travel } from "./travel";

export interface ScheduleType {
	tasks?: (TaskType | Task)[];
}

export class Schedule {
	public static readonly TASK_WIDTH = 30;
	public static readonly TASK_HEIGHT = 30;

	protected table: Record<TimePeriod, Task>;
	protected taskList: Task[] = [];
	protected travels: Travel[] = [];

	dom: Div;
	lineDom: Div;
	debug: Div;

	public constructor(protected managers: Managers, public person: Person, public data: ScheduleType = {}) {

		if (data.tasks) for (const task of data.tasks) {
			this.addTask(task);
		}
	}

	addTask(task: Task | TaskType): void {
		if (task instanceof Task) {
			this.taskList.push(task);
		} else {
			this.taskList.push(new Task(task));
		}
	}

	createIdleTask(start: TimePeriod, end: TimePeriod, location: MapLocation): Task {
		return new IdleTask({
			start,
			end,
			location,
		});
	}

	checkTasks() {
		const tempTable: Record<number, Task> = {};
		let lastLocation: MapLocation;
		let idleTask: Task;
		for (let i: TimePeriod = 0; (i as TimePeriod) < 24; (i as TimePeriod)++) {

			const tasks = this.taskList.filter(task => task.data.start <= i && task.data.end > i);

			if (tasks.length === 0) {
				if (!idleTask) {
					idleTask = this.createIdleTask(i, (i + 1) as TimePeriod, lastLocation);
				} else {
					idleTask.data.end = (i + 1) as TimePeriod;
				}
				tempTable[i] = idleTask;
			} else {
				if (idleTask) {
					idleTask = null;
				}
				tempTable[i] = tasks[0];
				lastLocation = tasks[0].data.location;
			}
		}

		this.table = tempTable as Record<TimePeriod, Task>;
	}

	checkTravels() {
		for (let i: TimePeriod = 0; i < 24; i++) {
			const from = this.table[i as TimePeriod];
			const to = this.table[(((i + 1) % 24) as TimePeriod)];
			console.log(from.data.location);
			console.log(to.data.location);
			const route = this.managers.routeManager.findRoute(
				from.data.location,
				to.data.location);
			const travel = route.createTravel(this.person, (i + 1) as TimePeriod);

			if (from.data.priority === to.data.priority) {
				travel.offset = 0.5;
			} else if (from.data.priority === 0) {
				travel.offset = 0;
			} else if (to.data.priority === 0) {
				travel.offset = 1;
			} else {
				travel.offset = 0.5 + (from.data.priority / 2) - (to.data.priority / 2);
			}

			travel.build();
			this.dom.append(travel.dom);
			this.travels.push(travel);
		}
	}

	build(): void {
		this.debug = new Div({});

		this.dom = new Div({
			position: new Vector2(100, 0),
			size: new Vector2(Schedule.TASK_WIDTH * 24, Schedule.TASK_HEIGHT),
			style: 'position: absolute;',
		});
		this.checkTasks();
		for (const task of Object.values(this.table)) {
			task.build();
			task.dom.transform.setPosition(new Vector2(task.data.start * Schedule.TASK_WIDTH, 0));
			this.dom.append(task.dom);
		}
		this.checkTravels();

		this.lineDom = new Div({
			position: new Vector2(0, 0),
			size: new Vector2(2, Schedule.TASK_HEIGHT),
			background: { color: 'black' },
		});
		this.dom.append(this.lineDom);


	}

	private getTaskAtTime(time: number): Task {
		return this.table[Math.floor(time % 24) as TimePeriod];
	}

	setTime(time: number): void {
		this.lineDom.transform.setPosition(new Vector2((time % 24) / 24 * (Schedule.TASK_WIDTH * 24), 0));
	}

	getInfoAtTime(time: number): { phase: phase, position: Vector2, task: Task | undefined } {

		for (const travel of this.travels) {
			const position = travel.getTimePostion(time % 24);
			if (position) {
				return { phase: 'travel', position, task: undefined };
			}
		}

		const task = this.getTaskAtTime(time % 24);
		return { phase: 'task', position: task?.data.location.data.position ?? new Vector2(0, 0), task: task };
	}
}