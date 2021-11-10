import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuthGuard from '../hooks/useAuthGuard';
import useHttp from '../hooks/useHttp';
import { UserModel } from '../models/UserModel';
import { dialogActions } from '../store/dialog.slice';

const ServerResponse: React.FC = () => {
	const identityData = useAuthGuard();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFetchUserDetailsSuccessHandler = (data: UserModel) => {
		console.log({ data });
	};

	const onFetchUserDetailsFailureHandler = (error: AxiosError | never) => {
		let message = error.message;
		if (error.isAxiosError) {
			message = error.response?.data.message;
		}

		return dispatch(dialogActions.showErrorDialog({
			message,
			okButtonText: 'Go back!',
			onDialogOkay: () => navigate('/', { replace: true })
		}));
	};

	const { launchRequest: fetchUserData } = useHttp<UserModel>({
		showServerProgress: true,
		opMessage: 'Fetching qr code...',
		onSuccess: onFetchUserDetailsSuccessHandler,
		onError: onFetchUserDetailsFailureHandler
	});

	useEffect(() => fetchUserData('registration/users', { params: identityData }), []);

	return (
		<div className="row">
			<div className="col-sm-12 col-md-12 col-lg-12">
				<div className="inner_forms">
					<div className="pera_01">
						<h4>Congratulations!</h4>
						<p>Your FREE NESCAFÉ ICED COFFEE is ready!</p>
					</div>
					<div className="pera_02">
						<h4>Get your ICED COFFEE</h4>
						<p>Use the QR code to collect your free sample. <br/> Enjoy your FREE NESCAFÉ ICED COFFEE!</p>
						<p>ou can find our vending machine in the food court <br/> in Eastgate Shopping mall.</p>
					</div>
					<div className="qr_codes">
						<img src="img/Qr_code.jpeg"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServerResponse;