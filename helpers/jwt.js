const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, email) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name,
            email
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error al generar el tokenF');
            } else {
                resolve(token);
            }
        });

    });



}

module.exports = {
    generateJWT
}