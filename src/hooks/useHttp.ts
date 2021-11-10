import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import env from '../environments/environement.dev';

export type HttpUseModel<T> = {
	onError?: (error: AxiosError | never) => void,
	onSuccess?: (data: T) => void
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

function useHttp<T>(config?: HttpUseModel<T> & {
	onRequestStart?: () => void,
	onRequestSuccess?: (data: AxiosResponse[]) => void,
	onRequestFailure?: (error: AxiosError) => void,
	onRequestComplete?: () => void
}): HttpUseHookResult<T> {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<T>();

	const launchRequest = (url: string | string[], axiosRequestConfig: AxiosRequestConfig = {
		method: 'get'
	}) => {
		//emit request start.
		if (config?.onRequestStart) {
			config.onRequestStart();
		}

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
				} else {
					setData(res.map(item => item.data) as unknown as T);
				}

				// emit request success.
				if (config?.onRequestSuccess) {
					config.onRequestSuccess(res);
				}

				//execute user success callback.
				if (config?.onSuccess) {
					if (!urlIsArray) {
						return config.onSuccess(res[0].data as T);
					}

					return config.onSuccess(res.map(item => item.data) as unknown as T);
				}
			})
			.catch((error: AxiosError | never) => {
				// emit request error.
				if (config?.onRequestFailure) {
					config.onRequestFailure(error);
				}

				//execute custom error callback.
				if (config?.onError) {
					config.onError(error);
				}
			})
			.finally(() => {
				setIsLoading(false);

				// emit request complete.
				if (config?.onRequestComplete) {
					config.onRequestComplete();
				}
			});
	};

	return {
		isLoading,
		launchRequest,
		data
	};
}

export default useHttp;