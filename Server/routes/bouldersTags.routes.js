var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// REGISTER CONNECTION
// CREATE TAG
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
        const { boulderId, tagId } = req.body;
        await pool.query('insert into boulderstags boulderId,tagId values (?,?)', boulderId, tagId);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET TAGS BY BOULDER ID
router.get('/boulders/:id', async function getByBoulder(req,res){
    try {
        const rows = await pool.query('select from boulderstags tagId where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE CONNECTION
router.delete('/', async function deleteConn(req, res) {
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
        const { boulderId, tagId } = req.body;
        await pool.query('delete from boulderstags where boulderId=?,tagId=?', boulderId, tagId);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;