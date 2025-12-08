import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations = {
    bedroom1: new Vector2(400 + 60, 250),
    bathroom1: new Vector2(400 + 60 + 60, 200),
    bedroom2: new Vector2(300, 300),
    bathroom2: new Vector2(300- 60, 350),
    hallway1: new Vector2(400, 300),
    main: new Vector2(500, 300),
    work: new Vector2(600, 300),
    engine: new Vector2(500- 60, 350),
}

export const mapConnections = [
    {
        from: "main",
        to: "work",
        path: PathCreator(
            mapLocations.main,
            { point: mapLocations.work, controlA: mapLocations.main.add(new Vector2(+60, -50)), controlB: mapLocations.work.add(new Vector2(+60, -50)) },
        ),
    },
    { from: "main", to: "engine" },
    { from: "main", to: "hallway1" },
    { from: "hallway1", to: "bedroom1" },
    { from: "hallway1", to: "bedroom2" },
    { from: "bedroom1", to: "bathroom1" },
    { from: "bedroom2", to: "bathroom2" },
]