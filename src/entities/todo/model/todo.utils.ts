import { createTodoId } from "@shared/lib/uuid";
import { newTodoSchema } from "./todo.schema";
import { TodoValidationError } from "./todo.errors";
import { FILTER, FilterValue, Todo, Todos } from "./todo.types";

/**
 * Fábrica de tareas: valida la entrada y devuelve una tarea nueva del dominio.
 */
export const createTodo = (description: string): Todo => {
	const result = newTodoSchema.safeParse({ description });

	if (!result.success) {
		throw new TodoValidationError(result.error.issues[0]?.message ?? "La tarea no es válida.");
	}

	return {
		id: createTodoId(),
		description: result.data.description,
		completed: false,
	};
};

export const filterTodos = (todos: Todos, filter: FilterValue): Todos => {
	if (filter === FILTER.ACTIVE) {
		return todos.filter((todo) => !todo.completed);
	}
	if (filter === FILTER.COMPLETED) {
		return todos.filter((todo) => todo.completed);
	}
	return todos;
};
