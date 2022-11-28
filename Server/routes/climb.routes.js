var router = require('express').Router();
const pool = require('../db');

// REGISTER CLIMB
router.post("/", async function create(req, res) {
    const { userId, boulderId, isFlash, dateClimbed } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('insert into climbs (userId,boulderId,isFlash,dateClimbed) values (?,?,?,?)', [userId, boulderId, isFlash, dateClimbed]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET CLIMBS BY BOULDER ID
router.get("/boulder/:id", async function getByBoulder(req, res) {
    // CHECKING AUTHORIZATION = LOGGED IN
    try {
        validateToken(req.headers.authorization);
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const rows = await pool.query('select * from climbs where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET CLIMBS BY USER ID
router.get("/user/:id", async function getByUser(req, res) {
    // CHECKING AUTHORIZATION = LOGGED IN
    try {
        validateToken(req.headers.authorization);
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const rows = await pool.query('select * from climbs where userId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE CLIMB BY USER ID AND BOULDER ID
router.delete("/", async function deleteClimb(req, res) {
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
        const result = await pool.query('delete from climbs where userId=?,boulderId=?', [userId, boulderId]);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE CLIMBS BY BOULDER ID
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
    // CHECKING AUTHORIZATION = ADMIN or SETTER
    try {
        const token = validateToken(req.headers.authorization);
        const row = await pool.query('select isSetter,isAdmin from users where=?', token.sub);
        if (!(row[0].isAdmin || row[0].isSetter)) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const result = await pool.query('delete from climbs where boulderId=?', id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE CLIMBS BY USER
router.delete("/user/:id", async function deleteByUser(req, res) {
    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const result = await pool.query('delete from climbs where userId=?', id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;