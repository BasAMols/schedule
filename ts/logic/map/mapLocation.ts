import { Div } from "../../util/html/div";
import { Svg } from "../../util/html/svg";
import { Vector2 } from "../../util/math/vector2";
import { Managers } from "../managers";
import { Route } from "../tasks/route";
import { MapConnection } from "./mapConnection";

export interface MapLocationType {
    position: Vector2;
    name: string;
    depth: number;
}

export class MapLocation {
    connections: MapConnection[] = [];
    neighbors: [MapLocation, MapConnection][] = [];
    routes: Record<string, Route> = {};
    dom: Svg;

    public constructor(private managers: Managers, public data: MapLocationType) {
        this.data.depth = this.data.depth ?? 0;
    }
    registerConnection(connection: MapConnection, a: MapLocation, b: MapLocation): void {
        this.connections.push(connection);

        if (a !== this) this.neighbors.push([a, connection]);
        if (b !== this) this.neighbors.push([b, connection]);
    }
    registerRoute(to: string, route: Route): void {
        this.routes[to] = route;
    }

    build(): void {
        this.dom = new Svg('g', {
            
        });
        this.dom.append(new Svg('circle', {
            cx: this.data.position.x,
            cy: this.data.position.y,
            r: 5,
            fill: 'black',
        }));

        this.dom.append(new Svg('text', {
            text: this.data.name,
            x: this.data.position.x + 15,
            y: this.data.position.y + 25,
        }));
    }
}