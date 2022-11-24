import Boulder from "../models/boulder.model.js";

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const boulder = new Boulder({
        grade: req.body.grade,
        picture: req.body.picture
    });

    Boulder.create(boulder, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Boulder."
            });
        else res.send(data);
    })
};

exports.get = (req, res) => {
    Boulder.get(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No boulder with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving boulder with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Boulder.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Boulder."
            });
        else res.send(data);
    })
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Boulder.update(req.params.id, new Boulder(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No boulder with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating boulder with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Boulder.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No boulder with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error deleting boulder with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.deleteAll = (req, res) => {
    Boulder.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all boulders."
            });
        else res.send(data);
    });
};