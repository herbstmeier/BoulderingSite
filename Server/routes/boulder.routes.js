var router = require('express').Router();
const pool = require('../models/db');

// boulder routes
router.post('/', async function create(req, res) {
    try {
        const { grade, picture } = req.body;
        const result = await pool.query('insert into boulders (grade,picture) values (?,?)', [grade, picture]);
        res.status(200).json({ boulderId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select * from boulders where boulderId = ?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/', async function getAll(req, res) {
    try {
        const rows = await pool.query('select * from boulders');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.put('/:id', async function update(req, res) {
    try {
        const { grade, picture } = req.body;
        const result = await pool.query('update boulders (grade,picture) values (?,?) where boulderId = ?', [grade, picture, req.params.id]);
        res.status(200).json({ boulderId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete('/:id', async function deleteBoulder(req, res) {
    try {
        const result = await pool.query('delete * from boulders where boulderId = ?', req.params.id);
        res.status(200).json({ boulderId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete('/', async function deleteAll(req, res) {
    try {
        const result = await pool.query("delete from boulders");
        res.status(200).json({ affectedRows: result.affectedRows });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;