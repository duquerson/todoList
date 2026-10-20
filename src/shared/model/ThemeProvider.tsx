import { ReactNode, useEffect, useState } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, Theme } from "./theme";
import { ThemeContext } from "./themeContext";

const readStoredTheme = (): Theme => {
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === "dark" || stored === "light") {
			return stored;
		}
	} catch {
		// El almacenamiento puede estar bloqueado: se usa el tema por defecto.
	}
	if (typeof window.matchMedia === "function") {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : DEFAULT_THEME;
	}
	return DEFAULT_THEME;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(readStoredTheme);

	useEffect(() => {
		try {
			window.localStorage.setItem(THEME_STORAGE_KEY, theme);
		} catch {
			// Sin persistencia disponible: el tema solo vive en memoria.
		}
		document.body.className = theme;
	}, [theme]);

	const toggleTheme = () => {
		setTheme((previous) => (previous === "dark" ? "light" : "dark"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
