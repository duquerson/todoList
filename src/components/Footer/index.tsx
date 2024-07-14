import React from "react";

export const Footer: React.FC = () => {
	return (
		<section className="text-center text-azul  my-12">
			<p className="text-xl font-semibold mb-8"> Drag and drop to reorder list </p>
			<p className="text-center text-xl font-semibold">
				{" "}
				Challenge by{" "}
				<a className="hover:cursor-pointer text-blue-600 hover:text-slate-600" href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">
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
