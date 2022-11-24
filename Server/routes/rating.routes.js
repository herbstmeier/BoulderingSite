var router = require('express').Router();
const pool = require('../models/db');

// rating routes
router.post("/", async function create(req, res) {
    try {
        const { userId, boulderId, type } = req.body;
        const result = await pool.query('insert into ratings (userId,boulderId,type) values (?,?,?)', [userId, boulderId, type]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/boulder/:id", async function getByBoulder(req, res) {
    try {
        const rows = await pool.query('select * from ratings where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/", async function deleteRating(req, res) {
    try {
        const { userId, boulderId, type } = req.body;
        const result = await pool.query('delete * from ratings where userId=?,boulderId=?,type=?', [userId, boulderId, type]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
    try {
        const result = await pool.query('delete * from ratings where boulderId=?', req.params.id);
        res.status(200).json({ affectedRows: result.affectedRows });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;