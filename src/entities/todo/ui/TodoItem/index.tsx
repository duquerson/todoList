import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useTodoContext } from "@entities/todo/model/TodoContext";
import { Todo } from "@entities/todo/model/todo.types";
import { useTheme } from "@shared/model/themeContext";

interface TodoItemProps {
	todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
	const { id, description, completed } = todo;
	const { actions } = useTodoContext();
	const { theme } = useTheme();
	const [isFading, setIsFading] = useState(false);

	const themeBorderClasses = theme === "dark" ? " border-current" : " border-inherit";
	const themeThrough = theme === "dark" ? "text-[--VeryDarkGrayishBlue]" : "text-[--LightGrayishBlue]";
	const background = completed ? "bg-gradient-to-r from-hsl-192 to-hsl-280" : "";
	const lineThrough = completed ? `line-through ${themeThrough}` : "";

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleDelete = () => {
		setIsFading(true);
		window.setTimeout(
			() => {
				void actions.deleteTodo(id);
			},
			700,
		);
	};

	return (
		<li
			style={style}
			{...attributes}
			ref={setNodeRef}
			className={`flex h-[44px] content-center items-center rounded-lg border-b-[1px] p-4 transition-colors duration-500 ease-in-out hover:rounded-lg ${
				themeBorderClasses
			} ${theme === "dark" ? "hover:inputDark" : "hover:inputLight"} ${isFading ? "animate-fade-out" : ""}`}
		>
			<button
				type="button"
				aria-label={completed ? "Marcar como pendiente" : "Marcar como completada"}
				className={`h-8 w-8 animate-fade-in rounded-full border-2 delay-75 hover:scale-150 ${background} ${completed ? "border-green-500" : themeBorderClasses}`}
				onClick={() => {
					void actions.toggleTodo(id);
				}}
			>
				{completed && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="size-7 scale-75 text-green-500"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
					</svg>
				)}
			</button>

			<label {...listeners} className={`flex h-full w-full items-center pl-4 ${lineThrough} hover:cursor-pointer`}>
				{description}
			</label>

			<button type="button" aria-label="Eliminar tarea" className="hover:scale-150" onClick={handleDelete}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2.5}
					stroke="currentColor"
					className={`size-7 scale-75 hover:text-red-500 ${completed ? "text-red-500" : ""}`}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		</li>
	);
};
