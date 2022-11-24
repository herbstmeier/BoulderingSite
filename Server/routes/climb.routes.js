var router = require('express').Router();
const pool = require('../models/db');

// climb routes
router.post("/", async function create(req, res) {
    try {
        const { userId, boulderId, isFlash, date } = req.body;
        const result = await pool.query('insert into climbs (userId,boulderId,isFlash,date) values (?,?,?,?)', [userId, boulderId, isFlash, date]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/boulder/:id", async function getByBoulder(req, res) {
    try {
        const rows = await pool.query('select * from climbs where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/user/:id", async function getByUser(req, res) {
    try {
        const rows = await pool.query('select * from climbs where userId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/", async function deleteClimb(req, res) {
    try {
        const { userId, boulderId } = req.body;
        const result = await pool.query('delete * from climbs where userId=?,boulderId=?', [userId, boulderId]);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
    try {
        const result = await pool.query('delete * from climbs where boulderId=?', id);
        res.status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/user/:id", async function deleteByUser(req, res) {
    try {
        const result = await pool.query('delete * from climbs where userId=?', id);
        res.status(200).json({ affectedRows: result.affectedRows });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;