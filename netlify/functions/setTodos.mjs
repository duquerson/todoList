import createError from "http-errors";
import TodoService from "../../server/services/todos.service";

export async function handler(event) {
	try {
		const { httpMethod, path, body } = event;

		const data = body ? JSON.parse(body) : null;
		const routes = {
			"GET/getTodos": async () => {
				const todos = await TodoService.getTodos();
				return {
					statusCode: 200,
					body: JSON.stringify(todos),
				};
			},
			"POST/addTodo": async () => {
				const newTodo = await TodoService.addTodo(data);
				return {
					statusCode: 201,
					body: JSON.stringify(newTodo),
				};
			},
			"PUT/updateTodos": async () => {
				await TodoService.updateTodos(data);
				return {
					statusCode: 204,
					body: "",
				};
			},
			"PUT/updateTodo": async () => {
				await TodoService.updateTodo(data);
				return {
					statusCode: 204,
					body: "",
				};
			},
			"DELETE/deleteTodoById": async () => {
				const { id } = data;
				await TodoService.deleteTodoById(id);
				return {
					statusCode: 204,
					body: "",
				};
			},
			"DELETE/deleteCompletedTodos": async () => {
				await TodoService.deleteCompletedTodos();
				return {
					statusCode: 204,
					body: "",
				};
			},
		};

		const endpoint = path.split("/").pop();
		const routeKey = `${httpMethod}/${endpoint}`;

		if (routes[routeKey]) {
			return await routes[routeKey]();
		} else {
			throw createError(404, "Ruta no encontrada");
		}
	} catch (error) {
		return {
			statusCode: error.statusCode || 500,
			body: JSON.stringify({ message: error.message, details: error.cause || "" }),
		};
	}
}
