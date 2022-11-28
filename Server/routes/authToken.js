//https://blog.angular-university.io/angular-jwt-authentication/
//http://www.passportjs.org/docs/

const jwt = require('jsonwebtoken');
const fs = require("fs");

function createToken(id) {
    const secret = fs.readFileSync(__dirname + '/secret.key');
    return jwt.sign({}, secret, { algorithm: 'HS256', expiresIn: '1h', subject: id.toString(10) });
}

function validateToken(token) {
    const secret = fs.readFileSync(__dirname + '/secret.key');
    return jwt.verify(token, secret, { algorithms: ['HS256'] });
}

module.exports = {createToken, validateToken};