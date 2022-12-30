const { body } = require('express-validator');

const schema = [
	body('name')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 2 chars long'),
	body('surname')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 chars long'),
	body('username')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 chars long'),
	body('password')
		.isLength({ min: 3 })
		.withMessage('Password must be at least 3 chars long'),
	body('email').isEmail().withMessage('Please add a valid email address'),
];

module.exports = schema;
