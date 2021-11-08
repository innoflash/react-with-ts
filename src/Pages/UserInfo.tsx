import React, { useEffect } from 'react';
import ImageShare from '../components/UserInfo/ImageShare';
import UserCredentials from '../components/UserInfo/UserCredentials';
import useHttp from '../hooks/useHttp';

const UserInfo: React.FC = () => {
	const { isLoading, launchRequest, data } = useHttp<any[]>({
		showServerProgress: true,
		successMessage: 'Initial data loaded successfully!'
	});

	let locations = [];
	let images = [];

	if (data) [images, locations] = data;

	useEffect(() => launchRequest(['registration/images', 'registration/locations']), []);

	return (
		<div className="inner_forms">
			<UserCredentials isLoading={ isLoading } locations={ locations }/>
			<ImageShare isLoading={ isLoading }/>
			<div className="form-group bottom_buttin">
				<button type="submit" className="btn btn-primary">Get my sample</button>
			</div>
			<div className="terms_text">
				<p>Terms and Conditions Apply. By Signing up you opt in for further communication.</p>
			</div>
		</div>
	);
};

export default UserInfo;