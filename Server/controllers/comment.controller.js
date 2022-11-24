import Comment from "../models/comment.model.js";

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const comment = new Comment({
        userId: req.body.userId,
        boulderId: req.body.boulderId,
        content: req.body.content,
        date: req.body.date
    });

    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            });
        else res.send(data);
    });
};

exports.getByBoulder = (req, res) => {
    Comment.getByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No comment with boulderId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving comment with boulderId " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Comment.update(req.params.id, new Comment(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No comment with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating comment with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Comment.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No comment with commentId ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting comment with commentId ${req.params.id}.`
                });
            }
        } else res.send(data);
    });
};

exports.deleteByBoulder = (req, res) => {
    Comment.deleteByBoulder(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No comment with boulderId ${req.params.bid}.`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting comment with boulderId ${req.params.bid}.`
                });
            }
        } else res.send(data);
    });
};