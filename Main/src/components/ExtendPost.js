import React, { useContext, useState } from 'react';

import Axios from 'axios';
import { useParams } from 'react-router-dom';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import iconSet from '../selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';
import { Link } from 'react-router-dom';

function ExtendPost() {
	const { id } = useParams();
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function handleCloseReply(e) {
		e.preventDefault();

		appDispatch({ type: 'closeExtendPost' });
	}

	const { _id } = appState.dataExtendPost.tweetPost;

	const [errors, setErrors] = useState([]);

	const [replyTweet, setReplyTweet] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		appDispatch({ type: 'extendPost' });
	}

	async function deletePost(e) {
		e.preventDefault();

		const config = {
			headers: {
				'x-auth-token': appState.user.token,
			},
		};

		try {
			const res = await Axios.delete(
				`http://localhost:2000/api/delete-post/${_id}`,

				config
			);

			appDispatch({ type: 'closeExtendPost' });
			appDispatch({ type: 'dataDeleted' });
			console.log(res.data);
		} catch (e) {
			appDispatch({ type: 'closeExtendPost' });
			appDispatch({ type: 'dataDeleted' });

			console.log(e.message);
		}
	}

	return (
		<div className="extendTweet">
			<div className="inner-box__extendTweet">
				<Link
					onClick={handleCloseReply}
					className="inner-box__closeIcon"
					to="/"
				>
					<IcomoonReact
						className="inner-box__exit-icon"
						iconSet={iconSet}
						color="white"
						size={20}
						icon="x-altx-alt"
					/>
				</Link>

				<div className="inner-box__link-nav">
					<div onClick={deletePost} className="lik-nav__icon">
						<IcomoonReact
							className="inner-box__exit-icon__insideIcon"
							iconSet={iconSet}
							color="red"
							size={20}
							icon="x"
						/>
						<span className="description">Delete</span>
					</div>

					<div className="lik-nav__icon" onClick={(e) => alert('hey')}>
						<IcomoonReact
							className="inner-box__exit-icon__insideIcon"
							iconSet={iconSet}
							color="grey"
							size={20}
							icon="pushpin"
						/>
						<span className="description">Pin to your profile</span>
					</div>

					<div className="lik-nav__icon" onClick={(e) => alert('hey')}>
						<IcomoonReact
							className="inner-box__exit-icon__insideIcon"
							iconSet={iconSet}
							color="grey"
							size={20}
							icon="steam2"
						/>
						<span className="description">Embeed Tweet</span>
					</div>

					<div className="lik-nav__icon" onClick={(e) => alert('hey')}>
						<IcomoonReact
							className="inner-box__exit-icon__insideIcon"
							iconSet={iconSet}
							color="grey"
							size={20}
							icon="cogs"
						/>
						<span className="description">View Tweet Analytics</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExtendPost;
