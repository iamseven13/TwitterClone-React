const Follow = require('../models/Follow');

exports.addFollow = async (req, res) => {
	let follow = new Follow(req.params.username, req.userDataProfile);
	follow
		.create()
		.then(() => {
			res.status(200).json({
				message: `Followed successfully ${req.params.username}`,
			});
		})
		.catch(() => {
			res.status(500).json({
				message: 'Something went wrong',
			});
		});
};

exports.removeFollow = async (req, res) => {
	let follow = new Follow(req.params.username, req.userDataProfile);
	follow
		.delete()
		.then(() => {
			res.status(200).json({
				message: `Successfully stopped following ${req.params.username}`,
			});
		})
		.catch(() => {
			res.status(500).json({
				message: 'Something went wrong',
			});
		});
};
