import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SERVER_PROGRESS_SLICE = 'server-progress-slice';

const serverProgressSlice = createSlice({
	name: SERVER_PROGRESS_SLICE,
	initialState: <ServerProgressSliceModel | null>null,
	reducers: {
		showProgress: (state, action: PayloadAction<ServerProgressSliceModel>) => action.payload,
		hideProgress: () => null
	}
});
export default serverProgressSlice;
export const serverProgressActions = serverProgressSlice.actions;

export enum ServerProgressType {
	PENDING = 'pending',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface ServerProgressSliceModel {
	message: string;
	type: ServerProgressType;
}