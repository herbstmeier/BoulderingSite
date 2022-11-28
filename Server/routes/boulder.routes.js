var router = require('express').Router();
const pool = require('../db');

// REGISTER BOULDER
router.post('/', async function create(req, res) {
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
        const { grade, picture } = req.body;
        await pool.query('insert into boulders (grade,picture) values (?,?)', [grade, picture]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET BOULDER BY ID
router.get('/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select * from boulders where boulderId = ?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET ALL BOULDERS
router.get('/', async function getAll(req, res) {
    try {
        const rows = await pool.query('select * from boulders');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// UPDATE BOULDER INFO
router.put('/', async function update(req, res) {
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
        const { boulderId, grade, picture } = req.body;
        await pool.query('update boulders (grade,picture) values (?,?) where boulderId = ?', [grade, picture, boulderId]);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE BOULDER BY ID
router.delete('/:id', async function deleteBoulder(req, res) {
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
        await pool.query('delete from boulders where boulderId = ?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE ALL BOULDERS
router.delete('/', async function deleteAll(req, res) {
    // CHECKING AUTHORIZATION = ADMIN
    try {
        const token = validateToken(req.headers.authorization);
        const row = await pool.query('select isAdmin from users where=?', token.sub);
        if (!row[0].isAdmin) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query("delete from boulders");
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;