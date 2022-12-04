var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// CREATE COLOR
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
        const { colorName, hexCode } = req.body;
        const result = await pool.query('select colorName from colors where colorName=?', colorName);
        if (result.length) {
            res.status(200).json({ registerError: 'color exists already.' });
        } else {
            await pool.query('insert into colors (colorName,hexCode) values (?,?)', [colorName, hexCode]);
            res.sendStatus(201);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET ALL COLORS
router.get('/', async function (req, res) {
    try {
        const rows = await pool.query('select * from colors');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET COLOR BY ID
router.get('/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select colorName from colors where colorId=?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE COLOR BY ID
router.delete('/:id', async function deleteColor(req, res) {
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
        await pool.query('delete from colors where colorId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;