import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function SideBar() {
	const appState = useContext(StateContext);
	const dispatch = useContext(DispatchContext);

	const handleLogOut = (e) => {
		e.preventDefault();

		dispatch({ type: 'logout' });
	};

	return (
		<nav className="sidebar">
			<ul className="side-nav">
				<li className="side-nav__item">
					<Link to="/" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-home3"></use>
						</svg>

						<span>Home</span>
					</Link>
				</li>

				<li className="side-nav__item">
					<a href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-hash"></use>
						</svg>

						<span>Explore</span>
					</a>
				</li>

				<li className="side-nav__item">
					<a href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-bell"></use>
						</svg>

						<span>Notifications</span>
					</a>
				</li>

				<li className="side-nav__item">
					<a href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-mail4"></use>
						</svg>

						<span>Messages</span>
					</a>
				</li>

				<li className="side-nav__item">
					<a href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-bookmark"></use>
						</svg>

						<span>Bookmarks</span>
					</a>
				</li>

				<li className="side-nav__item">
					<a href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-profile"></use>
						</svg>

						<span>Lists</span>
					</a>
				</li>

				<li className="side-nav__item">
					<Link
						to={`/profile/${appState.user.username}`}
						className="side-nav__link"
					>
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-user"></use>
						</svg>

						<span>Profile</span>
					</Link>
				</li>

				<li className="side-nav__item">
					<a onClick={handleLogOut} href="#" className="side-nav__link">
						<svg className="side-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-books"></use>
						</svg>

						<span>Log out</span>
					</a>
				</li>
			</ul>

			<div className="legal">
				<img
					src={appState.user.avatar}
					alt="footer pic"
					className="footer-pic"
				></img>
				<div className="legal__user">
					<h3>
						{appState.user.name} {appState.user.surname}
					</h3>
					<span>@{appState.user.username}</span>
				</div>

				<svg>
					<use xlinkHref="img/sprite.svg#icon-profile"></use>
				</svg>
			</div>
		</nav>
	);
}

export default SideBar;
