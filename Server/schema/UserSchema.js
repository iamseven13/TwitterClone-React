const mongoose = require('mongoose');

const UserSchemaMongoose = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	surname: {
		type: String,
		required: true,
		unique: false,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isFollowing: {
		type: Boolean,
		default: false,
	},
	profileCounts: {
		type: Object,
		default: {
			postCount: 0,
			followingCount: 0,
			followerCount: 0,
		},
	},
});

module.exports = UserSchema = mongoose.model('userQuery', UserSchemaMongoose);
