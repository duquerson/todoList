import { TodoRepository } from "./TodoRepository";
import { TodoStorageError } from "./todo.errors";
import { todosSchema } from "./todo.schema";
import { Todo, Todos } from "./todo.types";

export const TODOS_STORAGE_KEY = "TODOS";

/**
 * Adaptador de persistencia sobre `localStorage`.
 *
 * Es la única pieza que conoce el medio de almacenamiento: la lógica de
 * negocio depende del puerto `TodoRepository`, no de este adaptador.
 */
export class LocalStorageTodoAdapter implements TodoRepository {
	private readonly storage: Storage;

	constructor(storage: Storage = window.localStorage) {
		this.storage = storage;
	}

	async getTodos(): Promise<Todos> {
		const raw = this.read();

		if (raw === null) {
			return [];
		}

		let parsed: unknown;
		try {
			parsed = JSON.parse(raw);
		} catch (error) {
			throw new TodoStorageError("Los datos guardados en este navegador no son válidos.", { cause: error });
		}

		const result = todosSchema.safeParse(parsed);
		if (!result.success) {
			throw new TodoStorageError("Los datos guardados en este navegador tienen un formato inesperado.", {
				cause: result.error,
			});
		}

		return result.data;
	}

	async addTodo(todo: Todo): Promise<void> {
		const todos = await this.getTodos();
		await this.replaceTodos([...todos, todo]);
	}

	async setTodoCompleted(id: string, completed: boolean): Promise<void> {
		const todos = await this.getTodos();
		await this.replaceTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
	}

	async deleteTodo(id: string): Promise<void> {
		const todos = await this.getTodos();
		await this.replaceTodos(todos.filter((todo) => todo.id !== id));
	}

	async deleteCompletedTodos(): Promise<void> {
		const todos = await this.getTodos();
		await this.replaceTodos(todos.filter((todo) => !todo.completed));
	}

	async replaceTodos(todos: Todos): Promise<void> {
		try {
			this.storage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
		} catch (error) {
			throw new TodoStorageError("No se pudieron guardar las tareas en este navegador.", { cause: error });
		}
	}

	private read(): string | null {
		try {
			return this.storage.getItem(TODOS_STORAGE_KEY);
		} catch (error) {
			throw new TodoStorageError("No se pudo acceder al almacenamiento de este navegador.", { cause: error });
		}
	}
}
