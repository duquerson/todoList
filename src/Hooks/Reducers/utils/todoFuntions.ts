import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { stateTodo } from "../../../const";
import { Action_Todos, FilterValue, TodoRepositoryCloud, todos } from "../../../types/type";
import '../utils/polyfill_crypto.js';

export const loadTodos = async (dispatch: React.Dispatch<Action_Todos>, todoRepository: TodoRepositoryCloud): Promise<todos> => {
    const todos = await todoRepository.fetchTodos();

    dispatch({ type: stateTodo.LOAD_SUCCESS, payload: todos });
    return todos;
};


export const agregarTodo = async (description: string, todoRepository: TodoRepositoryCloud, dispatch: React.Dispatch<Action_Todos>) => {
    const newTodo = { id: crypto.randomUUID(), description, completed: false };
    dispatch({ type: stateTodo.ADD, payload: newTodo });
    await todoRepository.addSupabase(newTodo);
};

export const eliminarTodo = async (id: string, todoRepository: TodoRepositoryCloud, dispatch: React.Dispatch<Action_Todos>) => {
    dispatch({ type: stateTodo.DELETE, payload: id });
    await todoRepository.deleteSupabase(id);
};

export const completarTodo = async (id: string, todoRepository: TodoRepositoryCloud, dispatch: React.Dispatch<Action_Todos>, todos: todos) => {
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    dispatch({ type: stateTodo.COMPLETE, payload: id });
    await todoRepository.updateSupabase(updatedTodos);
};


export const clearComplete = async (todoRepository: TodoRepositoryCloud, dispatch: React.Dispatch<Action_Todos>) => {
    await todoRepository.clearCompletedSupabase();
    dispatch({ type: stateTodo.CLEAR_COMPLETE });
};

export const setFilter = (filter: FilterValue, dispatch: React.Dispatch<Action_Todos>) => {
    dispatch({ type: stateTodo.SET_FILTER, payload: { filter } });
    //update url
    const params = new URLSearchParams(window.location.search);
    params.set('filter', filter);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
};

export const handleDragEnd = async (event: DragEndEvent, todoRepository: TodoRepositoryCloud, dispatch: React.Dispatch<Action_Todos>, todos: todos) => {
    const { active, over } = event;
    //{ active: { id: string }, over: { id: string } }
    if (active && over) {
        const oldIndex = todos.findIndex((todo) => todo.id === active.id);
        const newIndex = todos.findIndex((todo) => todo.id === over.id);
        const reorderedTodos = arrayMove(todos, oldIndex, newIndex);
        dispatch({
            type: stateTodo.DRAG,
            payload: { active: active.id, over: over.id },
            oldIndex: oldIndex,
            newIndex: newIndex,
        });
        try {
            await todoRepository.updateSupabase(reorderedTodos);
        } catch (error) {
            console.error("Error updating todo order in Supabase:", error);
        }
    }
};

export const cargarTodos = (dispatch: React.Dispatch<Action_Todos>) => dispatch({ type: stateTodo.LOAD });
export const cargarTodosSuccess = (payload: todos, dispatch: React.Dispatch<Action_Todos>) => dispatch({ type: stateTodo.LOAD_SUCCESS, payload });
export const cargarTodosError = (dispatch: React.Dispatch<Action_Todos>) => dispatch({ type: stateTodo.LOAD_ERROR });

