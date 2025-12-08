import { Managers } from "../logic/managers";
import { MapLocation } from "../logic/map/mapLocation";
import { phase } from "../logic/people/person";
import { Schedule } from "../logic/tasks/schedule";
import { TaskType, Task } from "../logic/tasks/task";
import { TimePeriod } from "../logic/tasks/time";
import { Div } from "../util/html/div";
import { Vector2 } from "../util/math/vector2";
import { IdleTask } from "./prefabs";
import { PersonVisual } from "./visualPerson";
import { VisualTask, VisualTaskType } from "./visualTask";

export interface ScheduleType {
	tasks?: (TaskType | Task)[];
}

export class VisualSchedule extends Schedule {

	protected table: Record<TimePeriod, VisualTask>;
	protected taskList: VisualTask[];
	public person: PersonVisual;

	public constructor(managers: Managers, person: PersonVisual, data: ScheduleType = {}) {
		super(managers, person, data);
	}

	addTask(task: VisualTask | VisualTaskType): void {
		if (task instanceof VisualTask) {
			this.taskList.push(task);
		} else {
			this.taskList.push(new VisualTask(task));
		}
	}

	createIdleTask(start: TimePeriod, end: TimePeriod, location: MapLocation): VisualTask {
		return new IdleTask({
			start,
			end,
			location,
		});
	}
}