import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations = {
    cph_front: new Vector2(250, 655),
    deck0: new Vector2(310, 662),
    wheel: new Vector2(315, 659),
    deck1: new Vector2(420, 670),
    deck1Stair: new Vector2(430, 664),
    deck2: new Vector2(520, 677),
    deck3: new Vector2(700, 679),
    deck4: new Vector2(870, 670),

    gun3: new Vector2(515, 720),
    gun3Stair: new Vector2(500, 715),
    
}

export const mapConnections = [
    { from: "cph_front", to: "deck0" },
    { from: "deck0", to: "deck1" },
    { from: "deck0", to: "wheel" },
    { from: "deck1", to: "deck2" },
    { from: "deck1", to: "deck1Stair" },
    { from: "deck1Stair", to: "gun3Stair" },
    { from: "deck2", to: "deck3" },
    { from: "deck3", to: "deck4" },
    { from: "gun3Stair", to: "gun3" },


]