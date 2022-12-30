import logo from './logo.svg';
import './App.css';
import { useState, useReducer } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

//Components
import HomeGuest from './components/HomeGuest';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import RightSideBar from './components/RightSideBar';
import SideBar from './components/SideBar';
import Main from './components/Main';
import ViewPost from './components/ViewPost';
import ReplyTweet from './components/ReplyTweet';
import ReplyTweetMainPage from './components/ReplyTweetMainPage';
import NotFound from './components/NotFound';
import ExtendPost from './components/ExtendPost';

// Context
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useEffect } from 'react';

function App() {
	const initialState = {
		home: Boolean(localStorage.getItem('twitterReactName')),
		user: {
			token: localStorage.getItem('twitterReactToken'),
			username: localStorage.getItem('twitterReactUsername'),
			name: localStorage.getItem('twitterReactName'),
			surname: localStorage.getItem('twitterReactSurname'),
			isVerified: localStorage.getItem('twitterReactIsVerified'),
			_id: localStorage.getItem('twitterReactId'),
			date: localStorage.getItem('twitterReactRegDate'),
			avatar: localStorage.getItem('twitterReactAvatar'),
		},
		isReplyOpen: false,
		isReplyOpenMainPage: false,
		replyTweet: {},
		replyTweetMainPage: {},
		extendPost: false,
		dataExtendPost: {},
		notFound: false,
		dataDeleted: false,
		replyActionLoading: false,
		startReplyingRequestCount: 0,
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.home = true;
				draft.user = action.data;

				break;
			case 'logout':
				draft.home = false;
				break;
			case 'openReply':
				draft.isReplyOpen = true;
				draft.replyTweet = action.data;
				break;
			case 'closeReply':
				draft.isReplyOpen = false;

				break;
			case 'openReplyMainPage':
				draft.isReplyOpenMainPage = true;
				draft.replyTweetMainPage = action.data;
				break;
			case 'closeReplyMainPage':
				draft.isReplyOpenMainPage = false;

				break;
			case 'notFound':
				draft.notFound = true;
				break;
			case 'clearNotFound':
				draft.notFound = false;
				break;

			case 'extendPost':
				draft.extendPost = true;
				draft.dataExtendPost = action.data;
				break;
			case 'closeExtendPost':
				draft.extendPost = false;
				break;
			case 'dataDeleted':
				draft.dataDeleted = true;
				break;
			case 'clearDataDeleted':
				draft.dataDeleted = false;
				break;
			default:
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	useEffect(() => {
		if (state.home) {
			localStorage.setItem('twitterReactToken', state.user.token);
			localStorage.setItem('twitterReactUsername', state.user.username);
			localStorage.setItem('twitterReactName', state.user.name);
			localStorage.setItem('twitterReactSurname', state.user.surname);
			localStorage.setItem('twitterReactIsVerified', state.user.isVerified);
			localStorage.setItem('twitterReactId', state.user._id);
			localStorage.setItem('twitterReactRegDate', state.user.date);
			localStorage.setItem('twitterReactAvatar', state.user.avatar);
		} else {
			localStorage.removeItem('twitterReactToken');
			localStorage.removeItem('twitterReactUsername');
			localStorage.removeItem('twitterReactName');
			localStorage.removeItem('twitterReactSurname');
			localStorage.removeItem('twitterReactIsVerified');
			localStorage.removeItem('twitterReactId');
			localStorage.removeItem('twitterReactRegDate');
			localStorage.removeItem('twitterReactAvatar');
		}
	}, [state.home]);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					{state.home ? (
						<div className="container">
							{<Header />}
							<div className="content">
								<SideBar />

								<Switch>
									<Route path="/" element={<Main />} exact></Route>
									<Route
										path="/profile/:username"
										element={<Profile />}
										exact
									></Route>
									<Route path="/status/:id" element={<ViewPost />}></Route>
									<Route path="*" element={<NotFound />} exact></Route>
								</Switch>
								<RightSideBar />
							</div>
						</div>
					) : (
						<HomeGuest />
					)}
					{state.isReplyOpen ? <ReplyTweet /> : ''}
					{state.isReplyOpenMainPage ? <ReplyTweetMainPage /> : ''}
					{state.extendPost ? <ExtendPost /> : ''}
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
