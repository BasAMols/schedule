import { Vector2 } from "../util/math/vector2";
import { MapManager } from "./map/mapManager";
import { PeopleManager } from "./people/peopleManager";
import { mapConnections, mapLocations } from "./map/list";
import { Main } from "../util/game/main";
import { Container } from "../util/game/container";
import { Ticker } from "../util/game/ticker";
import { Managers } from "./managers";
import { Person, PersonType } from "./people/person";
import { Ship } from "./scene/ship/ship";
import { Sky } from "./scene/backgrounds/sky";
import { Renderer } from "../render/renderer";
import { RenderLayer } from "../render/renderLayer";
import { Div } from "../util/html/div";

export interface LogicManagerClasses<P extends Person> {
    Person: new (managers: Managers<P>, data: PersonType) => P;
}

export class LogicManager<P extends Person> extends Main {
    mapManager: MapManager;
    peopleManager: PeopleManager<P>;
    ticker: void;
    static SECONDS_PER_DAY = 50;
    managers: Managers<P> = {
        mapManager: null,
        peopleManager: null,
        routeManager: null,
        renderer: new Renderer({
            bg: 10,
            world: 20,
            ship: 30,
            overlay: 30,
            ui: 40,
        }),
    };
    ship: Ship;
    sky: Sky;
    shipLayer: Div;
    public constructor(
        public container: Container,
        protected classes: LogicManagerClasses<P>,
        protected peopleData: (mapManager: MapManager) => PersonType[] = () => [],
    ) {
        super(container);
        container.append(this.managers.renderer);
        this.sky = new Sky(this.managers);
        this.ship = new Ship(this.managers);
        this.mapManager = new MapManager(this.managers as Managers<P>, mapLocations, mapConnections);

        this.peopleManager = new PeopleManager<P>(
            this.managers as Managers<P>, this.peopleData(this.mapManager), this.classes.Person
        );

        this.managers.mapManager = this.mapManager;
        this.managers.peopleManager = this.peopleManager;
        this.managers.routeManager = this.mapManager.routeManager;

        this.mapManager.build();
        this.peopleManager.build();
        this.managers.renderer.add(this.peopleManager.dom, 'ui', 1);

        this.ticker = new Ticker().addCallback(this.tick.bind(this));
        this.shipLayer = this.managers.renderer.getWrapper('ship');
        this.shipLayer.transform.setAnchor(new Vector2(1920 / 2, 800));

        this.container.dom.addEventListener('click', () => {
            this.ship.open = !this.ship.open;
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 's') {
                this.peopleManager.dom.visible = !this.peopleManager.dom.visible;
            }
        });
        this.container.dom.addEventListener('resize', () => {
            this.managers.renderer.resize();
        });
    }

    setup() {

    }

    setTime(time: number): void {
        this.peopleManager.setTime(time % 24);
        this.ship.setTime(time % 24);
        this.sky.setTime(time % 24);
        const waveRotation = 1;
        const waveTime = 1000;
        const waveHeight = 10;
        const wave = Math.sin($.time / waveTime);
        const wave2 = Math.sin(($.time - 800) / 1000);
        this.shipLayer.transform.setRotation(wave * waveRotation);
        this.shipLayer.transform.setPosition(0, wave2 * waveHeight);
    }

    tick(): void {
        this.setTime(($.time * 24 / 1000 / LogicManager.SECONDS_PER_DAY) + 16);
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
