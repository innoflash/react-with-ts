import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import env from '../environments/environement.dev';
import { serverProgressSliceActions, ServerProgressType } from '../store/server-progress.slice';

export type HttpUseModel = {
	showServerProgress?: boolean,
	opMessage?: string
}

export interface HttpUseHookResult<T> {
	isLoading: boolean;
	launchRequest: (url: string | string[], axiosRequestConfig?: AxiosRequestConfig) => void;
	data?: T;
}

const api = axios.create({
	baseURL: env.apiBase,
	timeout: 3500
});

function useHttp<T>(config: HttpUseModel): HttpUseHookResult<T> {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<T>();

	if (config.showServerProgress) {
		setTimeout(() => dispatch(serverProgressSliceActions.showProgress({
			type: ServerProgressType.PENDING,
			message: config.opMessage || 'Please wait'
		})));
	}

	const launchRequest = (url: string | string[], axiosRequestConfig: AxiosRequestConfig = {
		method: 'get'
	}) => {
		//start the loading.
		setIsLoading(true);

		const urlIsArray = Array.isArray(url);

		if (!Array.isArray(url)) {
			url = [url];
		}

		//config axios multi
		const axiosRequests = url.map((uri => api({
			...axiosRequestConfig,
			url: uri
		})));

		Promise.all(axiosRequests)
			.then((res: AxiosResponse[]) => {
				if (!urlIsArray) {
					setData(res[0].data);
				}
				setData(res.map(item => item.data) as unknown as T);
			})
			.catch(error => console.error(error))
			.finally(() => setIsLoading(false));
	};

	return {
		isLoading,
		launchRequest,
		data
	};
}

export default useHttp;