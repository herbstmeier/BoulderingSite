export class Color {
    colorId: number;
    colorName: string;
    hexCode: string;

    constructor(c?: Color) {
        this.colorId = c?.colorId ?? 0;
        this.colorName = c?.colorName ?? '';
        this.hexCode = c?.hexCode ?? '#000';
    }
}

export class ColorCreate {
    colorName: string;
    hexCode: string;

    constructor(colorName: string, hexCode: string) {
        this.colorName = colorName;
        this.hexCode = hexCode;
    }
}