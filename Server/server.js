//https://github.com/mzuccaroli/express_server_for_angular_example/blob/master/server.js

"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config({path: '.env-local'})

const _environment = process.env.ENVIRONMENT || 'develop';
const _port = 4200;
const _app_folder = 'dist/boulder-site';

const app = express();

var corsOptions = {
    origin: "http://localhost:4201",
    credentials: true
};
app.use(cors(corsOptions));

const userRouter = require('./routes/user.routes');
const boulderRouter = require('./routes/boulder.routes');
const climbRouter = require('./routes/climb.routes');
const setRouter = require('./routes/set.routes');
const ratingRouter = require('./routes/rating.routes');
const commentRouter = require('./routes/comment.routes');
app.use('/users', userRouter);
app.use('/boulders', boulderRouter);
app.use('/climbs', climbRouter);
app.use('/sets', setRouter);
app.use('/ratings', ratingRouter);
app.use('/comments', commentRouter);




// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ---- LIMIT FOR TOO MANY CONNECTIONS ---- //
if (_environment === 'production') {
    const rateLimit = require("express-rate-limit");
    const limiter = rateLimit({
        windowMs: 10000,
        max: 200,
        message: "Too many requests from this IP, please try again"
    });
    app.use(limiter);
}

// ---- REDIRECT TO HTTPS ---- //
if (_environment === 'production') {
    app.enable('trust proxy');
    app.use(function (req, res, next) {
        if (req.secure) {
            next(); // request was via https, so do no special handling
        } else {
            res.redirect(301, 'https://' + req.headers.host + req.url); // request was via http, so redirect to https
        }
    });
}

// ---- REDIRECT NON-WWW REQUESTS ---- //
if (_environment === 'production') {
    app.get('/*', function (req, res, next) {
        if (req.headers.host.match(/^www/) == null) {
            // req.headers.host = "www." + req.headers.host;
            res.redirect('https://www.' + req.headers.host + req.url);
        } else {
            next();
        }
    });
}

// ---- SERVE STATIC FILES ---- //
//app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));

// ---- SERVE APLICATION PATHS ---- //
/*app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, { root: _app_folder });
});*/

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});