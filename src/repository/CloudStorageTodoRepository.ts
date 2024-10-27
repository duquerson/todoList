import { todo, TodoRepositoryCloud, todos } from "../types/type";

const url = '/.netlify/functions/setTodos'
export class CloudStorageRepository implements TodoRepositoryCloud {
	async getTodos(): Promise<todos> {
		try {
			const response = await fetch(`${url}/getTodos`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const todos = await response.json();
			return todos;
		} catch (error) {
			console.error('Error fetching todos:', error);
			throw error;
		}
	}

	async updateTodos(todos: todos): Promise<void> {
		try {
			const response = await fetch(`${url}/updateTodos`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todos),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Error updating todo order in middleware: ${response.statusText} - ${errorText}`);
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('Error updating todos:', error);
			throw error;
		}
	}

	async completeTodo(todo: todo): Promise<void> {
		try {
			const response = await fetch(`${url}/updateTodo`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Error updating todo order in middleware: ${response.statusText} - ${errorText}`);
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('Error updating todos:', error);
			throw error;
		}
	}
	async addTodo(todo: todo): Promise<void> {
		try {
			const response = await fetch(`${url}/addTodo`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Error adding todo: ${response.statusText} - ${errorText}`);
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('Error adding todo:', error);
			throw error;
		}
	}

	async deleteTodo(id: string): Promise<void> {
		try {
			const response = await fetch(`${url}/deleteTodoById`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id })
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Error deleting todo: ${response.statusText} - ${errorText}`);
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('Error deleting todo:', error);
			throw error;
		}
	}

	async deleteCompletedTodos(): Promise<void> {
		try {
			const response = await fetch(`${url}/deleteCompletedTodos`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Error deleting completed todos: ${response.statusText} - ${errorText}`);
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('Error clearing completed todos:', error);
			throw error;
		}
	}
}
