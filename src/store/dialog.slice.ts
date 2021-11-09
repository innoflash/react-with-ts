import { createSlice } from '@reduxjs/toolkit';

export const DIALOG_SLICE = 'dialog-slice';

const dialogSlice = createSlice({
	name: DIALOG_SLICE,
	initialState: <null>null,
	reducers: {}
});

export const dialogSliceActions = dialogSlice.actions;
export default dialogSlice;