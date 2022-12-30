import React, { useEffect, useState, useContext } from 'react';

import Axios from 'axios';

import { Link } from 'react-router-dom';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function HomeGuest() {
	// My context
	const appState = useContext(StateContext);
	const dispatch = useContext(DispatchContext);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	// useEffect(() => {
	// 	// const dataStorage = localStorage.getItem('tweet');

	// 	if (dataStorage) {
	// 		dispatch({ type: 'login' });
	// 	} else {
	// 		dispatch({ type: 'logout' });
	// 	}
	// }, []);

	async function handleRegister(e) {
		e.preventDefault();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await Axios.post(
				'http://localhost:2000/api/register',
				{
					name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
					surname:
						surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase(),
					username,
					email,
					password,
				},
				config
			);

			if (res.data.token) {
				dispatch({ type: 'login', data: res.data });

				console.log(res.data);
			} else {
				console.log(res.data);
			}
		} catch (e) {
			console.log('there was an error');
		}
	}

	async function handleLogin(e) {
		e.preventDefault();

		try {
			const res = await Axios.post('http://localhost:2000/api/auth', {
				loginUsername,
				loginPassword,
			});
			// localStorage.setItem('username', loginUsername);
			console.log(res.data);
			if (res.data.token) {
				dispatch({ type: 'login', data: res.data });
			} else {
				console.log(res.data);
			}
		} catch (e) {
			console.log('there was an error');
		}
	}

	return (
		<div className="container-home-guest">
			<div className="front-side">
				<section>
					<img
						src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
						className="right-logo"
						alt="twitter logo"
					></img>
				</section>
			</div>
			<div className="front-side__right">
				<section>
					<img
						src="https://abs.twimg.com/errors/logo46x38.png"
						alt="twitter logo"
						className="small-logo"
					></img>
					<h1>Happening now</h1>
					<h2>Join Twitter Now</h2>

					<form className="form-class">
						<label htmlFor="username">Name</label>
						<input
							onChange={(e) => setName(e.target.value)}
							type="text"
							value={name}
							placeholder="Your name"
						></input>
						<label htmlFor="username">Surname</label>
						<input
							onChange={(e) => setSurname(e.target.value)}
							type="text"
							value={surname}
							placeholder="Your surname"
						></input>
						<label htmlFor="username">Username</label>
						<input
							onChange={(e) => setUsername(e.target.value)}
							type="text"
							value={username}
							placeholder="Your username"
						></input>
						<label htmlFor="email">Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type="text"
							placeholder="Your email"
							value={email}
						></input>
						<label htmlFor="password">Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							value={password}
							placeholder="Your password"
						></input>
						<Link onClick={handleRegister} to="/" className="register-btn">
							Register Now
						</Link>
					</form>

					<form className="form-class">
						<label htmlFor="username">Username</label>
						<input
							onChange={(e) => setLoginUsername(e.target.value)}
							type="text"
							placeholder="Your username"
						></input>

						<label htmlFor="password">Password</label>
						<input
							onChange={(e) => setLoginPassword(e.target.value)}
							type="password"
							placeholder="Your password"
						></input>
						<Link onClick={handleLogin} to="/" className="register-btn">
							Login Now
						</Link>
					</form>
				</section>
			</div>
		</div>
	);
}

export default HomeGuest;
