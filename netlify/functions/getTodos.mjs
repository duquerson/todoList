// index.mjs
import TodoService from "../../server/services/todos.service.js";

export const handler = async () => {
	const TODOS = await TodoService.getTodos();
	return {
		statusCode: 200,
		body: JSON.stringify(TODOS),
	};
};
