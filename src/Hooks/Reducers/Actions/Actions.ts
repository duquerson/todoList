import { arrayMove } from "@dnd-kit/sortable";
import { stateTodo } from "../../../const";
import { AccionHandler } from "../../../types/type";

// Manejadores de acciones
export const actionHandlers: AccionHandler = {

    [stateTodo.ADD]: (state, action) => {
        const newTodos = [...state.todos, action.payload];
        //localStorage.setItem("TODOS", JSON.stringify(newTodos));
        return {
            ...state,
            todos: newTodos,
            totalItems: newTodos.length,
        };

    },
    [stateTodo.DELETE]: (state, action) => {
        const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
        //localStorage.setItem("TODOS", JSON.stringify(newTodos));
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
        //localStorage.setItem("TODOS", JSON.stringify(newComplete));
        return {
            ...state,
            todos: newComplete,

        }
    },
    [stateTodo.CLEAR_COMPLETE]: (state)=>{
        const newTodos = state.todos.filter((todo) => !todo.completed) ?? [];
        //localStorage.setItem("TODOS", JSON.stringify(newTodos));
        return {
            ...state,
            todos: newTodos,
            totalItems: newTodos.length,

        }
    },
    [stateTodo.SET_FILTER]: (state, action) => {
        const { filter } = action.payload
        return {
            ...state,
            filter: filter,
        };
    },
    [stateTodo.DRAG]: (state, action) =>{
        const OrderTodos = arrayMove(state.todos, action.oldIndex, action.newIndex)
        //localStorage.setItem("TODOS", JSON.stringify(OrderTodos));
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
        error: false,
        totalItems: action.payload.length,
    })
};
