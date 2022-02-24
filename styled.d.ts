// import original module declarations
import "styled-components";
import { ThemeColor, ThemeColorPartial } from "styled-components";

// and extend them!
declare module "styled-components" {
    type ThemeColorLevel = "light" | "medium" | "dark";

    type ThemePropertyLevel = "sm" | "md" | "lg";

    export type ThemeProperty = {
        [key in ThemePropertyLevel]: string;
    };

    export type ThemeRounded = {
        full: string;
    } & ThemeProperty;

    export type ThemeColor = {
        [key in ThemeColorLevel]: string;
    };

    export type ThemeColorPartial = Partial<ThemeColor> &
        Required<Pick<ThemeColor, "medium">>;

    export type ThemeColors = {
        white: string | ThemeColorPartial;
        black: string | ThemeColorPartial;
        primary?: string | ThemeColorPartial;
        secondary?: string | ThemeColorPartial;
        grey?: string | ThemeColorPartial;
        accent?: string | ThemeColorPartial;
        [key: string]: string | ThemeColorPartial;
    };

    export type ThemeShadow = {
        [key in ThemePropertyLevel]: string;
    };

    export interface DefaultTheme {
        colors: TColors;
        rounded: ThemeRounded;
        shadow: ThemeShadow;
    }
}
