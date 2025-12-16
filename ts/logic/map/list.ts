import { Vector2 } from "../../util/math/vector2";
import { MapConnectionType } from "./mapConnection";
import { PathCreator } from "../../util/pathCreator";

export const mapLocations: Record<string, [Vector2, number]> = {
    bridgeDeckCabin00: [new Vector2(340, 717), 15],
    bridgeDeckCabin01: [new Vector2(404, 717), 15],
    bridgeDeckCabin02: [new Vector2(447, 717), 15],

    bridgeDeck00: [new Vector2(470, 740), 25],
    bridgeDeck01: [new Vector2(530, 740), 25],
    bridgeDeck02: [new Vector2(570, 740), 25],
    bridgeDeck03: [new Vector2(600, 740), 25],
    bridgeDeck04: [new Vector2(666, 740), 25],

    mainDeck00: [new Vector2(680, 770), 25],
    mainDeck01: [new Vector2(730, 770), 25],
    mainDeck02: [new Vector2(780, 770), 25],
    mainDeck03: [new Vector2(830, 770), 25],
    mainDeck04: [new Vector2(880, 770), 25],
    mainDeck05: [new Vector2(930, 770), 25],
    mainDeck06: [new Vector2(980, 770), 25],
    mainDeck07: [new Vector2(1030, 770), 25],
    mainDeck08: [new Vector2(1080, 770), 25],
    mainDeck09: [new Vector2(1130, 770), 25],
    mainDeck10: [new Vector2(1180, 770), 25],

    gunDeck00: [new Vector2(403, 818), 25],
    gunDeck01: [new Vector2(453, 818), 25],
    gunDeck02: [new Vector2(503, 818), 25],
    gunDeck03: [new Vector2(553, 818), 25],
    gunDeck04: [new Vector2(603, 818), 25],
    gunDeck05: [new Vector2(653, 818), 25],
    gunDeck06: [new Vector2(703, 818), 25],
    gunDeck07: [new Vector2(753, 818), 25],
    gunDeck08: [new Vector2(803, 818), 25],
    gunDeck09: [new Vector2(853, 818), 25],
    gunDeck10: [new Vector2(903, 818), 25],
    gunDeck11: [new Vector2(953, 818), 25],
    gunDeck12: [new Vector2(1003, 818), 25],
    gunDeck13: [new Vector2(1053, 818), 25],
    gunDeck14: [new Vector2(1103, 818), 25],
    gunDeck15: [new Vector2(1153, 818), 25],
    gunDeck16: [new Vector2(1203, 818), 25],
    gunDeck17: [new Vector2(1253, 818), 25],

    orlopDeck00: [new Vector2(403, 861), 25],
    orlopDeck01: [new Vector2(453, 861), 25],
    orlopDeck02: [new Vector2(503, 861), 25],
    orlopDeck03: [new Vector2(553, 861), 25],
    orlopDeck04: [new Vector2(603, 861), 25],
    orlopDeck05: [new Vector2(653, 861), 25],
    orlopDeck06: [new Vector2(703, 861), 25],
    orlopDeck07: [new Vector2(753, 861), 25],
    orlopDeck08: [new Vector2(803, 861), 25],
    orlopDeck09: [new Vector2(853, 861), 25],
    orlopDeck10: [new Vector2(903, 861), 25],
    orlopDeck11: [new Vector2(953, 861), 25],
    orlopDeck12: [new Vector2(1003, 861), 25],
    orlopDeck13: [new Vector2(1053, 861), 25],
    orlopDeck14: [new Vector2(1103, 861), 25],
    orlopDeck15: [new Vector2(1153, 861), 25],
    orlopDeck16: [new Vector2(1203, 861), 25],
    orlopDeck17: [new Vector2(1253, 861), 25],

    bridgeLoftStair: [new Vector2(488, 733), 25],
    loftBridgeStair: [new Vector2(460, 715), 25],

    bridgeMainStair: [new Vector2(676, 735), 25],
    mainBridgeStair: [new Vector2(709, 765), 25],

    mainGunStair1: [new Vector2(722, 761), 15],
    gunMainStair1: [new Vector2(722, 820), 30],

    mainGunStair2: [new Vector2(1060, 761), 15],
    gunMainStair2: [new Vector2(1060, 820), 30],

    orlopGunStair1: [new Vector2(722, 865), 15],
    gunOrlopStair1: [new Vector2(722, 813), 30],

    orlopGunStair2: [new Vector2(1060, 865), 15],
    gunOrlopStair2: [new Vector2(1060, 813), 30],

}

export const mapConnections: {
    from: string;
    to: string;
    depth?: number;
}[] = [
        { from: "bridgeDeckCabin00", to: "bridgeDeckCabin01" },
        { from: "bridgeDeckCabin01", to: "bridgeDeckCabin02" },
        { from: "bridgeDeckCabin02", to: "bridgeDeck00" },

        { from: "bridgeDeck00", to: "bridgeDeck01" },
        { from: "bridgeDeck01", to: "bridgeDeck02" },
        { from: "bridgeDeck02", to: "bridgeDeck03" },
        { from: "bridgeDeck03", to: "bridgeDeck04" },
        { from: "bridgeDeck04", to: "bridgeDeck01" },

        { from: "mainDeck00", to: "mainDeck01" },
        { from: "mainDeck01", to: "mainDeck02" },
        { from: "mainDeck02", to: "mainDeck03" },
        { from: "mainDeck03", to: "mainDeck04" },
        { from: "mainDeck04", to: "mainDeck05" },
        { from: "mainDeck05", to: "mainDeck06" },
        { from: "mainDeck06", to: "mainDeck07" },
        { from: "mainDeck07", to: "mainDeck08" },
        { from: "mainDeck08", to: "mainDeck09" },
        { from: "mainDeck09", to: "mainDeck10" },

        { from: "gunDeck00", to: "gunDeck01" },
        { from: "gunDeck01", to: "gunDeck02" },
        { from: "gunDeck02", to: "gunDeck03" },
        { from: "gunDeck03", to: "gunDeck04" },
        { from: "gunDeck04", to: "gunDeck05" },
        { from: "gunDeck05", to: "gunDeck06" },
        { from: "gunDeck06", to: "gunDeck07" },
        { from: "gunDeck07", to: "gunDeck08" },
        { from: "gunDeck08", to: "gunDeck09" },
        { from: "gunDeck09", to: "gunDeck10" },
        { from: "gunDeck10", to: "gunDeck11" },
        { from: "gunDeck11", to: "gunDeck12" },
        { from: "gunDeck12", to: "gunDeck13" },
        { from: "gunDeck13", to: "gunDeck14" },
        { from: "gunDeck14", to: "gunDeck15" },
        { from: "gunDeck15", to: "gunDeck16" },
        { from: "gunDeck16", to: "gunDeck17" },

        { from: "orlopDeck00", to: "orlopDeck01" },
        { from: "orlopDeck01", to: "orlopDeck02" },
        { from: "orlopDeck02", to: "orlopDeck03" },
        { from: "orlopDeck03", to: "orlopDeck04" },
        { from: "orlopDeck04", to: "orlopDeck05" },
        { from: "orlopDeck05", to: "orlopDeck06" },
        { from: "orlopDeck06", to: "orlopDeck07" },
        { from: "orlopDeck07", to: "orlopDeck08" },
        { from: "orlopDeck08", to: "orlopDeck09" },
        { from: "orlopDeck09", to: "orlopDeck10" },
        { from: "orlopDeck10", to: "orlopDeck11" },
        { from: "orlopDeck11", to: "orlopDeck12" },
        { from: "orlopDeck12", to: "orlopDeck13" },
        { from: "orlopDeck13", to: "orlopDeck14" },
        { from: "orlopDeck14", to: "orlopDeck15" },
        { from: "orlopDeck15", to: "orlopDeck16" },
        { from: "orlopDeck16", to: "orlopDeck17" },

        { from: "bridgeLoftStair", to: "loftBridgeStair" },
        { from: "bridgeMainStair", to: "mainBridgeStair" },
        { from: "mainGunStair1", to: "gunMainStair1" },
        { from: "mainGunStair2", to: "gunMainStair2" },
        { from: "orlopGunStair1", to: "gunOrlopStair1" },
        { from: "orlopGunStair2", to: "gunOrlopStair2" },

        { from: "bridgeMainStair", to: "bridgeDeck04" },
        { from: "bridgeDeckCabin02", to: "loftBridgeStair" },

        { from: "mainBridgeStair", to: "mainDeck00" },
        { from: "mainBridgeStair", to: "mainDeck01" },

        { from: "mainGunStair1", to: "mainBridgeStair" },
        { from: "mainGunStair1", to: "mainDeck02" },

        { from: "gunMainStair1", to: "gunDeck06" },
        { from: "gunMainStair1", to: "gunDeck07" },

        { from: "gunOrlopStair1", to: "gunDeck06" },
        { from: "gunOrlopStair1", to: "gunDeck07" },

        { from: "orlopGunStair1", to: "orlopDeck06" },
        { from: "orlopGunStair1", to: "orlopDeck07" },

        { from: "mainGunStair2", to: "mainDeck07" },
        { from: "mainGunStair2", to: "mainDeck08" },

        { from: "gunMainStair2", to: "gunDeck13" },
        { from: "gunMainStair2", to: "gunDeck14" },

        { from: "gunOrlopStair2", to: "gunDeck12" },
        { from: "gunOrlopStair2", to: "gunDeck14" },

        { from: "orlopGunStair2", to: "orlopDeck13" },
        { from: "orlopGunStair2", to: "orlopDeck14" },



        // { from: "gun1", to: "gun2" },
        // { from: "gun2", to: "gun3" },
        // { from: "gun3", to: "gun4" },
        // { from: "gun4", to: "gun5" },
        // { from: "gun5", to: "gun6" },
        // { from: "gun6", to: "gun7" },
        // { from: "gun7", to: "gun8" },

        // { from: "orlop1", to: "orlop2" },
        // { from: "orlop2", to: "orlop3" },
        // { from: "orlop3", to: "orlop4" },
        // { from: "orlop4", to: "orlop5" },
        // { from: "orlop5", to: "orlop6" },
        // { from: "orlop6", to: "orlop7" },
        // { from: "orlop7", to: "orlop8" },

        // { from: "deck2", to: "deck2Stair", depth: 5 },
        // { from: "deck2Stair", to: "gun4Stair", depth: 5 },
        // { from: "gun4Stair", to: "gun4", depth: 5 },
        // { from: "gun6", to: "gun6Stair", depth: 5 },
        // { from: "gun6Stair", to: "orlop7Stair", depth: 5 },
        // { from: "orlop7Stair", to: "orlop7", depth: 5 },


    ]