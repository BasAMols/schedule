import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations: Record<string, [Vector2, number]> = {
    deck0: [new Vector2(555, 785), 35],
    deck0showers: [new Vector2(550, 775), 20],
    deck1: [new Vector2(610, 792), 35],
    deck1Wheel: [new Vector2(615, 789), 35],
    deck2: [new Vector2(720, 800), 35],
    deck2Stair: [new Vector2(730, 794), 35],
    deck3: [new Vector2(820, 807), 35],
    deck4: [new Vector2(1000, 809), 35],
    deck5: [new Vector2(1170, 800), 35],

    gun1: [new Vector2(435, 803), 35],
    gun2: [new Vector2(550, 828), 35],
    gun3: [new Vector2(699, 845), 35],
    gun4: [new Vector2(815, 853), 35],
    gun4Stair: [new Vector2(800, 845), 35],
    gun5: [new Vector2(890, 854), 35],
    gun6: [new Vector2(1010, 850), 35],
    gun6Stair: [new Vector2(1030, 843), 35],
    gun7: [new Vector2(1129, 840), 35],
    gun8: [new Vector2(1249, 822), 35],

    orlop1: [new Vector2(455, 853), 35],
    orlop2: [new Vector2(550, 872), 35],
    orlop3: [new Vector2(699, 885), 35],
    orlop4: [new Vector2(815, 890), 35],
    orlop5: [new Vector2(890, 892), 35],
    orlop6: [new Vector2(1000, 892), 35],
    orlop7: [new Vector2(1110, 886), 35],
    orlop7Stair: [new Vector2(1095, 883), 35],
    orlop8: [new Vector2(1249, 866), 35],
}

export const mapConnections: {
    from: string;
    to: string;
    depth?: number;
}[] = [
    { from: "deck0", to: "deck0showers" },
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

    { from: "deck2", to: "deck2Stair", depth: 5  },
    { from: "deck2Stair", to: "gun4Stair" , depth: 5 },
    { from: "gun4Stair", to: "gun4", depth: 5  },
    { from: "gun6", to: "gun6Stair", depth: 5  },
    { from: "gun6Stair", to: "orlop7Stair", depth: 5  },
    { from: "orlop7Stair", to: "orlop7", depth: 5  },
    

]