export const Footer = () => {
	return (
		<section className="my-12 text-center text-azul">
			<p className="mb-8 text-xl font-semibold"> Drag and drop to reorder list </p>
			<p className="text-center text-xl font-semibold">
				{" "}
				Challenge by{" "}
				<a
					className="hover:cursor-pointer text-blue-600 hover:text-slate-600"
					href="https://www.frontendmentor.io?ref=challenge"
					target="_blank"
					rel="noreferrer"
				>
					Frontend Mentor.{" "}
				</a>
				Coded by{" "}
				<a className="hover:cursor-pointer text-blue-600 hover:text-slate-600" href="https://github.com/duquerson">
					Yeferson Soto.
				</a>
			</p>
		</section>
	);
};
