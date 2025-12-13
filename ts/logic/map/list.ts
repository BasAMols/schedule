import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations = {
    cph_front: new Vector2(250+300, 655+130),
    deck0: new Vector2(310+300, 662+130),
    wheel: new Vector2(315+300, 659+130),
    deck1: new Vector2(420+300, 670+130),
    deck1Stair: new Vector2(430+300, 664+130),
    deck2: new Vector2(520+300, 677+130),
    deck3: new Vector2(700+300, 679+130),
    deck4: new Vector2(870+300, 670+130),
    gun3: new Vector2(515+300, 720+130),
    gun3Stair: new Vector2(500+300, 715+130),
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