import React, { useEffect, useState } from 'react';

import Container from './Container';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function RightSideBar() {
	const [newsData, setNewsData] = useState([]);
	const [usersRecommended, setUsersRecommended] = useState([]);

	const API_KEY = 'e592cb7146a34ddfa04ea06428ae1acf';

	useEffect(() => {
		async function fetchDataNews() {
			const res = await Axios.get(
				`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
			);

			setNewsData(res.data.articles);
		}
		fetchDataNews();
	}, []);

	useEffect(() => {
		async function fetchAllUsers() {
			const res = await Axios.get('http://localhost:2000/api/getAllUsers');

			setUsersRecommended(res.data);
		}
		fetchAllUsers();
	}, []);

	console.log(usersRecommended);

	return (
		<main className="second-view">
			<div className="right-sidebar">
				<h2>What's happening?</h2>
			</div>
			<div className="right-follow">
				<li>
					{newsData.slice(0, 7).map((news, index) => (
						<ul key={index}>
							<Link to="">{news.title}</Link>
						</ul>
					))}
				</li>

				<a href="#" className="btn-bottom">
					Show More
				</a>
			</div>

			<div className="right-footer">
				<h2>Who to follow?</h2>

				{usersRecommended
					.slice(2, 5)
					.map((user, index) => (
						<div key={index} className="author1">
							<img
								src={user.avatar}
								alt="author 2"
								className="right-footer__img"
							></img>
							<a href="#" className="author1__name">
								{user.name} {user.surname}
							</a>
							<span>@{user.username}</span>
							<a className="btn-follow" href="#">
								Follow
							</a>
						</div>
					))
					.reverse()}

				<a href="#" className="btn-bottom">
					Show More
				</a>
			</div>
		</main>
	);
}

export default RightSideBar;
