import sql from "./db.js";
userId
class Climb {
    constructor(userId, boulderId, isFlash, date) {
        this.userId = userId;
        this.boulderId = boulderId;
        this.isFlash = isFlash;
        this.date = date;
    }

    create(newClimb, result) {
        sql.query("insert into climbs set ?", newClimb, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, newClimb);
        })
    }

    getByBoulder(id, result) {
        sql.query("select * from climbs where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found climbs: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    getByUser(id, result) {
        sql.query("select * from climbs where userId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found climbs: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    delete(uid, bid, result) {
        sql.query("delete * from climbs where userId = ?, boulderId = ?", [uid, bid], (err, res) => {
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
        sql.query("delete * from climbs where boulderId = ?", id, (err, res) => {
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

    deleteByUser(id, result) {
        sql.query("delete * from climbs where userId = ?", id, (err, res) => {
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