import { describe, expect, it } from "vitest";
import { initialTodoState, todoReducer } from "./todoReducer";
import { Todo } from "./todo.types";

const first: Todo = { id: "1", description: "Primera tarea", completed: false };
const second: Todo = { id: "2", description: "Segunda tarea", completed: true };

describe("todoReducer", () => {
	it("añade una tarea al estado", () => {
		const state = todoReducer(initialTodoState, { type: "ADD", payload: first });
		expect(state.todos).toEqual([first]);
	});

	it("elimina una tarea por id", () => {
		const state = todoReducer({ ...initialTodoState, todos: [first, second] }, { type: "DELETE", payload: "1" });
		expect(state.todos).toEqual([second]);
	});

	it("alterna el estado de completado", () => {
		const state = todoReducer({ ...initialTodoState, todos: [first] }, { type: "TOGGLE", payload: "1" });
		expect(state.todos[0].completed).toBe(true);
	});

	it("quita las tareas completadas", () => {
		const state = todoReducer({ ...initialTodoState, todos: [first, second] }, { type: "CLEAR_COMPLETED" });
		expect(state.todos).toEqual([first]);
	});

	it("restaura el estado previo (rollback) con SET_TODOS", () => {
		const snapshot = [first];
		const state = todoReducer({ ...initialTodoState, todos: [first, second] }, { type: "SET_TODOS", payload: snapshot });
		expect(state.todos).toEqual(snapshot);
	});

	it("guarda el error de carga y el de acción por separado", () => {
		const withLoadError = todoReducer(initialTodoState, { type: "LOAD_ERROR", payload: "Fallo de red" });
		expect(withLoadError.status).toBe("error");
		expect(withLoadError.errorMessage).toBe("Fallo de red");

		const withActionError = todoReducer(withLoadError, { type: "SET_ERROR", payload: "No se pudo guardar" });
		expect(withActionError.actionError).toBe("No se pudo guardar");
		expect(withActionError.errorMessage).toBe("Fallo de red");

		const dismissed = todoReducer(withActionError, { type: "CLEAR_ERROR" });
		expect(dismissed.actionError).toBeNull();
	});
});
