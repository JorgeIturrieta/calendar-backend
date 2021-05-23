const { response } = require('express');
const jwt = require('jsonwebtoken');
const validateJwt = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No se proporcionó un token'
        })
    }
    try {

        const { uid, name } = jwt.verify(token, process.env.SECRET_TOKEN_SEED);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido'
        })
    }





    next();

}

module.exports = {
    validateJwt,
}