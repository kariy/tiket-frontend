import { useSelector } from "react-redux";
import {
    DefaultTheme,
    ThemeProvider as StyledThemeProvider,
    ThemeColors,
} from "styled-components";

import { RootState } from "../state";

export enum ThemeEnum {
    light,
    dark,
}

function getColors(mode: ThemeEnum): ThemeColors {
    return {
        black: "#292929",
        white: "white",
        grey: { light: "#ececec", medium: "#CFCFCF" },
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
        <StyledThemeProvider theme={getTheme(theme.mode)}>
            {children}
        </StyledThemeProvider>
    );
}
