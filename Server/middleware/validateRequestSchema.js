const { validationResult } = require('express-validator');
const { NextFunction, Request, Response } = require('express');
const User = require('../models/User');

// function validateRequest(Request, Response, NextFunction) {
// 	const errors = validationResult(Request);
// 	if (!errors.isEmpty()) {
// 		return res.status(422).json({ errors: errors.array() });
// 	}
// 	NextFunction();
// }

exports.validateRequest = (Request, Response, NextFunction) => {
	const errors = validationResult(Request);
	if (!errors.isEmpty()) {
		return Response.json({ errors: errors.array() });
	}
	NextFunction();
};
