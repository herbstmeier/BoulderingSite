var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// REGISTER BOULDER
router.post('/', async function create(req, res) {
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
        const { setterId, grade, colorId } = req.body;
        const result = await pool.query('insert into boulders (setterId,grade,colorId) values (?,?,?)', [setterId, grade, colorId]);
        res.status(201).json({ boulderId: Number(result.insertId) });
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
        const row = await pool.query('select isSetter,isAdmin from users where userId=?', token.sub);
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
        const row = await pool.query('select isSetter,isAdmin from users where userId=?', token.sub);
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
        const row = await pool.query('select isAdmin from users where userId=?', token.sub);
        if (!row[0].isAdmin) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('delete from boulders');
        await pool.query('alter table boulders AUTO_INCREMENT=1');
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;