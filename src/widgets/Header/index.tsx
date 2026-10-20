import { useTheme } from "@shared/model/themeContext";
import { AddTodoForm } from "@features/todo-crud/ui/AddTodoForm";

export const Header = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="container p-2">
			<section className="mx-auto flex h-auto max-w-[540px] items-center justify-between md:mt-24 mt-14 text-white">
				<h1 className="pl-4 text-4xl font-extrabold tracking-[1rem] text-white">TODO</h1>
				<button
					type="button"
					aria-label={theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
					className="h-16 w-16 scale rounded-2xl duration-300 hover:scale-125"
					onClick={toggleTheme}
				>
					{theme === "dark" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="white"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-12 rotate-180 transition-transform ease-in-out duration-300"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="black"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="ml-2 size-10 rotate-360 text-black transition-transform ease-in-out duration-300"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
							/>
						</svg>
					)}
				</button>
			</section>
			<AddTodoForm />
		</header>
	);
};
