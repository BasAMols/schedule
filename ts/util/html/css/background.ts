
interface BackgroundColorOptions {
    color?: string;
}

interface BackgroundImageOptions {
    type: 'image';
    image: string;
    position?: string;
    repeat?: string;
    size?: string;
    attachment?: string;
    origin?: string;
    clip?: string;
}

interface BackgroundLinearGradientOptions {
    type: 'linear';
    colors: { color: string; position?: string; }[];
    positions?: string[];
    direction?: string;
}

interface BackgroundRepeatLinearGradientOptions {
    type: 'repeat-linear';
    colors: { color: string; position?: string; }[];
    positions?: string[];
    direction?: string;
}

export type BackgroundOptions = string | (BackgroundColorOptions & (BackgroundImageOptions | BackgroundLinearGradientOptions | BackgroundRepeatLinearGradientOptions | {}));

export class Background {
    public static getStyle(options: BackgroundOptions): string {

        let style = '';

        if (typeof options === 'string') {
            style += `background: ${options};`;
            return style;
        }

        if (options.color) {
            style += `background-color: ${options.color};`;
        }

        if ('type' in options && options.type === 'image') {
            style += `background-image: url(${options.image});`;
            style += `background-position: ${options.position || 'center center'};`;
            style += `background-repeat: ${options.repeat || 'no-repeat'};`;
            style += `background-size: ${options.size || 'cover'};`;
            style += `background-attachment: ${options.attachment || 'scroll'};`;
            style += `background-origin: ${options.origin || 'padding-box'};`;
            style += `background-clip: ${options.clip || 'border-box'};`;
        } else if ('type' in options && options.type === 'linear') {
            style += `background-image: linear-gradient(${options.direction || 'to bottom'}, ${options.colors.map(color => `${color.color} ${color.position || ''}`).join(', ')});`;
        } else if ('type' in options && options.type === 'repeat-linear') {
            style += `background-image: repeating-linear-gradient(${options.direction || 'to bottom'}, ${options.colors.map(color => `${color.color} ${color.position || ''}`).join(', ')});`;
        }
        return style;
    }
}