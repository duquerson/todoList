/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
//import TodoService from "../../server/services/TodoService.js";
const TodoService = require("../../server/services/todos.service.js");
export const handler = async () => {
	const TODOS = await TodoService.getTodos();
	return {
		statusCode: 200,
		body: JSON.stringify(TODOS),
	};
};
