export interface themeType {
	theme: string,
	handleTheme: () => void
}

export interface todo{
	id: string,
	description: string,
	completed: boolean
}
export type todos = todo[]

export interface UseTodoReducerResult {
    todos: todos;
	load: boolean;
	error: boolean;
	filter: FilterValue;
	totalItems: number;
    actions: {
        agregarTodo: (description: string) => Promise<void>
        eliminarTodo: (id: string) => Promise<void>
        completarTodo: (id: string) => Promise<void>
        handleDragEnd: (event: DragEndEvent) => void;
        cargarTodos: () => void;
        cargarTodosSuccess: (payload: todos) => void;
        cargarTodosError: () => void;
		todosFilter: (filter: FilterValue) => void;
		clearComplete: () => void;
    };

}

import { filter, stateTodo } from "../const";
export interface State_Todos {
	todos: todos,
	load: boolean,
	error: boolean,
	totalItems: number,
	filter: FilterValue,

}
type EventDrag = { //DRAG
	active: UniqueIdentifier,
	over: UniqueIdentifier
}
export type Action_Todos =
	|{type: typeof stateTodo.ADD, payload: todo}
	|{type: typeof stateTodo.DELETE, payload: string}
	|{type: typeof stateTodo.COMPLETE, payload: string}
	|{type: typeof stateTodo.DRAG, payload: EventDrag, oldIndex: number, newIndex: number} //review this line
	|{type: typeof stateTodo.LOAD}
	|{type: typeof stateTodo.LOAD_SUCCESS, payload: todos}
	|{type: typeof stateTodo.LOAD_ERROR}
	|{type: typeof stateTodo.SET_FILTER, payload: { filter: FilterValue }}//string}
	|{type: typeof stateTodo.CLEAR_COMPLETE}



/*
export type AccionHandler = {
	[key in keyof typeof stateTodo]: (state: State_Todos, action: Accion_Todos) => State_Todos
}
export interface AccionHandler {
    [key: keyof typeof stateTodo]: (state: State_Todos, action: Accion_Todos) => State_Todos;
}

*/
export type AccionHandler = Record<keyof typeof stateTodo, (state: State_Todos, action: Accion_Todos) => State_Todos >;

export interface typefilterHandlers{
	[key: string]: (todos: todos)=>todos,
	[Key: string]:(todos: todos)=>todos,
	[key: string]:(todos:todos)=>todos,
}

export type FilterValue = typeof filter[keyof typeof filter]

export interface TodoRepositoryCloud {
	getTodos(): Promise<todos>;
	updateTodos(todos: todos): Promise<void>;
	addTodo(todo: todo): Promise<void>;
	completeTodo(todo: todo): Promise<void>;
	deleteTodo(id: string): Promise<void>;
	deleteCompletedTodos(): Promise<void>;
}


