export class Boulder {
    boulderId: any;
    grade: string;
    picture: string;

    constructor(b?: Boulder) {
        this.grade = b?.grade ?? '';
        this.picture = b?.picture ?? '';
    }
}

export class CreateBoulderModel {
    grade: string;
    picture: string;

    constructor(grade: string, picture: string) {
        this.grade = grade;
        this.picture = picture;
    }
}