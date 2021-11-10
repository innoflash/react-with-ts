import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { dialogActions, DialogConfigModel } from '../store/dialog.slice';

const useAuthGuard = (): PayloadAction<DialogConfigModel, string> | void => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const urlSearchParams = new URLSearchParams(search);

	if (!urlSearchParams.get('email') && !urlSearchParams.get('phone')) {
		return dispatch(dialogActions.showWarningDialog({
			message: 'User identification not found!',
			onDialogOkay: () => navigate('/', { replace: true })
		}));
	}
};

export default useAuthGuard;