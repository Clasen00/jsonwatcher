import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commonSlice } from '@/store/slices/CommonSlice';

const rootReducer = combineReducers({
	[commonSlice.name]: commonSlice.reducer,
});

export const initStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
	});

type TStore = ReturnType<typeof initStore>

export type TRootState = ReturnType<TStore['getState']>

export type TAppDispatch = TStore['dispatch']

export type TThunkConfig = {
  state: TRootState
}
