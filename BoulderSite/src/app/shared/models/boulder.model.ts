export class Boulder {
    boulderId: number;
    grade: string;
    colorId: number;
    picture: string;

    constructor(b?: Boulder) {
        this.boulderId = b?.boulderId ?? 0;
        this.grade = b?.grade ?? '';
        this.colorId = b?.colorId ?? 0;
        this.picture = b?.picture ?? '';
    }
}

export class CreateBoulderModel {
    setterId: number;
    grade: string;
    colorId: number;

    constructor(setterId: number, grade: string, colorId: number) {
        this.setterId = setterId;
        this.grade = grade;
        this.colorId = colorId;
    }
}