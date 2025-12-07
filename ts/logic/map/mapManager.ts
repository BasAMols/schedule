import { Div } from "../../util/html/div";
import { Dom } from "../../util/html/dom";
import { Svg } from "../../util/html/svg";
import { Vector2 } from "../../util/math/vector2";
import { Managers } from "../managers";
import { RouteManager } from "../tasks/routeManager";
import { mapLocations } from "./list";
import { MapConnection, MapConnectionType } from "./mapConnection";
import { MapLocation, MapLocationType } from "./mapLocation";


export class MapManager {

    private locations: Record<string, MapLocation> = {};
    private mapConnections: MapConnection[] = [];
    public readonly routeManager: RouteManager;
    dom: Div;
    mapSvg: Svg;

    public constructor(
        private managers: Managers,
        locations: Record<string, Vector2> = {},
        connections: MapConnectionType[] = [],
    ) {

        for (const location of Object.entries(locations)) {
            this.locations[location[0]] = new MapLocation(this.managers, { name: location[0], position: location[1] });
        }

        for (const connection of connections) {
            this.mapConnections.push(new MapConnection(this.managers, connection));
        }

        this.routeManager = new RouteManager(this.managers);

    }

    public getLocation(name: string): MapLocation {
        return this.locations[name];
    }

    build(): void {
        this.dom = new Div();
        this.mapSvg = new Svg('svg', {
            size: new Vector2(1000, 1000),
        });
        this.dom.append(this.mapSvg);
        for (const connection of this.mapConnections) {
            connection.build();
            this.mapSvg.append(connection.line);
        }
        for (const location of Object.values(this.locations)) {
            location.build();
            this.mapSvg.append(location.dom);
        }
    }
}