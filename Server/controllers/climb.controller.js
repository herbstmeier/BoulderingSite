import Climb from "../models/climb.model.js";

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const climb = new Climb({
        userId: req.body.userId,
        boulderId: req.body.boulderId,
        isFlash: req.body.isFlash,
        date: req.body.date
    });

    Climb.create(climb, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the climb."
            });
        else res.send(data);
    });
};

exports.getByBoulder = (req, res) => {
    Climb.getByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No climb with boulderId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving climb with boulderId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.getByUser = (req, res) => {
    Climb.getByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No climb with userId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving climb with userId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Climb.delete(req.params.uid, req.params.bid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No climb with userId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting climb with userId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};

exports.deleteByBoulder = (req, res) => {
    Climb.deleteByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No climb with boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting climb with boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};

exports.deleteByUser = (req, res) => {
    Climb.deleteByUser(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No climb with userId ${req.params.uid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting climb with userId ${req.params.uid}.`
                });
            }
        } else res.send(data);
    });
};