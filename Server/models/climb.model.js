import sql from "./db.js";

class Climb {
    constructor(UserId, BoulderId, IsFlash, Date) {
        this.UserId = UserId;
        this.BoulderId = BoulderId;
        this.IsFlash = IsFlash;
        this.Date = Date;
    }
}