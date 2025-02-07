const {body} = require('express-validator');

const errors = [
    body('name').isLength({min: 1, max: 50}).withMessage('name length must be between 1 And 51 characters'),
    body('description').notEmpty().withMessage('description is required'),
    body('description').isLength({min: 1, max: 250}).withMessage('description length must be less than 250 characters'),
];


module.exports = errors;