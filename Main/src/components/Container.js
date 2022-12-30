import React, { useEffect } from 'react';

function Container(props) {
	return <div className="content">{props.children}</div>;
}

export default Container;
