const jwt = require('jsonwebtoken');
const secret = 'shhhhh';

function createToken(data) {
    console.log("Ctoken",data)
    return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            console.log("data",data)
            console.log("VToken",token)
            if (err) { reject(err); return; }
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}