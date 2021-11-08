import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';

const Layout: React.FC = (props) => {
	return (
		<div>
			<p>This is working</p>
			{ props.children }
		</div>
	);
};

export default Layout;