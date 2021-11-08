import React from 'react';
import ItemLoader from '../Loaders/ItemLoader/ItemLoader';

const ImageShare: React.FC<{
	isLoading: boolean
}> = ({isLoading}) => {
	return (
		<ItemLoader isLoading={isLoading}>
			<div className="sample_produss">
				<div className="products_inner">
					<div className="pro_imgs">
						<img src="img/products.png"/>
					</div>
					<div className="share_btns">
						<button type="submit" className="btn">Share</button>
					</div>
				</div>
			</div>
			<div className="sample_produss">
				<div className="products_inner">
					<div className="pro_imgs">
						<img src="img/products.png"/>
					</div>
					<div className="share_btns">
						<button type="submit" className="btn">Share</button>
					</div>
				</div>
			</div>
		</ItemLoader>
	);
};

export default ImageShare;