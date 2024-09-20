import express from "express";

import { validate } from "../middlewares/validator.handler.js";
import { IDschema } from "../schemas/ID.schema.js";
import { todoSchema } from "../schemas/todo.schema.js";
import { todosSchema } from "../schemas/todos.schema.js";
import TodoService from "../services/todos.service.js";
const router = express.Router();
router.get("/", async (req, res, next) => {
	try {
		const todos = await TodoService.getTodos();
		if (!todos) return res.status(404).json({ message: "Todos not found" });
		res.status(200).json(todos);
	} catch (error) {
		next(error);
	}
});
router.post("/", validate(todoSchema, "body"), async (req, res, next) => {
	try {
		const item = req.body;
		await TodoService.addTodo(item);

		res.status(201).json({ success: true });
	} catch (error) {
		next(error);
	}
});
router.put("/", validate(todosSchema, "body"), async (req, res, next) => {
	try {
		const todos = req.body;
		await TodoService.updateTodos(todos);
		res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
});
router.delete("/", async (req, res, next) => {
	try {
		await TodoService.deleteCompletedTodos();
		res.status(204).json({ success: true });
	} catch (error) {
		next(error);
	}
});

router.put("/completed", validate(todoSchema, "body"), async (req, res, next) => {
	try {
		const item = req.body;
		await TodoService.updateTodo(item);

		res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", validate(IDschema, "params"), async (req, res, next) => {
	try {
		const { id } = req.params;

		await TodoService.deleteTodoById(id);

		res.status(204).json({ success: true });
	} catch (err) {
		next(err);
	}
});

export default router;
