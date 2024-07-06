import React, { ReactNode } from "react";
import { appContext } from './appContext';
import { Theme } from "../themeState";

interface providerProps {
    children: ReactNode;
}
import { useTodoReducer } from "../todoState";
export const AppProvider: React.FC<providerProps> = ({ children }) => {
    const { theme, handleTheme } = Theme();
    const {todos, load, error, filter, totalItems,actions} = useTodoReducer();

    return (
        <appContext.Provider value={{ theme, handleTheme, todos ,load,filter,error,totalItems,  actions}}>
            {children}
        </appContext.Provider>
    );
};


