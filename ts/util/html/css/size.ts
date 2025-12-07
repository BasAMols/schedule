import { Vector2 } from '../../math/vector2';

export class Size {
    public static getStyle(size: Vector2|[string, string]): string {
        let style = '';
        if (Array.isArray(size)) {
            style += `width: ${size[0]}; height: ${size[1]};`;
        } else {
            style += `width: ${size.x.toString()}px; height: ${size.y.toString()}px;`;
        }
        return style;
    }
}