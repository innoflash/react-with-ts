import { configureStore } from '@reduxjs/toolkit';
import dialogSlice, { DIALOG_SLICE } from './dialog.slice';
import serverProgressSlice, { SERVER_PROGRESS_SLICE } from './server-progress.slice';

const store = configureStore({
	reducer: {
		[SERVER_PROGRESS_SLICE]: serverProgressSlice.reducer,
		[DIALOG_SLICE]: dialogSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;