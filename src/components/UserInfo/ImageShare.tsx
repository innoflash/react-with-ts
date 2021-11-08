import React from 'react';
import { ImageModel } from '../../models/ImageModel';
import ItemLoader from '../Loaders/ItemLoader/ItemLoader';

const ImageShare: React.FC<{
	isLoading: boolean,
	images: ImageModel[]
}> = ({ isLoading, images }) => {
	console.log({ images });
	return (
		<ItemLoader isLoading={ isLoading }>
			{ images.map(image => (
				<div className="sample_produss" key={ image.id }>
					<div className="products_inner">
						<div className="pro_imgs">
							<img src={ image.url }/>
						</div>
						<div className="share_btns">
							<button type="submit" className="btn">Share</button>
						</div>
					</div>
				</div>
			)) }
		</ItemLoader>
	);
};

export default ImageShare;