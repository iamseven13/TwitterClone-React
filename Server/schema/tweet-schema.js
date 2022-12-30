const { body } = require('express-validator');

const tweetSchema = [
	body('text')
		.isLength({ min: 1 })
		.withMessage('The tweet cannot be left blank'),
];

module.exports = tweetSchema;
