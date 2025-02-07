const {body} = require('express-validator');

const errors = [
    body('title').notEmpty().withMessage('title is required'),
    body('status').isIn(['to-do','in-progress','done','canceled']).withMessage('status is not found'),
    body('priority').optional().isIn(['low','medium', 'high']).withMessage('status is not found'),
];


module.exports = errors;