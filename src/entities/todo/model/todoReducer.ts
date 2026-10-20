import { FILTER, FilterValue, LoadStatus, Todo, Todos } from "./todo.types";

export interface TodoState {
	todos: Todos;
	status: LoadStatus;
	/** Error de carga inicial (con reintento disponible). */
	errorMessage: string | null;
	/** Error de una acción sobre una tarea (descartable). */
	actionError: string | null;
	filter: FilterValue;
}

export type TodoAction =
	| { type: "LOAD" }
	| { type: "LOAD_SUCCESS"; payload: Todos }
	| { type: "LOAD_ERROR"; payload: string }
	| { type: "ADD"; payload: Todo }
	| { type: "DELETE"; payload: string }
	| { type: "TOGGLE"; payload: string }
	| { type: "CLEAR_COMPLETED" }
	| { type: "SET_TODOS"; payload: Todos }
	| { type: "SET_FILTER"; payload: FilterValue }
	| { type: "SET_ERROR"; payload: string }
	| { type: "CLEAR_ERROR" };

export const initialTodoState: TodoState = {
	todos: [],
	status: "idle",
	errorMessage: null,
	actionError: null,
	filter: FILTER.ALL,
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
	switch (action.type) {
		case "LOAD":
			return { ...state, status: "loading", errorMessage: null };
		case "LOAD_SUCCESS":
			return { ...state, status: "ready", todos: action.payload, errorMessage: null };
		case "LOAD_ERROR":
			return { ...state, status: "error", errorMessage: action.payload };
		case "ADD":
			return { ...state, todos: [...state.todos, action.payload] };
		case "DELETE":
			return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
		case "TOGGLE":
			return {
				...state,
				todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
			};
		case "CLEAR_COMPLETED":
			return { ...state, todos: state.todos.filter((todo) => !todo.completed) };
		case "SET_TODOS":
			return { ...state, todos: action.payload };
		case "SET_FILTER":
			return { ...state, filter: action.payload };
		case "SET_ERROR":
			return { ...state, actionError: action.payload };
		case "CLEAR_ERROR":
			return { ...state, actionError: null };
		default:
			return state;
	}
};
