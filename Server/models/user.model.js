import sql from "./db.js";

class User {
    constructor(UserId, Name, Picture) {
        this.UserId = UserId;
        this.Name = Name;
        this.Picture = Picture;
    }

    create(newUser, result) {
        sql.query("insert into Users set ?", newUser, (err,res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
        });
    }

    
}