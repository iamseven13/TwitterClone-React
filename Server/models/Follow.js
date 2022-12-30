const FollowSchema = require('../schema/FollowSchema');
const UserSchema = require('../schema/UserSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let Follow = function (followedUsername, authorId) {
	this.followedUsername = followedUsername;
	this.authorId = authorId;
	this.errors = [];
};

Follow.prototype.validate = async function (action) {
	// followedUsername must exist in the database
	try {
		let followedUsername = await UserSchema.findOne({
			username: this.followedUsername,
		});

		if (followedUsername) {
			this.followedId = followedUsername._id;
		} else {
			this.errors.push('User not found');
		}

		let doesFollowAlreadyExist = await FollowSchema.findOne({
			followedId: this.followedId,
			authorId: ObjectId(this.authorId),
		});

		if (action == 'create') {
			if (doesFollowAlreadyExist) {
				this.errors.push('Already following');
			}
		}

		if (action == 'delete') {
			if (!doesFollowAlreadyExist) {
				this.errors.push(
					'You cannot stop following a user that you are not following'
				);
			}
		}
	} catch (e) {
		console.log(e.message);
	}
};

Follow.prototype.create = async function () {
	return new Promise(async (resolve, reject) => {
		await this.validate('create');
		if (!this.errors.length) {
			await FollowSchema.create({
				followedId: this.followedId,
				authorId: ObjectId(this.authorId),
			});
			resolve();
		} else {
			reject(this.errors);
		}
	});
};

Follow.isVisitorFollowing = async function (followedId2, visitorId) {
	let visitor = await UserSchema.findOne({
		username: visitorId,
	});

	if (visitor) {
		visitorId = visitor._id;
	}

	let followDoc = await FollowSchema.findOne({
		authorId: followedId2,
		followedId: visitorId,
	});

	if (followDoc) {
		return true;
	} else {
		return false;
	}
};

Follow.prototype.delete = async function () {
	return new Promise(async (resolve, reject) => {
		await this.validate('delete');
		if (!this.errors.length) {
			await FollowSchema.deleteOne({
				followedId: this.followedId,
				authorId: ObjectId(this.authorId),
			});
			resolve();
		} else {
			reject(this.errors);
		}
	});
};

module.exports = Follow;
