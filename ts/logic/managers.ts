import { Renderer } from "../render/renderer";
import { MapManager } from "./map/mapManager";
import { PeopleManager } from "./people/peopleManager";
import { Person } from "./people/person";
import { RouteManager } from "./tasks/routeManager";

export interface Managers<P extends Person = Person> { 
    mapManager: MapManager;
    peopleManager: PeopleManager<P>;
    routeManager: RouteManager;
    renderer: Renderer;
};

