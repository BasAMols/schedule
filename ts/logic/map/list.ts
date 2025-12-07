import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations = {
    bedroom1: new Vector2(400, 400),
    bathroom1: new Vector2(440, 360),
    bedroom2: new Vector2(300, 500),
    bathroom2: new Vector2(300, 550),
    hallway1: new Vector2(400, 500),
    main: new Vector2(500, 500),
    work: new Vector2(600, 500),
    engine: new Vector2(500, 600),
}

export const mapConnections = [
    {
        from: "main",
        to: "work",
        path: PathCreator(
            mapLocations.main,
            { point: mapLocations.work, controlA: mapLocations.main.add(new Vector2(0, -70)), controlB: mapLocations.work.add(new Vector2(0, -70)) },
        ),
    },
    { from: "main", to: "engine" },
    { from: "main", to: "hallway1" },
    { from: "hallway1", to: "bedroom1" },
    { from: "hallway1", to: "bedroom2" },
    { from: "bedroom1", to: "bathroom1" },
    { from: "bedroom2", to: "bathroom2" },
]