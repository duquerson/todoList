/* eslint-disable indent */
import React, { ReactNode } from "react";
import { CloudStorageRepository } from "../../repository/CloudStorageTodoRepository";
import { useTodoReducer } from "../Reducers/useTodoReducer";
import { Theme } from "../useTheme/useThemeState";
import { appContext } from "./appContext";
interface providerProps {
	children: ReactNode;
}
export const AppProvider: React.FC<providerProps> = ({ children }) => {
	const { theme, handleTheme } = Theme();
	const cloudRepository = new CloudStorageRepository();
	const { todos, load, error, filter, totalItems, actions } = useTodoReducer(cloudRepository);

	return <appContext.Provider value={{ theme, handleTheme, todos, load, filter, error, totalItems, actions }}>{children}</appContext.Provider>;
};
