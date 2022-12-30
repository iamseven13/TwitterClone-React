import React, { useContext, useState } from 'react';

import Axios from 'axios';
import { useParams } from 'react-router-dom';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

import { Link } from 'react-router-dom';

function ReplyTweetMainPage() {
	const { id } = useParams();
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function handleCloseReply(e) {
		e.preventDefault();

		appDispatch({ type: 'closeReplyMainPage' });
	}

	console.log(appState.replyTweetMainPage);

	const { text, avatar, name, surname, username, _id } =
		appState.replyTweetMainPage.tweetPost;

	const [replyTweetMainPage, setReplyTweetMainPage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': appState.user.token,
			},
		};

		try {
			const res = await Axios.post(
				`http://localhost:2000/api/status/comment/${_id}`,
				{
					text: replyTweetMainPage,
				},
				config
			);
			appState.replyTweetMainPage.setReplyDone(true);
			appDispatch({ type: 'closeReplyMainPage' });
		} catch (e) {
			console.log(e.message);
		}
	}

	return (
		<div className="replyTweet">
			<div className="inner-box">
				<div className="replyTweet--exit">
					<Link onClick={handleCloseReply} to="/">
						X
					</Link>
				</div>
				<div className="tweet-info">
					<div>
						<img src={avatar} alt="image tweet" className="img__viewpost"></img>
						<h2>
							{name} {surname}
						</h2>
					</div>
					<div>
						<a href="#" className="username">
							@{username}
						</a>
					</div>
					<a href="#" className="text">
						{text}
					</a>
				</div>

				<div className="main-view__user-tweet viewpost__textarea">
					<img src={appState.user.avatar} alt="image tweet" />
					<form action="#" className="main-view__user-tweet__search">
						<textarea
							onChange={(e) => setReplyTweetMainPage(e.target.value)}
							maxLength="250"
							id="textBox1"
							name="content"
							TextMode="MultiLine"
							className="main-view__user-tweet__input"
							onKeyUp=""
							onKeyDown=""
							placeholder="Tweet your reply"
						></textarea>
					</form>
					<a
						onClick={handleSubmit}
						href="#"
						className="main-view__user-tweet__button"
					>
						Reply
					</a>
				</div>
			</div>
		</div>
	);
}

export default ReplyTweetMainPage;
