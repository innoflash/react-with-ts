import React from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Header from './Header';

const Layout: React.FC = (props) => {
	return (
		<div>
			<Header/>
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12">
					{ props.children }
				</div>
			</div>
		</div>
	);
};

export default Layout;