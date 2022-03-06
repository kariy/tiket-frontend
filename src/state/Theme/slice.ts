import { RootState } from "..";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ThemeEnum } from "providers/ThemeProvider";

export type TThemeState = {
	mode: ThemeEnum;
};

const initialState: TThemeState = {
	mode: ThemeEnum.light,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggle: (state) => {
			state.mode =
				state.mode === ThemeEnum.dark
					? ThemeEnum.light
					: ThemeEnum.dark;
		},
		set: (state, action: PayloadAction<ThemeEnum>) => {
			state.mode = action.payload;
		},
	},
});

export const { toggle, set } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

export const selectTheme = (state: RootState) => state.theme;
