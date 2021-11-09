import React from 'react';

const Card: React.FC<{
	className?: string,
	title?: string
}> = ({ className, children, title }) => {
	const cardClasses = `card ${ className }`;
	return (
		<div className={ cardClasses } style={{width: '100%'}}>
			<div className="card-body">
				{ title && <h5 className="card-title">{ title }</h5> }
				{ children }
			</div>
		</div>
	);
};

export default Card;