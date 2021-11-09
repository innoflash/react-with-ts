import React, { Fragment } from 'react';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Dialog from './Dialog';
import Header from './Header';
import ServerProgress from './ServerProgress/ServerProgress';

const Layout: React.FC = (props) => {
	return (
		<Fragment>
			<ServerProgress/>
			<Dialog/>
			<div className="container app-body">
				<Header/>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-lg-12">
						{ props.children }
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Layout;