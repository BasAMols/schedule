import { Managers } from "../logic/managers";
import { Person, PersonType } from "../logic/people/person";
import { Sprite } from "../util/html/sprite";
import { Vector2 } from "../util/math/vector2";
import { Character } from "./character";
import { VisualSchedule } from "./schedule";
import { VisualTask } from "./visualTask";

export type PersonVisualType = PersonType & {
    character: Character;
    offset: Vector2;
}
export class PersonVisual extends Person {
    activeTask: VisualTask;
    character: Character;
    schedule: VisualSchedule;

    public constructor(managers: Managers<PersonVisual>, public readonly data: PersonVisualType) {
        super(managers, data, VisualSchedule);
    }

    build(): void {
        super.build();

        this.characterDom.append(this.data.character);
        this.characterDom.transform.setPosition(this.data.offset);
    }

    tick(): void {
        super.tick();
        switch (this.phase) {
            case 'travel':
                this.data.character.value = Math.floor($.time / 200 % 8) + 20;
                this.data.character.transform.setPosition(new Vector2(-50, -60));
                break;
            default:
            case 'task':
                this.data.character.value = Math.floor($.time / this.activeTask.data.animationSpeed % (this.activeTask.data.animationDuration)) + this.activeTask.data.animationStart;
                this.data.character.transform.setPosition(this.activeTask.data.animationOffset.add(new Vector2(-50, -60)));
                break;
        }

        if (this.direction && this.direction.x !== 0) {
            if (this.direction.x < 0) {
                this.characterDom.transform.setScale(new Vector2(1, 1));
            } else {
                this.characterDom.transform.setScale(new Vector2(-1, 1));
            }
        }

        this.characterDom.dom.style.zIndex = (2000 - this.characterDom.transform.position.y).toString();

    }

}