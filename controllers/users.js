const { response } = require('express');
const User = require('../models/user');

const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });

};


const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email: email });


        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: "La Cuenta de correo ya está registrada."
            });
        }


        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        await user.save();


        res.json({
            ok: true,
            user
        });

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