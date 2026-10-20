import { createContext, useContext } from "react";
import { FilterValue, LoadStatus, Todos } from "./todo.types";

export interface TodoActions {
	addTodo: (description: string) => Promise<void>;
	deleteTodo: (id: string) => Promise<void>;
	toggleTodo: (id: string) => Promise<void>;
	clearCompleted: () => Promise<void>;
	reorderTodos: (activeId: string, overId: string) => void;
	setFilter: (filter: FilterValue) => void;
	retryLoad: () => void;
	dismissError: () => void;
}

export interface TodoContextValue {
	/** Tareas visibles según el filtro activo. */
	todos: Todos;
	status: LoadStatus;
	errorMessage: string | null;
	actionError: string | null;
	filter: FilterValue;
	totalItems: number;
	actions: TodoActions;
}

export const TodoContext = createContext<TodoContextValue | null>(null);

export const useTodoContext = (): TodoContextValue => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodoContext debe usarse dentro de <TodoProvider>");
	}
	return context;
};
