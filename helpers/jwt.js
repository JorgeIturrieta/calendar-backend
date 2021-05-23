const jwt = require('jsonwebtoken');
const generateJTW = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_TOKEN_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }
            resolve(token);
        })
    })
}


module.exports = {
    generateJTW,
}