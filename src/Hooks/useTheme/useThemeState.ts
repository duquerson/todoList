import { useEffect, useState } from "react";
import { themeType } from "../../types/type";
import { themeDefault } from "./utils/Theme";
export const Theme = ():themeType => {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem("themeTodo") ?? themeDefault()
        /*
		()=>{
        const localTheme = localStorage.getItem("themeTodo");
        return localTheme ? localTheme : themeDefault();
    }
		*/
    );
    useEffect(() => {
        localStorage.setItem("themeTodo", theme);
        document.body.className = theme;
    }, [theme]);
    const handleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'dark' ? 'light' : 'dark');
    }
    return { theme, handleTheme};
};
