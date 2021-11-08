import { createSlice } from '@reduxjs/toolkit';

export const SERVER_PROGRESS_SLICE = 'server-progress-slice';

const serverProgressSlice = createSlice({
	name: SERVER_PROGRESS_SLICE,
	initialState: <ServerProgressSliceModel | null>null,
	reducers: {
		showProgress: (state, payload) => payload as unknown as ServerProgressSliceModel,
		hideProgress: () => null
	}
});
export default serverProgressSlice;
export const serverProgressSliceActions = serverProgressSlice.actions;

export enum ServerProgressType {
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface ServerProgressSliceModel {
	message: string;
	type: ServerProgressType;
}