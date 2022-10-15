const { response } = require('express');
const User = require('../models/user');
const bCrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (request, res = response) => {

    const { email, password } = request.body;

    try {

        const userDb = await User.findOne({ email });



        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msj: 'La cuenta no es valida'
            });
        }

        const validPassword = bCrypt.compareSync(password, userDb.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msj: 'Contraseña no valida'
            });
        }

        const token = await generateJWT(userDb.id, userDb.name, userDb.email);

        res.json({
            ok: true,
            jwt: token,
            msj: "Welcome " + userDb.name
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msj: error
        });
    }
}


module.exports = {
    login
}