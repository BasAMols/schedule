import { MapManager } from "../map/mapManager";
import { EatTask, EngineTask, ShowerTask, SleepTask, WorkTask } from "../tasks/prefabs";
import { Person, PersonType } from "./person";

export function getPeople(mapManager: MapManager): PersonType[] {
    return [
        {
            name: "Dave",
            tasks: [
                new SleepTask({ start: 0, end: 7, location: mapManager.getLocation("bedroom1") }),
                new ShowerTask({ start: 7, end: 8, location: mapManager.getLocation("bathroom1") }),
                new EatTask({ start: 8, end: 9, location: mapManager.getLocation("main") }),
                new WorkTask({ start: 9, end: 12, location: mapManager.getLocation("work") }),
                new EngineTask({ start: 13, end: 17, location: mapManager.getLocation("engine") }),
                new ShowerTask({ start: 17, end: 18, location: mapManager.getLocation("bathroom1") }),
                new EatTask({ start: 18, end: 20, location: mapManager.getLocation("main") }),
                new SleepTask({ start: 23, end: 24, location: mapManager.getLocation("bedroom1") }),
            ],
        },
        {
            name: "Jane",
            tasks: [
                new SleepTask({ start: 0, end: 6, location: mapManager.getLocation("bedroom1") }),
                new ShowerTask({ start: 6, end: 7, location: mapManager.getLocation("bathroom1") }),
                new EatTask({ start: 7, end: 8, location: mapManager.getLocation("main") }),
                new EngineTask({ start: 8, end: 11, location: mapManager.getLocation("engine") }),
                new WorkTask({ start: 12, end: 16, location: mapManager.getLocation("work") }),
                new ShowerTask({ start: 16, end: 17, location: mapManager.getLocation("bathroom1") }),
                new EatTask({ start: 17, end: 19, location: mapManager.getLocation("main") }),
                new SleepTask({ start: 21, end: 24, location: mapManager.getLocation("bedroom1") }),
            ],
        },
        {
            name: "Andrew",
            tasks: [
                new EngineTask({ start: 0, end: 3, location: mapManager.getLocation("engine") }),
                new ShowerTask({ start: 4, end: 5, location: mapManager.getLocation("bathroom2") }),
                new EatTask({ start: 5, end: 7, location: mapManager.getLocation("main") }),
                new SleepTask({ start: 8, end: 16, location: mapManager.getLocation("bedroom2") }),
                new EatTask({ start: 16, end: 17, location: mapManager.getLocation("main") }),
                new WorkTask({ start: 17, end: 20, location: mapManager.getLocation("work") }),
                new ShowerTask({ start: 20, end: 21, location: mapManager.getLocation("bathroom2") }),
                new EngineTask({ start: 22, end: 24, location: mapManager.getLocation("engine") }),
            ],
        },
    ];
}