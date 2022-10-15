const { response } = require('express');
const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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

        const jwt = await generateJWT(user.id, user.name, user.email)

        res.json({
            ok: true,
            user,
            jwt
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }


}


const updateUser = async (req, res = response) => {

    const uid = req.params.uid;

    try {

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }

        const { password, google, email, ...fields } = req.body;

        if (email !== user.email) {
            const existEmail = User.findOne({ email: req.body.email });

            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msj: "La cuenta de correo ya existe."
                });
            }

        }

        fields.email = email;

        const updateUser = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updateUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: "Error inesperado"
        });
    }

}

const deleteUser = async (request, response = response) => {

    const uid = request.params.uid;

    try {

        const user = await User.findById(uid);

        if (!user) {
            return response.status(404).json({
                ok: false,
                msj: "El usuario no existe"
            });
        }

        await User.findByIdAndDelete(uid);

        response.json({
            ok: true,
            msj: "Usuario eliminado"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: "Error inesperado"
        });
    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}