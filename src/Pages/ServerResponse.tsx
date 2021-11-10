import { AxiosError } from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemLoader from '../components/Loaders/ItemLoader/ItemLoader';
import useAuthGuard from '../hooks/useAuthGuard';
import useProgressiveHttp from '../hooks/useProgressiveHttp';
import { LocationModel } from '../models/LocationModel';
import { UserModel as RootUserModel } from '../models/UserModel';
import { dialogActions } from '../store/dialog.slice';

export interface CodeModel {
	id: number;
	code: string;
}

export interface UserModel extends RootUserModel {
	location: LocationModel;
	code: CodeModel;
}

const ServerResponse: React.FC = () => {
	const identityData = useAuthGuard();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<UserModel>();
	console.log({userData});
	const onFetchUserDetailsSuccessHandler = (data: UserModel) => setUserData(data);

	const onFetchUserDetailsFailureHandler = (error: AxiosError | never) => {
		let message = error.message;
		if (error.response?.data) {
			message = error.response?.data.message;
		}

		return dispatch(dialogActions.showErrorDialog({
			message,
			okButtonText: 'Go back!',
			onDialogOkay: () => navigate('/', { replace: true })
		}));
	};

	const { launchRequest: fetchUserData, isLoading } = useProgressiveHttp<UserModel>({
		opMessage: 'Fetching qr code...',
		onSuccess: onFetchUserDetailsSuccessHandler,
		onError: onFetchUserDetailsFailureHandler
	});

	useEffect(() => fetchUserData('registration/users', { params: identityData }), []);

	return (
		<div className="row">
			<div className="col-sm-12 col-md-12 col-lg-12">
				<div className="inner_forms">
					<ItemLoader isLoading={ isLoading }>
						{ !!userData && (
							<Fragment>
								<div className="pera_01">
									<h4>Congratulations { userData.name }!</h4>
									<p>Your FREE NESCAFÉ ICED COFFEE is ready!</p>
								</div>
								<div className="pera_02">
									<h4>Get your ICED COFFEE</h4>
									<p>Use the QR code to collect your free sample. <br/> Enjoy your FREE NESCAFÉ ICED
										COFFEE!
									</p>
									<p>You can find our vending machine in { userData.location.name }.</p>
								</div>
								<div className="qr_codes">
									<QRCode value={ userData.code.code } level="H"/>
								</div>
							</Fragment>
						) }
					</ItemLoader>
				</div>
			</div>
		</div>
	);
};

export default ServerResponse;