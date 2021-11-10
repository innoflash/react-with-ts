import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { dialogActions } from '../store/dialog.slice';

export type IdentityData = { email?: string, phone?: string };

const useAuthGuard = (): IdentityData | void => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const urlSearchParams = new URLSearchParams(search);

	if (!urlSearchParams.get('email') && !urlSearchParams.get('phone')) {
		dispatch(dialogActions.showWarningDialog({
			message: 'User identification not found!',
			onDialogOkay: () => navigate('/', { replace: true })
		}));
		return;
	}

	const userData: IdentityData = {};
	if (urlSearchParams.get('email')) {
		userData.email = urlSearchParams.get('email') as string;
	}

	if (urlSearchParams.get('phone')) {
		userData.phone = urlSearchParams.get('phone') as string;
	}

	return userData;
};

export default useAuthGuard;