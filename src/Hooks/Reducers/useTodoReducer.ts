//import { testTodo } from "../Mooks"
import { DragEndEvent } from "@dnd-kit/core";
import React, { useMemo, useReducer } from "react";
import { stateTodo } from '../../const';
import { FilterValue, TodoRepositoryCloud, todos } from "../../types/type";
import { reducer } from "../Reducers/Reducer/Reducer";
import { init_Todos } from "../Reducers/initialState/initState";
import * as actions from "./utils/todoFuntions";

// Hook personalizado
export const useTodoReducer = (todoRepository : TodoRepositoryCloud) => {
	const [todos, dispatch] = useReducer(reducer, init_Todos);

	/*
    React.useEffect(() => {
        dispatch({ type: stateTodo.LOAD });

        setTimeout(() => {
            try {
                const storedTodos = localStorage.getItem("TODOS");
                if (storedTodos) {
                    const parsedTodos: todos = JSON.parse(storedTodos);
                    dispatch({ type: stateTodo.LOAD_SUCCESS, payload: parsedTodos });
                } else {
                    dispatch({ type: stateTodo.LOAD_SUCCESS, payload: testTodo });
                }
            } catch (error) {
                dispatch({ type: stateTodo.LOAD_ERROR });
                console.error("Error de carga:", error);
            }
        }, 1500);
    },[]);*/


	React.useEffect(() => {
		dispatch({ type: stateTodo.LOAD });
		const loadTodos = async () => {
			try {
				const todosFrom = await actions.loadTodos(dispatch, todoRepository);
				dispatch({ type: stateTodo.LOAD_SUCCESS, payload: todosFrom });
			} catch (error) {

				dispatch({ type: stateTodo.LOAD_ERROR });
				console.error("Error loading todos:", error);
			}
		};

		loadTodos();
	}, []);

	//filter todos
	const filteredTodos = useMemo(() => {
		return todos.todos.filter(todo => {
			if (todos.filter === 'active') return !todo.completed;
			if (todos.filter === 'completed') return todo.completed;
			return true; // 'all' case
		});
	}, [todos.todos, todos.filter]);
	return {
		todos: filteredTodos,
		load: todos.load,
		error: todos.error,
		filter: todos.filter,
		totalItems: filteredTodos.length,//todos.totalItems,
		actions: {
			agregarTodo: (description: string) => actions.agregarTodo( description, todoRepository, dispatch),
			eliminarTodo: (id: string) => actions.eliminarTodo(id, todoRepository, dispatch),
			completarTodo:(id: string) => actions.completarTodo(id, todoRepository, dispatch, todos.todos),
			clearComplete: () => actions.clearComplete(todoRepository, dispatch),
			todosFilter: (filter: FilterValue) => actions.setFilter(filter, dispatch),
			handleDragEnd: (event: DragEndEvent) => actions.handleDragEnd(event, todoRepository, dispatch, todos.todos),
			cargarTodos: () => actions.cargarTodos(dispatch),
			cargarTodosSuccess: (payload: todos )=> actions.cargarTodosSuccess(payload, dispatch),
			cargarTodosError: () => actions.cargarTodosError(dispatch),
		}
	};
};
