const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { inputValidator } = require('../middlewares/input-validator');

const router = Router();

router.get('/', [
    check('email', "Correo es obligatorio").isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    inputValidator
], login);

module.exports = router;