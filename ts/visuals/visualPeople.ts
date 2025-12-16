import { MapManager } from "../logic/map/mapManager";
import { Character } from "./character";
import { EatTask, EngineTask, ShowerTask, SleepTask, WorkTask } from "./prefabs";
import { PersonVisualType} from "./visualPerson";
import { Vector2 } from "../util/math/vector2";

export function getVisualPeople(mapManager: MapManager): PersonVisualType[] {
    return [
        {
            name: "Dave",
            tasks: [
                new EatTask({ start: 0, end: 1, location: mapManager.getLocation("mainDeck00") }),
                new EngineTask({ start: 2, end: 10, location: mapManager.getLocation("bridgeDeck02") }),
                new ShowerTask({ start: 10, end: 11, location: mapManager.getLocation("bridgeDeckCabin00") }),
                new SleepTask({ start: 15, end: 23, location: mapManager.getLocation("orlopDeck04") }),
                new EatTask({ start: 23, end: 24, location: mapManager.getLocation("gunDeck04") }),
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
                new SleepTask({ start: 0, end: 7, location: mapManager.getLocation("orlopDeck07") }),
                new EngineTask({ start: 10, end: 18, location: mapManager.getLocation("bridgeDeck02") }),
                new ShowerTask({ start: 18, end: 19, location: mapManager.getLocation("bridgeDeckCabin00") }),
                new EatTask({ start: 19, end: 21, location: mapManager.getLocation("gunDeck04") }),
                new SleepTask({ start: 23, end: 24, location: mapManager.getLocation("orlopDeck07") }),

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
            offset: new Vector2(0,0),
        },
        {
            name: "Andrew",
            tasks: [
                new EngineTask({ start: 0, end: 2, location: mapManager.getLocation("bridgeDeck02") }),
                new SleepTask({ start: 2, end: 10, location: mapManager.getLocation("orlopDeck10") }),
                new ShowerTask({ start: 10, end: 11, location: mapManager.getLocation("bridgeDeckCabin00") }),
                new EatTask({ start: 12, end: 14, location: mapManager.getLocation("gunDeck03") }),
                new EngineTask({ start: 18, end: 24, location: mapManager.getLocation("bridgeDeck02") }),

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
            offset: new Vector2(0,0),
        },
        {
            name: "Tim",
            tasks: [
                new SleepTask({ start: 0, end: 6, location: mapManager.getLocation("orlopDeck15") }),
                new EatTask({ start: 7, end: 9, location: mapManager.getLocation("gunDeck02") }),
                new WorkTask({ start: 9, end: 10, location: mapManager.getLocation("mainDeck00") }),
                new WorkTask({ start: 10, end: 11, location: mapManager.getLocation("mainDeck02") }),
                new WorkTask({ start: 11, end: 12, location: mapManager.getLocation("mainDeck04") }),
                new WorkTask({ start: 12, end: 13, location: mapManager.getLocation("mainDeck06") }),
                new WorkTask({ start: 14, end: 15, location: mapManager.getLocation("mainDeck08") }),
                new WorkTask({ start: 15, end: 16, location: mapManager.getLocation("gunDeck14") }),
                new WorkTask({ start: 16, end: 17, location: mapManager.getLocation("gunDeck12") }),
                new WorkTask({ start: 17, end: 18, location: mapManager.getLocation("gunDeck10") }),
                new ShowerTask({ start: 21, end: 22, location: mapManager.getLocation("bridgeDeckCabin00") }),
                new SleepTask({ start: 22, end: 24, location: mapManager.getLocation("orlopDeck15") }),


            ],
            character: new Character({
                skin: "Male_Skin4",
                layers: [
                    "Male_Clothing/Boots",
                    "Male_Clothing/Pants",
                ]
            }),
            offset: new Vector2(0,0),
        },
    ];
}