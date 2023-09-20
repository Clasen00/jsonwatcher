import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TRootState } from '..';

interface IInitState {
  json: object
}

const initialState = {
	json: {},
} as IInitState;

export const commonSlice = createSlice({
	name: 'commonSlice',
	initialState,
	reducers: {
		setJson(state, action: PayloadAction<object>) {
			state.json = action.payload;
		},
	},
});

export const { setJson } = commonSlice.actions;

export const selectJson = (state: TRootState) => state.commonSlice.json;
