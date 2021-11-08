import React, { Fragment } from 'react';
import classes from './ItemLoader.module.css';

const ItemLoader: React.FC = ({ children }) => {
	return (
		<Fragment>
			<div className={classes.centered}>
				<div className={ classes['lds-hourglass'] }/>
			</div>
			{ children }
		</Fragment>
	);
};

export default ItemLoader;