import { MapManager } from "./map/mapManager";
import { PeopleManager } from "./people/peopleManager";
import { RouteManager } from "./tasks/routeManager";

export interface Managers { 
    mapManager: MapManager;
    peopleManager: PeopleManager;
    routeManager: RouteManager;
};

