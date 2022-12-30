const { body, validationResult } = require('express-validator');

const PostSchema = require('../schema/PostSchema');
const UserSchema = require('../schema/UserSchema');

let Post = function (data) {
	this.data = data;
	this.errors = [];
};

// Post.prototype.cleanUp = function () {
// 	// if (typeof this.data.text != 'string') {
// 	// 	this.data.text = '';
// 	// }

// 	// get rid of any bogus properties
// 	this.data = {
// 		text: this.data.trim(),
// 		createdDate: new Date().toLocaleDateString('en-UK').replace(/\//g, '-'),
// 	};
// };

// Post.prototype.validate = function () {
// 	if (this.data.text == '') {
// 		this.errors.push('You must provide post content.');
// 	}
// };

Post.prototype.create = async function (req, res) {
	return new Promise(async (resolve, reject) => {
		if (!this.errors.length) {
			// save post into database

			const user = await UserSchema.findById(req.userDataProfile.id).select(
				'-password'
			);

			const newPost = new PostSchema({
				text: req.body.text,
				name: user.name,
				surname: user.surname,
				username: user.username,
				avatar: user.avatar,
				user: req.userDataProfile.id,
				isVerified: user.isVerified,
				isFollowing: user.isFollowing,
			});

			const post = await newPost.save();

			resolve(post);
		} else {
			reject(this.errors);
		}
	});
};

Post.prototype.createComment = async function (req, res) {
	return new Promise(async (resolve, reject) => {
		if (!this.errors.length) {
			// save post into database
			console.log(req.body);

			const user = await UserSchema.findById(req.userDataProfile.id).select(
				'-password'
			);

			const post = await PostSchema.findById(req.params.id);

			const newComment = {
				isVerified: user.isVerified,
				isFollowing: user.isFollowing,
				text: req.body.text,
				name: user.name,
				surname: user.surname,
				username: user.username,
				avatar: user.avatar,

				user: req.userDataProfile.id,
			};

			post.comments.unshift(newComment);
			await post.save();

			resolve(post);
		} else {
			reject(this.errors);
		}
	});
};

Post.prototype.deleteComment = async function (req, res) {
	return new Promise(async (resolve, reject) => {
		if (!this.errors.length) {
			const post = await PostSchema.findById(req.params.id).exec();
			console.log(post);

			// Pull out comment
			const comment = post.comments.find(
				(comment) => comment.id === req.params.comment_id
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
			resolve(post.comments);
		} else {
			reject(this.errors);
		}
	});
};

module.exports = Post;
