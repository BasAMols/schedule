import { LogicManager } from './logic/logicManager';
import { Container } from "./util/game/container";

document.addEventListener("DOMContentLoaded", async () => {
    const g = new Container();
    document.body.appendChild(g.dom);
    g.append(new LogicManager(g));
    g.start();
});