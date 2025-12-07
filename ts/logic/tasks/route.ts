import { Ease } from "../../util/math/ease";
import { Vector2 } from "../../util/math/vector2";
import { Managers } from "../managers";
import { MapConnection } from "../map/mapConnection";
import { MapLocation } from "../map/mapLocation";
import { Person } from "../people/person";
import { TimePeriod } from "./time";
import { Travel } from "./travel";


export interface RouteType {
    from: MapLocation;
    to: MapLocation;
    through: MapLocation[];
    connections: MapConnection[];
    distance?: number;
}

export class Route {
    distance: number;
    segments: {
        connection: MapConnection;
        distance: number;
        start: number;
        end: number;
        direction: -1 | 1;
    }[] = [];
    public constructor(private managers: Managers, public data: RouteType) {
        let totalDistance = 0;

        for (let index = 0; index < data.connections.length; index++) {
            const connection = data.connections[index];
            this.segments.push({
                connection: connection,
                distance: connection.distance,
                start: totalDistance,
                end: totalDistance + connection.distance,
                direction: connection.fromLocation === data.through[index] ? 1 : -1,
            });
            totalDistance += connection.distance;
        }
        this.distance = totalDistance;
    }

    public getSegmentVector(time: number): Vector2 {
        const segment = this.segments.find(segment => time >= segment.start && time <= segment.end);
        let delta = ((time - segment.start) / segment.distance);

        if (segment.direction === -1) {
            delta = 1 - delta;
        }
        return segment.connection.getVector(delta);
    }

    createTravel(subject: Person, arrivalTime: TimePeriod): Travel {
        return new Travel({
            route: this,
            subject: subject,
            arrivalTime: arrivalTime,
        });
    }
}