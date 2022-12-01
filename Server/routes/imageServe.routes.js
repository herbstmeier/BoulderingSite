var router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/:dest/:name', async function getPicture(req, res) {
    try {
        const imgPath = path.join(__dirname, '..', 'storage', 'img', req.params.dest, req.params.name + '.png');
        if (fs.existsSync(imgPath)) {
            res.sendFile(imgPath);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;