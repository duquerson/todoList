import { Dispatch, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { getErrorMessage } from "@shared/lib/getErrorMessage";
import { TodoAction, TodoState } from "@entities/todo/model/todoReducer";
import { TodoService } from "@entities/todo/model/todoService";

/**
 * Reordenación de tareas con actualización optimista.
 * Si no se puede guardar el nuevo orden, se restaura el anterior.
 */
export const useTodoReorder = (state: TodoState, dispatch: Dispatch<TodoAction>, service: TodoService) => {
	const reorderTodos = useCallback(
		(activeId: string, overId: string): void => {
			const from = state.todos.findIndex((todo) => todo.id === activeId);
			const to = state.todos.findIndex((todo) => todo.id === overId);

			if (from < 0 || to < 0 || from === to) {
				return;
			}

			const snapshot = state.todos;
			const reordered = arrayMove(state.todos, from, to);
			dispatch({ type: "SET_TODOS", payload: reordered });

			service.replaceAll(reordered).catch((error: unknown) => {
				dispatch({ type: "SET_TODOS", payload: snapshot });
				const detail = getErrorMessage(error, "");
				dispatch({
					type: "SET_ERROR",
					payload: detail ? `No se pudo guardar el nuevo orden: ${detail}` : "No se pudo guardar el nuevo orden.",
				});
			});
		},
		[dispatch, service, state.todos],
	);

	return { reorderTodos };
};
