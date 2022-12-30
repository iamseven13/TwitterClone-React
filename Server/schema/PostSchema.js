const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchemaMongoose = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'userQuery',
	},
	text: {
		type: String,
	},
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	username: {
		type: String,
	},
	avatar: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		ref: 'userQuery',
	},
	isFollowing: {
		type: Boolean,
		ref: 'userQuery',
	},

	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'userQuery',
			},
		},
	],
	hearts: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'userQuery',
			},
		},
	],
	retweet: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'userQuery',
			},
		},
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'userQuery',
			},

			text: {
				type: String,
			},
			name: {
				type: String,
			},
			surname: {
				type: String,
			},
			username: {
				type: String,
			},
			isVerified: {
				type: Boolean,
			},
			isFollowing: {
				type: Boolean,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = PostSchema = mongoose.model('postQuery', PostSchemaMongoose);
