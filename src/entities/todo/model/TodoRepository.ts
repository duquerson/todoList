import { Todo, Todos } from "./todo.types";

/**
 * Puerto de persistencia (hexagonal).
 *
 * Define qué necesita la lógica de negocio, no cómo se almacenan los datos.
 * Cambiar de implementación (localStorage, API REST, base de datos) solo
 * requiere escribir otro adaptador que cumpla este contrato.
 */
export interface TodoRepository {
	getTodos(): Promise<Todos>;
	addTodo(todo: Todo): Promise<void>;
	setTodoCompleted(id: string, completed: boolean): Promise<void>;
	deleteTodo(id: string): Promise<void>;
	deleteCompletedTodos(): Promise<void>;
	replaceTodos(todos: Todos): Promise<void>;
}
