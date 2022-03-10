import { createContext, useContext } from "react";
import { ThemeEnum } from "./provider";

type TThemeContext = {
	mode: ThemeEnum;
	set: (mode: ThemeEnum) => any;
	toggle: () => any;
};

export const ThemeContext = createContext<TThemeContext>({
	mode: ThemeEnum.LIGHT,
	set: () => {},
	toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);
