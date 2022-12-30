const { body, validationResult } = require('express-validator');
const UserSchema = require('../schema/UserSchema');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let User = function ({ username, password, email, name, surname }) {
	this.name = name;
	this.surname = surname;
	this.username = username;
	this.email = email;
	this.password = password;
};

User.prototype.register = async function (req, res) {
	console.log(req.body);

	try {
		let userQuery = await UserSchema.findOne({
			username: this.username,
		});

		if (userQuery) {
			return res.json('User already exists');
		}

		// Step #2: Get users gravatar
		const avatar = gravatar.url(this.email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});

		userData = new UserSchema({
			name: this.name,
			surname: this.surname,
			username: this.username,
			password: this.password,
			email: this.email,
			avatar: avatar,
		});

		// Step #3: Encrypt Password

		const salt = await bcrypt.genSalt(10); // Generate a salt

		userData.password = await bcrypt.hash(this.password, salt); // Hash the password

		await userData.save();

		const payload = {
			userDataProfile: {
				id: userData.id,
			},
		};

		let userAPI = await UserSchema.findOne({
			username: this.username,
		}).select('-password');

		const {
			date,
			email,
			isFollowing,
			isVerified,
			name,
			surname,
			username,
			_id,
			profileCounts,
		} = userAPI;

		// Step #4: Return jsonwebtoken
		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 3600007 },
			(err, token) => {
				if (err) throw err;
				res.json({
					token,
					date,
					email,
					isFollowing,
					isVerified,
					name,
					surname,
					username,
					_id,
					profileCounts,
					avatar,
				});
			}
		);
	} catch (e) {
		res.send(e.message);
	}
};

User.prototype.getProfileData = async function (req, res) {
	try {
		const userData = await UserSchema.findById(req.userDataProfile.id).select(
			'-password'
		);
		res.json(userData);
	} catch (e) {
		console.log('there was an error');
	}
};

User.prototype.login = async function (req, res) {
	const { loginUsername, loginPassword } = req.body;

	try {
		let userQuery = await UserSchema.findOne({
			username: loginUsername,
		});

		let userAPI = await UserSchema.findOne({
			username: loginUsername,
		}).select('-password');

		if (!userQuery) {
			return res.json('Invalid Credentials');
		}

		const isMatch = await bcrypt.compare(loginPassword, userQuery.password);

		if (!isMatch) {
			return res.json('Invalid Credentials');
		}

		const payload = {
			userDataProfile: {
				id: userQuery.id,
			},
		};
		const {
			avatar,
			date,
			email,
			isFollowing,
			isVerified,
			name,
			surname,
			username,
			_id,
			profileCounts,
		} = userAPI;

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 3600007 },
			(err, token) => {
				if (err) throw err;
				return res.json({
					token,
					avatar,
					date,
					email,
					isFollowing,
					name,
					surname,
					username,
					isVerified,
					_id,
					profileCounts,
				});
			}
		);
	} catch (e) {
		return res.send(e.message);
	}
};

module.exports = User;
