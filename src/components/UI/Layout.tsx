import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Header from './Header';

const Layout: React.FC = (props) => {
	return (
		<div>
			<Header/>
			{ props.children }
		</div>
	);
};

export default Layout;