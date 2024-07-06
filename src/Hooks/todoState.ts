/* eslint-disable no-mixed-spaces-and-tabs */
import { testTodo } from "../Mooks"
import React, { useReducer } from "react";
import { todos,State_Todos, AccionHandler,Action_Todos} from "../types/type";
import {stateTodo} from '../const'
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

//get todos localstorage
const TodoData: todos = JSON.parse(localStorage.getItem("TODOS") || "[]")?.length > 0
    ? JSON.parse(localStorage.getItem("TODOS") || "[]")
    : testTodo;
//estado inicial
const init_Todos: State_Todos = {
    todos: TodoData,
    error: false,
    load: false,
    filter: 'all',
    totalItems: TodoData.length,
}

// Manejadores de acciones
const actionHandlers: AccionHandler = {
    [stateTodo.ADD]: (state, action) => {
        const newTodos = [...state.todos, action.payload];
        localStorage.setItem("TODOS", JSON.stringify(newTodos));
        return {
            ...state,
            todos: newTodos,
            totalItems: newTodos.length,
        };
    },
    [stateTodo.DELETE]: (state, action) => {
        const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
        localStorage.setItem("TODOS", JSON.stringify(newTodos));
        return {
            ...state,
            todos: newTodos,
            totalItems: newTodos.length,
        };
    },
    [stateTodo.COMPLETE]: (state, action) => {
        const newComplete = state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
        localStorage.setItem("TODOS", JSON.stringify(newComplete));
        return {
            ...state,
            todos: newComplete,
        }
    },
    [stateTodo.CLEAR_COMPLETE]: (state)=>{
        const newTodos = state.todos.filter((todo) => !todo.completed) ?? [];
        localStorage.setItem("TODOS", JSON.stringify(newTodos));
        return {
            ...state,
            todos: newTodos,
            totalItems: newTodos.length,
        }
    },
    [stateTodo.SET_FILTER]: (state, action) => {
        return {
            ...state,
            filter: action.payload,
        };
    },
    [stateTodo.DRAG]: (state, action) =>{
        const OrderTodos = arrayMove(state.todos, action.oldIndex, action.newIndex)
        localStorage.setItem("TODOS", JSON.stringify(OrderTodos));
        return {
            ...state,
            todos: OrderTodos,
        }
    },
    [stateTodo.LOAD]: (state) => ({
        ...state,
        load: true,
        error: false
    }),
    [stateTodo.LOAD_ERROR]: (state) => ({
        ...state,
        load: false,
        error:true
    }),
    [stateTodo.LOAD_SUCCESS]: (state, action) => ({
        ...state,
        load: false,
        todos: action.payload,
        error: false
    })
};


// Reducer
const reducer = (state: State_Todos, action: Action_Todos): State_Todos => {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};

// Hook personalizado
export const useTodoReducer = () => {
    const [todos, dispatch] = useReducer(reducer, init_Todos);

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

    }, []);
    //funciones handler
    const agregarTodo = (description: string) => dispatch({ type: stateTodo.ADD, payload: {id: crypto.randomUUID(), description, completed: false} });
    const eliminarTodo = (id: string) => dispatch({ type: stateTodo.DELETE, payload: id });
    const completarTodo = (id: string) => dispatch({ type: stateTodo.COMPLETE, payload: id });
    const clearComplete = () => dispatch({ type: stateTodo.CLEAR_COMPLETE });
    const setFilter = (filter: string) => dispatch({ type: stateTodo.SET_FILTER, payload: filter });
    const handleDragEnd = (event: DragEndEvent) => {
        //{ active: { id: string }, over: { id: string } }
        const { active, over } = event;
        if(active && over){
            const oldIndex = todos.todos.findIndex((todo) => todo.id === active.id);
            const newIndex = todos.todos.findIndex((todo) => todo.id === over.id);
            dispatch({
                type: stateTodo.DRAG,
                payload: { active: active.id, over: over.id },
                oldIndex: oldIndex,
                newIndex: newIndex,
            });
        }
    };
    const cargarTodos = () => dispatch({ type: stateTodo.LOAD });
    const cargarTodosSuccess = (payload: todos) => dispatch({ type: stateTodo.LOAD_SUCCESS, payload });
    const cargarTodosError = () => dispatch({ type: stateTodo.LOAD_ERROR });
    //filter todos
    const filteredTodos = todos.todos.filter(todo => {
        if (todos.filter === 'active') return !todo.completed;
        if (todos.filter === 'completed') return todo.completed;
        return true; // 'all' case
    });
    return { todos: filteredTodos , load: todos.load, error: todos.error, filter: todos.filter, totalItems: todos.totalItems,actions: { agregarTodo, eliminarTodo, completarTodo, clearComplete, setFilter, handleDragEnd, cargarTodos, cargarTodosSuccess, cargarTodosError}};
};
