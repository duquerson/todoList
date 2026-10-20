import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTodoContext } from "@entities/todo/model/TodoContext";
import { TodoItem } from "@entities/todo/ui/TodoItem";
import { useTheme } from "@shared/model/themeContext";
import { ErrorBanner } from "@shared/ui/ErrorBanner";
import { Loader } from "@shared/ui/Loader";

export const TodoList = () => {
	const { todos, status, errorMessage, actions } = useTodoContext();
	const { theme } = useTheme();

	const isLoading = status === "loading" || status === "idle";
	const skeletonClass = `mb-2 animate-pulse transition-colors ease-in-out ${theme === "dark" ? "bg-[#353b48]" : "bg-[#e8f0fe]"}`;

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) {
			return;
		}
		actions.reorderTodos(String(active.id), String(over.id));
	};

	return (
		<>
			{status === "error" && (
				<ErrorBanner
					title="No se pudieron cargar tus tareas"
					message={errorMessage ?? "Ocurrió un error inesperado al cargar las tareas."}
					onRetry={actions.retryLoad}
				/>
			)}
			<ul
				className={`container mx-auto mt-5 max-w-[550px] rounded-lg rounded-b-none shadow-2xl transition-colors duration-500 ease-in-out md:mt-5 ${
					theme === "dark" ? "inputDark" : "inputLight"
				}`}
			>
				<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
					<SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
						{isLoading ? (
							<Loader count={6} height={180} className={skeletonClass} />
						) : (
							<>
								{todos.length === 0 && <li className="border-b-[1px] p-5">No hay tareas para mostrar.</li>}
								{todos.map((todo) => (
									<TodoItem key={todo.id} todo={todo} />
								))}
							</>
						)}
					</SortableContext>
				</DndContext>
			</ul>
		</>
	);
};
