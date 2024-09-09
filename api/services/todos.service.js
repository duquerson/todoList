import createError from "http-errors";
import { supabase as DB } from "./conectDB.js";
class TodoService {
	async getTodos() {
		const { data, error } = await DB.from("TODOS").select("*");
		if (error) throw createError(500, "Error en la consulta", { cause: error });
		return data;
	}

	async addTodo(item) {
		const { data, error } = await DB.from("TODOS").insert(item);
		if (error) throw createError(500, "Error update single", { cause: error });
		return data;
	}

	async updateTodos(todos) {
		const { error } = await DB.from("TODOS").upsert(todos);
		if (error) throw createError(500, "Error update todos", { cause: error });
	}

	async updateTodoById(id, updatedTodo) {
		const { error } = await DB.from("TODOS").update(updatedTodo).eq("id", id);
		if (error) {
			throw createError(500, "Error update todo", { cause: error });
		}
	}

	async deleteTodoById(id) {
		const { error } = await DB.from("TODOS").delete().eq("id", id);
		if (error) {
			throw createError(500, "Error delete todo", { cause: error });
		}
	}

	async deleteCompletedTodos() {
		const { error } = await DB.from("TODOS").delete().eq("completed", true);
		if (error) {
			throw createError(500, "Error delete todos", { cause: error });
		}
	}
}

export default new TodoService();
