/* eslint-disable indent */
import express from "express";

import { validate } from "../../middlewares/validator.handler.js";
import { IDschema } from "../../schemas/ID.schema.js";
import { todoSchema } from "../../schemas/todo.schema.js";
import { default as TodosService, default as todosService } from "../../services/todos.service.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const todos = await TodosService.getTodos();
		res.status(200).json(todos);
	} catch (error) {
		next(error);
	}
});

router.post("/", validate(todoSchema), async (req, res, next) => {
	try {
		const item = req.body;
		const todos = await TodosService.addTodo(item);
		res.status(201).json(todos);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", validate(IDschema), async (req, res, next) => {
	try {
		const todos = req.body;
		await todosService.updateTodos(todos);
		res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", validate(IDschema), async (req, res, next) => {
	try {
		const { id } = req.params;
		await todosService.deleteTodoById(id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		await todosService.deleteCompletedTodos();
		res.json({ success: true });
		res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
});
export default router;
