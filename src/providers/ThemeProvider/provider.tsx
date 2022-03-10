import { useSelector } from "react-redux";
import { setTheme, toggleTheme } from "states/Theme";
import {
	DefaultTheme,
	ThemeProvider as StyledThemeProvider,
	ThemeColors,
} from "styled-components";

import { RootState } from "../../states";
import { ThemeContext } from "./context";

export enum ThemeEnum {
	LIGHT = "THEME_LIGHT",
	DARK = "THEME_DARK",
}

function getColors(mode: ThemeEnum): ThemeColors {
	return {
		primary: {
			medium: "#A4133C",
			light: "#FF758F",
		},
		grey: { light: "#F9FAFB", medium: "#ececec", dark: "#CFCFCF" },

		white: "white",
		black: "#292929",
		error: "#ff006e",
	};
}

function getTheme(mode: ThemeEnum): DefaultTheme {
	return {
		colors: getColors(mode),

		// border-radius
		rounded: {
			sm: "6px",
			md: "10px",
			lg: "15px",
			full: "10000px",
		},

		//box-shadow
		shadow: {
			sm: "0px 2px 4px rgba(173, 173, 173, 0.25)",
			md: "0px 3px 6px rgba(173, 173, 173, 0.25)",
			lg: "0px 4px 8px rgba(173, 173, 173, 0.25)",
		},
	};
}

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
	const theme = useSelector((state: RootState) => state.theme);

	return (
		<ThemeContext.Provider
			value={{
				mode: theme.mode,
				set: setTheme,
				toggle: toggleTheme,
			}}
		>
			<StyledThemeProvider theme={getTheme(theme.mode)}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
}
