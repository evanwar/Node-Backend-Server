const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });

};


const createUser = async (req, res = response) => {

    const { email} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msj: errors.mapped()
        });
    }

    try {

        const emailExist = User.findOne({ email });


        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: "La Cuenta de correo ya está registrada."
            });
        }

        res.json({
            ok: true,
            user
        });


        const user = new User(req.body);
        await user.save();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }


}

module.exports = {
    getUsers,
    createUser
}