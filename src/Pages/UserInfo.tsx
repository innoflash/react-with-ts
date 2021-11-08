import React from 'react';
import ImageShare from '../components/UserInfo/ImageShare';
import UserCredentials from '../components/UserInfo/UserCredentials';

const UserInfo: React.FC = () => {
	return (
		<div className="inner_forms">
			<UserCredentials/>
			<ImageShare/>
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