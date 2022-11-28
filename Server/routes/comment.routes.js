var router = require('express').Router();
const pool = require('../db');
const { validateToken } = require('./authToken');

// POST COMMENT
router.post("/", async function create(req, res) {
    const { userId, boulderId, content, date } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw 'unauthorized request.';
    } catch (error) {
        res.status(401).send(error.message);
    }

    try {
        await pool.query('insert into comments (userId,boulderId,content,dateCommented) values (?,?,?,?)', [userId, boulderId, content, date]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET COMMENT BY BOULDER ID
router.get("/boulder/:id", async function getByBoulder(req, res) {
    // CHECKING AUTHORIZATION = LOGGED IN
    try {
        validateToken(req.headers.authorization);
    } catch (error) {
        res.status(401).send(error.message);
    }

    try {
        const rows = await pool.query('select * from comments where boulderId=?', req.params.id);
        const usernames = [];
        rows.forEach(async row => {
            usernames.push(await pool.query('select username from users where userId =', row.userId));
        });
        res.status(200).json(rows, usernames);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// UPDATE COMMENT BY ID
router.put("/:id", async function update(req, res) {
    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        const authorId = await pool.query('select userId from comments where commentId=?', req.params.id);
        if (token.sub != authorId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
    }

    try {
        const { content } = req.body;
        await pool.query('update comments set content=? where commentId = ?', [content, req.params.id]);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE COMMENT BY ID
router.delete("/:id", async function deleteComment(req, res) {
    // CHECKING AUTHORIZATION = USER ID MATCH or ADMIN
    try {
        const token = validateToken(req.headers.authorization);
        const row = await pool.query('select isAdmin from users where userId=?', token.sub);
        const authorId = await pool.query('select userId from comments where commentId=?', req.params.id);
        if ((token.sub != authorId) && !row[0].isAdmin) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
    }

    try {
        const result = await pool.query('delete from comments where commentId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE COMMENTS BY BOULDER ID
router.delete("/boulder/:id", async function deleteByBoulder(req, res) {
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
        const result = await pool.query('delete from comments where boulderId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;