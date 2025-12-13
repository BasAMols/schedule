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
    private values: {
        secondsPerDay: number;
    } = {
        secondsPerDay: 50,
    };
    managers: Managers<P> = {
        mapManager: null,
        peopleManager: null,
        routeManager: null,
        renderer: new Renderer({
            bg: 10,
            world: 20,
            shipBG: 25,
            ship: 30,
            overlay: 30,
            ui: 40,
        }),
    };
    ship: Ship;
    sky: Sky;
    shipLayer: Div;
    shipBG: Ship;
    shipBGLayer: Div;
    public constructor(
        public container: Container,
        protected classes: LogicManagerClasses<P>,
        protected peopleData: (mapManager: MapManager) => PersonType[] = () => [],
    ) {
        super(container);
        container.append(this.managers.renderer);
        this.sky = new Sky(this.managers);
        this.shipBG = new Ship(this.managers, 0.20, 'shipBG');
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
        this.peopleManager.dom.visible = false;

        this.ticker = new Ticker().addCallback(this.tick.bind(this));
        this.shipLayer = this.managers.renderer.getWrapper('ship');
        this.shipLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
        this.shipBGLayer = this.managers.renderer.getWrapper('shipBG');
        this.shipBGLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
        this.shipBGLayer.visible = false;
        this.shipBGLayer.style('height: 480px; overflow: hidden;');

        this.container.dom.addEventListener('click', () => {
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 's') {
                this.peopleManager.dom.visible = !this.peopleManager.dom.visible;
            }
            if (e.key === ' ') {
                this.ship.open = !this.ship.open;
            }
            if (e.key === 'o') {
                this.shipBGLayer.visible = !this.shipBGLayer.visible;
            }
            if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                this.timeOffset = $.time - LogicManager.timeToMs((parseInt(e.key)-1)/9*24, this.values.secondsPerDay);
            }
        });
        this.container.dom.addEventListener('resize', () => {
            this.managers.renderer.resize();
        });

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('spd')) this.values.secondsPerDay = parseInt(urlParams.get('spd'));
        if (urlParams.get('ship')) this.shipBGLayer.visible = true;
    }

    setup() {

    }

    timeOffset: number = 0;

    setTime(time: number): void {

        this.peopleManager.setTime(time % 24);
        this.ship.setTime(time % 24);
        this.shipBG.setTime(time % 24);
        this.sky.setTime(time % 24);

        const waveRotation = 1;
        const waveTime = 1000;
        const waveHeight = 10;
        const wave = Math.sin($.time / waveTime);
        const wave2 = Math.sin(($.time - 800) / 1000);
        this.shipLayer.transform.setRotation(wave * waveRotation);
        this.shipLayer.transform.setPosition(0, wave2 * waveHeight);

        const waveRotationBG = 1;
        const waveTimeBG = 500;
        const waveHeightBG = 5;
        const waveBG = Math.sin(($.time + 2000) / waveTime);
        const wave2BG = Math.sin((($.time + 2000) - 800) / 1000);
        this.shipBGLayer.transform.setRotation(waveBG * waveRotationBG);
        this.shipBGLayer.transform.setPosition(700, wave2BG * waveHeightBG +350);
    }

    static msToTime(ms: number, secondsPerDay: number): number {
        return (ms * 24 / 1000 / secondsPerDay) % 24; // this works
    } 
    static timeToMs(time: number, secondsPerDay: number): number {
        return ((secondsPerDay*1000) /24 * (time%24)); // this doesnt work
    }

    tick(): void {
        this.setTime(LogicManager.msToTime($.time - this.timeOffset, this.values.secondsPerDay));
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
