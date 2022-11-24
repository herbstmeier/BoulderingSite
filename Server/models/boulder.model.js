import sql from "./db.js";

class Boulder {
    constructor(boulderId, grade, picture) {
        this.boulderId = boulderId;
        this.grade = grade;
        this.picture = picture;
    }

    create(newBoulder, result) {
        sql.query("insert into boulders set ?", newBoulder, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created boulder: ", { id: res.insertId, ...newBoulder });
            result(null, { id: res.insertId, ...newBoulder });
        });
    }

    get(id, result) {
        sql.query("select * from boulders where boulderId = ", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found boulder: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        })
    }

    getAll(result) {
        sql.query("select * from boulders", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("boulders: ", res)
            result(none, res)
        })
    }

    update(id, boulder, result) {
        sql.query("update boulders set grade = ?, picture = ? where boulderId = ?", [boulder.grade, boulder.picture, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated boulder: ", { id: id, ...boulder });
            result(null, { id: id, ...boulder });
        })
    }

    delete(id, result) {
        sql.query("delete * from boulders where boulderId = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted boulder: ", id );
            result(null, res);
        })
    }

    deleteAll(result) {
        sql.query("delete from boulders", (err,res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`deleted ${res.affectedRows} boulders`);
            result(null, res);
        })
    }
}