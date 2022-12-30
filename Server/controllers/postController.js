const Post = require('../models/Post');
const PostSchema = require('../schema/PostSchema');
const mongoose = require('mongoose');

exports.createPost = function (req, res) {
	let post = new Post(req.body);
	console.log(req.body);
	post
		.create(req, res)
		.then(function (post) {
			res.send(post);
		})
		.catch(function (err) {
			res.send(err);
		});
};

exports.deletePost = async function (req, res) {
	let post = await PostSchema.findById(req.params.id);
	console.log(post);

	if (post.user.toString() !== req.userDataProfile.id) {
		return res.json({
			message: 'User not authorized',
		});
	} else {
		await PostSchema.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			message: 'Post deleted',
		});
	}

	console.log(post);
	res.json({ post: post });
};

exports.createComment = function (req, res) {
	let post = new Post(req.body);
	console.log(req.body);
	post
		.createComment(req, res)
		.then(function (post) {
			res.send(post);
		})
		.catch(function (err) {
			res.send(err);
		});
};

exports.deleteComment = async function (req, res) {
	console.log(req.params.id);
	try {
		const post = await PostSchema.findById(req.params.id);
		console.log(post);

		// Pull out comment
		const comment = post.comments.find(
			(comment) => comment._id === req.params.comment_id
		);
		// Make sure comment exists
		if (!comment) {
			reject('Comment does not exist');
		}
		// Check user is comment owner
		if (comment.user.toString() !== req.userDataProfile.id) {
			reject('User not authorized');
		}
		// Remove comment
		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.userDataProfile.id);

		post.comments.splice(removeIndex, 1);

		await post.save();
		res.json(post.comments);
	} catch (e) {
		console.log(e.message);
	}
};

exports.getPostData = async function (req, res) {
	const isValid = mongoose.isValidObjectId(req.params.id);

	if (isValid) {
		const post = await PostSchema.findById(req.params.id);
		return res.status(200).json(post);
	} else {
		return res.json({ message: 'Post not found' });
	}

	console.log(post);
};

exports.getAllPosts = async function (req, res) {
	const posts = await PostSchema.find();
	return res.status(200).json(posts);
};
