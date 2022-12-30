import React, { useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import RightSideBar from './RightSideBar';
import SideBar from './SideBar';

import Container from './Container';

function Home() {
	return (
		<div className="content">
			<SideBar />
			<Main />
			<RightSideBar />
		</div>
	);
}

export default Home;
