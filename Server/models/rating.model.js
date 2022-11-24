import sql from "./db.js";

class Rating {
    constructor(userId, boulderId, type) {
        this.userId = userId;
        this.boulderId = boulderId;
        this.type = type;
    }

    create(newRating, result) {
        sql.query("insert into ratings set ?", newRating, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, newRating);
        })
    }

    getByBoulder(id, result) {
        sql.query("select * from ratings where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found ratings: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    delete(uid, bid, result) {
        sql.query("delete * from ratings where userId = ?, boulderId = ?", [uid, bid], (err, res) => {
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
        sql.query("delete * from ratings where boulderId = ?", id, (err, res) => {
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