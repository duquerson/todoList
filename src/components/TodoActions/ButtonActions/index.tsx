import React from "react";
import { appContext } from "../../../Hooks/Context/appContext";
import { FILTERS_BUTTONS } from "../../../const";
import { FilterValue } from "../../../types/type";
export const ButtonActions: React.FC = () => {
	const { actions, filter: statusTodo } = React.useContext(appContext);

	return (
		<ul className="flex justify-between gap-1">
			{Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
				return (
					<li key={key} className={`px-5 font-extrabold ${statusTodo.toLowerCase() === literal.toLowerCase() ? "text-[--BrightBlue]" : "initial"} cursor-pointer`}>
						<a
							href={href}
							className="transition-transform duration-300 ease-in-out transform hover:scale-150"
							onClick={(event) => {
								event.preventDefault();
								actions.todosFilter(literal.toLowerCase() as FilterValue);
							}}
						>
							{literal}
						</a>
					</li>
				);
			})}
		</ul>
	);
};
