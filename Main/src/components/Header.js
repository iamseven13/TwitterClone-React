import React, { useEffect, useContext } from 'react';
import Container from './Container';
import StateContext from '../StateContext';

function Header() {
	const appState = useContext(StateContext);

	return (
		<header className="header">
			<img
				src="https://abs.twimg.com/errors/logo46x38.png"
				alt=""
				className="logo"
			></img>

			<ul className="top-nav">
				<li className="top-nav__item top-nav__item--active">
					<a href="#" className="top-nav__link--home">
						<span>Home</span>
					</a>
				</li>

				<li className="top-nav__item top-nav__item--active">
					<a href="#" className="top-nav__link">
						<svg className="top-nav__icon">
							<use xlinkHref="img/sprite.svg#icon-bell"></use>
						</svg>
					</a>
				</li>
			</ul>

			<form action="#" className="search">
				<input
					type="text"
					className="search__input"
					placeholder="Search Twitter"
				></input>
				<button className="search__button">
					<svg className="search__icon">
						<use xlinkHref="img/sprite.svg#icon-search"></use>
					</svg>
				</button>
			</form>
		</header>
	);
}

export default Header;
