import { useTodoContext } from "@entities/todo/model/TodoContext";
import { FILTER, FilterValue } from "@entities/todo/model/todo.types";

const FILTER_BUTTONS: { value: FilterValue; literal: string }[] = [
	{ value: FILTER.ALL, literal: "All" },
	{ value: FILTER.ACTIVE, literal: "Active" },
	{ value: FILTER.COMPLETED, literal: "Completed" },
];

export const FilterButtons = () => {
	const { filter, actions } = useTodoContext();

	return (
		<ul className="flex justify-between gap-1">
			{FILTER_BUTTONS.map(({ value, literal }) => (
				<li
					key={value}
					className={`cursor-pointer px-5 font-extrabold ${filter === value ? "text-[--BrightBlue]" : "initial"}`}
				>
					<button
						type="button"
						className="transition-transform duration-300 ease-in-out transform hover:scale-150"
						onClick={() => actions.setFilter(value)}
					>
						{literal}
					</button>
				</li>
			))}
		</ul>
	);
};
