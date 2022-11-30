var router = require('express').Router();
const path = require('path');

router.get('/:dest/:name', async function getPicture(req, res) {
    if (req.params.name != 'null.png') {
        res.sendFile(path.join(__dirname, '..', 'storage', 'img', req.params.dest, req.params.name));
    } else {
        res.sendStatus(200);
    }
});

module.exports = router;