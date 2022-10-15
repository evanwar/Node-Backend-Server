/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidator } = require('../middlewares/input-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/', [
    jwtValidator
], getUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'Contraseña requerida').not().isEmpty(),
    inputValidator
], createUser);


router.put('/:uid',
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('email', 'El email no es valido').isEmail()
    , updateUser);


router.delete('/:uid', deleteUser);

module.exports = router;