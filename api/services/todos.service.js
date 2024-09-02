import { supabase as DB } from "./conectDB.js";

const getTodos = async () => DB.from("TODOS").select("*");
const addTodo = async (item) => DB.from("TODOS").insert(item);
const updateTodos = async (todos) => DB.from("TODOS").upsert(todos);
const updateTodoById = async (id, updatedTodo) => {
	return DB.from("TODOS").update(updatedTodo).eq("id", id);
};
const deleteTodoById = async (id) => {
	return DB.from("TODOS").delete().eq("id", id);
};
const deleteCompletedTodos = async () => {
	return DB.from("TODOS").delete().eq("completed", true);
};

class TodoService {
	getTodos() {
		return getTodos();
	}
	addTodo(item) {
		return addTodo(item);
	}
	updateTodos(todos) {
		return updateTodos(todos);
	}
	updateTodoById(id, updatedTodo) {
		return updateTodoById(id, updatedTodo);
	}
	deleteTodoById(id) {
		return deleteTodoById(id);
	}
	deleteCompletedTodos() {
		return deleteCompletedTodos();
	}
}

export default new TodoService();
