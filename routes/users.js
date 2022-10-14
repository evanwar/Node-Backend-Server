/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidator } = require('../middlewares/input-validator');

const { getUsers, createUser } = require('../controllers/users')

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'Contraseña requerida').not().isEmpty(),
    inputValidator
], createUser);

module.exports = router;