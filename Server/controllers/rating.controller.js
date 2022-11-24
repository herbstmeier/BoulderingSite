import Rating from "../models/rating.model.js";

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const rating = new Rating({
        userId: req.body.userId,
        boulderId: req.body.boulderId,
        type: req.body.type
    });

    Rating.create(rating, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Rating."
            });
        else res.send(data);
    });
};

exports.getByBoulder = (req, res) => {
    Rating.getByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No rating with boulderId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving rating with boulderId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Rating.delete(req.params.uid, req.params.bid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No rating with userId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting rating with userId ${req.params.uid} and boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};

exports.deleteByBoulder = (req, res) => {
    Rating.deleteByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No rating with boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting rating with boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};