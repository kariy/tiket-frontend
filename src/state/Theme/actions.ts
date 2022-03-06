import { ThemeEnum } from "providers/ThemeProvider";
import { store } from "..";
import { toggle, set } from "./slice";

export const setTheme = (mode: ThemeEnum) => store.dispatch(set(mode));

export const toggleTheme = () => store.dispatch(toggle());
