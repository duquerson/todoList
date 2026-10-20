import { ReactNode, useMemo } from "react";
import { LocalStorageTodoAdapter } from "@entities/todo/model/localStorageTodoAdapter";
import { TodoContext, TodoContextValue } from "@entities/todo/model/TodoContext";
import { createTodoService } from "@entities/todo/model/todoService";
import { useTodos } from "@entities/todo/model/useTodos";
import { useTodoActions } from "@features/todo-crud/model/useTodoActions";
import { useTodoFilter } from "@features/todo-filter/model/useTodoFilter";
import { useTodoReorder } from "@features/todo-reorder/model/useTodoReorder";
import { ThemeProvider } from "@shared/model/ThemeProvider";

interface AppProviderProps {
	children: ReactNode;
}

/**
 * Punto de composición de la aplicación (capa `app`).
 *
 * Aquí se inyecta el adaptador de persistencia: sustituir `localStorage` por
 * otro medio (API, base de datos) solo requiere cambiar esta línea.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
	const service = useMemo(() => createTodoService(new LocalStorageTodoAdapter()), []);

	const { state, dispatch, visibleTodos, load } = useTodos(service);
	const crud = useTodoActions(state, dispatch, service);
	const reorder = useTodoReorder(state, dispatch, service);
	const filter = useTodoFilter(state, dispatch);

	const value: TodoContextValue = {
		todos: visibleTodos,
		status: state.status,
		errorMessage: state.errorMessage,
		actionError: state.actionError,
		filter: state.filter,
		totalItems: visibleTodos.length,
		actions: {
			addTodo: crud.addTodo,
			deleteTodo: crud.deleteTodo,
			toggleTodo: crud.toggleTodo,
			clearCompleted: crud.clearCompleted,
			reorderTodos: reorder.reorderTodos,
			setFilter: filter.setFilter,
			retryLoad: () => {
				void load();
			},
			dismissError: crud.dismissError,
		},
	};

	return (
		<ThemeProvider>
			<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
		</ThemeProvider>
	);
};
