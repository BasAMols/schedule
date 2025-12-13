import { MapManager } from "../logic/map/mapManager";
import { Character } from "./character";
import { EatTask, EngineTask, ShowerTask, SleepTask, WorkTask } from "./prefabs";
import { PersonVisualType } from "./visualPerson";
import { Vector2 } from "../util/math/vector2";

export function getVisualPeople(mapManager: MapManager): PersonVisualType[] {
    return [
        {
            name: "Dave",
            tasks: [
                new EngineTask({ start: 0, end: 8, location: mapManager.getLocation("wheel") }),
                new EatTask({ start: 8, end: 10, location: mapManager.getLocation("deck3") }),
                new SleepTask({ start: 10, end: 18, location: mapManager.getLocation("gun3") }),
                new WorkTask({ start: 18, end: 22, location: mapManager.getLocation("deck4") }),
            ],
            character: new Character({
                skin: "Male_Skin1",
                layers: [
                    "Male_Hair/Male_Hair1",
                    "Male_Clothing/Boots",
                    "Male_Clothing/Shirt",
                    "Male_Clothing/Pants",
                ]
            }),
            offset: new Vector2(0, 0),
        },
        {
            name: "Jane",
            tasks: [
                new SleepTask({ start: 0, end: 2, location: mapManager.getLocation("gun3") }),
                new WorkTask({ start: 2, end: 6, location: mapManager.getLocation("deck2") }),
                new EngineTask({ start: 8, end: 16, location: mapManager.getLocation("wheel") }),
                new EatTask({ start: 16, end: 18, location: mapManager.getLocation("deck3") }),
                new SleepTask({ start: 18, end: 24, location: mapManager.getLocation("gun3") }),

            ],
            character: new Character({
                skin: "Female_Skin2",
                layers: [
                    "Female_Hair/Female_Hair4",
                    "Female_Clothing/Corset",
                    "Female_Clothing/Boots",
                    "Female_Clothing/Skirt",
                ]
            }),
            offset: new Vector2(10, -15),
        },
        {
            name: "Andrew",
            tasks: [
                new EatTask({ start: 0, end: 1, location: mapManager.getLocation("deck3") }),
                new SleepTask({ start: 2, end: 10, location: mapManager.getLocation("gun3") }),
                new WorkTask({ start: 10, end: 14, location: mapManager.getLocation("deck2") }),
                new EngineTask({ start: 15, end: 22, location: mapManager.getLocation("wheel") }),
                new EatTask({ start: 23, end: 24, location: mapManager.getLocation("deck3") }),
            ],
            character: new Character({
                skin: "Male_Skin3",
                layers: [
                    "Male_Hair/Male_Hair3",
                    "Male_Clothing/Boots",
                    "Male_Clothing/Green_Shirt_v2",
                    "Male_Clothing/Pants",
                ]
            }),
            offset: new Vector2(-15, 10),
        },
    ];
}