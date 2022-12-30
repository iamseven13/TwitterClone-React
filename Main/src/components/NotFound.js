import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div className="not-found">
			<h2>Whoops, we cannot find this page.</h2>
			<p>
				You can always visit <Link to="/">homepage</Link> to have a fresh start.
			</p>
		</div>
	);
}

export default NotFound;
