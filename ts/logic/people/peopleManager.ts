import { Div } from "../../util/html/div";
import { Dom } from "../../util/html/dom";
import { Vector2 } from "../../util/math/vector2";
import { Managers } from "../managers";
import { Schedule } from "../tasks/schedule";
import { Person, PersonType } from "./person";

export class PeopleManager {
    people: Person[] = [];
    dom: Dom;
    timeDom: Dom;
    public constructor(
        private managers: Managers,
        people: PersonType[] = [],
    ) {
        for (const person of people) {
            this.addPerson(person);
        }
    }

    addPerson(person: Person | PersonType): void {
        if (person instanceof Person) {
            this.people.push(person);
        } else {
            this.people.push(new Person(this.managers, person));
        }
    }

    getPerson(name: string): Person {
        return this.people.find(person => person.name === name);
    }

    build(): void {
        this.dom = new Div({
        });
        this.people.forEach((person, index) => {
            person.build();
            this.dom.append(person.scheduleDom);
            person.scheduleDom.transform.setPosition(new Vector2(0, index * Schedule.TASK_HEIGHT));
            this.managers.mapManager.dom.append(person.characterDom);

        });

        this.timeDom = this.dom.append(new Div({
            position: new Vector2(0, this.people.length * Schedule.TASK_HEIGHT),
            size: new Vector2(100, Schedule.TASK_HEIGHT),
            text: ''.toString(),
            style: 'font-size: 20px; display: flex; align-items: center; justify-content: center; font-family: "monospace", sans-serif; box-sizing: border-box; position: absolute; ',
        }));
    }

    setTime(time: number): void {
        this.people.forEach(person => {
            person.setTime(time % 24);
        });
        const hours = Math.floor(time % 24).toString().padStart(2, '0');
        const minutes = Math.round(time % 1 * 60).toString().padStart(2, '0');
        this.timeDom.dom.textContent = hours + ':' + minutes;
    }
}