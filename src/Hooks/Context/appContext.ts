import { createContext} from "react";
import { themeType, UseTodoReducerResult } from "../../types/type";


// Interfaz que combina los tipos del contexto
interface AppContextType extends themeType, UseTodoReducerResult {}
// Crea el contexto usando la nueva interfaz
export const appContext = createContext<AppContextType>({
    theme: "light",
    handleTheme: () => {},
    todos: [],
    load: false,
    error: false,
    filter: '',
    totalItems: 0,
    actions: {
        agregarTodo: () => { },
        eliminarTodo: () => { },
        completarTodo: () => { },
        handleDragEnd: () => { },
        cargarTodos: () => { },
        cargarTodosSuccess: () => { },
        cargarTodosError: () => { },
        setFilter: ()=> {},
        clearComplete: ()=> {}
    }
});
