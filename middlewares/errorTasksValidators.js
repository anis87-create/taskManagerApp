const {body} = require('express-validator');

const errors = [
    body('title').notEmpty().withMessage('title is required'),
    body('status').isIn(['To Do','In Progress','Completed']).withMessage('status is not found'),
    body('priority').optional().isIn(['Low','Medium', 'High']).withMessage('priority is not found'),
];


module.exports = errors;