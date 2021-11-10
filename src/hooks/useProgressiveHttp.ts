import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { serverProgressActions, ServerProgressType } from '../store/server-progress.slice';
import useHttp, { HttpUseHookResult, HttpUseModel as MainHttpUseModel } from './useHttp';

export type HttpUseModel<T> = MainHttpUseModel<T> & {
	opMessage?: string;
	successMessage?: string;
};

const useProgressiveHttp = <T>(config?: HttpUseModel<T>): HttpUseHookResult<T> => {
	const dispatch = useDispatch();

	return useHttp<T>({
		...config,
		onRequestStart: () => setTimeout(() => dispatch(serverProgressActions.showProgress({
			type: ServerProgressType.PENDING,
			message: config?.opMessage || 'Please wait'
		}))),
		onRequestSuccess: () => dispatch(serverProgressActions.showProgress({
			type: ServerProgressType.SUCCESS,
			message: config?.successMessage || 'Query successful!'
		})),
		onRequestFailure: (error: AxiosError) => dispatch(serverProgressActions.showProgress({
			type: ServerProgressType.ERROR,
			message: error.message
		})),
		onRequestComplete: () => setTimeout(() => dispatch(serverProgressActions.hideProgress()), 2500)
	});
};

export default useProgressiveHttp;