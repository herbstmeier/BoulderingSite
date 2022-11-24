import Set from "../models/set.model.js";

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const set = new Set({
        setterId: req.body.setterId,
        boulderId: req.body.boulderId,
        date: req.body.date
    });

    Set.create(set, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Set."
            });
        else res.send(data);
    });
};

exports.getByBoulder = (req, res) => {
    Set.getByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No set with boulderId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving set with boulderId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.getBySetter = (req, res) => {
    Set.getBySetter(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No set with setterId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving set with setterId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Set.delete(req.params.sid, req.params.bid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No set with setterId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting set with setterId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};

exports.deleteByBoulder = (req, res) => {
    Set.deleteByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No set with boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting set with boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};