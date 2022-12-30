import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useImmer } from 'use-immer';

import Axios from 'axios';
import iconSet from '../selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';

// Context
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function Main() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const [isLoading, setIsLoading] = useState(true);

	const [replyDone, setReplyDone] = useState(false);

	const token = appState.user.token;
	const [submitPost, setSubmitPost] = useState(false);

	const [retrieveLikeStatus, setRetrieveLikeStatus] = useState(false);

	const [text, setText] = useState('');
	const [state, setState] = useImmer({
		followActionLoading: false,

		replyActionLoading: false,

		retweetActionLoading: false,

		likeActionLoading: false,

		profileData: [
			{
				username: '...',
				name: '...',
				surname: '...',
				isVerified: false,
				isFollowing: false,
				avatar: '',
				comments: [],
				likes: [],
				retweet: [],
				hearts: [],
				text: '',
				user: '',
				date: '',
			},
		],
	});

	const letMeTry = Boolean(
		state.profileData[0].likes.find((like) => like.user === appState.user._id)
	);
	console.log(letMeTry);

	function handleChange(e) {
		setText(e.target.value);
	}

	const config = {
		headers: {
			'x-auth-token': appState.user.token,
		},
	};

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const res = await Axios.post(
				'http://localhost:2000/api/create-post',
				{ text: text },
				config
			);
		} catch (e) {
			console.log(e.message);
		}

		setText('');
		setSubmitPost(true);
		appDispatch({ type: 'clearDataDeleted' });
	}

	useEffect(() => {
		async function getTweets() {
			const res = await Axios.get('http://localhost:2000/api/getAllPosts');

			const arrayResData = Object.values(res.data);
			console.log(arrayResData);

			setState((draft) => {
				draft.profileData = arrayResData;
			});
		}

		getTweets();
		setIsLoading(false);
		setSubmitPost(false);
		setReplyDone(false);
	}, [submitPost, appState.dataDeleted, state.likeActionLoading, replyDone]);

	function handleReplyTweet(e, tweetPost) {
		e.preventDefault();

		appDispatch({
			type: 'openReplyMainPage',
			data: { tweetPost, setReplyDone },
		});

		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleExtendTweet(e, tweetPost) {
		e.preventDefault();
		appDispatch({
			type: 'extendPost',
			data: { tweetPost },
		});
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function startLikingTweet(e, tweetPost) {
		e.preventDefault();

		const { _id } = tweetPost;

		try {
			const res = await Axios.put(
				`http://localhost:2000/api/status/like/${_id}`,
				{},
				config
			);
			setState((draft) => {
				draft.likeActionLoading = true;
			});
			console.log(res.data);
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<main className="main-view">
			{isLoading ? (
				'Loading...'
			) : (
				<>
					<div className="main-view__user-tweet">
						<img
							src={appState.user.avatar}
							alt="image tweet"
							className="footer-pic"
						/>
						<form className="main-view__user-tweet__search">
							<textarea
								className="main-view__user-tweet__input"
								value={text}
								maxLength="250"
								placeholder="What is happening?"
								onChange={handleChange}
								autoFocus
							/>
						</form>
						<Link
							onClick={handleSubmit}
							to="/"
							className="main-view__user-tweet__button"
						>
							Tweet
						</Link>
					</div>
				</>
			)}

			{isLoading
				? 'Loading...'
				: state.profileData
						.map((tweetPost, index) => (
							<div key={index} className="main-view__user-feed">
								<img src={tweetPost.avatar} alt="image tweet"></img>
								<div className="main-view__user-feed__author">
									<div className="name">
										<h2>
											{tweetPost.name} {tweetPost.surname}
											{tweetPost.isVerified && tweetPost.username != '...' && (
												<IcomoonReact
													className="top-nav__icon verified__icon__main-page"
													iconSet={iconSet}
													color="#FFFFFF"
													size={22}
													icon="verified"
												/>
											)}{' '}
										</h2>{' '}
										<Link
											to={`/profile/${tweetPost.username}`}
											className="username__author username__main-page"
										>
											@{tweetPost.username}
										</Link>
									</div>

									<Link
										to={`/status/${tweetPost._id}`}
										className="author_post-viewpost author--text"
									>
										{tweetPost.text}
									</Link>

									<div className="icons">
										<section>
											<li className="top-nav__item top-nav__item--active">
												<Link
													onClick={(e) => handleReplyTweet(e, tweetPost)}
													to="/"
													className="top-nav__link"
												>
													<IcomoonReact
														className="top-nav__icon"
														iconSet={iconSet}
														color="ffffff"
														size={20}
														icon="bubble2"
													/>

													<span>{tweetPost.comments.length}</span>
												</Link>
											</li>
										</section>

										<section>
											<li className="top-nav__item top-nav__item--active">
												<a href="#" className="top-nav__link">
													<IcomoonReact
														className="top-nav__icon"
														iconSet={iconSet}
														color="ffffff"
														size={20}
														icon="loop2"
													/>
													<span>{tweetPost.retweet.length}</span>
												</a>
											</li>
										</section>

										<section>
											<li className="top-nav__item top-nav__item--active">
												{state.profileData[0].likes.find(
													(like) => like.user === appState.user._id
												) ? (
													<Link
														onClick={(e) => startLikingTweet(e, tweetPost)}
														to="/"
														className="top-nav__link"
													>
														<IcomoonReact
															className="top-nav__icon"
															iconSet={iconSet}
															color="grey"
															size={20}
															icon="heart"
														/>
														<span>{tweetPost.likes.length}</span>
													</Link>
												) : (
													<Link
														onClick={(e) => startLikingTweet(e, tweetPost)}
														to="/"
														className="top-nav__link"
													>
														<IcomoonReact
															className="top-nav__icon"
															iconSet={iconSet}
															color="red"
															size={20}
															icon="heart"
														/>
														<span>{tweetPost.likes.length}</span>
													</Link>
												)}
											</li>
										</section>

										<section>
											<li className="top-nav__item top-nav__item--active">
												<Link
													to=""
													onClick={(e) => handleExtendTweet(e, tweetPost)}
													className="top-nav__link"
												>
													<IcomoonReact
														className="top-nav__icon"
														iconSet={iconSet}
														color="ffffff"
														size={20}
														icon="books"
													/>
												</Link>
											</li>
										</section>
									</div>
								</div>
							</div>
						))
						.reverse()}
		</main>
	);
}

export default Main;
