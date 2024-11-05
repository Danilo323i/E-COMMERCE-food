const { body, validationResult } = require('express-validator');

const validateUserBody = [
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('La mail non è corretta'),

    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('La password deve contenere almeno 8 caratteri'),

    body('userName')
        .notEmpty()
        .isString()
        .isLength({ min: 1 })
        .withMessage('Lo username deve contenere almeno 1 carattere'),

    body('isActive')
        .isBoolean()
        .withMessage('isActive deve essere true o false'),

    body('dob')
        .isDate()
        .withMessage('La data di nascita deve essere una data valida'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateUserBody };
