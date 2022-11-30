var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// CREATE TAG
router.post('/', async function create(req, res) {
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
        const { tagName } = req.body;
        const result = await pool.query('select tagName from tags where tagName=?', tagName);
        if (result.length) {
            res.status(200).json({ registerError: 'tag exists already.' });
        } else {
            await pool.query('insert into tags tagName values (?)', tagName);
            res.sendStatus(201);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET TAG BY ID
router.get('/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select tagName from tags where tagId=?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE TAG BY ID
router.delete('/:id', async function create(req, res) {
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
        await pool.query('delete from tags where tagId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;