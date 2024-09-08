import { supabase as DB } from "./conectDB.js";

class TodoService {
	async getTodos() {
		const { data, error } = await DB.from("TODOS").select("*");
		return { data, error };
	}

	async addTodo(item) {
		const { data, error } = await DB.from("TODOS").insert(item);
		return { data, error };
	}

	async updateTodos(todos) {
		const { error } = await DB.from("TODOS").upsert(todos);
		return error;
	}

	async updateTodoById(id, updatedTodo) {
		const { error } = await DB.from("TODOS").update(updatedTodo).eq("id", id);
		return error;
	}

	async deleteTodoById(id) {
		const { error } = await DB.from("TODOS").delete().eq("id", id);
		return error;
	}

	async deleteCompletedTodos() {
		const { error } = await DB.from("TODOS").delete().eq("completed", true);
		return error;
	}
}

export default new TodoService();
