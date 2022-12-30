const User = require('../models/User');
const UserSchema = require('../schema/UserSchema');
const PostSchema = require('../schema/PostSchema');
const FollowSchema = require('../schema/FollowSchema');
const Follow = require('../models/Follow');

exports.getProfileData = async function (req, res) {
	let user = new User(req.body);

	user.getProfileData(req, res);
};

exports.login = async function (req, res) {
	let user = new User(req.body);

	const { loginUsername, loginPassword } = req.body;
	console.log(loginUsername, loginPassword);

	user.login(req, res);
};

exports.logout = function () {};

exports.register = async function (req, res) {
	let user = new User(req.body);

	await user.register(req, res);
};

exports.home = function (req, res) {
	res.send('API is Up and Running');
};

exports.findPostsById = async function (req, res) {
	try {
		let posts = await PostSchema.find({ username: req.params.id });
		let userProfile = await UserSchema.find({ username: req.params.id }).select(
			'-password'
		);
		console.log(userProfile);
		res.json({ userProfile, posts, isFollowing: req.isFollowing });
	} catch (e) {
		console.log(e.message);
	}
};

exports.likePost = async function (req, res) {
	try {
		const post = await PostSchema.findById(req.params.id);

		if (
			post.likes.filter(
				(like) => like.user.toString() === req.userDataProfile.id
			).length > 0
		) {
			return res.json({ msg: 'Post already liked' });
		}

		post.likes.unshift({ user: req.userDataProfile.id });
		await post.save();
		return res.json(post.likes);
	} catch (e) {
		console.log(e.message);
	}
};

exports.unlikePost = async function (req, res) {
	try {
		const post = await PostSchema.findById(req.params.id);

		if (
			post.likes.filter(
				(like) => like.user.toString() === req.userDataProfile.id
			).length === 0
		) {
			return res.status(400).json({ msg: 'Post has not yet been liked' });
		}

		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.userDataProfile.id);

		post.likes.splice(removeIndex, 1);

		await post.save();
		res.json(post.likes);
	} catch (e) {
		console.log(e.message);
	}
};

exports.sharedProfileData = async function (req, res, next) {
	let isFollowing = false;
	console.log(req.userDataProfile.id);
	console.log(req.params.id);
	if (req.userDataProfile) {
		isFollowing = await Follow.isVisitorFollowing(
			req.userDataProfile.id,
			req.params.id
		);
	}
	req.isFollowing = isFollowing;

	next();
};

exports.getAllUsers = async function (req, res) {
	const users = await UserSchema.find().select(
		'-password -email -profileCounts'
	);
	if (users) {
		return res.json(users);
	} else {
		return res.status(404).json({ msg: 'No users found' });
	}
};
