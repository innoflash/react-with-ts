import { AxiosError } from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageShare from '../components/UserInfo/ImageShare';
import UserCredentials from '../components/UserInfo/UserCredentials';
import { getRouteWithQueryParams } from '../helper';
import useHttp from '../hooks/useHttp';
import useProgressiveHttp from '../hooks/useProgressiveHttp';
import { ErrorResponse } from '../models/ErrorResponse';
import { ImageModel } from '../models/ImageModel';
import { LocationModel } from '../models/LocationModel';
import { SuccessResponseModel } from '../models/SuccessResponseModel';
import { UserModel } from '../models/UserModel';
import { dialogActions } from '../store/dialog.slice';

const UserInfo: React.FC = () => {
	const userDetailsRef = useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let userFormData = {};

	// handle on user registration success.
	const onUserRegistrationSuccessHandler = (successData: SuccessResponseModel<UserModel>) => {
		if (successData.success) {
			dispatch(dialogActions.showSuccessDialog({
				message: successData.message,
				onDialogOkay: () => gotoServerResponse({
					email: successData.data.email,
					phone: successData.data.phone
				})
			}));
		}
	};

	//handler on user registration failure.
	const onUserRegistrationFailureHandler = (error: AxiosError | never) => {
		if (error.isAxiosError) {
			const errorResponse = error.response?.data as ErrorResponse;
			if (errorResponse.statusCode === 422 && errorResponse.message.includes('has already been taken.')) {
				const keys = errorResponse.message.split('\n')
					.filter(msg => msg.includes('has already been taken'))
					.map(msg => {
						const [, key] = msg.split(' ');
						return key;
					});

				const foundUserData = Object.entries(userFormData)
					.map(item => {
						const [key, value] = item;
						return { key, value };
					})
					.filter(item => keys.includes(item.key))
					.reduce((prevVal, currentVal) => ({ ...prevVal, [currentVal.key]: currentVal.value }), {});

				return dispatch(dialogActions.showConfirmDialog({
					title: 'Details exist!',
					message: `We recognize the ${ keys.join(' and ') }, seems we already received your request for the sample.\n Would you like to proceed and get the sample?`,
					onDialogOkay: () => gotoServerResponse(foundUserData)
				}));
			}

			return dispatch(dialogActions.showErrorDialog({
				title: 'Registration Failure!',
				message: errorResponse.message
			}));
		}
	};

	const { isLoading: isDataLoading, launchRequest: fetchData, data } = useProgressiveHttp<never[]>({
		successMessage: 'Initial data loaded successfully!'
	});

	const { launchRequest: launchRegisterUserRequest } = useProgressiveHttp<SuccessResponseModel<UserModel>>({
		opMessage: 'Registering...',
		onSuccess: onUserRegistrationSuccessHandler,
		onError: onUserRegistrationFailureHandler
	});

	let locations: LocationModel[] = [];
	let images: ImageModel[] = [];

	if (data) [images, locations] = data;

	useEffect(() => fetchData(['registration/images', 'registration/locations']), []);

	// handles button click.
	const getMySampleHandler = () => userDetailsRef.current?.click();

	// send user data via http.
	const formSubmitHandler = (userData: { [key: string]: string | number }) => {
		userFormData = userData;
		launchRegisterUserRequest('registration', {
			method: 'post',
			data: userData
		});
	};

	// navigate to server response page.
	const gotoServerResponse = (data: { [key: string]: string | number }) => navigate(getRouteWithQueryParams('/server-response', data));

	return (
		<div className="inner_forms">
			<UserCredentials isLoading={ isDataLoading }
			                 locations={ locations }
			                 ref={ userDetailsRef }
			                 onFormSubmit={ formSubmitHandler }/>
			<ImageShare isLoading={ isDataLoading }
			            images={ images }/>
			<div className="form-group bottom_buttin" onClick={ getMySampleHandler }>
				<button type="submit" className="btn btn-primary">Get my sample</button>
			</div>
			<div className="terms_text">
				<p>Terms and Conditions Apply. By Signing up you opt in for further communication.</p>
			</div>
		</div>
	);
};

export default UserInfo;