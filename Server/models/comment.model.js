import sql from "./db.js";

class Comment {
    constructor(commentId, userId, boulderId, content, date) {
        this.commentId = commentId;
        this.userId = userId;
        this.boulderId = boulderId;
        this.content = content;
        this.date = date;
    }

    create(newComment, result) {
        sql.query("insert into comments set ?", newComment, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, newComment);
        })
    }

    getByBoulder(id, result) {
        sql.query("select * from comments where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found comments: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    update(id, comment, result) {
        sql.query("update comments set content = ? where commentId = ?", [comment.content, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated comment: ", { id: id, ...comment });
            result(null, { id: id, ...comment });
        })
    }

    delete(id, result) {
        sql.query("delete * from comments where commentId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        })
    }

    deleteByBoulder(id, result) {
        sql.query("delete * from comments where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res)
        })
    }
}