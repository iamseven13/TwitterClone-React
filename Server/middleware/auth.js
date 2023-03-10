const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Step #1: Get token from header
	const token = req.header('x-auth-token');

	// Step #2: Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// Step #3: Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.userDataProfile = decoded.userDataProfile;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
