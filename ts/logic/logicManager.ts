import { Vector2 } from "../util/math/vector2";
import { MapManager } from "./map/mapManager";
import { PeopleManager } from "./people/peopleManager";
import { mapConnections, mapLocations } from "./map/list";
import { getPeople } from "./people/list";
import { Main } from "../util/game/main";
import { Container } from "../util/game/container";
import { Ticker } from "../util/game/ticker";
import { Managers } from "./managers";

export class LogicManager extends Main {
    mapManager: MapManager;
    peopleManager: PeopleManager;
    ticker: void;
    static SECONDS_PER_DAY = 40;
    public constructor(
        public container: Container
    ) {
        super(container);

        const managers: Partial<Managers> = {

        }

        this.mapManager = new MapManager(managers as Managers, mapLocations, mapConnections);
        this.peopleManager = new PeopleManager(
            managers as Managers, getPeople(this.mapManager)
        );

        managers.mapManager = this.mapManager;
        managers.peopleManager = this.peopleManager;
        managers.routeManager = this.mapManager.routeManager;

        this.mapManager.build();
        this.peopleManager.build();

        this.container.append(this.mapManager.dom);
        this.container.append(this.peopleManager.dom);

        this.setTime(3);

        this.ticker = new Ticker().addCallback(this.tick.bind(this));
    }

    setTime(time: number): void {
        this.peopleManager.setTime(time);
    }

    tick(): void {
        this.setTime($.time *24 / 1000 / LogicManager.SECONDS_PER_DAY);
    }
}

//order of operations:
// 1. create mapManager with locations
//    a. each location has a position
//    b. each location is drawn on the map
// 2. create mapConnections to connect certain locations
//    a. each mapConnection has a position
//    b. each mapConnection is drawn as lines. their distances calculated
// 2. automatically create routes between locations
//    a. each route has a list of mapConnections
//    b. each route has their total distance calculated
// 3. create peopleManager with people assigned to taskManager
//    a. create a schedule for each person, creating the tasks in the process
//    b. each schedule is checked and backfilled with idle time
//    c. schedules are visualized
// d. check if a route exists between two locations
