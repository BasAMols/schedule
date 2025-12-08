import { Vector2 } from "../util/math/vector2";
import { MapManager } from "./map/mapManager";
import { PeopleManager } from "./people/peopleManager";
import { mapConnections, mapLocations } from "./map/list";
import { Main } from "../util/game/main";
import { Container } from "../util/game/container";
import { Ticker } from "../util/game/ticker";
import { Managers } from "./managers";
import { Person, PersonType } from "./people/person";

export interface LogicManagerClasses<P extends Person> {
    Person: new (managers: Managers<P>, data: PersonType) => P;
}

export class LogicManager<P extends Person> extends Main {
    mapManager: MapManager;
    peopleManager: PeopleManager<P>;
    ticker: void;
    static SECONDS_PER_DAY = 80;
    managers: Managers<P> = {
        mapManager: null,
        peopleManager: null,
        routeManager: null,
    };
    public constructor(
        public container: Container,
        protected classes: LogicManagerClasses<P>,
        protected peopleData: (mapManager: MapManager) => PersonType[] = () => [],
    ) {
        super(container);

        this.mapManager = new MapManager(this.managers as Managers<P>, mapLocations, mapConnections);
        this.peopleManager = new PeopleManager<P>(
            this.managers as Managers<P>, this.peopleData(this.mapManager), this.classes.Person
        );

        this.managers.mapManager = this.mapManager;
        this.managers.peopleManager = this.peopleManager;
        this.managers.routeManager = this.mapManager.routeManager;

        this.mapManager.build();
        this.peopleManager.build();

        this.container.append(this.mapManager.dom);
        this.container.append(this.peopleManager.dom);

        this.ticker = new Ticker().addCallback(this.tick.bind(this));
    }

    setup() {
 
    }

    setTime(time: number): void {
        this.peopleManager.setTime(time +150);
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
