import React,{useState, FormEvent, useContext} from "react";
import {appContext} from '../../../Hooks/Context/appContext'

interface AddTodoProps {
    theme: string;
}
export const AddTodo:React.FC<AddTodoProps> = ({theme}) => {
    const [todo, setTodo] = useState("");
    const {actions} = useContext(appContext);
    const spanColor = theme === "dark" ? "border-[--VeryDarkGrayishBlue]" : "border-[--LightGrayishBlue]";
    const textColor = theme === "dark" ? "text-white bg-[--VeryDarkDesaturatedBlue]" : "text-black bg-white";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validación básica: no agregar TODOs vacíos
        if (todo.trim() !== "") {
            actions.agregarTodo(todo.trim());
            setTodo(""); // Limpiar el input después de agregar
        }

    };

    return (
        <form className="mx-auto mt-7 h-[7rem] max-w-[55rem] lg:h-[8rem]" onSubmit={handleSubmit}>
            <section className={`flex h-[5rem] flex-row rounded-lg ${textColor} shadow-2xl`}>
                <div className="flex h-full w-[5.5rem] items-center justify-center">
                    <span className={`block border-2 ${spanColor} h-10 w-10 rounded-full`}></span>
                </div>
                <label  htmlFor="new_todo" className="w-full">
                    <input className={`h-full w-full rounded-lg focus:outline-none ${textColor} text-xl font-medium`} type="text" name="new_todo" id="new_todo" placeholder="Create a new todo..." value={todo} onChange={(e) => setTodo(e.target.value)} />
                </label>
            </section>
        </form>
    );
};
