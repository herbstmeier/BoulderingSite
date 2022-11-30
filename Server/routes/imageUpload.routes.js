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

async function uploadFile(file, subdir, imgName) {
    const tempPath = file.path;
    const fileType = path.extname(file.originalname).toLowerCase();
    if ((fileType != '.png') && (fileType != '.jpg')) {
        fs.unlinkSync(tempPath);
        throw new Error('wrong file type. only png and jpg allowed.');
    }
    const targetPath = path.join(__dirname, '..', 'storage', 'img', subdir, imgName + fileType);
    fs.renameSync(tempPath, targetPath);
    if (fileType == '.jpg') {
        await jimp.read(targetPath, (err, f) => {
            f.write(path.join(__dirname, '..', 'storage', 'img', subdir, imgName + '.png'));
            fs.rmSync(targetPath);
        })
    }
}

router.post('/:dest/:id', upload.single('image'), async (req, res) => {
    try {
        if (req.params.dest == 'boulders') {
            // CHECKING AUTHORIZATION = ADMIN or SETTER
            const token = validateToken(req.headers.authorization);
            const row = await pool.query('select isSetter,isAdmin from users where=?', token.sub);
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
        const filename = crypto.randomBytes(10).toString('hex');
        uploadFile(req.file, req.params.dest, filename);

        // check if user/boulder already had a picture and delete the old one
        var oldName
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
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:dest/:id/:name', async function deletePicture(req, res) {
    try {
        if (req.params.dest == 'boulders') {
            // CHECKING AUTHORIZATION = ADMIN or SETTER
            const token = validateToken(req.headers.authorization);
            const row = await pool.query('select isSetter,isAdmin from users where=?', token.sub);
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
        fs.rmSync(path.join(__dirname, '..', 'storage', 'img', req.params.dest, req.params.name + '.png'));
        if (req.params.dest == 'boulders') {
            await pool.query('update boulders set picture=? where boulderId=?', [null, req.params.id]);
        } else if (req.params.dest == 'users') {
            await pool.query('update users set picture=? where userId=?', [null, req.params.id]);
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;