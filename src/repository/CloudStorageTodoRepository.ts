
import { todo, TodoRepositoryCloud, todos } from "../types/type";

export class CloudStorageRepository implements TodoRepositoryCloud {
    async fetchTodosFromCloud(): Promise<todos> {
        /*
        const { data: TODOS, error } = await supabase.from('TODOS').select('*');
        if (error) throw new Error(error.message);
        return TODOS;*/
        const response = await fetch(`/api/todos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching todos: ${response.statusText}`);
        }

        const TODOS = await response.json();
        return TODOS;
    }

    async updateSupabase(todos: todos): Promise<void> {
        /*const { error } = await supabase.from('TODOS').upsert(todos);
        if (error) {
            console.error("Error updating todo order in Supabase:", error.message);
            throw error;
        }*/
        const response = await fetch(`/api/todos`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todos),
        });

        if (!response.ok) {
            console.error(`Error updating todo order in middleware: ${response.statusText}`);
            throw new Error(response.statusText);
        }
    }

    async addSupabase(todo: todo): Promise<void> {
        /*const { error } = await supabase.from('TODOS').insert(todo);
        if (error) {
            console.error("Error adding todo:", error.message);
            throw error;
        }*/
        const response = await fetch(`/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            console.error(`Error adding todo: ${response.statusText}`);
            throw new Error(response.statusText);
        }
    }

    async deleteSupabase(id: string): Promise<void> {
        /*const { error } = await supabase.from('TODOS').delete().eq('id', id);
        if (error) {
            console.error("Error deleting todo:", error.message);
            throw error;
        }*/
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Error deleting todo: ${response.statusText}`);
            throw new Error(response.statusText);
        }
    }

    async clearCompletedSupabase(): Promise<void> {
        /*const { error } = await supabase.from('TODOS').delete().eq('completed', true);
        if (error) {
            console.error('Error deleting completed todos ', error.message);
        }
    }*/
        const response = await fetch(`/api/todos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Error deleting completed todos: ${response.statusText}`);
            throw new Error(response.statusText);
        }
    }
}

