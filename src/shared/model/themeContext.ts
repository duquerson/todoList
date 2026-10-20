import { createContext, useContext } from "react";
import { Theme } from "./theme";

export interface ThemeContextValue {
	theme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
	}
	return context;
};
