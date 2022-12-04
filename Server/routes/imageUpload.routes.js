//https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

const multer = require('multer');
var router = require('express').Router();
const pool = require('../db');
const fs = require('fs');
const path = require('path');
const { validateToken } = require('./authToken');
const jimp = require('jimp');
const crypto = require('crypto');

const upload = multer({
    dest: path.join(__dirname, '..', 'storage', 'img', 'temp')
});

router.post('/:dest/:id', upload.single('image'), async (req, res) => {
    try {
        if (req.params.dest == 'boulders') {
            // CHECKING AUTHORIZATION = ADMIN or SETTER
            const token = validateToken(req.headers.authorization);
            const row = await pool.query('select isSetter,isAdmin from users where userId=?', token.sub);
            if (!(row[0].isAdmin || row[0].isSetter)) throw new Error('unauthorized request.');
        } else if (req.params.dest == 'users') {
            // CHECKING AUTHORIZATION = USER ID MATCH
            const token = validateToken(req.headers.authorization);
            if (token.sub != req.params.id) throw 'unauthorized request.';
        }
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const fileType = path.extname(req.file.originalname).toLowerCase();
        if ((fileType != '.png') && (fileType != '.jpg')) {
            fs.unlinkSync(tempPath);
            throw new Error('wrong file type. only png and jpg allowed.');
        }

        const filename = crypto.randomBytes(10).toString('hex');
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, '..', 'storage', 'img', req.params.dest, filename + '.png');

        jimp.read(tempPath,async (err, f) => {
            await f.writeAsync(targetPath);
            fs.rmSync(tempPath);

            // check if user/boulder already had a picture and delete the old one
            var oldName;
            if (req.params.dest == 'boulders') {
                oldName = await pool.query('select picture from boulders where boulderId=?', req.params.id);
            } else if (req.params.dest == 'users') {
                oldName = await pool.query('select picture from users where userId=?', req.params.id);
            }
            oldName = oldName[0].picture;
            if (oldName != null && oldName != '') {
                fs.rmSync(path.join(__dirname, '..', 'storage', 'img', req.params.dest, oldName + '.png'));
            }

            // update db
            if (req.params.dest == 'boulders') {
                await pool.query('update boulders set picture=? where boulderId=?', [filename, req.params.id]);
            } else if (req.params.dest == 'users') {
                await pool.query('update users set picture=? where userId=?', [filename, req.params.id]);
            }
            res.status(200).json(filename);
        });


    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:dest/:id/:name', async function deletePicture(req, res) {
    try {
        if (req.params.dest == 'boulders') {
            // CHECKING AUTHORIZATION = ADMIN or SETTER
            const token = validateToken(req.headers.authorization);
            const row = await pool.query('select isSetter,isAdmin from users where userId=?', token.sub);
            if (!(row[0].isAdmin || row[0].isSetter)) throw new Error('unauthorized request.');
        } else if (req.params.dest == 'users') {
            // CHECKING AUTHORIZATION = USER ID MATCH
            const token = validateToken(req.headers.authorization);
            if (token.sub != req.params.id) throw 'unauthorized request.';
        }
    } catch (error) {
        res.status(401).send(error.message);
        return;
    }

    try {
        const imgPath = path.join(__dirname, '..', 'storage', 'img', req.params.dest, req.params.name + '.png');
        if (fs.existsSync(imgPath)) {
            fs.rmSync(imgPath);
            if (req.params.dest == 'boulders') {
                await pool.query('update boulders set picture=? where boulderId=?', [null, req.params.id]);
            } else if (req.params.dest == 'users') {
                await pool.query('update users set picture=? where userId=?', [null, req.params.id]);
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;