import { State_Todos } from "../../../types/type";
import { setFilter } from "../utils/setFilter";

//get todos localstorage
/*const TodoData: todos = JSON.parse(localStorage.getItem("TODOS") || "[]")?.length > 0
    ? JSON.parse(localStorage.getItem("TODOS") || "[]")
    : testTodo;*/


//estado inicial
export const init_Todos: State_Todos = {
    todos: [],//TodoData,
    error: false,
    load: false,
    filter: setFilter(),
    totalItems: 0,//TodoData.length,
}
