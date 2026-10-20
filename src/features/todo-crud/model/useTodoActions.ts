import { Dispatch, useCallback } from "react";
import { getErrorMessage } from "@shared/lib/getErrorMessage";
import { TodoAction, TodoState } from "@entities/todo/model/todoReducer";
import { TodoService } from "@entities/todo/model/todoService";
import { Todo } from "@entities/todo/model/todo.types";
import { createTodo } from "@entities/todo/model/todo.utils";

const withDetail = (message: string, error: unknown): string => {
	const detail = getErrorMessage(error, "");
	return detail ? `${message}: ${detail}` : message;
};

/**
 * Acciones sobre tareas con actualización optimista.
 *
 * La interfaz se actualiza al instante y, si la persistencia falla, se
 * restaura el estado anterior y se informa del error.
 */
export const useTodoActions = (state: TodoState, dispatch: Dispatch<TodoAction>, service: TodoService) => {
	const addTodo = useCallback(
		async (description: string): Promise<void> => {
			let todo: Todo | null = null;
			try {
				todo = createTodo(description);
			} catch (error) {
				dispatch({ type: "SET_ERROR", payload: withDetail("No se pudo crear la tarea", error) });
			}
			if (!todo) {
				return;
			}

			const snapshot = state.todos;
			dispatch({ type: "ADD", payload: todo });

			try {
				await service.add(todo);
			} catch (error) {
				dispatch({ type: "SET_TODOS", payload: snapshot });
				dispatch({ type: "SET_ERROR", payload: withDetail("No se pudo guardar la tarea", error) });
			}
		},
		[dispatch, service, state.todos],
	);

	const deleteTodo = useCallback(
		async (id: string): Promise<void> => {
			const snapshot = state.todos;
			dispatch({ type: "DELETE", payload: id });

			try {
				await service.remove(id);
			} catch (error) {
				dispatch({ type: "SET_TODOS", payload: snapshot });
				dispatch({ type: "SET_ERROR", payload: withDetail("No se pudo eliminar la tarea", error) });
			}
		},
		[dispatch, service, state.todos],
	);

	const toggleTodo = useCallback(
		async (id: string): Promise<void> => {
			const target = state.todos.find((todo) => todo.id === id);
			if (!target) {
				return;
			}

			const snapshot = state.todos;
			dispatch({ type: "TOGGLE", payload: id });

			try {
				await service.setCompleted(id, !target.completed);
			} catch (error) {
				dispatch({ type: "SET_TODOS", payload: snapshot });
				dispatch({ type: "SET_ERROR", payload: withDetail("No se pudo actualizar la tarea", error) });
			}
		},
		[dispatch, service, state.todos],
	);

	const clearCompleted = useCallback(
		async (): Promise<void> => {
			const snapshot = state.todos;
			dispatch({ type: "CLEAR_COMPLETED" });

			try {
				await service.clearCompleted();
			} catch (error) {
				dispatch({ type: "SET_TODOS", payload: snapshot });
				dispatch({ type: "SET_ERROR", payload: withDetail("No se pudieron borrar las tareas completadas", error) });
			}
		},
		[dispatch, service, state.todos],
	);

	const dismissError = useCallback(() => {
		dispatch({ type: "CLEAR_ERROR" });
	}, [dispatch]);

	return { addTodo, deleteTodo, toggleTodo, clearCompleted, dismissError };
};
