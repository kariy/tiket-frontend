import { RootState } from "states";
import { useSelector } from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AppToggleableEnum {
	SIDEBAR = "SIDEBAR",
	USER_MODAL = "USER_MODAL",
	SIGN_UP_MODAL = "SIGN_UP_MODAL",
}

type TToggleState = {
	SIDEBAR: boolean;
	USER_MODAL: boolean;
	SIGN_UP_MODAL: boolean;
};

export type TTogglePayloadAction = {
	name: AppToggleableEnum;
	value: TToggleState[AppToggleableEnum];
};

const initialState: TToggleState = {
	SIDEBAR: false,
	USER_MODAL: false,
	SIGN_UP_MODAL: false,
};

const toggleableSlice = createSlice({
	name: "toggleable",
	initialState,
	reducers: {
		set: (
			state: TToggleState,
			action: PayloadAction<TTogglePayloadAction>
		) => {
			const { name, value } = action.payload;
			const newState = { ...state };

			newState[name] = value;

			return newState;
		},
		toggle: (
			state: TToggleState,
			action: PayloadAction<TTogglePayloadAction["name"]>
		) => {
			const name = action.payload;

			return {
				...state,
				[name]: !state[name],
			};
		},
	},
});

export const { set, toggle } = toggleableSlice.actions;

export const toggleableReducer = toggleableSlice.reducer;
