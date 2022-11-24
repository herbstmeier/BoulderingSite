var router = require('express').Router();
const pool = require('../models/db');

// comment routes
router.post("/", async function create(req, res) {
    try {
        const { userId, boulderId, content, date } = req.body;
        const result = await pool.query('insert into comments (userId,boulderId,content,date) values (?,?,?,?)', [userId, boulderId, content, date]);
        res.status(200).json({ commentId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get("/boulder/:id", async function getByBoulder(req, res) {
    try {
        const rows = await pool.query('select * from comments where boulderId=?', req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.put("/:id", async function update(req, res) {
    try {
        const { content } = req.body;
        const result = await pool.query('update comments set content=? where boulderId = ?', [content, req.params.id]);
        res.status(200).json({ commentId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/:id", async function deleteComment(req, res) {
    try {
        const result = await pool.query('delete * from comments where commentId=?', req.params.id);
        res.status(200).json({ commentId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
    try {
        const result = await pool.query('delete * from comments where boulderId=?', req.params.id);
        res.status(200).json({ affectedRows: result.affectedRows });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;