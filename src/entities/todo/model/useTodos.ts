import { useCallback, useEffect, useMemo, useReducer } from "react";
import { getErrorMessage } from "@shared/lib/getErrorMessage";
import { TodoService } from "./todoService";
import { initialTodoState, todoReducer } from "./todoReducer";
import { filterTodos } from "./todo.utils";
import { Todos } from "./todo.types";

/**
 * Hook de estado de la entidad `todo`: carga inicial, recarga y estado visible.
 */
export const useTodos = (service: TodoService) => {
	const [state, dispatch] = useReducer(todoReducer, initialTodoState);

	const load = useCallback(async (): Promise<void> => {
		dispatch({ type: "LOAD" });
		try {
			const todos: Todos = await service.getAll();
			dispatch({ type: "LOAD_SUCCESS", payload: todos });
		} catch (error) {
			dispatch({ type: "LOAD_ERROR", payload: getErrorMessage(error, "No se pudieron cargar las tareas.") });
		}
	}, [service]);

	useEffect(() => {
		void load();
	}, [load]);

	const visibleTodos = useMemo(() => filterTodos(state.todos, state.filter), [state.todos, state.filter]);

	return { state, dispatch, visibleTodos, load };
};
