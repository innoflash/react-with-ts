import { configureStore } from '@reduxjs/toolkit';
import serverProgressSlice, { SERVER_PROGRESS_SLICE } from './server-progress.slice';

const store = configureStore({
	reducer: {
		[SERVER_PROGRESS_SLICE]: serverProgressSlice.reducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;