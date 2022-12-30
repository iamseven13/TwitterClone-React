import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import StateContext from '../StateContext';
import NotFound from './NotFound';
import iconSet from '../selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';

function ViewPost() {
	const { id } = useParams();
	const [postData, setPostData] = useState([
		{
			_id: '...',
			username: '...',
			avatar: '...',
			date: '...',
			text: '...',
			image: '...',
			likes: [],
			hearts: [],
			retweet: [],
			user: '...',
			isFollowing: 'false',
			isVerified: 'false',
			comments: [{ test: 'test' }],
			name: '...',
			surname: '...',
		},
	]);

	const [isLoading, setIsLoading] = useState(true);
	const appState = useContext(StateContext);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await Axios.get(`http://localhost:2000/api/status/${id}`);
				console.log(res.data);

				if (!res.data.message) {
					setPostData(res.data);
					setIsLoading(false);
				} else {
					setIsLoading(true);
				}
			} catch (e) {
				console.log(e.message);
			}
		}

		fetchData();
	}, [id]);

	return (
		<main className="main-view">
			{isLoading ? (
				'Loading...'
			) : (
				<div>
					<div className="main-view__user-feed viewpost">
						<div className="main-view__user-feed__author viewpost__redone">
							<div className="viewpost__name">
								<img
									src={postData.avatar}
									alt="image tweet"
									className="img__viewpost"
								></img>
							</div>
							<h2 className="viewpost__name__surname">
								{postData.name} {postData.surname}
							</h2>
							<Link
								to={`/${postData.username}`}
								className="username__author__viewpost"
							>
								@{postData.username}
							</Link>

							<a href="#" className="author_post__viewpost">
								{postData.text}
							</a>

							<div className="author__stats">
								<a href="#">
									<span>4</span> Retweets
								</a>
								<a href="#">
									<span>3</span> Likes
								</a>
								<a href="#">
									<span>2</span> Quote Tweets
								</a>
							</div>
							<div className="icons__viewpost">
								<section>
									<li className="top-nav__item top-nav__item--active">
										<Link to="/" className="top-nav__link">
											<IcomoonReact
												className="top-nav__icon"
												iconSet={iconSet}
												color="ffffff"
												size={20}
												icon="bubble2"
											/>

											<span>0</span>
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
											<span>3</span>
										</a>
									</li>
								</section>

								<section>
									<li className="top-nav__item top-nav__item--active">
										<Link to="/" className="top-nav__link">
											<IcomoonReact
												className="top-nav__icon"
												iconSet={iconSet}
												color="ffffff"
												size={20}
												icon="heart"
											/>
											<span>2</span>
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
												icon="books"
											/>
										</a>
									</li>
								</section>
							</div>
						</div>
					</div>
					<div className="main-view__user-tweet viewpost__textarea">
						<img src={appState.user.avatar} alt="image tweet" />
						<form action="#" className="main-view__user-tweet__search">
							<textarea
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
						<a href="#" className="main-view__user-tweet__button">
							Reply
						</a>
					</div>
				</div>
			)}

			{isLoading ? (
				<NotFound />
			) : (
				postData.comments.map((comment) => {
					return (
						<div className="main-view__user-feed">
							<img src={comment.avatar} alt="image tweet"></img>
							<div className="main-view__user-feed__author">
								<div className="name">
									<h2>
										{comment.name} {comment.surname}
									</h2>
									<Link
										to={`/${comment.username}`}
										className="username__author"
									>
										@{comment.username}
									</Link>
								</div>
								<p className="reply-p">
									Replying to{' '}
									<Link to={`/profile/${postData.username}`}>
										@{postData.username}
									</Link>
								</p>
								<a href="#" className="author_post">
									{comment.text}
								</a>
								<div className="icons">
									<section>
										<li className="top-nav__item top-nav__item--active">
											<Link to="/" className="top-nav__link">
												<IcomoonReact
													className="top-nav__icon"
													iconSet={iconSet}
													color="ffffff"
													size={20}
													icon="bubble2"
												/>
												<span>2</span>
											</Link>
										</li>
									</section>

									<section>
										<li className="top-nav__item top-nav__item--active">
											<Link to="/" className="top-nav__link">
												<IcomoonReact
													className="top-nav__icon"
													iconSet={iconSet}
													color="ffffff"
													size={20}
													icon="loop2"
												/>
												<span>2</span>
											</Link>
										</li>
									</section>

									<section>
										<li className="top-nav__item top-nav__item--active">
											<Link to="/" className="top-nav__link">
												<IcomoonReact
													className="top-nav__icon"
													iconSet={iconSet}
													color="ffffff"
													size={20}
													icon="heart"
												/>
												<span>2</span>
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
			)}
		</main>
	);
}

export default ViewPost;
