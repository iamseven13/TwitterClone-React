const express = require('express');
const router = express.Router();
const { validateRequest } = require('./middleware/validateRequestSchema.js');
const schema = require('./schema/register-schema.js');
const auth = require('./middleware/auth');
const loginSchema = require('./schema/login-schema.js');
const tweetSchema = require('./schema/tweet-schema.js');

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const followController = require('./controllers/followController');
// @route GET /
// @desc Home page
// @access Public
router.get('/', userController.home);

// @route POST /
// @desc Register user
// @access Public
router.post('/api/register', schema, validateRequest, userController.register);

// @route GET /
// @desc Home page
// @access Private
router.get('/api/auth', auth, userController.getProfileData);

// @route POST /
// @desc Authenticate user
// @access Public
router.post('/api/auth', loginSchema, validateRequest, userController.login);

// @Route Post /api/create-post
// @desc Create a post
// @access Private
router.post(
	'/api/create-post',
	auth,
	validateRequest,
	postController.createPost
);

// @Route Delete /api/delete-post/:id
// @desc Delete a post
// @access Private
router.delete(
	'/api/delete-post/:id',
	auth,

	postController.deletePost
);

// @Route Post /api/:id
// @desc Get user profile data
// @access Public
// @Find posts by user id
router.get(
	'/api/profile/:id',
	auth,
	userController.sharedProfileData,
	userController.findPostsById
);

// @Route PUT /api/status/:id
// @desc Like a post
// @access Public
router.put('/api/status/like/:id', auth, userController.likePost);

// @Route PUT /api/status/:id
// @desc Like a post
// @access Public
router.put('/api/status/unlike/:id', auth, userController.unlikePost);

// @Route Post /api/status/comment/:id
// @desc Create a comment
// @access Private
router.post(
	'/api/status/comment/:id',
	auth,
	tweetSchema,
	validateRequest,
	postController.createComment
);

// @Route Delete /api/status/comment/:id/:comment_id
// @desc Delete a comment
// @access Private
router.delete(
	'/api/status/comment/:id/:comment_id',
	auth,
	postController.deleteComment
);

// @Route Get Post Data /api/status/:id
// @desc Get Post Data
// @access Public
router.get(
	'/api/status/:id',

	postController.getPostData
);

// @Route Get all posts on database
// @desc Get all posts
// @access Public
router.get('/api/getAllPosts', postController.getAllPosts);

// @Route Get all users on database
// @desc Get all users
// @access Public
router.get('/api/getAllUsers', userController.getAllUsers);

// Follow related routes
router.post(
	'/api/addFollow/:username',
	auth,

	followController.addFollow
);

router.post(
	'/api/removeFollow/:username',
	auth,

	followController.removeFollow
);

module.exports = router;
