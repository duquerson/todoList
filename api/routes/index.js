import express from "express";
import todosRouter from "./todos/todos.route.js";

//list routes modular
export const routerApi = (app) => {
	const router = express.Router();
	app.use("/api/v1", router);
	//routes of endpoint
	router.use("/todos", todosRouter);
};

export default routerApi;
