import React, { useEffect, useContext, useState } from 'react';
import { useImmer } from 'use-immer';
import { Link, useParams } from 'react-router-dom';
import Container from './Container';
import Axios from 'axios';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import ReplyTweet from './ReplyTweet';
import Loading from './Loading';
import iconSet from '../selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';
import NotFound from './NotFound';

function Profile() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const { username } = useParams();

	const [state, setState] = useImmer({
		followActionLoading: false,
		startFollowingRequestCount: 0,
		stopFollowingRequestCount: 0,

		profileData: {
			username: '...',
			name: '...',
			surname: '...',
			avatar: 'https://gravatar.com/avatar/placeholder?s=128',
			isFollowing: false,
			isVerified: false,
			profileCounts: { postCount: '', followerCount: '', followingCount: '' },
			tweetsData: {
				comments: '',
				retweet: '',
				like: '',
				fav: '',
			},
		},
	});

	const [tweetsData, setTweetsData] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [tweetId, setTweetId] = useState([]);

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': appState.user.token,
		},
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await Axios.get(
					`http://localhost:2000/api/profile/${username}`,
					config
				);

				console.log(res.data);

				if (res.data.userProfile.length === 0) {
					console.log('array is empty');
					appDispatch({ type: 'notFound' });
				} else {
					const { posts, userProfile, isFollowing } = res.data;

					setState((draft) => {
						draft.profileData = {
							username: userProfile[0].username,
							name: userProfile[0].name,
							surname: userProfile[0].surname,
							avatar: userProfile[0].avatar,
							isFollowing: isFollowing,
							isVerified: userProfile[0].isVerified,
							profileCounts: userProfile[0].profileCounts,
						};
					});
					appDispatch({ type: 'clearNotFound' });
					setTweetsData(posts);

					setIsLoading(false);
				}
			} catch (e) {
				console.log(e.message);
			}
		}
		fetchData();
	}, [username]);

	function handleLikeClick(e) {
		e.preventDefault();

		try {
			const res = Axios.put('http://localhost:2000/api/status/like/');
		} catch (e) {
			console.log(e.message);
		}
	}

	function handleReplyTweet(e, post) {
		e.preventDefault();
		appDispatch({
			type: 'openReply',
			data: { post },
		});
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function startFollowing(e) {
		e.preventDefault();
		setState((draft) => {
			draft.startFollowingRequestCount++;
		});
	}

	useEffect(() => {
		if (state.startFollowingRequestCount) {
			setState((draft) => {
				draft.followActionLoading = true;
			});
			async function addFollow() {
				try {
					const res = await Axios.post(
						`http://localhost:2000/api/addFollow/${username}`,
						{},
						config
					);
					setState((draft) => {
						draft.profileData.isFollowing = true;
						draft.profileData.profileCounts.followerCount++;
						draft.followActionLoading = false;
					});

					console.log(res.data);
				} catch (e) {
					console.log(e.message);
				}
			}
			addFollow();
		}
	}, [state.startFollowingRequestCount]);

	useEffect(() => {
		if (state.stopFollowingRequestCount) {
			setState((draft) => {
				draft.followActionLoading = true;
			});
			async function addFollow() {
				try {
					const res = await Axios.post(
						`http://localhost:2000/api/removeFollow/${username}`,
						{},
						config
					);
					setState((draft) => {
						draft.profileData.isFollowing = false;
						draft.profileData.profileCounts.followerCount--;
						draft.followActionLoading = false;
					});

					console.log(res.data);
				} catch (e) {
					console.log(e.message);
				}
			}
			addFollow();
		}
	}, [state.stopFollowingRequestCount]);

	async function stopFollowing(e) {
		e.preventDefault();
		setState((draft) => {
			draft.stopFollowingRequestCount++;
		});
	}

	if (appState.notFound) {
		return <NotFound />;
	}

	return (
		<main className="main-view-profile">
			<div className="user-profile">
				<img
					src="/img/random9.jpeg"
					className="user-profile__cover"
					alt="random pic"
				></img>
				<div className="user-profile__details">
					<img src={state.profileData.avatar} alt="photo profile"></img>
					<h2>
						{state.profileData.name} {state.profileData.surname}{' '}
						{state.profileData.isVerified &&
							state.profileData.username != '...' && (
								<IcomoonReact
									iconSet={iconSet}
									color="#FFFFFF"
									size={20}
									icon="verified"
								/>
							)}
					</h2>
					<span>@{state.profileData.username}</span>
				</div>
			</div>
			<div className="user-profile--btn">
				{appState.user.username === state.profileData.username && (
					<a href="#" className="">
						Edit Profile
					</a>
				)}

				{appState.home &&
					!state.profileData.isFollowing &&
					appState.user.username != state.profileData.username &&
					state.profileData.username != '...' && (
						<Link
							to="/"
							onClick={startFollowing}
							disabled={state.followActionLoading}
							className="follow-btn-profile"
						>
							Follow
						</Link>
					)}

				{appState.home &&
					state.profileData.isFollowing &&
					appState.user.username != state.profileData.username &&
					state.profileData.username != '...' && (
						<Link
							to="/"
							onClick={stopFollowing}
							className="follow-btn-profile unfollow-btn"
						></Link>
					)}
			</div>

			<div className="user-profile--desc">
				<a href="#" className="following gray-color">
					<span>{state.profileData.profileCounts.followingCount}</span>{' '}
					Following
				</a>
				<a href="#" className="followers gray-color">
					<span>{state.profileData.profileCounts.followerCount}</span> Followers
				</a>
			</div>
			<div className="empty-line">
				<nav className="profile-links">
					<a href="#">Tweets</a>
					<a href="#">Tweets & replies</a>
					<a href="#">Media</a>
					<a href="#">Like</a>
				</nav>
			</div>

			{isLoading
				? 'Loading...'
				: tweetsData
						.map((post, index) => {
							return (
								<div key={index} className="main-view__user-feed">
									<img src={post.avatar} alt="image tweet"></img>
									<div className="main-view__user-feed__author">
										<div className="name">
											<h2>
												{post.name} {post.surname}
											</h2>
											<IcomoonReact
												iconSet={iconSet}
												color="#FFFFFF"
												size={20}
												icon="verified"
												className=" verified_profile_posts"
											/>
											<a href="#" className="username__author">
												@{post.username}
											</a>
											<span> 9 June</span>
										</div>
										<Link
											to={`/status/${post._id}`}
											className="author_post-viewpost"
										>
											{post.text}
										</Link>
										<div className="icons">
											<section>
												<li className="top-nav__item top-nav__item--active">
													<Link
														id="reply"
														to="/"
														onClick={(e) => handleReplyTweet(e, post)}
														className="top-nav__link"
													>
														<IcomoonReact
															iconSet={iconSet}
															color="000000"
															size={20}
															icon="bubble2"
														/>
														<span>{post.comments.length}</span>
													</Link>
												</li>
											</section>

											<section>
												<li className="top-nav__item top-nav__item--active">
													<a href="#" className="top-nav__link">
														<IcomoonReact
															iconSet={iconSet}
															color="000000"
															size={20}
															icon="loop2"
														/>
														<span>{post.retweet.length}</span>
													</a>
												</li>
											</section>

											<section>
												<li className="top-nav__item top-nav__item--active">
													<Link
														to="/"
														onClick={handleLikeClick}
														className="top-nav__link"
													>
														<IcomoonReact
															iconSet={iconSet}
															color="000000"
															size={20}
															icon="heart"
														/>
														<span>{post.likes.length}</span>
													</Link>
												</li>
											</section>

											<section>
												<li className="top-nav__item top-nav__item--active">
													<a href="#" className="top-nav__link">
														<svg className="top-nav__icon">
															<use xlinkHref="img/sprite.svg#icon-books"></use>
														</svg>
													</a>
												</li>
											</section>
										</div>
									</div>
								</div>
							);
						})
						.reverse()}
		</main>
	);
}

export default Profile;
