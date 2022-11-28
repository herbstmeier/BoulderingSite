export class Climb {
    userId?: any;
    boulderId?: any;
    isFlash?: boolean;
    dateClimbed?: Date;

    /**
     *
     */
    constructor(userId?: any, boulderId?: any, isFlash?: boolean, dateClimbed?: Date) {
        this.userId = userId;
        this.boulderId = boulderId;
        this.isFlash = isFlash;
        this.dateClimbed = dateClimbed;
    }
}