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
        this.managers.renderer.add(this.mapManager.dom, 'ship', 90);
        this.peopleManager.dom.visible = false;

        this.ticker = new Ticker().addCallback(this.tick.bind(this));
        this.shipLayer = this.managers.renderer.getWrapper('ship');
        this.shipLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
        this.shipBGLayer = this.managers.renderer.getWrapper('shipBG');
        this.shipBGLayer.transform.setAnchor(new Vector2(1920 / 2, 800));
        this.shipBGLayer.visible = false;
        this.shipBGLayer.style('height: 480px; overflow: hidden;');

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
            if (e.key === 'z') {
                this.managers.renderer.zoom(0.1);
            }
            if (e.key === 'x') {
                this.managers.renderer.zoom(-0.1);
            }
            if (e.key === 'ArrowLeft') {
                this.managers.renderer.pan(-0.02, 0);
            }
            if (e.key === 'ArrowRight') {
                this.managers.renderer.pan(0.02, 0);
            }
            if (e.key === 'ArrowUp') {
                this.managers.renderer.pan(0, -0.02);
            }
            if (e.key === 'ArrowDown') {
                this.managers.renderer.pan(0, 0.02);
            }
        });
        this.container.dom.addEventListener('resize', () => {
            this.managers.renderer.resize();
        });

    }

    setup() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('spd')) this.values.secondsPerDay = parseInt(urlParams.get('spd'));
        if (urlParams.get('ship')) this.shipBGLayer.visible = true;
        if (urlParams.get('zoom') !== null) this.managers.renderer.setPanZoom(undefined, undefined,parseInt(urlParams.get('zoom')));    
        if (urlParams.get('x') !== null) this.managers.renderer.setPanZoom(parseInt(urlParams.get('x'))/10);
        if (urlParams.get('y') !== null) this.managers.renderer.setPanZoom(undefined, parseInt(urlParams.get('y'))/10);
        if (urlParams.get('open') !== null) this.ship.open = urlParams.get('open') === 'true';    
        if (urlParams.get('time') !== null) this.timeOffset = $.time - LogicManager.timeToMs((parseInt(urlParams.get('time'))-1)/9*24, this.values.secondsPerDay);
    }

    timeOffset: number = 0;

    setTime(time: number): void {

        this.peopleManager.setTime(time);
        this.ship.setTime(time);
        this.shipBG.setTime(time);
        this.sky.setTime(time);

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
        return (ms * 24 / 1000 / secondsPerDay);
    } 
    static timeToMs(time: number, secondsPerDay: number): number {
        return ((secondsPerDay*1000) /24 * (time%24));
    }

    tick(): void {
        this.setTime(LogicManager.msToTime($.time - this.timeOffset, this.values.secondsPerDay) % 24);
    }
}
