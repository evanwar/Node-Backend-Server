const { response } = require('express');

const jwt = require('jsonwebtoken');

const jwtValidator = (req, res = response, next) => {

    const token = req.headers['x-token'];


    if (!token) {
        return res.status(401).json({
            ok: false,
            msj: "Error con el token"
        });
    }


    try {

        const info = jwt.verify(token, process.env.JWT_SECRET);

        req.info = info;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msj: "Token no válido"
        });
    }


}


module.exports = {
    jwtValidator
}