import { useTodoContext } from "@entities/todo/model/TodoContext";

export const ClearCompletedButton = () => {
	const { actions } = useTodoContext();

	return (
		<button
			type="button"
			onClick={() => {
				void actions.clearCompleted();
			}}
		>
			Clear Completed
		</button>
	);
};
