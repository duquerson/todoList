import TodoService from "../../server/services/TodoService.js";
export const handler = async () => {
	const TODOS = await TodoService.getTodos();
	return {
		statusCode: 200,
		body: JSON.stringify(TODOS),
	};
};
