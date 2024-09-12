/* eslint-disable indent */
import express from "express";

import { validate } from "../../middlewares/validator.handler.js";
import { IDschema } from "../../schemas/ID.schema.js";
import { todoSchema } from "../../schemas/todo.schema.js";
import TodoService from "../../services/todos.service.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const todos = await TodoService.getTodos();
		res.status(200).json(todos);
	} catch (error) {
		next(error);
	}
});

router.post("/", validate(todoSchema, "body"), async (req, res, next) => {
	try {
		const item = req.body;
		const todos = await TodoService.addTodo(item);
		res.status(201).json(todos);
	} catch (error) {
		next(error);
	}
});

router.put("/", validate(todoSchema, "body"), async (req, res, next) => {
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

router.delete("/", async (req, res, next) => {
	try {
		await TodoService.deleteCompletedTodos();
		res.status(204).json({ success: true });
	} catch (error) {
		next(error);
	}
});
export default router;
