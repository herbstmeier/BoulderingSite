import sql from "./db.js";

class Set {
    constructor(setterId, boulderId, date) {
        this.setterId = setterId;
        this.boulderId = boulderId;
        this.date = date;
    }

    create(newSet, result) {
        sql.query("insert into sets set ?", newSet, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, newSet);
        })
    }

    getByBoulder(id, result) {
        sql.query("select * from sets where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found sets: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    getBySetter(id, result) {
        sql.query("select * from sets where setterId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found sets: ", res);
                result(null, res);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    delete(sid, bid, result) {
        sql.query("delete * from sets where setterId = ?, boulderId = ?", [sid, bid], (err, res) => {
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
        sql.query("delete * from sets where boulderId = ?", id, (err, res) => {
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