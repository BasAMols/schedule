import { Div } from "../../util/html/div";
import { Svg } from "../../util/html/svg";
import { Vector2 } from "../../util/math/vector2";
import { PathCreator } from "../../util/pathCreator";
import { Managers } from "../managers";
import { MapLocation } from "./mapLocation";
import { MapManager } from "./mapManager";

export interface MapConnectionType {
    from: string;
    to: string;
    path?: string;
    oneWay?: boolean;
}

export class MapConnection {

    fromLocation: MapLocation;
    toLocation: MapLocation;
    distance: number;
    line: Svg;
    public constructor(private managers: Managers, public data: MapConnectionType) {

        if (this.data.from === this.data.to) {
            throw new Error("From and to cannot be the same");
        }

    }

    build(): void {
        this.fromLocation = this.managers.mapManager.getLocation(this.data.from);
        this.toLocation = this.managers.mapManager.getLocation(this.data.to);
        this.fromLocation.registerConnection(this, this.fromLocation, this.toLocation);

        if (!this.data.oneWay) {
            this.toLocation.registerConnection(this, this.fromLocation, this.toLocation);
        }

        this.line = new Svg('path', {
            d: this.data.path ?? PathCreator(this.fromLocation.data.position, { point: this.toLocation.data.position }),
            stroke: 'black',
            strokeWidth: 2,
            fill: 'none',
        });

        this.distance = (this.line.dom as SVGPathElement).getTotalLength();

    }

    getVector(delta: number): Vector2 {
        return this.line.getPointAtLength(delta * this.distance);
    }
}
