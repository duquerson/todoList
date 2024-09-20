import { TodoRepository, todo, todos } from "../types/type";

export class LocalStorageTodoRepository implements TodoRepository {
	private storageKey = "TODOS";

	async getTodos(): Promise<todos> {
		const storedTodos = localStorage.getItem(this.storageKey);

		return storedTodos ? JSON.parse(storedTodos) : [];
	}

	async addTodo(todo: todo): Promise<void> {
		const todos = await this.getTodos();
		todos.push(todo);
		localStorage.setItem(this.storageKey, JSON.stringify(todos));
	}

	async completedTodo(id: string): Promise<void> {
		const todos = await this.getTodos();
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		localStorage.setItem(this.storageKey, JSON.stringify(updatedTodos));
	}
	// async updateTodo(todo: todo): Promise<void> {
	// 	const todos = await this.getTodos();
	// 	const index = todos.findIndex(t => t.id === todo.id);
	// 	if (index !== -1) {
	// 		todos[index] = todo;
	// 		localStorage.setItem(this.storageKey, JSON.stringify(todos));
	// 	}
	// }
	async deleteTodo(id: string): Promise<void> {
		const todos = await this.getTodos();
		const updatedTodos = todos.filter(t => t.id !== id);
		localStorage.setItem(this.storageKey, JSON.stringify(updatedTodos));
	}
	async deleteCompletedTodos(): Promise<void> {
		const todos = await this.getTodos();
		const activeTodos = todos.filter(t => !t.completed);
		localStorage.setItem(this.storageKey, JSON.stringify(activeTodos));
	}
	saveTodos(todos: todos): void {
		localStorage.setItem(this.storageKey, JSON.stringify(todos));
	}
}
