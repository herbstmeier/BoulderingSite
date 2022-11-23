import sql from "./db.js";

class Comment {
    constructor(CommentId, UserId, BoulderId, Content, Date) {
        this.CommentId = CommentId;
        this.UserId = UserId;
        this.BoulderId = BoulderId;
        this.Content = Content;
        this.Date = Date;
    }
}