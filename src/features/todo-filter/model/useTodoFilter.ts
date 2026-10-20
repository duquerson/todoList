import { Dispatch, useCallback, useEffect } from "react";
import { TodoAction, TodoState } from "@entities/todo/model/todoReducer";
import { FILTER, FilterValue } from "@entities/todo/model/todo.types";

const readFilterFromUrl = (): FilterValue => {
	const params = new URLSearchParams(window.location.search);
	const value = params.get("filter");
	return value !== null && Object.values(FILTER).includes(value as FilterValue) ? (value as FilterValue) : FILTER.ALL;
};

const writeFilterToUrl = (filter: FilterValue): void => {
	const params = new URLSearchParams(window.location.search);
	params.set("filter", filter);
	window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
};

/**
 * Filtro de tareas sincronizado con la URL (`?filter=all|active|completed`).
 */
export const useTodoFilter = (state: TodoState, dispatch: Dispatch<TodoAction>) => {
	useEffect(() => {
		const fromUrl = readFilterFromUrl();
		if (fromUrl !== state.filter) {
			dispatch({ type: "SET_FILTER", payload: fromUrl });
		}
	}, [dispatch, state.filter]);

	const setFilter = useCallback(
		(filter: FilterValue): void => {
			dispatch({ type: "SET_FILTER", payload: filter });
			writeFilterToUrl(filter);
		},
		[dispatch],
	);

	return { setFilter };
};
