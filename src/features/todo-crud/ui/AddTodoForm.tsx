import { FormEvent, useState } from "react";
import { useTodoContext } from "@entities/todo/model/TodoContext";
import { useTheme } from "@shared/model/themeContext";

export const AddTodoForm = () => {
	const [description, setDescription] = useState("");
	const { actions, status } = useTodoContext();
	const { theme } = useTheme();

	// Mientras se cargan las tareas no se permiten mutaciones: evita que la
	// carga sobrescriba (y pierda) un cambio optimista del usuario.
	const isLoading = status === "loading" || status === "idle";

	const spanColor = theme === "dark" ? "border-[--VeryDarkGrayishBlue]" : "border-[--LightGrayishBlue]";
	const textColor = theme === "dark" ? "text-white bg-[--VeryDarkDesaturatedBlue]" : "text-black bg-white";

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (description.trim() === "" || isLoading) {
			return;
		}
		void actions.addTodo(description.trim());
		setDescription("");
	};

	return (
		<form className="mx-auto mt-7 h-[7rem] max-w-[55rem] lg:h-[8rem]" onSubmit={handleSubmit}>
			<section className={`flex h-[5rem] flex-row rounded-lg ${textColor} shadow-2xl`}>
				<div className="flex h-full w-[5.5rem] items-center justify-center">
					<span className={`block h-10 w-10 rounded-full border-2 ${spanColor}`}></span>
				</div>
				<label htmlFor="new_todo" className="w-full">
					<input
						className={`h-full w-full rounded-lg text-xl font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${textColor}`}
						type="text"
						name="new_todo"
						id="new_todo"
						placeholder="Create a new todo..."
						value={description}
						disabled={isLoading}
						onChange={(event) => setDescription(event.target.value)}
					/>
				</label>
			</section>
		</form>
	);
};
