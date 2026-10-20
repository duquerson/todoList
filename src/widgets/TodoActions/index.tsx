import { useTodoContext } from "@entities/todo/model/TodoContext";
import { ClearCompletedButton } from "@features/todo-crud/ui/ClearCompletedButton";
import { FilterButtons } from "@features/todo-filter/ui/FilterButtons";
import { useTheme } from "@shared/model/themeContext";
import { Loader } from "@shared/ui/Loader";

export const TodoActions = () => {
	const { status, totalItems } = useTodoContext();
	const { theme } = useTheme();
	const themeInputClasses = theme === "dark" ? "inputDark" : "inputLight";
	const isLoading = status === "loading" || status === "idle";

	return (
		<>
			<section
				className={`container mx-auto max-w-[550px] rounded-lg rounded-t-none shadow-2xl transition-colors duration-500 ease-in-out delay-150 ${themeInputClasses}`}
			>
				{isLoading ? (
					<Loader count={5} height={10} className="mb-2 animate-pulse transition-colors ease-in-out delay-150" />
				) : (
					<div className="flex justify-between p-6">
						<span>{totalItems > 1 ? `${totalItems}  items left` : `${totalItems}  item left`}</span>
						<div className="hidden md:block">
							<FilterButtons />
						</div>
						<ClearCompletedButton />
					</div>
				)}
			</section>
			<section
				className={`container mx-auto mt-12 max-w-[550px] flex justify-center rounded-lg shadow-2xl transition-colors duration-500 ease-in-out delay-150 md:mt-24 md:hidden p-6 ${themeInputClasses}`}
			>
				<FilterButtons />
			</section>
		</>
	);
};
