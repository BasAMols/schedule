import { LogicManager } from './logic/logicManager';
import { Container } from "./util/game/container";
import { getVisualPeople } from './visuals/visualPeople';
import { PersonVisual } from './visuals/visualPerson';

document.addEventListener("DOMContentLoaded", async () => {
    const g = new Container();
    document.body.appendChild(g.dom);
    const manager = new LogicManager<PersonVisual>(g, { Person: PersonVisual }, getVisualPeople);
    g.append(manager);
    manager.setup();
    g.start();
});