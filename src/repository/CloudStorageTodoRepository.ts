
import { supabase } from "../services/conectDB";
import { todo, TodoRepositoryCloud, todos } from "../types/type";

export class CloudStorageRepository implements TodoRepositoryCloud {
    async fetchTodosFromCloud(): Promise<todos> {
        const { data: TODOS, error } = await supabase.from('TODOS').select('*');
        if (error) throw new Error(error.message);
        return TODOS;
    }

    async updateSupabase(todos: todos): Promise<void> {
        const { error } = await supabase.from('TODOS').upsert(todos);
        if (error) {
            console.error("Error updating todo order in Supabase:", error.message);
            throw error;
        }
    }

    async addSupabase(todo: todo): Promise<void> {
        const { error } = await supabase.from('TODOS').insert(todo);
        if (error) {
            console.error("Error adding todo:", error.message);
            throw error;
        }
    }

    async deleteSupabase(id: string): Promise<void> {
        const { error } = await supabase.from('TODOS').delete().eq('id', id);
        if (error) {
            console.error("Error deleting todo:", error.message);
            throw error;
        }
    }

    async clearCompletedSupabase(): Promise<void> {
        const { error } = await supabase.from('TODOS').delete().eq('completed', true);
        if (error) {
            console.error('Error deleting completed todos ', error.message);
        }
    }
}

