var router = require('express').Router();
const pool = require('../db');
const crypto = require('crypto');
const { createToken, validateToken } = require('./authToken');

function genAuthLevel(set, adm) {
    if (adm) {
        return 3;
    } else if (set) {
        return 2;
    } else {
        return 1;
    }
}

// LOGIN
router.post('/login', async function login(req, res) {
    try {
        const { username, password } = req.body;
        var id = 0;
        var authLevel;
        const rows = await pool.query('select userId,encryptedPassword,salt,isSetter,isAdmin from users where username=?', username);
        if (!rows.length) {
            // register new user
            const salt = crypto.randomBytes(16);
            const encryptedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
            const data = await pool.query('insert into users (username,encryptedPassword,salt,isSetter,isAdmin) values (?,?,?,0,0)', [username, encryptedPassword, salt]);
            id = Number(data.insertId);
            authLevel = 1;
        } else {
            // login existing user
            const _key = crypto.pbkdf2Sync(password, rows[0].salt, 10000, 64, 'sha512');
            if (!crypto.timingSafeEqual(_key, rows[0].encryptedPassword)) {
                res.status(200).send(`bad password.`);
                return;
            }
            id = rows[0].userId;
            authLevel = genAuthLevel(rows[0].isSetter, rows[0].isAdmin);
        }
        const token = createToken(id);
        res.status(201).json({ token: token, id: id, username: username, authLevel: authLevel, expiresIn: Date.now() / 1000 + 3600 });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET ALL USERS
router.get('/', async function getAll(req, res) {
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
        const rows = await pool.query('select userId,username,picture,isSetter,isAdmin from users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET ALL SETTERS
router.get('/setters', async function getSetters(req, res) {
    try {
        const rows = await pool.query('select userId,username from users where isSetter=1');
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET USER BY ID
router.get('/id/:id', async function getById(req, res) {
    try {
        const rows = await pool.query('select userId,username,picture,isSetter,isAdmin from users where userId=?', req.params.id);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET USER BY USERNAME
router.get('/:username', async function getById(req, res) {
    try {
        const rows = await pool.query('select userId,username,picture,isSetter,isAdmin from users where username=?', req.params.username);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// UPDATE USER INFO
router.put('/', async function updateInfo(req, res) {
    const { userId, username, picture, isSetter } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != userId) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('update users set username=?,picture=?,isSetter=? where userId=?', [username, picture, isSetter, userId]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// UPDATE USER PASSWORD
router.put('/password', async function updatePw(req, res) {
    const { id, password } = req.body;

    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != id) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const salt = await pool.query('select salt from users where userId=?', id);
        const encryptedPassword = crypto.pbkdf2Sync(password, salt[0].salt, 10000, 64, 'sha512');
        await pool.query('update users set encryptedPassword=? where userId=?', [encryptedPassword, id]);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE USER
router.delete('/:id', async function deleteUser(req, res) {
    // CHECKING AUTHORIZATION = USER ID MATCH
    try {
        const token = validateToken(req.headers.authorization);
        if (token.sub != req.params.id) throw new Error('unauthorized request.');
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        await pool.query('delete from users where userId=?', req.params.id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE ALL USERS
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
        await pool.query('delete from users');
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
