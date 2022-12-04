var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// POST RATING
router.post("/", async function create(req, res) {
    const { userId, boulderId } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('insert into ratings (userId,boulderId) values (?,?)', [userId, boulderId]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET RATING BY BOULDER ID
router.get("/boulders/:id", async function getByBoulder(req, res) {
    try {
        const rows = await pool.query('select * from ratings where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
});

// DELETE RATING BY USER ID AND BOULDER ID
router.delete("/", async function deleteRating(req, res) {
    const { userId, boulderId, type } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('delete from ratings where userId=?,boulderId=?,type=?', [userId, boulderId, type]);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE RATING BY BOULDER ID
router.delete("/boulders/:id", async function deleteByBoulder(req, res) {
    // CHECKING AUTHORIZATION = ADMIN or SETTER
    try {
        const token = validateToken(req.headers.authorization);
        const row = await pool.query('select isSetter,isAdmin from users where userId=?', token.sub);
        if (!(row[0].isAdmin || row[0].isSetter)) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const result = await pool.query('delete from ratings where boulderId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE CLIMBS BY USER ID
router.delete("/users/:id", async function deleteByUser(req, res) {
    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const result = await pool.query('delete from ratings where userId=?', id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;