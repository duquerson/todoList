import TodoService from "../../server/services/TodoService.js";
export.handler = async ()=>{
	const TODOS = await TodoService.getTodos();
	return {
		statusCode: 200,
		body: JSON.stringify(TODOS)
	}
}
