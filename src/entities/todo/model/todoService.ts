import { TodoRepository } from "./TodoRepository";
import { Todo, Todos } from "./todo.types";

/**
 * Servicio de dominio: expone las operaciones de negocio usando el puerto
 * de persistencia. No conoce el medio de almacenamiento.
 */
export interface TodoService {
	getAll(): Promise<Todos>;
	add(todo: Todo): Promise<void>;
	setCompleted(id: string, completed: boolean): Promise<void>;
	remove(id: string): Promise<void>;
	clearCompleted(): Promise<void>;
	replaceAll(todos: Todos): Promise<void>;
}

export const createTodoService = (repository: TodoRepository): TodoService => ({
	getAll: () => repository.getTodos(),
	add: (todo) => repository.addTodo(todo),
	setCompleted: (id, completed) => repository.setTodoCompleted(id, completed),
	remove: (id) => repository.deleteTodo(id),
	clearCompleted: () => repository.deleteCompletedTodos(),
	replaceAll: (todos) => repository.replaceTodos(todos),
});
