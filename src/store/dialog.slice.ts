import { createSlice } from '@reduxjs/toolkit';

export const DIALOG_SLICE = 'dialog-slice';

export enum DialogType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	CONFIRM = 'confirm'
}

export type DialogConfigModel = {
	type: DialogType;
	message?: string;
	title?: string;
	okButtonText?: string;
}

const dialogSlice = createSlice({
	name: DIALOG_SLICE,
	initialState: <DialogConfigModel | null>null,
	reducers: {
		showDialog: (state, action: { payload: DialogConfigModel }) => action.payload,
		showSuccessDialog: (state, action: { payload: DialogConfigModel }) => ({
			...state, ...action.payload,
			type: DialogType.SUCCESS
		}),
		showErrorDialog: (state, action: { payload: DialogConfigModel }) => ({
			...state, ...action.payload,
			type: DialogType.ERROR
		}),
		showWarningDialog: (state, action: { payload: DialogConfigModel }) => ({
			...state, ...action.payload,
			type: DialogType.WARNING
		}),
		showConfirmDialog: (state, action: { payload: DialogConfigModel }) => ({
			...state, ...action.payload,
			type: DialogType.CONFIRM
		}),
		hideDialog: () => null
	}
});

export const dialogSliceActions = dialogSlice.actions;
export default dialogSlice;