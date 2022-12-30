const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchemaMongoose = new mongoose.Schema({
	followedId: {
		type: String,
	},
	authorId: {
		type: Schema.Types.ObjectId,

		unique: false,
	},
});

module.exports = UserSchema = mongoose.model(
	'followQuery',
	FollowSchemaMongoose
);
