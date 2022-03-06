import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCurrentUser = {
	address: string;
};

export type TCurrentUserState = {
	current: TCurrentUser | null;
	isSignedIn: boolean;
};

const initialState: TCurrentUserState = {
	current: null,
	isSignedIn: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<TCurrentUser | null>) => ({
			current: action.payload,
			isSignedIn: Boolean(action.payload),
		}),
	},
});

export const { set } = userSlice.actions;

export const userReducer = userSlice.reducer;
