var router = require('express').Router();
const pool = require('../models/db');
const bcrypt = require('bcrypt');

// user routes
router.post('/register', async function create(req, res) {
    try {
        const { name, email, password, picture, isSetter } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const result = await post.query('insert into users (name,email,password,picture,isSetter) values (?,?,?,?,?)', [name, email, encryptedPassword, picture, isSetter]);
        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/login', async function login(req, res) {
    try {
        const { id, password } = req.body;
        const rows = await pool.query('select password from user where userId=?', id);
        if (rows) {
            const isValid = await bcrypt.compare(password, rows[0].password);
            res.status(200).json({ valid_password: isValid });
        }
        res.status(200).send(`User with id ${id} was not found`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select name,email,picture,isSetter from users where userId=?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.put('/:id', async function updateInfo(req, res) {
    try {
        const { name, email, picture, isSetter } = req.body;
        const result = await pool.query('update users (name,email,picture,isSetter) values (?,?,?,?) where userId=?', [name, email, picture, isSetter, req.params.id]);
        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.put('/password', async function updatePw(req, res) {
    try {
        const { id, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('update users set password=? where userId=?', [encryptedPassword, id]);
        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete('/:id', async function deleteUser(req, res) {
    try {
        const result = await pool.query('delete * from users where userId=?', req.params.id);
        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
