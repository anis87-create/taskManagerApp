const {body} = require('express-validator');
const errors = [
    body('username').isLength({min: 1, max: 50}).withMessage('username length must be must be between 1 And 51 characters'),
    body('password').isLength({min: 1, max: 50}).withMessage('password length must be must be between 1 And 51 characters'),
    body('email').isEmail().withMessage('email format is wrong'),

];

module.exports = errors;