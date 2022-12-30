const { body } = require('express-validator');

const loginSchema = [
	body('loginUsername')
		.isLength({ min: 3 })
		.withMessage('Username cannot be left blank'),
	body('loginPassword').exists().withMessage('Password is required'),
];

module.exports = loginSchema;
