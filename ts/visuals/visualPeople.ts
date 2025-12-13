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
                new SleepTask({ start: 0, end: 7, location: mapManager.getLocation("gun3") }),
                new EatTask({ start: 7, end: 10, location: mapManager.getLocation("deck2") }),
                new EngineTask({ start: 10, end: 19, location: mapManager.getLocation("wheel") }),
                new EatTask({ start: 19, end: 23, location: mapManager.getLocation("deck3") }),
                new SleepTask({ start: 23, end: 24, location: mapManager.getLocation("gun3") }),
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
        // {
        //     name: "Jane",
        //     tasks: [
        //         new SleepTask({ start: 0, end: 6, location: mapManager.getLocation("bedroom1") }),
        //         new ShowerTask({ start: 6, end: 7, location: mapManager.getLocation("bathroom1") }),
        //         new EatTask({ start: 7, end: 8, location: mapManager.getLocation("main") }),
        //         new EngineTask({ start: 8, end: 11, location: mapManager.getLocation("engine") }),
        //         new WorkTask({ start: 12, end: 16, location: mapManager.getLocation("work") }),
        //         new ShowerTask({ start: 16, end: 17, location: mapManager.getLocation("bathroom1") }),
        //         new EatTask({ start: 17, end: 19, location: mapManager.getLocation("main") }),
        //         new SleepTask({ start: 21, end: 24, location: mapManager.getLocation("bedroom1") }),
        //     ],
        //     character: new Character({
        //         skin: "Female_Skin2",
        //         layers: [
        //             "Female_Hair/Female_Hair4",
        //             "Female_Clothing/Corset",
        //             "Female_Clothing/Boots",
        //             "Female_Clothing/Skirt",
        //         ]
        //     }),
        //     offset: new Vector2(10, -15),
        // },
        // {
        //     name: "Andrew",
        //     tasks: [
        //         new EngineTask({ start: 0, end: 3, location: mapManager.getLocation("engine") }),
        //         new ShowerTask({ start: 4, end: 5, location: mapManager.getLocation("bathroom2") }),
        //         new EatTask({ start: 5, end: 7, location: mapManager.getLocation("main") }),
        //         new SleepTask({ start: 8, end: 16, location: mapManager.getLocation("bedroom2") }),
        //         new EatTask({ start: 16, end: 17, location: mapManager.getLocation("main") }),
        //         new WorkTask({ start: 17, end: 20, location: mapManager.getLocation("work") }),
        //         new ShowerTask({ start: 20, end: 21, location: mapManager.getLocation("bathroom2") }),
        //         new EngineTask({ start: 22, end: 24, location: mapManager.getLocation("engine") }),
        //     ],
        //     character: new Character({
        //         skin: "Male_Skin3",
        //         layers: [
        //             "Male_Hair/Male_Hair3",
        //             "Male_Clothing/Boots",
        //             "Male_Clothing/Green_Shirt_v2",
        //             "Male_Clothing/Pants",
        //         ]
        //     }),
        //     offset: new Vector2(-15, 10),
        // },
    ];
}