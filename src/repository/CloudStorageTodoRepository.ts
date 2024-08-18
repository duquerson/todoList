import { todo, TodoRepositoryCloud, todos } from "../types/type";

export class CloudStorageRepository implements TodoRepositoryCloud {
    async fetchTodos(): Promise<todos> {
        try {
            const response = await fetch(`/api`);
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

    async updateSupabase(todos: todos): Promise<void> {
        try {
            const response = await fetch(`/api`, {
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

    async addSupabase(todo: todo): Promise<void> {
        try {
            const response = await fetch(`/api`, {
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

    async deleteSupabase(id: string): Promise<void> {
        try {
            const response = await fetch(`/api/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    async clearCompletedSupabase(): Promise<void> {
        try {
            const response = await fetch(`/api`, {
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
