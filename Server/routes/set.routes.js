const pool = require("../models/db.js");
var router = require("express").Router();

// set routes
router.post("/", async function create(req, res) {
    try {
        const { setterId, boulderId, date } = req.body;
        const result = await pool.query('insert into sets (setterId,boulderId,date) values (?,?,?)', [setterId, boulderId, date]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/boulder/:id", async function getByBoulder(req, res) {
    try {
        const rows = await pool.query('select * from sets where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/setter/:id", async function getBySetter(req, res) {
    try {
        const rows = await pool.query('select * from sets where setterId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/", async function deleteSet(req, res) {
    try {
        const { setterId, boulderId } = req.body;
        const result = await pool.query('delete * from sets where setterId=?,boulderId=?', [setterId, boulderId]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
    try {
        const result = await pool.query('delete * from sets where boulderId=?', req.params.id);
        res.status(200).json({ affectedRows: result.affectedRows });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;