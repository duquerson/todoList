import { ReactNode } from "react";
import { useTheme } from "@shared/model/themeContext";

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	const { theme } = useTheme();

	return <main className={`${theme === "dark" ? "darkMode" : "lightMode"} h-lvh w-[100dvw]`}>{children}</main>;
};
