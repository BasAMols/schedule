import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations = {
    deck0: new Vector2(550, 785),
    deck1: new Vector2(610, 792),
    deck1Wheel: new Vector2(615, 789),
    deck2: new Vector2(720, 800),
    deck2Stair: new Vector2(730, 794),
    deck3: new Vector2(820, 807),
    deck4: new Vector2(1000, 809),
    deck5: new Vector2(1170, 800),

    gun1: new Vector2(435, 803),
    gun2: new Vector2(550, 828),
    gun3: new Vector2(699, 845),
    gun4: new Vector2(815, 853),
    gun4Stair: new Vector2(800, 845),
    gun5: new Vector2(890, 854),
    gun6: new Vector2(1010, 850),
    gun6Stair: new Vector2(1030, 843),
    gun7: new Vector2(1129, 840),
    gun8: new Vector2(1249, 822),

    orlop1: new Vector2(455, 853),
    orlop2: new Vector2(550, 872),
    orlop3: new Vector2(699, 885),
    orlop4: new Vector2(815, 890),
    orlop5: new Vector2(890, 892),
    orlop6: new Vector2(1000, 892),
    orlop7: new Vector2(1110, 886),
    orlop7Stair: new Vector2(1095, 883),
    orlop8: new Vector2(1249, 866),
}

export const mapConnections = [
    { from: "deck0", to: "deck1" },
    { from: "deck1", to: "deck1Wheel" },
    { from: "deck1", to: "deck2" },
    { from: "deck2", to: "deck3" },
    { from: "deck3", to: "deck4" },
    { from: "deck4", to: "deck5" },

    { from: "gun1", to: "gun2" },
    { from: "gun2", to: "gun3" },
    { from: "gun3", to: "gun4" },
    { from: "gun4", to: "gun5" },
    { from: "gun5", to: "gun6" },
    { from: "gun6", to: "gun7" },
    { from: "gun7", to: "gun8" },

    { from: "orlop1", to: "orlop2" },
    { from: "orlop2", to: "orlop3" },
    { from: "orlop3", to: "orlop4" },
    { from: "orlop4", to: "orlop5" },
    { from: "orlop5", to: "orlop6" },
    { from: "orlop6", to: "orlop7" },
    { from: "orlop7", to: "orlop8" },

    { from: "deck2", to: "deck2Stair" },
    { from: "deck2Stair", to: "gun4Stair" },
    { from: "gun4Stair", to: "gun4" },
    { from: "gun6", to: "gun6Stair" },
    { from: "gun6Stair", to: "orlop7Stair" },
    { from: "orlop7Stair", to: "orlop7" },
    

]