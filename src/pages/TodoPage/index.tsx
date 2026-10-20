import { useTodoContext } from "@entities/todo/model/TodoContext";
import { ErrorBanner } from "@shared/ui/ErrorBanner";
import { Layout } from "@shared/ui/Layout";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";
import { TodoActions } from "@widgets/TodoActions";
import { TodoList } from "@widgets/TodoList";

export const TodoPage = () => {
	const { actionError, actions } = useTodoContext();

	return (
		<Layout>
			<Header />
			{actionError && (
				<ErrorBanner title="No se pudo completar la acción" message={actionError} onDismiss={actions.dismissError} />
			)}
			<TodoList />
			<TodoActions />
			<Footer />
		</Layout>
	);
};
