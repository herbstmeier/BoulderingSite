import sql from "./db.js";

class Rating {
    constructor(UserId, BoulderId, Type) {
        this.UserId = UserId;
        this.BoulderId = BoulderId;
        this.Type = Type;
    }
}