import React, { Fragment } from 'react';
import classes from './ItemLoader.module.css';

const ItemLoader: React.FC<{
	isLoading: boolean
}> = ({ children, isLoading }) => {
	return (
		<Fragment>
			{ isLoading && <div className={ classes.centered }>
				<div className={ classes['lds-hourglass'] }/>
			</div> }

			{ !isLoading && children }
		</Fragment>
	);
};

export default ItemLoader;